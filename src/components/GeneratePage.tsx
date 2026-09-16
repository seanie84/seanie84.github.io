import { useState } from 'react';
import { Link } from 'react-router-dom';
import { runBrain } from '../lib/engine';
import { hasEngine } from '../lib/engine';

export default function GeneratePage(props: {
  title: string;
  kicker: string;
  system: string;
  placeholder: string;
}) {
  const [input, setInput] = useState('');
  const [out, setOut] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function run() {
    if (!input.trim() || busy) return;
    setBusy(true);
    setErr('');
    try {
      setOut(await runBrain({ system: props.system, user: input.trim() }));
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>{props.title}</h1>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 24 }}>{props.kicker}</p>
      {!hasEngine() && (
        <p style={{ marginBottom: 16, fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)' }}>
          Pick a free engine in <Link to="/settings" style={{ color: 'var(--cyan)' }}>Settings</Link>.
        </p>
      )}
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={props.placeholder} rows={5} style={{
        width: '100%', maxWidth: 720, padding: 12, marginBottom: 12,
        background: 'var(--glass)', border: '1px solid var(--line)', borderRadius: 8,
        color: 'var(--ink)', fontFamily: 'Inter', fontSize: 14,
      }} />
      <div>
        <button type="button" onClick={() => void run()} disabled={busy} style={{
          padding: '10px 16px', borderRadius: 8, border: 'none',
          background: 'var(--cyan)', color: 'var(--bg)', fontWeight: 700, cursor: 'pointer',
        }}>{busy ? 'Working…' : 'Generate'}</button>
      </div>
      {err && <p style={{ color: '#fca5a5', marginTop: 12 }}>{err}</p>}
      {out && <pre className="glass" style={{ marginTop: 20, padding: 20, whiteSpace: 'pre-wrap', fontFamily: 'Inter', fontSize: 14, color: 'var(--ink)', maxWidth: 720 }}>{out}</pre>}
    </div>
  );
}
