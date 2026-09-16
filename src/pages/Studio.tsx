export default function Studio() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>Theme Studio</h1>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 24 }}>NEXAS HUD TOKENS</p>
      <p style={{ maxWidth: 560, fontFamily: 'Inter', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>
        Theme lives in src/index.css CSS variables (--cyan, --void, --ink). This HUD stays NEXAS navy/cyan.
        NEXORA has its own brand on a different app.
      </p>
    </div>
  );
}
