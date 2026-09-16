const KEY_STORE = 'nexas_gemini_key';
const MODEL_STORE = 'nexas_gemini_model';
export const DEFAULT_MODEL = 'gemini-2.5-flash';
export const MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-3.8-flash',
] as const;

export function getGeminiKey(): string {
  try { return localStorage.getItem(KEY_STORE)?.trim() || ''; } catch { return ''; }
}

export function setGeminiKey(key: string) {
  localStorage.setItem(KEY_STORE, key.trim());
}

export function clearGeminiKey() {
  localStorage.removeItem(KEY_STORE);
}

export function getGeminiModel(): string {
  try { return localStorage.getItem(MODEL_STORE) || DEFAULT_MODEL; } catch { return DEFAULT_MODEL; }
}

export function setGeminiModel(model: string) {
  localStorage.setItem(MODEL_STORE, model);
}

export function hasGeminiKey(): boolean {
  return getGeminiKey().length > 20;
}

export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

export async function geminiGenerate(opts: {
  system: string;
  history?: ChatTurn[];
  user: string;
  model?: string;
}): Promise<string> {
  const key = getGeminiKey();
  if (!key) throw new Error('No Gemini API key. Open Settings and paste a Google AI Studio key.');

  const model = opts.model || getGeminiModel();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

  const contents = [
    ...(opts.history || []).map((t) => ({
      role: t.role,
      parts: [{ text: t.text }],
    })),
    { role: 'user' as const, parts: [{ text: opts.user }] },
  ];

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: opts.system }] },
      contents,
      generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error?.message || res.statusText || 'Gemini request failed';
    throw new Error(msg);
  }
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text || '')
    .join('')
    .trim();
  if (!text) throw new Error('Gemini returned an empty reply.');
  return text;
}

export async function pingGemini(): Promise<string> {
  return geminiGenerate({
    system: 'You are the NEXAS AI engine. Reply in one short sentence.',
    user: 'Confirm you are online and name the model family you belong to.',
  });
}
