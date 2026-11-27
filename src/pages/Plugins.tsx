import { Link } from 'react-router-dom';

const PLUGINS = [
  ['Cloud desk', 'A free cloud seat, set in Settings'],
  ['Local desk', 'A model running on this computer'],
];

export default function Plugins() {
  return (
    <div>
      <h1 style={{ fontWeight: 800, fontSize: 28, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 4 }}>Plugins</h1>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 24 }}>Connectors for the desk. Keys stay in Settings.</p>
      {PLUGINS.map(([name, blurb]) => (
        <div key={name} className="glass" style={{ padding: 16, marginBottom: 10, maxWidth: 560 }}>
          <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{name}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{blurb}</div>
        </div>
      ))}
      <p style={{ marginTop: 12, fontSize: 13, color: 'var(--ink-2)' }}>
        Arm one in <Link to="/settings" style={{ color: 'var(--cyan)' }}>Settings</Link>.
      </p>
    </div>
  );
}
