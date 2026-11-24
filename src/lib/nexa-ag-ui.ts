export const AG_UI_FLAG_KEY = "nexa.agui";
export const AG_UI_ENDPOINT_KEY = "nexa.agui.endpoint";
export const LOCAL_OLLAMA_URL_KEY = "nexa.localOllamaUrl";
export const LOCAL_OLLAMA_MODEL_KEY = "nexa.localOllamaModel";

export const DEFAULT_LOCAL_OLLAMA_URL = "http://127.0.0.1:11434/v1";
export const DEFAULT_LOCAL_OLLAMA_MODELS = ["llama3.2:3b", "qwen2.5:7b"] as const;

/** Build-time endpoint. Must stay empty by default so this site never talks to NEXORA. */
export const BUILD_AG_UI_ENDPOINT = (import.meta.env.VITE_AG_UI_ENDPOINT as string | undefined) ?? "";
export const BUILD_AG_UI_ENABLED = import.meta.env.VITE_AG_UI_ENABLED === "true";
export const BUILD_LOCAL_OLLAMA_URL = (import.meta.env.VITE_OLLAMA_BASE_URL as string | undefined) ?? "";

export function isAgUiEnabled(): boolean {
  if (typeof window === "undefined") return BUILD_AG_UI_ENABLED;
  try {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("agui");
    if (query === "1" || query === "on" || query === "true") return true;
    if (query === "0" || query === "off" || query === "false") return false;
    const stored = window.localStorage.getItem(AG_UI_FLAG_KEY);
    if (stored === "on" || stored === "1" || stored === "true") return true;
    if (stored === "off" || stored === "0" || stored === "false") return false;
  } catch {
    /* ignore */
  }
  return BUILD_AG_UI_ENABLED;
}

export function getAgUiEndpoint(): string {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(AG_UI_ENDPOINT_KEY);
      if (stored && stored.trim()) return stored.trim();
    } catch {
      /* ignore */
    }
  }
  return BUILD_AG_UI_ENDPOINT.trim();
}

export function getLocalOllamaConfig(): { baseUrl: string; models: string[] } {
  let baseUrl = BUILD_LOCAL_OLLAMA_URL.trim() || DEFAULT_LOCAL_OLLAMA_URL;
  let model: string = DEFAULT_LOCAL_OLLAMA_MODELS[0];
  if (typeof window !== "undefined") {
    try {
      const storedUrl = window.localStorage.getItem(LOCAL_OLLAMA_URL_KEY);
      const storedModel = window.localStorage.getItem(LOCAL_OLLAMA_MODEL_KEY);
      if (storedUrl && storedUrl.trim()) baseUrl = storedUrl.trim();
      if (storedModel && storedModel.trim()) model = storedModel.trim();
    } catch {
      /* ignore */
    }
  }
  return { baseUrl, models: [model, ...DEFAULT_LOCAL_OLLAMA_MODELS.filter((item) => item !== model)] };
}

export function parseAgUiSse(chunk: string): { type?: string; delta?: string; message?: string; outcome?: { type?: string; interrupts?: unknown[] } }[] {
  const events: ReturnType<typeof parseAgUiSse> = [];
  for (const line of chunk.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const raw = trimmed.slice(5).trim();
    if (!raw) continue;
    try {
      events.push(JSON.parse(raw));
    } catch {
      /* skip incomplete frames */
    }
  }
  return events;
}
