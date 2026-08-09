import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import agentsRaw from '../data/agents.json';
import { type Agent } from '../data/types';
import { getCategoryColor } from '../data/categories';
import { Bot, Target, Swords, Users2, BarChart2, Zap } from 'lucide-react';

const agents = agentsRaw as Agent[];

const STATS = [
  { label: 'Active Agents', value: 77,    icon: Bot,      color: 'var(--cyan)' },
  { label: 'Open Missions', value: 3,     icon: Target,   color: 'var(--gold)' },
  { label: 'War Room Ops',  value: 1,     icon: Swords,   color: 'var(--danger)' },
  { label: 'CRM Contacts',  value: 0,     icon: Users2,   color: 'var(--ok)' },
  { label: 'Analytics',     value: '—',   icon: BarChart2,color: 'var(--violet)' },
  { label: 'Uptime',        value: '100%',icon: Zap,      color: 'var(--ok)' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = (user?.name ?? 'Operator').split(' ')[0];

  const featured = agents.slice(0, 6);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 32, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)' }}>
            {greeting}, {firstName}
          </h1>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>
            {new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()} · SAST · ClearVision AI Tenant
          </p>
        </div>
        <button
          onClick={() => navigate('/missions')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
            borderRadius: 10, border: '1px solid var(--cyan)',
            background: 'rgba(34,211,238,0.1)', color: 'var(--cyan)',
            fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 13,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'background 0.15s',
          }}
        >
          <Target size={15} /> New Mission
        </button>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass" style={{ padding: '20px 20px', boxShadow: 'var(--elev-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
              <Icon size={16} style={{ color }} />
            </div>
            <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 26, color, lineHeight: 1 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Featured Agents */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)' }}>Featured Agents</h2>
          <button onClick={() => navigate('/agents')} style={{ background: 'none', border: 'none', color: 'var(--cyan)', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer', letterSpacing: '0.1em' }}>
            View all 77 →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
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
      style={{
        padding: '16px 18px', cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        borderColor: 'var(--line)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--line-strong)';
        el.style.boxShadow = 'var(--elev-glow)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--line)';
        el.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: `${color}18`,
          border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 15, color,
          flexShrink: 0,
        }}>
          {agent.name.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 2 }}>{agent.name}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.role}</div>
        </div>
        <div style={{
          marginLeft: 'auto', flexShrink: 0,
          padding: '3px 8px', borderRadius: 20, border: `1px solid ${color}40`,
          background: `${color}12`,
          fontFamily: 'JetBrains Mono', fontSize: 9, color, textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {agent.category}
        </div>
      </div>
      <p style={{ marginTop: 10, fontFamily: 'Inter', fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.5 }}>
        "{agent.tagline}"
      </p>
    </div>
  );
}
