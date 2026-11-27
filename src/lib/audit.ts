const KEY = 'nexas_audit';

export type AuditEvent = { at: string; action: string; detail: string };

export function logAudit(action: string, detail: string) {
  try {
    const rows = loadAudit();
    rows.unshift({ at: new Date().toISOString(), action, detail: detail.slice(0, 240) });
    localStorage.setItem(KEY, JSON.stringify(rows.slice(0, 200)));
  } catch { /* ignore */ }
}

export function loadAudit(): AuditEvent[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as AuditEvent[] : [];
  } catch {
    return [];
  }
}
