import { useState } from 'react';
import { engineReady, getEngine } from '../lib/engine';
import { loadList } from '../lib/localStore';
import { loadAudit, logAudit } from '../lib/audit';

export default function Integrity() {
  const [ran, setRan] = useState('');
  const [lines, setLines] = useState<string[]>([]);

  function run() {
    const issues: string[] = [];
    if (!engineReady(getEngine())) issues.push('The desk is not connected. Open Settings.');
    if (loadList('nexas_crm').length === 0) issues.push('CRM is empty.');
    if (loadList('nexas_tender_watch').length === 0) issues.push('No tender watches saved.');
    if (loadAudit().length === 0) issues.push('Audit log is empty.');
    setLines(issues.length ? issues : ['No issues. Engine, watches, and log look fine.']);
    setRan(new Date().toLocaleString('en-ZA'));
    logAudit('integrity', issues.length ? `${issues.length} issues` : 'clean');
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)' }}>Integrity scan</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', margin: '8px 0 20px' }}>Checks this browser only. It does not fix anything.</p>
      <button type="button" onClick={run} style={{
        padding: '12px 16px', borderRadius: 12, border: 'none', background: 'var(--cyan)', color: '#fff', fontWeight: 700, minHeight: 44, cursor: 'pointer',
      }}>Run scan</button>
      {ran && <p style={{ marginTop: 12, color: 'var(--ink-3)', fontSize: 13 }}>Last run {ran}</p>}
      {lines.length > 0 && (
        <ul className="glass" style={{ marginTop: 16, padding: 18, maxWidth: 560 }}>
          {lines.map((l) => <li key={l} style={{ marginBottom: 8, color: 'var(--ink)' }}>{l}</li>)}
        </ul>
      )}
    </div>
  );
}
