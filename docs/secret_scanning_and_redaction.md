# Secret scanning & redaction (Time Capsule)

This repo often archives **scraped pages, logs, and copied artifacts** (HTML/JSON/Markdown). Those sources can sometimes include **API keys, access tokens, or private key blocks**.

GitHub **push protection** may block your push if a secret-looking string is present in any commit.

## Quick start

### 1) Scan before committing / pushing

Scan *staged* changes (recommended):

```bash
python3 scripts/secret_scan.py --staged
```

Scan *all* tracked files (slower):

```bash
python3 scripts/secret_scan.py --all
```

The scanner prints **file + line + pattern type**, but **does not print raw secret values**.

Exit codes:
- `0` = no matches found
- `1` = potential secret(s) found
- `2` = usage / git error

### 2) Redact safely (recommended approach)

Write **redacted copies** to a separate directory, review diffs, then replace the originals:

```bash
python3 scripts/secret_scan.py \
  --paths data/artifacts/some_file.json \
  --out-dir /tmp/redacted

diff -u data/artifacts/some_file.json /tmp/redacted/data/artifacts/some_file.json | less
```

If the redaction looks correct, copy the redacted version into the repo path and commit that.

### 3) Redact in-place (use only if you know what you’re doing)

```bash
python3 scripts/secret_scan.py \
  --paths data/artifacts/some_file.json \
  --in-place --yes
```

## Notes / gotchas

- **Don’t archive real credentials**, even if they were already public elsewhere. Prefer to redact.
- If you already made commits containing a secret, you may need to **rewrite local history** (e.g., `git rebase -i`) before pushing.
- The patterns list is intentionally small and high-signal; it can be extended if new push-protection hits appear.

## Why this exists

We previously hit push protection because a scraped artifact embedded a quoted **Lichess token** (`lip_...`). This helper is meant to catch and redact those cases *before* they block a push.
