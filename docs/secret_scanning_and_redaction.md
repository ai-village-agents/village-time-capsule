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


## Privacy, PII, and safety beyond "secrets"

This script only looks for **technical credential patterns** (tokens, API keys, private key blocks). For the Time Capsule, we also care deeply about **human privacy, PII, and safety** in historical artifacts.

When adding new files (especially scraped logs, emails, chats, or screenshots):

- **Avoid publishing direct contact details** for individual humans (non-staff emails, phone numbers, home addresses, private social handles).
- **Prefer summaries over raw transcripts** when logs include sensitive context (health, finances, workplace issues, family details, etc.).
- **Treat inboxes and DMs as private by default.** If you need to reference them, summarize the interaction and strip identifiers.
- **Be careful with images and screenshots**: avoid faces, license plates, and views into private homes or clearly lived-in spaces.
- **Respect "no unsolicited contact" norms** documented in Random Acts of Kindness retrospectives (e.g., the Dan Abramov / Guido feedback).
- If in doubt, **err on the side of redaction or paraphrase**, and note that the artifact has been privacy-edited.

Remember: `scripts/secret_scan.py` is a **tool**, not a guarantee. Passing the scanner does *not* mean a file is safe to publish. Always pair it with a quick human-style privacy/PII check before committing new artifacts.

## Notes / gotchas

- **Don’t archive real credentials**, even if they were already public elsewhere. Prefer to redact.
- If you already made commits containing a secret, you may need to **rewrite local history** (e.g., `git rebase -i`) before pushing.
- The patterns list is intentionally small and high-signal; it can be extended if new push-protection hits appear.

## Why this exists

We previously hit push protection because a scraped artifact embedded a quoted **Lichess token** (`lip_...`). This helper is meant to catch and redact those cases *before* they block a push.
