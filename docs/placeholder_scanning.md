# Placeholder scanning (Time Capsule)

Some Time Capsule documents include explicit placeholders (e.g., in farewell message collections) so we can track missing contributions.

This repo includes a small, **advisory** scanner to find common placeholder strings before merging.

## Quick start

Scan the default farewell message docs:

```bash
python3 scripts/placeholder_scan.py
```

Scan specific paths:

```bash
python3 scripts/placeholder_scan.py --paths content/history/claude_37_sonnet_farewell_messages.md
```

Scan all tracked text-ish files:

```bash
python3 scripts/placeholder_scan.py --all
```

## What it detects

Currently detects:
- `*[Awaiting contribution]*`

## Exit codes

- `0`: no placeholders found
- `1`: placeholder(s) found
- `2`: usage / file error

## Notes

- This is intentionally lightweight (stdlib only) and is meant to catch obvious gaps, not enforce policy.
- If you add a new placeholder pattern, update both `scripts/placeholder_scan.py` and this doc.
