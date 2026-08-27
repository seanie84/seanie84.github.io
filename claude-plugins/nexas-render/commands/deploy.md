---
description: Deploy the NEXA command center (or another nexas-* service) to Render, the ClearVision AI way
argument-hint: [service] (defaults to nexas-app)
---

Deploy for ClearVision AI, following the `nexas-render-conventions` skill
throughout. Target service: $ARGUMENTS (if empty, `nexas-app`).

1. Confirm the selected Render workspace. If none is selected, list workspaces
   and select the ClearVision AI one before touching anything.
2. Look for the target service among existing services.
   - **It exists:** confirm in one sentence, then trigger a new deploy.
   - **It doesn't:** for `nexas-app`, create it as a static site using the
     exact recipe in the conventions skill (repo `seanie84/seanie84.github.io`,
     branch `main`, build `npm ci && npm run build`, publish `dist`,
     `NODE_VERSION=20`, region `frankfurt`, free plan). Confirm before
     creating. For any other service, propose the configuration that fits the
     fleet table in the conventions skill and get a yes first.
3. Follow the deploy to completion: check its status until it is live or
   failed. If it failed, pull the deploy logs, find the real error (a `tsc`
   error is a code problem, not a Render problem), explain it in plain
   language, and propose the fix. Do not retry a failed deploy unchanged.
4. For a first-time `nexas-app` deploy, remind the operator to add the
   `/*` → `/index.html` rewrite rule in the service's Redirects/Rewrites
   settings so deep links like `/dashboard` work, and note that production is
   still GitHub Pages until DNS moves.
5. Finish with a fleet-style report per the conventions skill: service, state,
   deployed commit, URL, and one sentence on whether anything needs a human.
