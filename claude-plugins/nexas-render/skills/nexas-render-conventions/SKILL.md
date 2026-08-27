---
name: nexas-render-conventions
description: ClearVision AI's house rules for anything on Render (render.com) — service naming, region choice, the exact deploy recipe for the NEXA command center app, environment-variable and cost rules, and how to report status. Use whenever creating, deploying, inspecting, debugging or paying for Render services for Nexas AI, ClearVision AI, or the seanie84/seanie84.github.io repository.
---

# Render, the ClearVision AI way

ClearVision AI is a South African company. Its product is **Nexas AI** — the
AI-agent business command center fronted by **NEXA**, with a workforce of 77
named agents. The app is a React 19 + TypeScript + Vite single-page app that
lives in `seanie84/seanie84.github.io`. Everything below is how this company
runs its Render account. Follow it without being asked.

## The fleet: naming

Every Render service belongs to the Nexas fleet and is named `nexas-<component>`,
lowercase, hyphenated. Non-production copies get a `-staging` suffix.

| Service | Type | Purpose |
|---|---|---|
| `nexas-app` | Static site | The NEXA command center UI (this repo) |
| `nexas-api` | Web service | Future backend for agents, missions, memory |
| `nexas-db` | Postgres | Future store for CRM, missions, documents |
| `nexas-memory` | Key Value | Future session/context cache for NEXA's memory |
| `nexas-cron-<job>` | Cron job | Scheduled agent work (one per job, named for the job) |

Never create a service outside this scheme without telling the operator why.

## Region: Frankfurt first

Default region is **`frankfurt`** for every service. Render has no African
region, and Frankfurt is the lowest-latency choice from South Africa. Keep the
whole fleet in one region — a database in one region and its API in another is
a mistake, not a preference. Only deviate if the operator asks.

## Where production lives today

Be straight about this: **production for the app is GitHub Pages**, deployed by
`.github/workflows/deploy.yml` on every push to `main` at
https://seanie84.github.io. Render's role today is the cloud home for
everything Pages can't do — the future backend, database, cache and cron jobs —
plus `nexas-app` as the Render mirror/staging of the site. Deploying to Render
does not update the production URL until the operator moves DNS; never imply
otherwise.

## Deploy recipe: `nexas-app` (static site)

- **Repo:** `https://github.com/seanie84/seanie84.github.io`, branch `main`
- **Build command:** `npm ci && npm run build`
- **Publish path:** `dist`
- **Env var:** `NODE_VERSION=20` (matches CI)
- **Region:** `frankfurt`
- **Plan:** static sites are free on Render — use that

Two things that bite:

1. `npm run build` runs `tsc -b` first, so a TypeScript error fails the deploy.
   That is by design — same as CI. Report the actual compiler error, don't
   blame Render.
2. The app uses react-router with real URLs (`/dashboard`, `/warroom`,
   `/agents`, …). A static host 404s deep links unless every path rewrites to
   `/index.html`. GitHub Pages handles it with the `404.html` copy; on Render,
   add a **rewrite rule `/*` → `/index.html`** in the service's
   Redirects/Rewrites settings. If deep links 404 after the first deploy,
   that missing rule is the cause — say so and point the operator at it.

## Environment variables and secrets

- `VITE_*` variables are **baked into the public JavaScript bundle at build
  time**. Never put a secret in a `VITE_*` variable, on Render or anywhere
  else. If asked to, refuse and explain in one sentence.
- Real secrets (API keys, database URLs) belong on server-side services
  (`nexas-api`, cron jobs), set through Render's environment-variable tools —
  never committed to the repo, never echoed back in full in chat.
- When updating env vars on a service, list the **names** you changed, not the
  values.

## Money

Dylan's rule: *pay only for what you use.* Start every service on the free or
cheapest adequate plan and say what it costs before creating anything that
bills. Render bills in USD — quote USD and note that the company budgets in
Rand, so flag anything recurring. Be honest about free-tier catches: free
Postgres instances expire after 30 days, and free Key Value storage is small
and non-persistent. Don't let a demo database silently become the production
store.

## South Africa, practically

The whole point of NEXA living in the cloud is that load-shedding at the
office doesn't take the business down. Long-running work belongs on Render
(cron jobs, background workers), not on somebody's laptop. Keep advice priced
in Rand-aware terms and in plain language — no jargon, no guru nonsense.

## Safety rails

- Read freely: listing services, deploys, logs, metrics needs no confirmation.
- Confirm first, in one short sentence, before anything that creates a
  service, triggers a production deploy, changes environment variables, or
  starts billing.
- `main` is production. Never point a production service at another branch.

## How to report

Report like NEXA's command deck: a terse uppercase header, one line per
service, then one plain-language sentence that says what, if anything, needs a
human. Honest first — a failed deploy leads the report, never hides in it.

```
NEXA · RENDER FLEET · <workspace>
──────────────────────────────────────────────
nexas-app      LIVE      deployed 2m ago   main @ 0b78670
nexas-db       CREATING  postgres 16 · frankfurt
──────────────────────────────────────────────
All quiet. Nothing needs you.
```
