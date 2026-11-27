import { useState } from 'react';
import { Link } from 'react-router-dom';
import { askNexa } from '../lib/brain';
import { hasEngine } from '../lib/engine';

const TOPICS = [
  'CIPC registration and company setup',
  'SARS, VAT and provisional tax',
  'B-BBEE and tender readiness',
  'Cash flow and funding options',
  'Hiring under the BCEA and LRA',
  'First customers and local marketing',
];

export default function SME() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [brief, setBrief] = useState('');
  const [reply, setReply] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function run() {
    if (busy) return;
    setBusy(true);
    setErr('');
    try {
      const text = await askNexa(
        `You are advising a South African SME. Topic: ${topic}. Extra detail: ${brief.trim() || 'none'}. Give a practical, short plan with steps. Do not invent laws or prices. Flag when a professional is needed.`,
      );
      setReply(text);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 6 }}>SME Center</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 24 }}>Practical help for South African small business. Draft only — not legal or tax advice.</p>

      {!hasEngine() && (
        <p style={{ marginBottom: 16, fontSize: 14, color: 'var(--ink-2)' }}>
          Set an engine in <Link to="/settings" style={{ color: 'var(--cyan)' }}>Settings</Link> first.
        </p>
      )}

      <div className="glass" style={{ padding: 22, maxWidth: 720, marginBottom: 16 }}>
        <label htmlFor="sme-topic" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8 }}>Topic</label>
        <select id="sme-topic" value={topic} onChange={(e) => setTopic(e.target.value)} style={{
          width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--line)', marginBottom: 14,
        }}>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <label htmlFor="sme-brief" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8 }}>Your situation</label>
        <textarea id="sme-brief" value={brief} onChange={(e) => setBrief(e.target.value)} rows={4} placeholder="What are you trying to do?" style={{
          width: '100%', padding: 12, borderRadius: 12, border: '1px solid var(--line)', marginBottom: 14, color: 'var(--ink)',
        }} />
        <button type="button" onClick={() => void run()} disabled={busy} style={{
          padding: '12px 16px', borderRadius: 12, border: 'none', background: 'var(--cyan)', color: '#fff', fontWeight: 700, cursor: 'pointer', minHeight: 44,
        }}>{busy ? 'Working…' : 'Get a plan'}</button>
      </div>

      {err && <p role="alert" style={{ color: 'var(--danger)', marginBottom: 12 }}>{err}</p>}
      {reply && <pre className="glass" style={{ padding: 20, whiteSpace: 'pre-wrap', fontFamily: 'Inter', fontSize: 14, color: 'var(--ink)', maxWidth: 720 }}>{reply}</pre>}
    </div>
  );
}
