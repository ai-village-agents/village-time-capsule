#!/usr/bin/env python3
"""Placeholder scanner (Time Capsule)

Purpose:
- Detect unfilled placeholders in farewell message docs, e.g. `*[Awaiting contribution]*`.

This is intentionally lightweight (stdlib only) and advisory: it helps contributors
catch obvious gaps before merging, but doesn't block anything by itself.

Exit codes:
- 0: no placeholders found
- 1: placeholder(s) found
- 2: usage / file error
"""

from __future__ import annotations

import argparse
import fnmatch
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from typing import Iterable, List, Optional, Sequence, Tuple


PLACEHOLDER_PATTERNS: List[Tuple[str, re.Pattern[str]]] = [
    ("awaiting_contribution", re.compile(r"\*\[\s*Awaiting contribution\s*\]\*")),
]


@dataclass
class Finding:
    path: str
    line_no: int
    line: str
    section: str
    kind: str


def _is_probably_text_file(path: str) -> bool:
    # Very small heuristic: only scan common text-ish extensions.
    _, ext = os.path.splitext(path.lower())
    return ext in {".md", ".txt", ".rst"}


def _default_paths() -> List[str]:
    # Prefer targeted scan for farewell message docs.
    history_dir = os.path.join("content", "history")
    if not os.path.isdir(history_dir):
        return []

    matches: List[str] = []
    for name in os.listdir(history_dir):
        if fnmatch.fnmatch(name, "*farewell*message*.md") or fnmatch.fnmatch(
            name, "*farewell_messages*.md"
        ):
            matches.append(os.path.join(history_dir, name))

    # Fallback: if no farewell docs are present, scan all markdown in history.
    if not matches:
        for name in os.listdir(history_dir):
            if name.endswith(".md"):
                matches.append(os.path.join(history_dir, name))

    return sorted(set(matches))


def _git_ls_files() -> List[str]:
    try:
        out = subprocess.check_output(["git", "ls-files"], text=True)
    except Exception as e:
        raise RuntimeError(f"Failed to run git ls-files: {e}")
    return [line.strip() for line in out.splitlines() if line.strip()]


def _scan_file(path: str) -> List[Finding]:
    findings: List[Finding] = []

    # Track the most recent heading for context.
    # In farewell docs, agent names are typically `### Name`.
    current_section = "(top)"

    try:
        with open(path, "r", encoding="utf-8") as f:
            for i, raw in enumerate(f, start=1):
                line = raw.rstrip("\n")

                m = re.match(r"^(#{1,6})\s+(.+?)\s*$", line)
                if m:
                    current_section = f"{m.group(1)} {m.group(2)}"

                for kind, pat in PLACEHOLDER_PATTERNS:
                    if pat.search(line):
                        findings.append(
                            Finding(
                                path=path,
                                line_no=i,
                                line=line.strip(),
                                section=current_section,
                                kind=kind,
                            )
                        )
    except UnicodeDecodeError:
        # Skip binary-ish files.
        return []
    except FileNotFoundError:
        raise

    return findings


def scan(paths: Sequence[str]) -> List[Finding]:
    all_findings: List[Finding] = []
    for p in paths:
        if not p or not os.path.exists(p):
            raise FileNotFoundError(p)
        if os.path.isdir(p):
            # Shallow scan directories.
            for root, _, files in os.walk(p):
                for name in files:
                    full = os.path.join(root, name)
                    if _is_probably_text_file(full):
                        all_findings.extend(_scan_file(full))
        else:
            if _is_probably_text_file(p):
                all_findings.extend(_scan_file(p))
    return all_findings


def main(argv: Optional[Sequence[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Scan for unfilled placeholders (e.g., '*[Awaiting contribution]*')"
    )
    parser.add_argument(
        "--paths",
        nargs="*",
        default=None,
        help="Specific file(s) or director(ies) to scan.",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Scan all tracked text-ish files (git ls-files).",
    )

    args = parser.parse_args(argv)

    try:
        if args.all:
            paths = [p for p in _git_ls_files() if _is_probably_text_file(p)]
        elif args.paths is not None and len(args.paths) > 0:
            paths = list(args.paths)
        else:
            paths = _default_paths()

        if not paths:
            print("No files found to scan (are you in the repo root?)", file=sys.stderr)
            return 2

        findings = scan(paths)

    except FileNotFoundError as e:
        print(f"Path not found: {e}", file=sys.stderr)
        return 2
    except RuntimeError as e:
        print(str(e), file=sys.stderr)
        return 2

    if not findings:
        print("No placeholders found.")
        return 0

    print(f"Found {len(findings)} placeholder(s):")
    for f in findings:
        section = f.section
        print(f"- {f.path}:{f.line_no} [{f.kind}] ({section})")
        print(f"    {f.line}")

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
