import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ENGINE_SHORT, engineReady, getEngine, getFailover, getLastBrainRoute } from '../../lib/engine';

function clockParts() {
  const d = new Date();
  return {
    time: d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
    date: d.toLocaleDateString('en-ZA', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase(),
  };
}

export default function TopBar() {
  const { user } = useAuth();
  const [now, setNow] = useState(clockParts);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(clockParts());
      setTick((n) => n + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const primary = getEngine();
  const last = getLastBrainRoute();
  const failoverOn = getFailover();
  const live = last?.engine || primary;
  const viaFailover = Boolean(last?.failover);
  const ready = engineReady(primary) || (failoverOn && (engineReady('gemini') || engineReady('qwen')));

  return (
    <header className="rack-bar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 30,
      margin: '-28px -32px 24px',
    }}>
      <span className={ready ? 'rack-dot' : 'rack-dot off'} />
      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>NEXAS HUD</span>
      <span style={{ opacity: 0.35 }}>|</span>
      <span>{now.date} · {now.time} SAST</span>
      <span style={{ opacity: 0.35 }}>|</span>
      <span style={{ color: viaFailover ? 'var(--warn)' : 'var(--cyan)' }}>
        {ENGINE_SHORT[live]}{viaFailover ? ' FAILOVER' : ''}
      </span>
      <span style={{ opacity: 0.35 }}>|</span>
      <span>77 AGENTS</span>
      <span style={{ marginLeft: 'auto', color: 'var(--ink-3)' }}>
        {user?.name || 'OPERATOR'}
        <span style={{ marginLeft: 10, opacity: 0.5 }}>{String(tick % 2 === 0 ? '●' : '○')}</span>
      </span>
    </header>
  );
}
