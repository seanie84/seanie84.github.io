import { REPOS } from '../data/catalog';

export default function Repos() {
  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 6 }}>All repos</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 24 }}>Every repository on the account. NEXAS and NEXORA stay separate apps.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {REPOS.map((r) => (
          <a key={r.name} href={r.url} target="_blank" rel="noreferrer" className="glass" style={{
            display: 'block', padding: 18, textDecoration: 'none', color: 'inherit',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
              <strong style={{ color: 'var(--ink)' }}>{r.name}</strong>
              <span style={{ fontSize: 11, color: 'var(--cyan)', fontWeight: 700 }}>{r.kind}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{r.blurb}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
