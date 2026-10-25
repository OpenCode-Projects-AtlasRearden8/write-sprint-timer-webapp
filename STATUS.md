# STATUS.md — Writing Sprint Timer

## What was built

A single-file, offline writing-sprint timer web app (`index.html`, pure HTML/JS/CSS, zero dependencies, works from `file://`):

- Sprint length picker (5–30 min), word goal, and base word count
- Live countdown with tabular-nums display
- Gentle pace nudges computed from expected words vs. actual words (good/warn/bad, worded kindly)
- "End & save" prompts for the final word count and logs the session
- Streak of consecutive sprint days (UTC calendar dates), words-today, and all-time sprint days, stored in localStorage
- Session history table (when, length, words, WPM, goal %) with CSV export and clear-history
- Built-in "tired-brain-day tips" section (low-energy, ADHD-friendly wording)
- Credit to Asdale Dynamics, LLC in the footer; MIT LICENSE included

## How to run

- App: open `index.html` in any modern browser (double-click; `file://` is fine). No build step, no server.
- Tests: `node tests/test.js`

## Verification results

- `node tests/test.js` → **45 passed, 0 failed**
  - fmtClock formatting (zero, rollover, clamping, NaN fallback)
  - expectedWords (start/halfway/end, past-end clamp, zero total, rounding)
  - paceLevel (ahead, on-pace, warn/bad boundaries, elapsed 0 and NaN)
  - pacePercent (zero, met, 999 cap, zero-goal, rounding)
  - nudgeMessage tone/content checks
  - computeStreak (empty, single, consecutive, gaps, unsorted, duplicates, month rollover, and invalid dates rejected)
- `index.html` verified as a single self-contained file; no external requests; runs from `file://`.

## Known gaps

- Words per minute is computed only from saved sprint duration; pause time is not deducted from the effective rate.
- Streaks use UTC calendar dates, so late-night sessions near local midnight may roll to the next UTC day.
- Session history is capped at the last 200 sessions in localStorage.
- No import of previously exported CSVs (export only).
- App logic is a single script inline in `index.html`; tests eval the mirrored pure-logic section, so edits to one must keep the "Pure logic" markers in sync.
