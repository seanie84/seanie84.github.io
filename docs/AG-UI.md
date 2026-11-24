# AG-UI widget and local Ollama config (Nexa site)

This is a marketing / HUD site. It has no new backend and does not share the NEXORA database.

## What this is

- Optional client widget at `/ag-ui`.
- Flag off by default (`?agui=1` or `localStorage nexa.agui=on`, or `VITE_AG_UI_ENABLED=true` at build time).
- Endpoint starts empty (`VITE_AG_UI_ENDPOINT` or Settings). Do not point it at NEXORA unless that is an explicit later decision.

## Local Ollama config values

Settings can store a local Ollama base URL and model. Defaults are `http://127.0.0.1:11434/v1` with `llama3.2:3b` then `qwen2.5:7b`. This PR does not open a tunnel or write secrets.

## Intended later setup (needs Sean's yes)

The planned production shape is a Cloudflare Tunnel on SEAN-LAPTOP that fronts local Ollama at `localhost:11434`, with an auth key. This PR does not create that tunnel, does not add Render environment variables, and does not store any secrets. That is a follow-up only after Sean agrees.
