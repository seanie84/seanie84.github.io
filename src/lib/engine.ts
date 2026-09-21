import { geminiGenerate, getGeminiKey, type ChatTurn } from './gemini';

export type EngineId = 'gemini' | 'ollama' | 'lmstudio' | 'groq' | 'deepseek' | 'qwen';

const ENGINE = 'nexas_engine';
const LOCAL_URL = 'nexas_local_url';
const LOCAL_MODEL = 'nexas_local_model';
const GROQ_KEY = 'nexas_groq_key';
const DEEPSEEK_KEY = 'nexas_deepseek_key';
const DEEPSEEK_MODEL = 'nexas_deepseek_model';
const QWEN_KEY = 'nexas_qwen_key';
const QWEN_MODEL = 'nexas_qwen_model';
const FAILOVER = 'nexas_failover';

export const DEFAULT_DEEPSEEK_MODEL = 'deepseek-flash';
export const DEEPSEEK_MODELS = ['deepseek-flash', 'deepseek-v4-pro'] as const;
export const DEFAULT_QWEN_MODEL = 'qwen-flash';
export const QWEN_MODELS = ['qwen-flash', 'qwen-plus', 'qwen-max', 'qwen-turbo'] as const;
export const QWEN_BASE = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1';

export const ENGINE_SHORT: Record<EngineId, string> = {
  gemini: 'GEMINI',
  groq: 'GROQ',
  deepseek: 'DEEPSEEK',
  qwen: 'QWEN',
  ollama: 'OLLAMA',
  lmstudio: 'LM STUDIO',
};

export const ENGINE_LABEL: Record<EngineId, string> = {
  gemini: 'Gemini (Google AI Studio — free quota)',
  groq: 'Groq (cloud, free tier)',
  deepseek: 'DeepSeek Flash (thinking, high effort)',
  qwen: 'Qwen (DashScope international)',
  ollama: 'Ollama (local, free)',
  lmstudio: 'LM Studio (local, free)',
};

export type BrainRoute = { engine: EngineId; failover: boolean };

let lastRoute: BrainRoute | null = null;
export function getLastBrainRoute(): BrainRoute | null {
  return lastRoute;
}

export function getEngine(): EngineId {
  try {
    const v = localStorage.getItem(ENGINE);
    if (v === 'ollama' || v === 'lmstudio' || v === 'groq' || v === 'gemini' || v === 'deepseek' || v === 'qwen') return v;
  } catch { /* ignore */ }
  return 'gemini';
}

export function setEngine(id: EngineId) {
  localStorage.setItem(ENGINE, id);
}

export function getFailover(): boolean {
  try {
    const v = localStorage.getItem(FAILOVER);
    if (v === '0') return false;
  } catch { /* ignore */ }
  return true;
}

export function setFailover(on: boolean) {
  localStorage.setItem(FAILOVER, on ? '1' : '0');
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

export function getQwenKey(): string {
  try { return localStorage.getItem(QWEN_KEY)?.trim() || ''; } catch { return ''; }
}

export function setQwenKey(key: string) {
  localStorage.setItem(QWEN_KEY, key.trim());
}

export function clearQwenKey() {
  localStorage.removeItem(QWEN_KEY);
}

export function getQwenModel(): string {
  try { return localStorage.getItem(QWEN_MODEL) || DEFAULT_QWEN_MODEL; } catch { return DEFAULT_QWEN_MODEL; }
}

export function setQwenModel(model: string) {
  localStorage.setItem(QWEN_MODEL, model.trim() || DEFAULT_QWEN_MODEL);
}

export function engineReady(id: EngineId): boolean {
  if (id === 'gemini') return getGeminiKey().length > 20;
  if (id === 'groq') return getGroqKey().length > 10;
  if (id === 'deepseek') return getDeepseekKey().length > 10;
  if (id === 'qwen') return getQwenKey().length > 10;
  return true;
}

export function hasEngine(): boolean {
  if (engineReady(getEngine())) return true;
  if (!getFailover()) return false;
  return engineReady('gemini') || engineReady('qwen');
}

function failoverChain(primary: EngineId): EngineId[] {
  const chain: EngineId[] = [primary];
  if (!getFailover()) return chain;
  for (const id of ['gemini', 'qwen'] as const) {
    if (!chain.includes(id)) chain.push(id);
  }
  return chain;
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

async function callEngine(id: EngineId, opts: {
  system: string;
  history?: ChatTurn[];
  user: string;
}): Promise<string> {
  if (id === 'gemini') return geminiGenerate(opts);
  if (id === 'groq') {
    const key = getGroqKey();
    if (!key) throw new Error('No Groq key.');
    return openaiChat({
      base: 'https://api.groq.com/openai/v1',
      key,
      model: getLocalModel() || 'llama-3.3-70b-versatile',
      system: opts.system,
      history: opts.history,
      user: opts.user,
    });
  }
  if (id === 'deepseek') {
    const key = getDeepseekKey();
    if (!key) throw new Error('No DeepSeek key.');
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
  if (id === 'qwen') {
    const key = getQwenKey();
    if (!key) throw new Error('No Qwen / DashScope key.');
    return openaiChat({
      base: QWEN_BASE,
      key,
      model: getQwenModel() || DEFAULT_QWEN_MODEL,
      system: opts.system,
      history: opts.history,
      user: opts.user,
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

export async function runBrain(opts: {
  system: string;
  history?: ChatTurn[];
  user: string;
}): Promise<string> {
  const primary = getEngine();
  const errors: string[] = [];
  for (const id of failoverChain(primary)) {
    if (!engineReady(id)) {
      errors.push(`${id}: no key`);
      continue;
    }
    try {
      const text = await callEngine(id, opts);
      lastRoute = { engine: id, failover: id !== primary };
      return text;
    } catch (e) {
      errors.push(`${id}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  lastRoute = null;
  throw new Error('All engines failed. ' + errors.join(' · '));
}

export async function pingEngine(): Promise<string> {
  const text = await runBrain({
    system: 'You are the NEXAS AI engine. Reply in one short sentence.',
    user: 'Confirm you are online and name yourself.',
  });
  const route = getLastBrainRoute();
  if (!route) return text;
  const via = route.failover ? `${route.engine} failover` : route.engine;
  return `[${via}] ${text}`;
}
