const BASE = 'https://nexas-server.netlify.app/.netlify/functions/api';

export async function serverHealth(): Promise<{ ok: boolean; name?: string }> {
  const res = await fetch(`${BASE}/health`);
  if (!res.ok) throw new Error('Server did not answer.');
  return res.json();
}

export function serverUrl() {
  return BASE;
}
