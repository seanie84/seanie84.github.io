import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { engineReady, getEngine, getFailover } from '../../lib/engine';

function clockParts() {
  const d = new Date();
  return d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function TopBar() {
  const { user } = useAuth();
  const [time, setTime] = useState(clockParts);

  useEffect(() => {
    const id = window.setInterval(() => setTime(clockParts()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const ready = engineReady(getEngine()) || (getFailover() && (engineReady('gemini') || engineReady('qwen')));
  const first = (user?.name || 'Operator').split(' ')[0];

  return (
    <header className="rack-bar">
      <span className={ready ? 'rack-dot' : 'rack-dot off'} aria-hidden="true" />
      <span style={{ color: 'var(--ink)', fontWeight: 800, letterSpacing: '-0.03em' }}>NEXAS</span>
      <span className="chip" aria-live="polite" style={ready ? undefined : { color: 'var(--warn)', borderColor: 'rgba(180,83,9,.25)', background: 'rgba(180,83,9,.08)' }}>
        {ready ? 'Desk connected' : 'Not connected'}
      </span>
      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--ink-2)' }}>
        <span>{time} SAST</span>
        <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{first}</span>
      </span>
    </header>
  );
}
