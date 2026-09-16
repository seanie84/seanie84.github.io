import { useState } from 'react';
import { loadList, saveList } from '../lib/localStore';

interface Note { id: string; text: string; at: string; }

const KEY = 'nexas_memory';

export default function Memory() {
  const [notes, setNotes] = useState<Note[]>(() => loadList<Note>(KEY));
  const [text, setText] = useState('');

  function add() {
    if (!text.trim()) return;
    const next = [{ id: String(Date.now()), text: text.trim(), at: new Date().toISOString() }, ...notes].slice(0, 100);
    setNotes(next);
    saveList(KEY, next);
    setText('');
  }

  function remove(id: string) {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    saveList(KEY, next);
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>Memory</h1>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 24 }}>THIS BROWSER ONLY</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="What should NEXAS remember about the business?" style={{
        width: '100%', maxWidth: 640, padding: 12, marginBottom: 12,
        background: 'var(--glass)', border: '1px solid var(--line)', borderRadius: 8, color: 'var(--ink)',
      }} />
      <div style={{ marginBottom: 20 }}>
        <button type="button" onClick={add} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: 'var(--cyan)', color: 'var(--bg)', fontWeight: 700, cursor: 'pointer' }}>Save note</button>
      </div>
      {notes.map((n) => (
        <div key={n.id} className="glass" style={{ maxWidth: 640, padding: 14, marginBottom: 8 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', marginBottom: 6 }}>{n.at}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{n.text}</div>
          <button type="button" onClick={() => remove(n.id)} style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--ink-3)', cursor: 'pointer' }}>Remove</button>
        </div>
      ))}
    </div>
  );
}
