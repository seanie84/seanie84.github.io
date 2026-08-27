# nexas-render

The Render (render.com) plugin, customised for **ClearVision AI** and the
**Nexas AI** command center. Instead of generic "deploy something somewhere"
behaviour, Claude gets the company's house rules baked in: the `nexas-*` fleet
naming, Frankfurt-first regions (lowest latency from South Africa), the exact
build recipe for the NEXA app, secrets and cost rules, and reporting in the
style of NEXA's command deck.

## What's inside

| Piece | What it does |
|---|---|
| **Skill** `nexas-render-conventions` | Auto-applied house rules: fleet naming, region, the `nexas-app` static-site recipe, env-var/secrets rules, cost honesty, safety rails, report format. |
| **Command** `/nexas-render:deploy` | Deploy `nexas-app` (or another fleet service) to Render using the company recipe — creates the service on first run, redeploys after. |
| **Command** `/nexas-render:status` | Read-only fleet report of every `nexas-*` service, failures first, NEXA-styled. |
| **Command** `/nexas-render:logs` | Pull logs for a fleet service and explain them in plain language, with the fix. |
| **Agent** `dylan` | Dylan, Cloud & DevOps of the 77-agent workforce — hand him any Render/infra task and he follows the conventions himself. |

## Requirements

This plugin deliberately does **not** bundle its own copy of the Render MCP
server — it layers company behaviour on top of the official Render tools, so
keep those connected:

- **claude.ai / Claude Cowork:** keep the official **render** plugin (or Render
  connector) enabled alongside this one.
- **Claude Code CLI:** connect Render's hosted MCP server once:
  `claude mcp add --transport http render https://mcp.render.com/mcp`

## Installing

From Claude Code, add this repo as a marketplace and install:

```
/plugin marketplace add seanie84/seanie84.github.io
/plugin install nexas-render@clearvision-ai
```

## Facts the plugin encodes

- Company: ClearVision AI (South Africa). Product: Nexas AI / NEXA, 77 agents.
- App: React 19 + TypeScript + Vite SPA in `seanie84/seanie84.github.io`;
  build is `npm ci && npm run build` into `dist/` on Node 20.
- Production today is **GitHub Pages** (deployed by
  `.github/workflows/deploy.yml` on push to `main`); Render is the platform
  for staging and for everything beyond static hosting (API, Postgres, Key
  Value, cron jobs).
- React-router deep links need a `/*` → `/index.html` rewrite on Render
  static sites (the Pages deploy solves this with a `404.html` copy).

If any of those facts change — new repo, backend goes live, DNS moves to
Render — update `skills/nexas-render-conventions/SKILL.md` and bump the
version in `.claude-plugin/plugin.json`.
