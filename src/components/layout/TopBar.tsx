import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ENGINE_SHORT, engineReady, getEngine, getFailover, getLastBrainRoute } from '../../lib/engine';

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

  const primary = getEngine();
  const last = getLastBrainRoute();
  const failoverOn = getFailover();
  const live = last?.engine || primary;
  const viaFailover = Boolean(last?.failover);
  const ready = engineReady(primary) || (failoverOn && (engineReady('gemini') || engineReady('qwen')));

  return (
    <header className="rack-bar">
      <span className={ready ? 'rack-dot' : 'rack-dot off'} aria-hidden="true" />
      <span style={{ color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.02em' }}>NEXAS</span>
      <span className="chip" aria-live="polite" style={ready ? undefined : { color: 'var(--warn)', borderColor: 'rgba(180,83,9,.25)', background: 'rgba(180,83,9,.08)' }}>
        {ready ? 'Connected' : 'Not connected'} · {ENGINE_SHORT[live]}{viaFailover ? ' · failover' : ''}
      </span>
      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--ink-2)' }}>
        <span>{time} SAST</span>
        <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{user?.name || 'Operator'}</span>
      </span>
    </header>
  );
}
