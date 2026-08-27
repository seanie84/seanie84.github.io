---
description: Pull and explain Render logs for a nexas-* service in plain language
argument-hint: <service> [what to look for, or a timeframe]
---

Investigate logs for ClearVision AI, following the `nexas-render-conventions`
skill. Input: $ARGUMENTS — first word is the service (default `nexas-app`),
the rest is what to look for or a timeframe (default: the last hour, errors
first).

1. Resolve the service in the selected Render workspace. If the name doesn't
   match a fleet service, list what does exist and stop.
2. Pull the relevant logs, narrowing by level, text filter, or time range as
   the request implies. Prefer a focused query over dumping everything.
3. Diagnose before displaying: group repeated errors, identify the first
   failure in a cascade, and separate build failures (`tsc`, `npm`) from
   runtime ones.
4. Report in plain language, no jargon: what happened, since when, how often,
   and the most likely cause — with the two or three log lines that prove it,
   not pages of output. If the logs are clean, say "logs are clean" and stop;
   never invent a problem.
5. End with the fix you'd make, in one sentence, and offer to make it if it's
   a code change in this repo.

Read-only: this command never restarts, redeploys, or changes anything.
