import { useState } from 'react';

const DRAFTS = [
  { id: 't1', kind: 'Tender', title: 'No open tender drafts', state: 'Empty' },
  { id: 'q1', kind: 'Quote', title: 'No quote drafts', state: 'Empty' },
  { id: 'c1', kind: 'Campaign', title: 'No campaign drafts', state: 'Empty' },
];

export default function ApprovalTray() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} style={{
        padding: '8px 12px', borderRadius: 10, border: '1px solid var(--line)', background: '#fff',
        fontWeight: 600, color: 'var(--ink)', cursor: 'pointer', minHeight: 40,
      }}>
        Approvals · 0 waiting
      </button>
      {open && (
        <div className="glass" style={{ marginTop: 8, padding: 14 }}>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 10 }}>Nothing leaves without you. The tray is empty.</p>
          {DRAFTS.map((d) => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid var(--line)', fontSize: 13 }}>
              <span style={{ color: 'var(--ink)' }}>{d.kind}: {d.title}</span>
              <span style={{ color: 'var(--ink-3)' }}>{d.state}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
