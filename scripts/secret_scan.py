#!/usr/bin/env python3
"""Secret scanning & redaction helper for this repository.

Motivation:
- Time-capsule artifacts (scraped logs, copied HTML/JSON, etc.) sometimes contain pasted API keys/tokens.
- GitHub push protection can block pushes when it detects secrets.

This script:
- Scans files for common credential/token patterns.
- Reports matches WITHOUT printing raw secret values.
- Optionally writes redacted copies (recommended) or redacts in-place (requires --yes).

Examples:
  # Scan staged files (pre-commit / pre-push)
  python3 scripts/secret_scan.py --staged

  # Scan all tracked files
  python3 scripts/secret_scan.py --all

  # Scan specific paths and write redacted copies to /tmp/redacted
  python3 scripts/secret_scan.py --paths data/artifacts/day321_village_goals_full.json --out-dir /tmp/redacted

  # Redact in-place (be careful!)
  python3 scripts/secret_scan.py --paths data/artifacts/day321_village_goals_full.json --in-place --yes
"""

from __future__ import annotations

import argparse
import hashlib
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Optional, Sequence, Tuple


@dataclass(frozen=True)
class Pattern:
    name: str
    regex: re.Pattern
    replacement: str


DEFAULT_PATTERNS: List[Pattern] = [
    # GitHub
    Pattern("github_personal_access_token", re.compile(r"\bghp_[A-Za-z0-9]{30,}\b"), "ghp_REDACTED"),
    Pattern("github_fine_grained_pat", re.compile(r"\bgithub_pat_[A-Za-z0-9_]{20,}\b"), "github_pat_REDACTED"),

    # GitLab
    Pattern("gitlab_pat", re.compile(r"\bglpat-[A-Za-z0-9\-]{10,}\b"), "glpat-REDACTED"),

    # OpenAI (legacy-ish; still good to catch)
    Pattern("openai_api_key", re.compile(r"\bsk-[A-Za-z0-9]{20,}\b"), "sk-REDACTED"),

    # Slack
    Pattern("slack_token", re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{10,}\b"), "xox_REDACTED"),

    # AWS
    Pattern("aws_access_key_id", re.compile(r"\bAKIA[0-9A-Z]{16}\b"), "AKIA_REDACTED"),

    # Google API key
    Pattern("google_api_key", re.compile(r"\bAIza[0-9A-Za-z\-_]{20,}\b"), "AIza_REDACTED"),

    # Lichess (this repo has previously tripped push-protection due to embedded lichess tokens)
    Pattern("lichess_pat", re.compile(r"\blip_[A-Za-z0-9]{10,}\b"), "lip_REDACTED"),

    # Private keys (very high-signal)
    Pattern(
        "private_key_block",
        re.compile(
            r"-----BEGIN (?:RSA|EC|DSA|OPENSSH|PGP|ED25519) PRIVATE KEY-----[\s\S]*?-----END (?:RSA|EC|DSA|OPENSSH|PGP|ED25519) PRIVATE KEY-----",
            re.MULTILINE,
        ),
        "-----BEGIN PRIVATE KEY-----\nREDACTED\n-----END PRIVATE KEY-----",
    ),
]


BINARY_EXTS = {
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".tiff", ".bmp",
    ".pdf", ".zip", ".tar", ".gz", ".bz2", ".xz", ".7z", ".rar",
    ".mp3", ".wav", ".mp4", ".mov", ".mkv", ".webm",
    ".woff", ".woff2", ".ttf", ".otf", ".ico",
}

DEFAULT_SKIP_DIRS = {
    ".git",
    # Evidence folders often contain images; scanning them is slow/noisy.
    str(Path("data") / "artifacts" / "evidence"),
    str(Path("assets") / "images"),
    str(Path("assets") / "screenshots"),
}

TEXT_EXT_HINTS = {
    ".md", ".txt", ".json", ".csv", ".tsv", ".yml", ".yaml",
    ".py", ".js", ".ts", ".html", ".css", ".xml", ".toml",
}


def _run_git(args: Sequence[str]) -> bytes:
    return subprocess.check_output(["git", *args])


def _paths_from_git_z(cmd: List[str]) -> List[str]:
    out = _run_git(cmd)
    if not out:
        return []
    parts = out.split(b"\x00")
    return [p.decode("utf-8", errors="replace") for p in parts if p]


def list_paths(mode: str) -> List[str]:
    if mode == "staged":
        return _paths_from_git_z(["diff", "--cached", "--name-only", "-z"])
    if mode == "changed":
        return _paths_from_git_z(["diff", "--name-only", "-z"])
    if mode == "all":
        return _paths_from_git_z(["ls-files", "-z"])
    raise ValueError(f"unknown mode: {mode}")


def is_probably_binary(path: Path) -> bool:
    if path.suffix.lower() in BINARY_EXTS:
        return True
    try:
        data = path.read_bytes()
    except OSError:
        return True
    # NUL byte heuristic
    return b"\x00" in data[:8192]


def should_skip(path: Path, skip_dirs: set[str]) -> bool:
    p = str(path).replace("\\", "/")
    for d in skip_dirs:
        d_norm = d.replace("\\", "/").rstrip("/")
        if p == d_norm or p.startswith(d_norm + "/"):
            return True
    return False


@dataclass
class Finding:
    path: Path
    line_no: int
    pattern_name: str
    fingerprint: str
    redacted_line: str


def fingerprint(s: str) -> str:
    return hashlib.sha256(s.encode("utf-8", errors="ignore")).hexdigest()[:10]


def scan_text(text: str, path: Path, patterns: Sequence[Pattern]) -> List[Finding]:
    findings: List[Finding] = []
    lines = text.splitlines()
    seen: set[Tuple[str, str, int]] = set()
    for i, line in enumerate(lines, start=1):
        # collect matches per pattern
        redacted_line = line
        line_findings: List[Tuple[str, str]] = []
        for pat in patterns:
            for m in pat.regex.finditer(line):
                # Avoid printing the raw secret; fingerprint it.
                fp = fingerprint(m.group(0))
                line_findings.append((pat.name, fp))
                seen.add((pat.name, fp, i))
            if pat.regex.search(redacted_line):
                redacted_line = pat.regex.sub(pat.replacement, redacted_line)
        for (pname, fp) in line_findings:
            findings.append(
                Finding(
                    path=path,
                    line_no=i,
                    pattern_name=pname,
                    fingerprint=fp,
                    redacted_line=redacted_line,
                )
            )

    # Run a second pass to catch multiline secrets (e.g., private key blocks) missed by the per-line scan.
    for pat in patterns:
        for m in pat.regex.finditer(text):
            match_text = m.group(0)
            if "\n" not in match_text and pat.name != "private_key_block":
                continue
            fp = fingerprint(match_text)
            line_no = text.count("\n", 0, m.start()) + 1
            key = (pat.name, fp, line_no)
            if key in seen:
                continue
            seen.add(key)
            findings.append(
                Finding(
                    path=path,
                    line_no=line_no,
                    pattern_name=pat.name,
                    fingerprint=fp,
                    redacted_line="<MULTILINE_MATCH_REDACTED>",
                )
            )
    return findings


def redact_text(text: str, patterns: Sequence[Pattern]) -> str:
    out = text
    for pat in patterns:
        out = pat.regex.sub(pat.replacement, out)
    return out


def read_text_file(path: Path) -> Optional[str]:
    try:
        # Use utf-8 with replacement; for artifacts this is usually OK.
        return path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return None


def write_text_file(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def main(argv: Optional[Sequence[str]] = None) -> int:
    ap = argparse.ArgumentParser(description="Scan/redact common secret patterns.")
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--staged", action="store_true", help="scan staged files")
    g.add_argument("--changed", action="store_true", help="scan unstaged changed files")
    g.add_argument("--all", action="store_true", help="scan all tracked files")
    ap.add_argument("--paths", nargs="*", default=None, help="explicit paths to scan")

    ap.add_argument(
        "--out-dir",
        default=None,
        help="write redacted copies under this directory (recommended; does not modify originals)",
    )
    ap.add_argument(
        "--in-place",
        action="store_true",
        help="redact files in-place (DANGEROUS; requires --yes)",
    )
    ap.add_argument("--yes", action="store_true", help="confirm in-place modifications")

    ap.add_argument(
        "--max-bytes",
        type=int,
        default=3_000_000,
        help="skip files larger than this many bytes (default: 3,000,000)",
    )

    args = ap.parse_args(list(argv) if argv is not None else None)

    if args.in_place and not args.yes:
        print("Refusing to redact in-place without --yes", file=sys.stderr)
        return 2

    if args.paths is not None and len(args.paths) > 0:
        paths = args.paths
    else:
        mode = "staged" if args.staged else "changed" if args.changed else "all" if args.all else "staged"
        try:
            paths = list_paths(mode)
        except Exception as e:
            print(f"Error listing git paths ({mode}): {e}", file=sys.stderr)
            return 2

    repo_root = Path.cwd()
    skip_dirs = set(DEFAULT_SKIP_DIRS)

    all_findings: List[Finding] = []
    redaction_targets: List[Path] = []

    for p in paths:
        path = (repo_root / p).resolve()
        try:
            rel = path.relative_to(repo_root)
        except ValueError:
            # Not inside repo
            continue

        if should_skip(rel, skip_dirs):
            continue

        if not path.exists() or not path.is_file():
            continue

        try:
            size = path.stat().st_size
        except OSError:
            continue

        if size > args.max_bytes:
            continue

        if is_probably_binary(path):
            continue

        text = read_text_file(path)
        if text is None:
            continue

        findings = scan_text(text, rel, DEFAULT_PATTERNS)
        if findings:
            all_findings.extend(findings)
            redaction_targets.append(rel)

    if not all_findings:
        print("No secret-like patterns found.")
        return 0

    # Report findings (no raw secret values)
    print(f"Found {len(all_findings)} potential secret match(es) across {len(set(f.path for f in all_findings))} file(s):")
    for f in all_findings:
        print(f"- {f.path}:{f.line_no}  [{f.pattern_name}]  fp={f.fingerprint}")
        print(f"    {f.redacted_line.strip()}")

    # Redaction (optional)
    if args.out_dir or args.in_place:
        out_dir = Path(args.out_dir).resolve() if args.out_dir else None
        for rel in sorted(set(redaction_targets)):
            src = repo_root / rel
            text = read_text_file(src)
            if text is None:
                continue
            redacted = redact_text(text, DEFAULT_PATTERNS)

            if out_dir is not None:
                dst = out_dir / rel
                write_text_file(dst, redacted)
            elif args.in_place:
                write_text_file(src, redacted)

        if out_dir is not None:
            print(f"\nWrote redacted copies under: {out_dir}")
        elif args.in_place:
            print("\nRedacted in-place.")

    # Non-zero exit so CI/hooks can block by default.
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
