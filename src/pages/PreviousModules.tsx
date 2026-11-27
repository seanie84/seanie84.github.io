import { useState } from 'react';
import { Link } from 'react-router-dom';
import { askNexa } from '../lib/brain';
import { hasEngine } from '../lib/engine';

function Desk({ title, lead, prompt }: { title: string; lead: string; prompt: string }) {
  const [brief, setBrief] = useState('');
  const [reply, setReply] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function run() {
    if (busy) return;
    setBusy(true);
    setErr('');
    try {
      setReply(await askNexa(`${prompt}\n\nBrief: ${brief.trim() || 'none'}`));
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 6 }}>{title}</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 20 }}>{lead}</p>
      {!hasEngine() && (
        <p style={{ marginBottom: 16, fontSize: 14, color: 'var(--ink-2)' }}>
          Set an engine in <Link to="/settings" style={{ color: 'var(--cyan)' }}>Settings</Link> first.
        </p>
      )}
      <div className="glass" style={{ padding: 20, maxWidth: 720 }}>
        <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4} placeholder="Your brief…" style={{
          width: '100%', padding: 12, borderRadius: 12, border: '1px solid var(--line)', marginBottom: 12, color: 'var(--ink)',
        }} />
        <button type="button" onClick={() => void run()} disabled={busy} style={{
          padding: '12px 16px', borderRadius: 12, border: 'none', background: 'var(--cyan)', color: '#fff', fontWeight: 700, minHeight: 44, cursor: 'pointer',
        }}>{busy ? 'Working…' : 'Draft'}</button>
      </div>
      {err && <p role="alert" style={{ color: 'var(--danger)', marginTop: 12 }}>{err}</p>}
      {reply && <pre className="glass" style={{ marginTop: 16, padding: 20, whiteSpace: 'pre-wrap', fontFamily: 'Inter', fontSize: 14, color: 'var(--ink)', maxWidth: 720 }}>{reply}</pre>}
    </div>
  );
}

export function Tenders() {
  return <Desk title="Tender Desk" lead="Open packs, gates and ranking. Draft only — never submits." prompt="You are the NEXAS tender desk for a South African security and AV company. Draft a response outline. Do not invent prices or claim a bid was submitted." />;
}
export function Scout() {
  return <Desk title="Scout" lead="Tender agent. Gates, ranking, BAC pack. Never submits." prompt="You are Scout. Review the brief for fit, risks and next human steps. Never submit a tender." />;
}
export function Procurement() {
  return <Desk title="Procurement" lead="PPPFA board. 80/20 or 90/10. CSD-only quotes. Draft only." prompt="You are the procurement desk. Outline an 80/20 or 90/10 approach. Do not invent legislation." />;
}
export function Campaigns() {
  return <Desk title="Campaigns" lead="Ad and social drafts. Never auto-post." prompt="Draft a short campaign. Mark it draft. Do not claim it was posted." />;
}
export function Government() {
  return <Desk title="Government" lead="National, provinces, metros, SARS, tenders." prompt="Map the relevant SA government doors for this brief. Include official sites when known." />;
}
export function Education() {
  return <Desk title="Education" lead="Foundation through TVET and coding. Kid-safe where it applies." prompt="Outline a learning path for the brief. Flag age and CAPS where relevant." />;
}
export function Security() {
  return <Desk title="Security" lead="Overlay, audit, scam scanner. No unsupervised cameras." prompt="Draft a security overlay plan. Cameras stay supervised. Do not claim a live feed." />;
}
export function Architect() {
  return <Desk title="Architect" lead="Site layout, BOM, camera plan." prompt="Draft a site layout and camera plan. Mark quantities as estimates." />;
}
export function Trading() {
  return <Desk title="Trading" lead="Research watchlist only. No live brokerage." prompt="Give a research watchlist. Not advice. No trades." />;
}
export function Sell() {
  return <Desk title="Sell" lead="SME retainer offer, scripts, lead tracker." prompt="Draft a short retainer offer and a first-touch script. Draft only." />;
}
export function Store() {
  return <Desk title="Store" lead="Quote-only product list." prompt="Draft a quote-only product list for the brief. No checkout." />;
}
export function Operator() {
  return <Desk title="Operator" lead="Draft loops. Nothing leaves without you." prompt="Prepare a draft loop for the brief. Do not send, publish, or spend." />;
}
export function Knowledge() {
  return <Desk title="Knowledge" lead="Boards, import and export." prompt="Turn the brief into a short knowledge board: facts, gaps, next steps." />;
}
