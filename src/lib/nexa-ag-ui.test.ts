import { describe, expect, it } from "vitest";
import {
  BUILD_AG_UI_ENDPOINT,
  DEFAULT_LOCAL_OLLAMA_MODELS,
  DEFAULT_LOCAL_OLLAMA_URL,
  getAgUiEndpoint,
  getLocalOllamaConfig,
  isAgUiEnabled,
  parseAgUiSse,
} from "./nexa-ag-ui";

describe("nexa ag-ui config", () => {
  it("keeps the endpoint empty by default and the flag off", () => {
    expect(BUILD_AG_UI_ENDPOINT).toBe("");
    expect(isAgUiEnabled()).toBe(false);
    expect(getAgUiEndpoint()).toBe("");
  });

  it("exposes local Ollama config values without connecting", () => {
    const cfg = getLocalOllamaConfig();
    expect(cfg.baseUrl).toBe(DEFAULT_LOCAL_OLLAMA_URL);
    expect(cfg.models).toEqual([...DEFAULT_LOCAL_OLLAMA_MODELS]);
  });

  it("parses AG-UI SSE data lines", () => {
    const events = parseAgUiSse('data: {"type":"TEXT_MESSAGE_CONTENT","delta":"Hello"}\n\ndata: not-json\n');
    expect(events).toEqual([{ type: "TEXT_MESSAGE_CONTENT", delta: "Hello" }]);
  });
});
