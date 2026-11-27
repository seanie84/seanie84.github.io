import { useState } from 'react';
import { getRole, setRole, type Role } from '../lib/role';
import { loadAudit } from '../lib/audit';

const KEYS = ['nexas_crm', 'nexas_tender_watch', 'nexas_audit', 'nexas_role', 'nexas_engine'];

function dump() {
  const bag: Record<string, string | null> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('nexas_')) bag[k] = localStorage.getItem(k);
  }
  return JSON.stringify({ exportedAt: new Date().toISOString(), keys: bag }, null, 2);
}

export default function DataDesk() {
  const [role, setR] = useState<Role>(getRole);
  const [msg, setMsg] = useState('');
  const [raw, setRaw] = useState('');
  const audit = loadAudit().slice(0, 20);

  function exportFile() {
    const blob = new Blob([dump()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'nexas-export.json';
    a.click();
    setMsg('Exported.');
  }

  function importFile() {
    try {
      const data = JSON.parse(raw) as { keys?: Record<string, string | null> };
      const keys = data.keys || {};
      Object.entries(keys).forEach(([k, v]) => {
        if (k.startsWith('nexas_') && typeof v === 'string') localStorage.setItem(k, v);
      });
      setMsg('Imported. Reload the page.');
    } catch {
      setMsg('That file is not a NEXAS export.');
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)' }}>Data desk</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', margin: '8px 0 20px' }}>Export, import, role, and the audit log. Keys stay in this browser.</p>

      <section className="glass" style={{ padding: 18, maxWidth: 640, marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Role</h2>
        <p style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 10 }}>Viewer can look. Operator can draft. Nothing sends either way.</p>
        <select value={role} onChange={(e) => { const v = e.target.value as Role; setR(v); setRole(v); }} aria-label="Role" style={{
          padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)',
        }}>
          <option value="operator">Operator</option>
          <option value="viewer">Viewer</option>
        </select>
      </section>

      <section className="glass" style={{ padding: 18, maxWidth: 640, marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Export / import</h2>
        <button type="button" onClick={exportFile} style={btn}>Download export</button>
        <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={4} placeholder="Paste an export here" style={{
          width: '100%', marginTop: 12, padding: 10, borderRadius: 10, border: '1px solid var(--line)',
        }} />
        <button type="button" onClick={importFile} style={{ ...btn, marginTop: 8 }}>Import</button>
        {msg && <p style={{ marginTop: 8, color: 'var(--ink-2)' }}>{msg}</p>}
        <p style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-3)' }}>Known keys: {KEYS.join(', ')}</p>
      </section>

      <section className="glass" style={{ padding: 18, maxWidth: 640 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Audit log</h2>
        {audit.length === 0 && <p style={{ color: 'var(--ink-2)' }}>No events yet.</p>}
        {audit.map((e) => (
          <div key={e.at + e.action} style={{ padding: '8px 0', borderTop: '1px solid var(--line)', fontSize: 13 }}>
            <strong>{e.action}</strong> · {e.detail}
            <div style={{ color: 'var(--ink-3)' }}>{e.at}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

const btn = { padding: '10px 14px', borderRadius: 10, border: 'none', background: 'var(--cyan)', color: '#fff', fontWeight: 700, cursor: 'pointer', minHeight: 40 } as const;
