import { useState } from 'react';
import { Link } from 'react-router-dom';
import { askNexa } from '../lib/brain';
import { hasEngine } from '../lib/engine';
import { logAudit } from '../lib/audit';

export function RichDesk({
  kicker, title, lead, prompt, tools,
}: {
  kicker: string;
  title: string;
  lead: string;
  prompt: string;
  tools: string[];
}) {
  const [brief, setBrief] = useState('');
  const [reply, setReply] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function run() {
    if (busy) return;
    setBusy(true);
    setErr('');
    try {
      const text = await askNexa(`${prompt}\n\nBrief: ${brief.trim() || 'none'}\nDraft only. Do not send, submit, or invent certificate numbers.`);
      setReply(text);
      logAudit('desk', title);
    } catch (e) {
      setErr((e instanceof Error ? e.message : String(e)).replace(/gemini|qwen/gi, 'desk'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--cyan)', marginBottom: 6 }}>{kicker}</div>
      <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--ink)', lineHeight: 1.05 }}>{title}</h1>
      <p style={{ fontSize: 16, color: 'var(--ink-2)', margin: '10px 0 18px', maxWidth: 680, lineHeight: 1.5 }}>{lead}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {tools.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
      {!hasEngine() && (
        <p style={{ marginBottom: 14, fontSize: 14, color: 'var(--ink-2)' }}>
          Connect the desk in <Link to="/settings" style={{ color: 'var(--cyan)' }}>Settings</Link> first.
        </p>
      )}
      <div className="glass" style={{ padding: 20, maxWidth: 760 }}>
        <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={5} placeholder="Tell the desk what you need…" style={{
          width: '100%', padding: 14, borderRadius: 14, border: '1px solid var(--line)', marginBottom: 12,
          color: 'var(--ink)', background: '#fffdf8', fontSize: 15, lineHeight: 1.5,
        }} />
        <button type="button" onClick={() => void run()} disabled={busy} style={{
          padding: '12px 18px', borderRadius: 12, border: 'none',
          background: 'linear-gradient(180deg, #be123c, #9f1239)', color: '#fff',
          fontWeight: 700, minHeight: 46, cursor: 'pointer',
        }}>{busy ? 'Drafting…' : 'Draft with NEXA'}</button>
      </div>
      {err && <p role="alert" style={{ color: 'var(--danger)', marginTop: 12 }}>{err}</p>}
      {reply && <pre className="glass" style={{ marginTop: 16, padding: 20, whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--ink)', maxWidth: 760, lineHeight: 1.55 }}>{reply}</pre>}
    </div>
  );
}
