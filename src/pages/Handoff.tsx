import { useState } from 'react';
import { Link } from 'react-router-dom';
import { askAmber } from '../lib/brain';
import { hasEngine } from '../lib/engine';
import { logAudit } from '../lib/audit';

export default function Handoff() {
  const [brief, setBrief] = useState('');
  const [out, setOut] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function run() {
    if (!brief.trim() || busy) return;
    setBusy(true);
    setErr('');
    try {
      const text = await askAmber(brief.trim());
      setOut(text);
      logAudit('handoff', brief.trim().slice(0, 80));
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)' }}>Agent handoff</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', margin: '8px 0 20px' }}>Amber routes the brief to the right specialist. Draft only.</p>
      {!hasEngine() && <p>Set an engine in <Link to="/settings" style={{ color: 'var(--cyan)' }}>Settings</Link>.</p>}
      <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={5} placeholder="What do you need done?" style={{
        width: '100%', maxWidth: 720, padding: 12, borderRadius: 12, border: '1px solid var(--line)', marginBottom: 12,
      }} />
      <button type="button" onClick={() => void run()} disabled={busy} style={{
        padding: '12px 16px', borderRadius: 12, border: 'none', background: 'var(--cyan)', color: '#fff', fontWeight: 700, minHeight: 44, cursor: 'pointer',
      }}>{busy ? 'Working…' : 'Route it'}</button>
      {err && <p role="alert" style={{ color: 'var(--danger)', marginTop: 12 }}>{err}</p>}
      {out && <pre className="glass" style={{ marginTop: 16, padding: 20, whiteSpace: 'pre-wrap', maxWidth: 720 }}>{out}</pre>}
    </div>
  );
}
