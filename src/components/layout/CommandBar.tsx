import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODULES, REPOS } from '../../data/catalog';

type Item = { id: string; label: string; hint: string; to?: string; href?: string };

const ITEMS: Item[] = [
  ...MODULES.map((m) => ({ id: m.to, label: m.name, hint: m.group, to: m.to })),
  ...REPOS.map((r) => ({ id: r.url, label: r.name, hint: r.kind, href: r.url })),
];

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    function onOpen() { setOpen(true); }
    window.addEventListener('keydown', onKey);
    window.addEventListener('nexa-command', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('nexa-command', onOpen);
    };
  }, []);

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ITEMS.slice(0, 12);
    return ITEMS.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(s)).slice(0, 12);
  }, [q]);

  if (!open) return null;
  return (
    <div role="presentation" onClick={() => setOpen(false)} style={{
      position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(26,29,35,.4)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '12vh 16px',
    }}>
      <div role="dialog" aria-label="Command bar" className="glass" onClick={(e) => e.stopPropagation()} style={{
        width: 'min(560px, 100%)', padding: 12,
      }}>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Jump to a page, agent, or repo…"
          aria-label="Search pages and repos"
          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--line)', fontSize: 14, minHeight: 44 }}
        />
        <ul style={{ listStyle: 'none', marginTop: 8, maxHeight: 320, overflowY: 'auto' }}>
          {matches.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => {
                setOpen(false);
                setQ('');
                if (item.href) window.open(item.href, '_blank', 'noreferrer');
                else if (item.to) navigate(item.to);
              }} style={{
                width: '100%', textAlign: 'left', padding: '10px 12px', border: 'none', background: 'transparent',
                borderRadius: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 12,
              }}>
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{item.label}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{item.hint}</span>
              </button>
            </li>
          ))}
          {matches.length === 0 && <li style={{ padding: 12, color: 'var(--ink-2)' }}>Nothing matches.</li>}
        </ul>
        <p style={{ fontSize: 12, color: 'var(--ink-3)', padding: '6px 8px' }}>Esc to close · Ctrl/Cmd+K</p>
      </div>
    </div>
  );
}
