# Run NEXAS for free

Hosting the HUD is already free (GitHub Pages).
The brain is the only cost. Use one of the four engines in Settings.

Live HUD: https://seanie84.github.io

## 1. Hosting — already free

| Piece | Cost |
|---|---|
| GitHub repo + Pages | R0 |
| Custom domain later | optional |
| NEXORA Render box | not this app |

Open https://seanie84.github.io after a push to `main`.

## 2. Free cloud brain — Gemini (easiest)

1. https://aistudio.google.com/apikey — create a key (free quota).
2. NEXAS → Settings → Engine = Gemini → paste key → Save → Test.
3. Use `gemini-2.5-flash` first. It has the largest free quota.

No card required for the starter quota. When the quota is gone for the day, switch engine.

## 3. Free cloud brain — Groq (fast, no GPU at home)

1. https://console.groq.com — free account, create an API key.
2. Settings → Engine = Groq → paste `gsk_...`.
3. Model: `llama-3.3-70b-versatile` (or whatever Groq lists as free that week).

Good when Gemini quota is empty and you do not want to install anything.

## 4. Free local brain — Ollama (no API bill ever)

Needs a PC. Works best if you also run the HUD locally (avoids GitHub Pages → localhost CORS).

```bash
# install from https://ollama.com
ollama pull qwen3:8b
ollama serve
```

Windows (PowerShell as user):

```powershell
[System.Environment]::SetEnvironmentVariable('OLLAMA_ORIGINS','https://seanie84.github.io,http://localhost:5173','User')
```

Restart Ollama. Then Settings → Engine = Ollama → URL `http://127.0.0.1:11434/v1` → model `qwen3:8b`.

If Pages still cannot reach localhost, run the HUD on the same PC:

```bash
git clone https://github.com/seanie84/seanie84.github.io.git
cd seanie84.github.io
npm install
npm run dev
```

Open the localhost URL Vite prints. Engine = Ollama. This path is 100% free and reliable.

16 GB+ RAM/VRAM: `ollama pull qwen3:14b`
Tight laptop: `ollama pull gemma3:4b` or `qwen3:4b`

## 5. Free local brain — LM Studio (no terminal)

1. Install https://lmstudio.ai (free).
2. Download Qwen3 8B Instruct GGUF.
3. Developer tab → Start server (port 1234).
4. Settings → Engine = LM Studio → `http://127.0.0.1:1234/v1`.

## What you need on the desk

Minimum, all free:

- Browser (Chrome or Edge)
- GitHub account (you already have seanie84)
- One of:
  - Google AI Studio key, or
  - Groq key, or
  - Ollama + a 4–8B model, or
  - LM Studio + a GGUF file

Optional for the most reliable local setup:

- Node.js 20 LTS (to run `npm run dev`)
- 8 GB RAM minimum, 16 GB comfortable

You do not need Render, Stripe, Anthropic, or a paid Gemini plan for NEXAS.

## Do not do

- Do not commit keys to git.
- Do not expose Ollama on the public internet.
- Do not point NEXAS at NEXORA's database.
- Do not use `OLLAMA_ORIGINS=*` on a PC that is reachable from the LAN.
