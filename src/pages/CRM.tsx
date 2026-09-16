import { useState } from 'react';
import { loadList, saveList } from '../lib/localStore';

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
      <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>CRM</h1>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 24 }}>LOCAL CONTACTS · NOT NEXORA</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, maxWidth: 720 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={inp} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inp} />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" style={{ ...inp, flex: '1 1 200px' }} />
        <button type="button" onClick={add} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: 'var(--cyan)', color: 'var(--bg)', fontWeight: 700, cursor: 'pointer' }}>Add</button>
      </div>
      {rows.map((r) => (
        <div key={r.id} className="glass" style={{ padding: 14, marginBottom: 8, maxWidth: 720 }}>
          <strong style={{ color: 'var(--ink)' }}>{r.name}</strong>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--ink-3)' }}>{r.email}</div>
          {r.note && <div style={{ marginTop: 6, color: 'var(--ink-2)' }}>{r.note}</div>}
          <button type="button" onClick={() => remove(r.id)} style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--ink-3)', cursor: 'pointer' }}>Remove</button>
        </div>
      ))}
    </div>
  );
}

const inp = {
  padding: '10px 12px', background: 'var(--glass)', border: '1px solid var(--line)',
  borderRadius: 8, color: 'var(--ink)', fontFamily: 'Inter', fontSize: 13,
} as const;
