# NEXA — AI-Agent Business Command Center

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

---

This project was scaffolded from the React + TypeScript + Vite template with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
