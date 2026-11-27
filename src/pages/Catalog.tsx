import { useNavigate } from 'react-router-dom';
import { MODULES } from '../data/catalog';

const GROUPS = Array.from(new Set(MODULES.map((m) => m.group)));

export default function Catalog() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 6 }}>Full catalog</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 24 }}>Everything from this app and the previous version. Nothing left out.</p>
      {GROUPS.map((group) => (
        <section key={group} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--ink)' }}>{group}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
            {MODULES.filter((m) => m.group === group).map((m) => (
              <button key={m.to} type="button" onClick={() => navigate(m.to)} className="glass" style={{
                textAlign: 'left', padding: 14, cursor: 'pointer', border: '1px solid var(--line)', background: '#fff',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                  <strong style={{ color: 'var(--ink)' }}>{m.name}</strong>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{m.source}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)' }}>{m.blurb}</p>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
