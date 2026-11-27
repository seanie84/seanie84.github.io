import { useState } from 'react';
import { loadList, saveList } from '../lib/localStore';
import EmptyState from '../components/EmptyState';

interface Contact { id: string; name: string; email: string; note: string; }

const KEY = 'nexas_crm';

export default function CRM() {
  const [rows, setRows] = useState<Contact[]>(() => loadList<Contact>(KEY));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  function add() {
    if (!name.trim()) return;
    const next = [{ id: String(Date.now()), name: name.trim(), email: email.trim(), note: note.trim() }, ...rows];
    setRows(next);
    saveList(KEY, next);
    setName(''); setEmail(''); setNote('');
  }

  function remove(id: string) {
    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    saveList(KEY, next);
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 4 }}>CRM</h1>
      <p style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 24 }}>Local contacts. Not the NEXORA book.</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, maxWidth: 720 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" aria-label="Contact name" style={inp} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Contact email" style={inp} />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" aria-label="Note" style={{ ...inp, flex: '1 1 200px' }} />
        <button type="button" onClick={add} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: 'var(--cyan)', color: '#fff', fontWeight: 700, cursor: 'pointer', minHeight: 40 }}>Add</button>
      </div>
      {rows.length === 0 && (
        <EmptyState title="No contacts yet" body="Add a name above. Contacts stay in this browser." />
      )}
      {rows.map((r) => (
        <div key={r.id} className="glass" style={{ padding: 14, marginBottom: 8, maxWidth: 720 }}>
          <strong style={{ color: 'var(--ink)' }}>{r.name}</strong>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{r.email}</div>
          {r.note && <div style={{ marginTop: 6, color: 'var(--ink-2)' }}>{r.note}</div>}
          <button type="button" onClick={() => remove(r.id)} style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--ink-3)', cursor: 'pointer' }}>Remove</button>
        </div>
      ))}
    </div>
  );
}

const inp = {
  padding: '10px 12px', background: '#fff', border: '1px solid var(--line)',
  borderRadius: 8, color: 'var(--ink)', fontSize: 13, minHeight: 40,
} as const;
