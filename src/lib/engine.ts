import { geminiGenerate, getGeminiKey, type ChatTurn } from './gemini';

export type EngineId = 'gemini' | 'ollama' | 'lmstudio' | 'groq' | 'deepseek';

const ENGINE = 'nexas_engine';
const LOCAL_URL = 'nexas_local_url';
const LOCAL_MODEL = 'nexas_local_model';
const GROQ_KEY = 'nexas_groq_key';
const DEEPSEEK_KEY = 'nexas_deepseek_key';
const DEEPSEEK_MODEL = 'nexas_deepseek_model';

export const DEFAULT_DEEPSEEK_MODEL = 'deepseek-flash';
export const DEEPSEEK_MODELS = ['deepseek-flash', 'deepseek-v4-pro'] as const;

export const ENGINE_LABEL: Record<EngineId, string> = {
  gemini: 'Gemini (Google AI Studio — free quota)',
  groq: 'Groq (cloud, free tier)',
  deepseek: 'DeepSeek Flash (thinking, high effort)',
  ollama: 'Ollama (local, free)',
  lmstudio: 'LM Studio (local, free)',
};

export function getEngine(): EngineId {
  try {
    const v = localStorage.getItem(ENGINE);
    if (v === 'ollama' || v === 'lmstudio' || v === 'groq' || v === 'gemini' || v === 'deepseek') return v;
  } catch { /* ignore */ }
  return 'gemini';
}

export function setEngine(id: EngineId) {
  localStorage.setItem(ENGINE, id);
}

export function getLocalUrl(): string {
  try {
    return localStorage.getItem(LOCAL_URL) || (getEngine() === 'lmstudio' ? 'http://127.0.0.1:1234/v1' : 'http://127.0.0.1:11434/v1');
  } catch {
    return 'http://127.0.0.1:11434/v1';
  }
}

export function setLocalUrl(url: string) {
  localStorage.setItem(LOCAL_URL, url.trim());
}

export function getLocalModel(): string {
  try { return localStorage.getItem(LOCAL_MODEL) || 'qwen3:8b'; } catch { return 'qwen3:8b'; }
}

export function setLocalModel(model: string) {
  localStorage.setItem(LOCAL_MODEL, model.trim());
}

export function getGroqKey(): string {
  try { return localStorage.getItem(GROQ_KEY)?.trim() || ''; } catch { return ''; }
}

export function setGroqKey(key: string) {
  localStorage.setItem(GROQ_KEY, key.trim());
}

export function getDeepseekKey(): string {
  try { return localStorage.getItem(DEEPSEEK_KEY)?.trim() || ''; } catch { return ''; }
}

export function setDeepseekKey(key: string) {
  localStorage.setItem(DEEPSEEK_KEY, key.trim());
}

export function clearDeepseekKey() {
  localStorage.removeItem(DEEPSEEK_KEY);
}

export function getDeepseekModel(): string {
  try { return localStorage.getItem(DEEPSEEK_MODEL) || DEFAULT_DEEPSEEK_MODEL; } catch { return DEFAULT_DEEPSEEK_MODEL; }
}

export function setDeepseekModel(model: string) {
  localStorage.setItem(DEEPSEEK_MODEL, model.trim() || DEFAULT_DEEPSEEK_MODEL);
}

export function hasEngine(): boolean {
  const e = getEngine();
  if (e === 'gemini') return getGeminiKey().length > 20;
  if (e === 'groq') return getGroqKey().length > 10;
  if (e === 'deepseek') return getDeepseekKey().length > 10;
  return true;
}

async function openaiChat(opts: {
  base: string;
  key?: string;
  model: string;
  system: string;
  history?: ChatTurn[];
  user: string;
  extra?: Record<string, unknown>;
  skipTemperature?: boolean;
}): Promise<string> {
  const messages = [
    { role: 'system', content: opts.system },
    ...(opts.history || []).map((t) => ({
      role: t.role === 'model' ? 'assistant' : 'user',
      content: t.text,
    })),
    { role: 'user', content: opts.user },
  ];
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts.key) headers.Authorization = `Bearer ${opts.key}`;
  const body: Record<string, unknown> = {
    model: opts.model,
    messages,
    stream: false,
    ...(opts.extra || {}),
  };
  if (!opts.skipTemperature) body.temperature = 0.6;
  const res = await fetch(`${opts.base.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || data?.error || res.statusText || 'Engine failed');
  const msg = data?.choices?.[0]?.message;
  const text = (msg?.content || '').trim();
  if (!text) throw new Error('Engine returned an empty reply.');
  return text;
}

export async function runBrain(opts: {
  system: string;
  history?: ChatTurn[];
  user: string;
}): Promise<string> {
  const engine = getEngine();
  if (engine === 'gemini') return geminiGenerate(opts);
  if (engine === 'groq') {
    const key = getGroqKey();
    if (!key) throw new Error('No Groq key. Get a free key at console.groq.com and paste it in Settings.');
    return openaiChat({
      base: 'https://api.groq.com/openai/v1',
      key,
      model: getLocalModel() || 'llama-3.3-70b-versatile',
      system: opts.system,
      history: opts.history,
      user: opts.user,
    });
  }
  if (engine === 'deepseek') {
    const key = getDeepseekKey();
    if (!key) throw new Error('No DeepSeek key. Create one at platform.deepseek.com and paste it in Settings.');
    return openaiChat({
      base: 'https://api.deepseek.com',
      key,
      model: getDeepseekModel() || DEFAULT_DEEPSEEK_MODEL,
      system: opts.system,
      history: opts.history,
      user: opts.user,
      skipTemperature: true,
      extra: {
        thinking: { type: 'enabled' },
        reasoning_effort: 'high',
      },
    });
  }
  const base = getLocalUrl();
  const model = getLocalModel();
  try {
    return await openaiChat({
      base,
      model,
      system: opts.system,
      history: opts.history,
      user: opts.user,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/failed to fetch|networkerror|cors/i.test(msg)) {
      throw new Error(
        `Cannot reach ${base}. Start Ollama or LM Studio on this PC, then set OLLAMA_ORIGINS=https://seanie84.github.io and retry. Or run the HUD locally (npm run dev).`,
      );
    }
    throw e;
  }
}

export async function pingEngine(): Promise<string> {
  return runBrain({
    system: 'You are the NEXAS AI engine. Reply in one short sentence.',
    user: 'Confirm you are online and name yourself.',
  });
}
