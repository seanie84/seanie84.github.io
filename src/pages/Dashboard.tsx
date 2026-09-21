import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import agentsRaw from '../data/agents.json';
import { type Agent } from '../data/types';
import { getCategoryColor } from '../data/categories';
import { ENGINE_SHORT, getEngine, getFailover } from '../lib/engine';
import { Bot, Target, Swords, Users2, BarChart2, Zap } from 'lucide-react';

const agents = agentsRaw as Agent[];

const STATS = [
  { label: 'Active Agents', value: '77',   icon: Bot,      color: 'var(--cyan)' },
  { label: 'Open Missions', value: '3',    icon: Target,   color: 'var(--gold)' },
  { label: 'War Room Ops',  value: '1',    icon: Swords,   color: 'var(--danger)' },
  { label: 'CRM Contacts',  value: '0',    icon: Users2,   color: 'var(--ok)' },
  { label: 'Analytics',     value: '—',    icon: BarChart2,color: 'var(--ink-2)' },
  { label: 'Desk',          value: 'LIVE', icon: Zap,      color: 'var(--ok)' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = (user?.name ?? 'Operator').split(' ')[0];
  const featured = agents.slice(0, 6);
  const engine = ENGINE_SHORT[getEngine()];
  const fail = getFailover();

  return (
    <div>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            {greeting}, {firstName}
          </h1>
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6 }}>
            Primary {engine}{fail ? ' · failover Gemini → Qwen' : ''} · ClearVision tenant
          </p>
        </div>
        <button
          onClick={() => navigate('/missions')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px',
            borderRadius: 2, border: '1px solid var(--line-strong)',
            background: 'var(--navy-2)', color: 'var(--ink)',
            fontFamily: 'IBM Plex Sans', fontWeight: 600, fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <Target size={14} /> New mission
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginBottom: 36 }}>
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass" style={{ padding: '16px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
              <Icon size={14} style={{ color }} />
            </div>
            <div style={{ fontFamily: 'IBM Plex Mono', fontWeight: 600, fontSize: 22, color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
          </div>
        ))}
      </div>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontFamily: 'IBM Plex Sans', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>On duty</h2>
          <button onClick={() => navigate('/agents')} style={{ background: 'none', border: 'none', color: 'var(--cyan)', fontFamily: 'IBM Plex Mono', fontSize: 11, cursor: 'pointer' }}>
            All 77 →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
          {featured.map(agent => (
            <AgentCard key={agent.id} agent={agent} onClick={() => navigate('/agents')} />
          ))}
        </div>
      </section>
    </div>
  );
}

function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const color = getCategoryColor(agent.category);
  return (
    <div
      onClick={onClick}
      className="glass"
      style={{ padding: '14px 16px', cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 2,
          background: `${color}18`,
          border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'IBM Plex Mono', fontWeight: 600, fontSize: 12, color,
          flexShrink: 0,
        }}>
          {agent.name.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginBottom: 2 }}>{agent.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.role}</div>
        </div>
        <div style={{
          marginLeft: 'auto', flexShrink: 0,
          padding: '2px 7px', border: `1px solid ${color}40`,
          fontFamily: 'IBM Plex Mono', fontSize: 9, color, textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {agent.category}
        </div>
      </div>
      <p style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>
        {agent.tagline}
      </p>
    </div>
  );
}
