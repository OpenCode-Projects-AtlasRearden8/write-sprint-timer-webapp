// MIT License — Copyright (c) 2026 Asdale Dynamics, LLC
// Tests the pure logic mirrored from index.html (see "Pure logic" section).
// Run: node tests/test.js
"use strict";
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = html.indexOf("function fmtClock");
const end = html.indexOf("// ==== End pure logic ====");
if (start === -1 || end === -1) {
  console.error("Could not locate pure-logic section in index.html");
  process.exit(1);
}
const log = { info: () => {}, error: console.error, warn: () => {} };
(0, eval)(html.slice(start, end));

let passed = 0, failed = 0;
function eq(name, actual, expected) {
  const ok = actual === expected;
  if (ok) passed++; else { failed++; console.error(`FAIL ${name}: got ${JSON.stringify(actual)}, want ${JSON.stringify(expected)}`); }
}
function throws(name, fn) {
  try { fn(); failed++; console.error(`FAIL ${name}: expected throw`); }
  catch (e) { passed++; }
}

// fmtClock
eq("fmt 0", fmtClock(0), "00:00");
eq("fmt 59", fmtClock(59), "00:59");
eq("fmt 60", fmtClock(60), "01:00");
eq("fmt 300", fmtClock(300), "05:00");
eq("fmt negative clamps", fmtClock(-5), "00:00");
eq("fmt 900", fmtClock(900), "15:00");
eq("fmt 3600", fmtClock(3600), "60:00");
eq("fmtClock NaN -> no crash; falls back", fmtClock(NaN), "00:00");

// expectedWords
eq("expected at start", expectedWords(250, 0, 300), 0);
eq("expected halfway", expectedWords(250, 150, 300), 125);
eq("expected at end", expectedWords(250, 300, 300), 250);
eq("expected past end clamps", expectedWords(250, 400, 300), 250);
eq("expected zero total", expectedWords(250, 10, 0), 250);
eq("expected rounding", expectedWords(100, 100, 300), 33);

// paceLevel
eq("level ahead", paceLevel(200, 125, 150), "good");
eq("level exactly on", paceLevel(125, 125, 150), "good");
eq("level slightly behind", paceLevel(115, 125, 150), "warn");
eq("level far behind", paceLevel(90, 125, 150), "bad");
// expected 100 written at 25% short of expected
eq("level boundary warn", paceLevel(75, 100, 150), "warn");
eq("level boundary bad", paceLevel(74, 100, 150), "bad");
eq("level elapsed 0 -> blank", paceLevel(100, 100, 0), "");
eq("level NaN elapsed -> blank", paceLevel(100, 100, NaN), "");
throws("paceLevel negative", () => paceLevel(-1, 10, 100));

// pacePercent
eq("percent zero", pacePercent(0, 250), 0);
eq("percent met", pacePercent(250, 250), 100);
eq("percent beyond clamps", pacePercent(90000, 250), 999);
eq("percent zero goal treated as met", pacePercent(0, 0), 100);
eq("percent rounding", pacePercent(1, 3), 33);

// nudgeMessage
eq("nudge good", nudgeMessage("good", 200, 125), "On pace — keep going.");
eq("nudge warn", nudgeMessage("warn", 115, 125).indexOf("behind") !== -1, true);
eq("nudge bad", nudgeMessage("bad", 90, 125).indexOf("behind") !== -1, true);
eq("nudge blank", nudgeMessage("", 0, 0), "");
eq("nudge kind tone", nudgeMessage("bad", 10, 200).indexOf("No shame") !== -1, true);

// computeStreak
eq("streak empty", computeStreak([]), 0);
eq("streak single", computeStreak(["2026-10-25"]), 1);
eq("streak two consecutive", computeStreak(["2026-10-24", "2026-10-25"]), 2);
eq("streak gap breaks", computeStreak(["2026-10-20", "2026-10-25"]), 1);
eq("streak five days", computeStreak(["2026-10-21", "2026-10-22", "2026-10-23", "2026-10-24", "2026-10-25"]), 5);
eq("streak unsorted input", computeStreak(["2026-10-25", "2026-10-23", "2026-10-24"]), 3);
eq("streak dupes collapse", computeStreak(["2026-10-25", "2026-10-25", "2026-10-24"]), 2);
eq("streak month rollover", computeStreak(["2026-09-30", "2026-10-01"]), 2);
eq("streak DST-safe (fixed UTC)", computeStreak(["2026-11-29", "2026-11-30", "2026-12-01"]), 3);
eq("streak rejects bad keys", computeStreak(["not-a-date", "2026-10-25"]), 1);
eq("streak rejects timestamps", computeStreak([1759000000000, "2026-10-25"]), 1);
eq("streak nonexistent date", computeStreak(["2026-02-30"]), 0);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
