import { useState } from 'react';
import { Link } from 'react-router-dom';
import { askNexa } from '../lib/brain';
import { hasEngine } from '../lib/engine';
import { loadList, saveList } from '../lib/localStore';
import { logAudit } from '../lib/audit';

type Watch = { id: string; keywords: string; region: string; last: string };
const KEY = 'nexas_tender_watch';

export default function TenderWatch() {
  const [rows, setRows] = useState<Watch[]>(() => loadList<Watch>(KEY));
  const [keywords, setKeywords] = useState('CCTV, access control, AV, LED');
  const [region, setRegion] = useState('Gauteng, Johannesburg, Sandton, Alberton');
  const [out, setOut] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  function add() {
    const next = [{ id: String(Date.now()), keywords: keywords.trim(), region: region.trim(), last: 'Not run' }, ...rows];
    setRows(next);
    saveList(KEY, next);
    logAudit('tender-watch', `Added ${keywords}`);
  }

  async function run(row: Watch) {
    if (busy) return;
    setBusy(true);
    setErr('');
    try {
      const text = await askNexa(
        `Draft a tender watch for a South African security and AV company. Keywords: ${row.keywords}. Region: ${row.region}. List the kinds of notices to look for on eTenders and provincial bulletins. Do not invent live tenders or claim any were found. Flag official sites to check by hand.`,
      );
      setOut(text);
      const next = rows.map((r) => r.id === row.id ? { ...r, last: new Date().toLocaleString('en-ZA') } : r);
      setRows(next);
      saveList(KEY, next);
      logAudit('tender-watch', `Ran ${row.keywords}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)' }}>Tender watch</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', margin: '8px 0 20px' }}>Draft only. It does not fetch or submit live tenders.</p>
      {!hasEngine() && <p style={{ marginBottom: 16 }}>Set an engine in <Link to="/settings" style={{ color: 'var(--cyan)' }}>Settings</Link>.</p>}
      <div className="glass" style={{ padding: 18, maxWidth: 720, marginBottom: 16 }}>
        <input value={keywords} onChange={(e) => setKeywords(e.target.value)} aria-label="Keywords" style={inp} />
        <input value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Region" style={{ ...inp, marginTop: 8 }} />
        <button type="button" onClick={add} style={btn}>Save watch</button>
      </div>
      {rows.map((r) => (
        <div key={r.id} className="glass" style={{ padding: 14, maxWidth: 720, marginBottom: 8 }}>
          <strong>{r.keywords}</strong>
          <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{r.region} · {r.last}</div>
          <button type="button" onClick={() => void run(r)} disabled={busy} style={{ ...btn, marginTop: 8 }}>{busy ? 'Working…' : 'Draft a watch'}</button>
        </div>
      ))}
      {err && <p role="alert" style={{ color: 'var(--danger)', marginTop: 12 }}>{err}</p>}
      {out && <pre className="glass" style={{ marginTop: 16, padding: 20, whiteSpace: 'pre-wrap', maxWidth: 720 }}>{out}</pre>}
    </div>
  );
}

const inp = { width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--line)' } as const;
const btn = { marginTop: 10, padding: '10px 14px', borderRadius: 10, border: 'none', background: 'var(--cyan)', color: '#fff', fontWeight: 700, cursor: 'pointer', minHeight: 40 } as const;
