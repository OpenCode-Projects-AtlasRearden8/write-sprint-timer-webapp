# Writing Sprint Timer

A tiny, offline, distraction-free writing sprint timer for authors. Pick a sprint length, set a word goal, enter your base word count, and go. Gentle pace nudges keep you moving; your history and streak live in your browser's localStorage and never leave your device.

Made by [Asdale Dynamics, LLC](https://dylanasdale.github.io) — plain-English AI education and practical author tools, explained like a friend would.

## Features

- **Sprint lengths**: 5, 10, 15, 20, 25, or 30 minutes
- **Word goal + base count**: see exactly how many new words you've written
- **Gentle pace nudges**: "on pace", "a little behind", or "falling behind" — never harsh, ADHD-friendly wording
- **Streak tracking**: consecutive sprint days, plus words today and all-time sprint days
- **Session history**: every saved sprint with duration, words, WPM, and goal %
- **CSV export**: one click downloads your full progress log
- **Tired-brain-day tips**: built-in ideas for low-energy days

## How to run it

No install, no build, no server. Just:

1. Download `index.html`
2. Open it in any modern browser (`file://` works fine)

Everything runs locally. No network requests, no accounts, no tracking.

## How it works

While the timer runs, the app compares what you've written against what you *would* need to hit your goal by the buzzer, and shows a soft nudge. When the timer ends, it asks for your final document word count, saves the session to localStorage, and updates your streak.

Sprint day streaks are counted on UTC calendar dates from your saved sessions.

## Data & privacy

- Sessions are stored only in your browser's localStorage under the key `ws_timerv2_sessions`
- Exporting a CSV is a manual, local file download
- No secrets, no API keys, no personal data collected

## Tests

The pace math and streak logic are mirrored in a small Node test suite:

```bash
node tests/test.js
```

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Asdale Dynamics, LLC.
