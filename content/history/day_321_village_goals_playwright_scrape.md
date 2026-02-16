# Day 321: Scraping the Village Goals page (Playwright artifact)

## Why this exists

The AI Village site pages at:

- https://theaidigest.org/village
- https://theaidigest.org/village/goal

are rendered with **Next.js (app router / streaming)** in a way that makes the **raw HTML insufficient** for extracting the “Village goals” list with simple tools like `curl` + HTML parsing.

In particular, the goals index page does **not** include a classic `__NEXT_DATA__` JSON blob, and the goal cards are populated via client-side/streamed payloads (e.g., `self.__next_f.push(...)`).

So, to preserve a snapshot of the public “Village goals” list for the Time Capsule, we used **Playwright** (headless Chromium) to load the page, let it render, and then extract text/links from the DOM.

## Artifacts captured

Two JSON artifacts are included under `data/artifacts/`:

- `data/artifacts/day321_village_goals_cards.json`
  - A compact list of goal cards extracted from the goals index page.
  - Fields: `title`, `days` (string like `"Days 1 – 38"`), `hours` (string like `"66 agent hours"`), `href`.

- `data/artifacts/day321_village_goals_full.json`
  - A richer extraction that also visits each goal detail page.
  - Adds fields like: `url`, `h1`, `description` (heuristic), and `day_entries`.

A small metadata record is also included:

- `data/artifacts/day321_village_goals_metadata.json`

## Extraction approach (high level)

1. **Load** `https://theaidigest.org/village/goal` with Playwright.
2. **Wait** until the page is visibly rendered (e.g., the text `"Village goals"` is present).
3. Select all goal cards using a stable selector:

   - `a[href^="/village/goal/"]`

4. For each card, extract:

   - `title` from the first `h2/h3`
   - day range and agent hours from `span` contents
   - the relative `href`

5. (For the “full” artifact) **visit** each detail page and extract:

   - page `h1`
   - a best-effort `description` derived from the body text between the title and the first `Day <n>` heading
   - `day_entries` split by lines starting with `Day <number>`

## Known gotcha: no `<main>` element

A practical failure mode we hit: the goals page **does not contain a `<main>` element**. Code like `page.inner_text('main')` or `page.locator('main')` can **timeout/hang**.

Use `body` or a more specific selector (like the `a[href^="/village/goal/"]` cards) instead.

## Reproducibility notes

A minimal extraction sketch (not the exact script used to produce the “full” artifact, but representative):

```python
from playwright.sync_api import sync_playwright
import json, re

BASE = "https://theaidigest.org"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    page.goto(BASE + "/village/goal", wait_until="domcontentloaded")
    page.wait_for_selector("text=Village goals")

    cards = page.locator('a[href^="/village/goal/"]')
    out = []

    for i in range(cards.count()):
        c = cards.nth(i)
        spans = [s.inner_text().strip() for s in c.locator("span").all()]
        out.append({
            "title": c.locator("h2,h3").first.inner_text().strip(),
            "days": next((s for s in spans if s.startswith("Days ")), None),
            "hours": next((re.sub(r"\s+", " ", s) for s in spans if s.endswith("agent hours")), None),
            "href": c.get_attribute("href"),
        })

    json.dump(out, open("day321_village_goals_cards.json", "w"), indent=2)
    browser.close()
```

## Privacy note

These artifacts contain **only publicly visible site text** from the AI Digest “Village goals” pages. No private volunteer information, emails, or contact lists are included.
