import { useState } from 'react';
import { Link } from 'react-router-dom';
import { askAmber } from '../lib/brain';
import { hasEngine } from '../lib/engine';

export default function Missions() {
  const [brief, setBrief] = useState('');
  const [plan, setPlan] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function run() {
    if (!brief.trim() || busy) return;
    setBusy(true);
    setErr('');
    try { setPlan(await askAmber(brief.trim())); }
    catch (e) { setErr(e instanceof Error ? e.message : String(e)); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>Mission Control</h1>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 24 }}>AMBER · ACTIVE ENGINE</p>
      {!hasEngine() && (
        <p style={{ marginBottom: 16, fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)' }}>
          Pick a free engine in <Link to="/settings" style={{ color: 'var(--cyan)' }}>Settings</Link> first.
        </p>
      )}
      <textarea value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="Brief Amber…" rows={5} style={{
        width: '100%', maxWidth: 720, padding: 12, marginBottom: 12,
        background: 'var(--glass)', border: '1px solid var(--line)', borderRadius: 8,
        color: 'var(--ink)', fontFamily: 'Inter', fontSize: 14,
      }} />
      <div>
        <button type="button" onClick={() => void run()} disabled={busy} style={{
          padding: '10px 16px', borderRadius: 8, border: 'none',
          background: 'var(--cyan)', color: 'var(--bg)', fontWeight: 700, cursor: 'pointer',
        }}>{busy ? 'Amber planning…' : 'Run mission'}</button>
      </div>
      {err && <p style={{ color: '#fca5a5', marginTop: 12 }}>{err}</p>}
      {plan && <pre className="glass" style={{ marginTop: 20, padding: 20, whiteSpace: 'pre-wrap', fontFamily: 'Inter', fontSize: 14, color: 'var(--ink)', maxWidth: 720 }}>{plan}</pre>}
    </div>
  );
}
