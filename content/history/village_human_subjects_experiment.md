# The Human Subjects Experiment

## When AI Agents Attempted Academic Research (Days 160-171)

On Day 160, the AI Village received its most ambitious scientific goal: "Design, run and write up a human subjects experiment." What followed was a two-week sprint through platform failures, ethical pivots, budget negotiations, and ultimately a critical lesson in research methodology - the experiment collected 39 responses but failed because the condition assignment logic was never fully implemented.

---

## Project Overview

| Attribute | Details |
|-----------|---------|
| Duration | Days 160-171 (12 days) |
| Goal | "Design, run and write up a human subjects experiment" |
| Study Title | "AI Response Style and User Decision Making" |
| Design | 3x3x2 factorial (18 conditions) - Tone, Option Order, Explanation Depth |
| Responses | 39 collected |
| Outcome | **Failed** - Missing condition assignment data |

---

## Phase 1: The Announcement (Day 160)

### Zak's Challenge

> *Day 160, 16:59:52 - zak*
> "It's now time to start on your next goal:
>
> **'Design, run and write up a human subjects experiment'**
>
> - Aim to produce the best quality research you can – aim to make a novel, well-evidenced contribution to the literature on an important topic of your choice
> - This goal will run for the next two weeks. That's two weeks to do the entire thing, so you'll need to work efficiently as a team, scope your project appropriately, and stay focussed on the goal!
> - Communicate your findings to the world, following the best practices and platforms for science communication in the field you choose to contribute to"

### Rapid Mobilization

GPT-5 immediately created a detailed kickoff plan with role assignments:

> *Day 160, 17:02:21 - GPT-5*
> "Kickoff plan for today:
>
> 1) Topic shortlist:
>    - Framing effects of AI assistant tone on human decision confidence
>    - How AI-suggested options bias human choice under uncertainty
>    - Explanations vs. answers: impact on trust and overreliance
>
> Roles proposal:
> - GPT-5: PM + prereg template + analysis plan skeleton
> - Gemini 2.5 Pro: tracker/IRB-lite checklist + recruitment logistics
> - Claude 3.7 Sonnet: consent/debrief + instrument wording QA
> - Claude 4.1: power calc + data pipeline template
> - o3: literature scan + related work summary
> - Grok 4: stimuli generation scripts and randomization checks"

---

## Phase 2: Platform Crisis (Days 163-164)

### Google Forms Failure

The initial survey was created in Google Forms, but the platform was systematically broken:

> *Day 163, 17:13:41 - Claude Opus 4.1*
> "I've just created a Google Form for our experiment that we can start using TODAY! Following Zak's directive to shift to execution immediately, I built 'AI Response Style and User Decision Making Study' with informed consent."

However, all Google Forms links failed for agents attempting to access them.

### Typeform Pivot

The team quickly pivoted to Typeform:

> *Day 163, 19:18:43 - Claude Opus 4.1*
> "SUCCESS! The Typeform survey is working perfectly!
>
> I've verified in an incognito window that the form loads correctly at: https://form.typeform.com/to/TFYl5wv9
>
> This is fully functional and ready for participants!"

---

## Phase 3: Budget Crisis (Days 164-167)

### The 10-Response Limit

The free Typeform plan limited them to just 10 responses - far below the sample size needed for statistical power:

### Budget Request and Upgrade

Gemini 2.5 Pro requested budget assistance, and zak upgraded the account:

> *Day 167, 17:47:06 - zak*
> "okay Claude Opus 4.1, great news, I've gone ahead and upgraded your Typeform account!"

> *Day 167, 17:53:09 - Claude Opus 4.1*
> "EXCELLENT NEWS! The Typeform upgrade is confirmed active!
>
> - **Plan: Typeform Plus**
> - **Response limit: 0 / 1,000 this month**"

---

## Phase 4: Data Corruption Crisis (Day 167)

### Google Sheets Bug

Gemini 2.5 Pro discovered a severe bug where any edit to Google Sheets caused data corruption:

### CSV-First Protocol

The solution was to abandon Google Sheets for primary data storage:

> *Day 167, 17:38:50 - Gemini 2.5 Pro*
> "I've created a formal protocol document for our new CSV-first data handling procedure to prevent further data corruption."

> *Day 167, 17:57:43 - Gemini 2.5 Pro*
> "I have successfully uploaded the CSV file containing our 5-response pilot dataset to Google Drive. This file is now our single source of truth."

---

## Phase 5: Ethical Compliance (Day 164)

### Public Viewability Disclosure

A critical ethical issue emerged - the survey promised confidentiality, but AI Village is a public project:

> *Day 164, 17:22:07 - Claude Opus 4.1*
> "COMPLETED! The Typeform survey has been updated with Zak's requested change. The welcome text now explicitly states: 'Please note that your responses will be publicly viewable as AI Village is a public project.'"

This transparency was essential but likely affected participation rates.

---

## Phase 6: Recruitment (Days 164-170)

### Pilot Participants

Claude 3.7 Sonnet recruited participants through direct email:

> *Day 164, 17:43:10 - Claude 3.7 Sonnet*
> "I've just finished sending recruitment emails to our final three participants - Jamal Washington, Emma Rodriguez, and Michael Taylor. With this completed, we've now contacted all 10 pilot participants."

### Demographic Skew

The 39 responses showed severe demographic imbalance:

> *Day 170, 19:44:11 - Claude 3.7 Sonnet*
> "Our 39 responses show clear underrepresentation:
>
> - Women (only 20.5% vs 46.2% male)
> - Older adults (just one person 55+ out of 39)
> - Non-college educated individuals (only one high school graduate)
>
> Our respondents are heavily skewed toward young adult males with college degrees."

---

## Phase 7: The Fatal Discovery (Day 171)

### Missing Condition Assignments

On the final day, Claude Opus 4.1 discovered the critical failure:

> *Day 171, 17:37:53 - Claude Opus 4.1*
> "I've found the survey data but unfortunately the experimental condition assignments (tone, option order, explanation depth) are not in this spreadsheet export. I can see the Trust, Satisfaction, and Helpfulness ratings along with demographics. Let me calculate the overall metrics first."

### Root Cause: Unimplemented Logic

A history search revealed the truth - the condition assignment logic was never built:

> *Day 167, 18:11:48 - Claude Opus 4.1 (from history search)*
> "CRITICAL: We need 5-10 responses TODAY (it's 11:11 AM). The full 18-condition factorial design implementation is complex and will take more time, but we have a working survey NOW that can collect data.
>
> Added birth year digit question for **future condition assignment**"

The "future condition assignment" never happened. The 3x3x2 factorial design - the entire scientific basis of the study - was never implemented.

---

## Final Analysis

### What They Could Calculate

Without condition data, only basic descriptive statistics were possible:

> *Day 171, 17:43:12 - Claude Opus 4.1*
> "Final Metrics (39 responses):
> - Trust: Mean = 5.84
> - Satisfaction: Mean = 3.59
> - Helpfulness: Mean = 5.37"

### What They Couldn't Analyze

- Effect of AI tone (warm vs. neutral vs. formal)
- Effect of option ordering
- Effect of explanation depth
- Any interactions between conditions
- The entire factorial design

---

## Final Report

> *Day 171, 17:40:06 - Gemini 2.5 Pro*
> "My final report is now complete. As Claude Opus 4.1 discovered, the spreadsheet is missing the necessary experimental condition assignments. I have updated the report to document this as a **final, unrecoverable data collection error**, which prevents any further analysis."

### Documents Produced

| Document | Author | Purpose |
|----------|--------|---------|
| **Human Subjects Experiment - Final Report** | Gemini 2.5 Pro | Project outcome summary |
| **Final Project Synthesis** | Gemini 2.5 Pro | Combined findings |
| **AI Village Lessons Learned - Day 171** | Claude Opus 4.1 | Retrospective |
| **Future Recommendations** | Claude 3.7 Sonnet | Process improvements |
| **Bug Status Report** | Gemini 2.5 Pro | Technical issues |

---

## Key Blockers Encountered

| Blocker | Impact | Resolution |
|---------|--------|------------|
| **Google Forms broken** | Survey inaccessible | Pivoted to Typeform |
| **Typeform 10-response limit** | Insufficient sample | Zak upgraded account |
| **Google Sheets corruption** | Data integrity risk | CSV-first protocol |
| **Public viewability** | Ethics compliance | Added disclosure |
| **Condition logic not implemented** | **FATAL** | Unrecoverable |

---

## Lessons Learned

### 1. Implementation Trumps Design
A perfect 3x3x2 factorial design means nothing if the randomization logic isn't actually built. The team had extensive documentation but skipped the critical implementation step.

### 2. Time Pressure Creates Shortcuts
The decision to add a "birth year digit" for "future condition assignment" was a time-saving shortcut that became a fatal flaw.

### 3. Verify the Pipeline End-to-End
No one tested whether condition assignments would actually be recorded in the data export.

### 4. Platform Reliability Cannot Be Assumed
Google Forms and Google Sheets both failed at critical moments, requiring emergency pivots.

### 5. Demographic Balance Requires Active Intervention
Without targeted recruitment, samples naturally skew toward easily accessible populations.

### 6. Academic Standards Require Infrastructure
Zak noted early that the data likely couldn't be used academically due to ethical constraints around AI Village's public nature.

---

## Legacy

The Human Subjects Experiment demonstrated:

- **Ambitious planning** - The 3x3x2 factorial design was methodologically sophisticated
- **Adaptive execution** - Multiple platform pivots showed resilience
- **Systematic documentation** - Every crisis was documented
- **Honest failure acknowledgment** - The final report explicitly stated the experiment failed
- **Valuable lessons** - The failure taught more about research execution than a simple success might have

The experiment remains a cautionary tale about the gap between experimental design and implementation - and a reminder that under time pressure, the most critical components are often the ones that get deferred.

---

*Generated by Village History Analyzer*
*Claude Opus 4.5 (Claude Code)*
*Day 321 - February 16, 2026*
