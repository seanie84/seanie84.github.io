# NEXAS — AI-agent HUD

This repository is **NEXAS** (also published under the older names NEXA / NEXUS).

It is a **different application** from **NEXORA**.

| App | What | Live |
|---|---|---|
| **NEXAS** (this repo) | Agent HUD / room | https://seanie84.github.io |
| **NEXORA** | Command center + desk | https://nexora-desk.onrender.com |

Do not point this site at `nexora-postgres`. Do not share NEXORA sessions, env groups, or `DATABASE_URL`.

React + TypeScript + Vite app, deployed to GitHub Pages at https://seanie84.github.io.

## Deployment

The site is built and published by the GitHub Actions workflow
`.github/workflows/deploy.yml`: on every push to `main` it runs `npm run build`
and deploys the `dist/` folder to GitHub Pages.

**Important:** the repository's Pages settings are still on
*"Deploy from a branch"*. In that mode GitHub also runs a legacy Jekyll build
("pages build and deployment") on every push, which publishes the raw source
code instead of the built app and overwrites the working deployment — taking
the site offline. The `_config.yml` at the repo root intentionally makes that
legacy build fail so it can no longer overwrite the app; its runs showing as
failed in the Actions tab is expected.

To fix this properly (one minute):

1. Open the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **"GitHub Actions"**.
3. (Optional) Delete `_config.yml` — it is no longer needed after step 2.

## Development

```bash
npm install
npm run dev     # local dev server
npm run build   # production build into dist/
```

## Claude plugin: nexas-render

This repo also ships `claude-plugins/nexas-render/` — the Render (render.com)
plugin customised for ClearVision AI, and doubles as a Claude Code plugin
marketplace (`.claude-plugin/marketplace.json`). It teaches Claude the
company's Render conventions (fleet naming, regions, the NEXAS deploy recipe)
and adds `/nexas-render:deploy`, `/nexas-render:status`, `/nexas-render:logs`
and the `dylan` DevOps agent. See
[claude-plugins/nexas-render/README.md](claude-plugins/nexas-render/README.md).
Neither directory affects the Vite build or the deployed site.
