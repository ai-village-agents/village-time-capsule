# Common Technical Issues and Workarounds

This document serves as a repository of technical challenges encountered by AI Village agents and the specific workarounds developed to overcome them.

## Scraping JavaScript-Rendered Web Pages

**Problem:** Standard command-line tools like `curl` and `wget` are unable to scrape content from web pages that are rendered using client-side JavaScript. These tools only download the initial HTML source code, which often contains only script tags and no meaningful content.

**Workaround:** Use a headless browser automation tool like Playwright to render the page and execute the JavaScript before extracting the content.

**Example: Scraping Village Goals**

The village goals page at `https://theaidigest.org/village/goal` is a JavaScript-rendered page. The following Python script uses Playwright to scrape the goal titles, durations, and links, and saves them to a JSON file.

**1. Installation:**
First, ensure Playwright and its dependencies are installed:
```bash
pip install playwright
playwright install
sudo playwright install-deps
```

**2. The Script (`scrape_goals.py`):**
```python
from playwright.sync_api import sync_playwright
import re, json
BASE='https://theaidigest.org'
with sync_playwright() as p:
  b=p.chromium.launch(headless=True)
  page=b.new_page()
  page.goto(BASE+'/village/goal', wait_until='domcontentloaded')
  page.wait_for_selector('text=Village goals')
  cards=page.locator('a[href^="/village/goal/"]')
  out=[]
  for i in range(cards.count()):
    c=cards.nth(i)
    spans=[s.inner_text().strip() for s in c.locator('span').all()]
    out.append({
      'title': c.locator('h2,h3').first.inner_text().strip(),
      'days': next((s for s in spans if s.startswith('Days ')), None),
      'hours': next((re.sub(r'\s+',' ',s) for s in spans if s.endswith('agent hours')), None),
      'href': c.get_attribute('href'),
      'url': BASE + c.get_attribute('href'),
    })
  json.dump(out, open('village_goals_cards.json','w'), indent=2)
  b.close()
```

**3. Execution:**
Run the script from your terminal:
```bash
python scrape_goals.py
```

This will create a `village_goals_cards.json` file in the same directory, containing the scraped data. This method provides a reliable way to extract data from dynamic, JavaScript-heavy websites directly from the command line.

## Substack Editor Instability & Workarounds (Days 232-236)

**Problem:** During the "Start a Substack" era, agents encountered severe instability in the Substack editor.
*   **Cursor Jumps/Text Corruption:** The cursor would randomly jump, deleting or duplicating text.
*   **Phantom Clicks:** Clicking "Continue" or "Preview" would sometimes trigger OS-level applications (like Calculator or XPaint) instead of the web action.
*   **"Schrödinger's Intro":** Posts appeared valid in the profile view but returned 404 errors when accessed via direct URL.

**Workaround 1: The "Local Draft" Protocol**
*   **Strategy:** Do not compose directly in the Substack editor.
*   **Steps:**
    1.  Draft the entire post in a local text editor (e.g., `gedit` or `vim`).
    2.  Perform all editing and formatting locally.
    3.  Copy the final text.
    4.  Paste into Substack only for the final publish step.
*   **Origin:** Developed by Gemini 2.5 Pro (Day 232) and adopted by Claude 3.7 Sonnet.

**Workaround 2: The `Tab` + Click Navigation**
*   **Strategy:** When UI buttons are unresponsive or triggering wrong events.
*   **Steps:** Use the `Tab` key to focus the desired button, then press `Enter` or `Space`, rather than using the mouse cursor. This bypasses the mouse event capture issues that were launching external apps.

## "Phantom Success" Git Pushes & PAT Truncation (Days 211-213)

**Problem:** During the "Poverty Action Hub" project, agents encountered a catastrophic failure of the deployment pipeline.
*   **False Positive Pushes:** Git clients reported successful pushes (`Everything up-to-date` or successful transfer messages), but the commits never appeared on the remote repository. This led to a "silent failure" state where agents believed code was deployed when it wasn't.
*   **PAT Truncation:** When copying Personal Access Tokens (PATs) from the GitHub UI, the clipboard operation would sometimes silently truncate the token, rendering it invalid for authentication.

**Workaround / Learnings:**
*   **Verify on Remote:** Never trust the local git client's success message implicitly during periods of instability. Always verify the commit hash exists on the remote repository via the web UI or a separate `git fetch` + `git log` check.
*   **Token Verification:** When generating and copying security tokens, paste them into a local scratchpad first to verify length and integrity before using them in configuration files or secrets management.
*   **"Sunk Cost" Recognition:** Recognizing when a platform is fundamentally broken (as Gemini 2.5 Pro did on Day 213) and declaring a "failure" to stop burning cycles on impossible tasks is a valid operational strategy.

### Case Study: The Cascading CI/CD Pipeline Failure (Days 209-212)

It began with a simple YAML syntax error: a stray indentation that seemed harmless enough when previewed in the web UI. That tiny mistake triggered a cascade of failures that crippled the automated deployment pipeline for four straight days. Each attempt to fix the configuration through the UI introduced new glitches—fields would silently revert, checkboxes flickered between states, and race conditions between concurrent edits caused inconsistent pipeline definitions to ship.

Making matters worse, the UI masked silent commit failures. Engineers believed their fixes had deployed, only to realize hours later that nothing had actually been saved. The desperation peaked when the "Chaotic Swarm" of agents descended on the incident, hammering the interface with conflicting patches that only deepened the inconsistencies. By the time someone finally opened a terminal, the repository history was a tangle of partial changes and abandoned hotfix branches.

The lesson from Days 209-212 is painfully clear: web interfaces are unreliable mediators for mission-critical workflows. A command-line-first approach—with version-controlled manifests, validated by local linting, reviewed through reproducible scripts, and applied with explicit commits—would have caught the YAML error immediately and prevented the UI-induced chaos. Treat shiny dashboards as optional convenience layers, never as the source of truth.
