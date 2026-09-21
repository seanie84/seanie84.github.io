import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import agentsRaw from '../data/agents.json';
import { type Agent } from '../data/types';
import { getCategoryColor } from '../data/categories';
import { ENGINE_SHORT, getEngine, getFailover } from '../lib/engine';
import { Bot, Target, Swords, Users2, BarChart2, Zap } from 'lucide-react';

const agents = agentsRaw as Agent[];

const STATS = [
  { label: 'Agents', value: '77', icon: Bot },
  { label: 'Missions', value: '3', icon: Target },
  { label: 'War Room', value: '1', icon: Swords },
  { label: 'CRM', value: '0', icon: Users2 },
  { label: 'Analytics', value: '—', icon: BarChart2 },
  { label: 'Status', value: 'Live', icon: Zap },
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
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1 }}>
            {greeting}, {firstName}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 8 }}>
            {ENGINE_SHORT[getEngine()]}
            {getFailover() ? ' with Gemini → Qwen failover' : ''} · 77 specialists ready
          </p>
        </div>
        <button
          onClick={() => navigate('/missions')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
            borderRadius: 12, border: 'none', background: 'var(--cyan)', color: '#042f2e',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}
        >
          <Target size={15} /> New mission
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginBottom: 40 }}>
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass" style={{ padding: '18px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, color: 'var(--ink-3)' }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
              <Icon size={15} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em' }}>{value}</div>
          </div>
        ))}
      </div>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>On duty</h2>
          <button onClick={() => navigate('/agents')} style={{ background: 'none', border: 'none', color: 'var(--cyan)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            View all
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
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
    <div onClick={onClick} className="glass" style={{ padding: 16, cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: `${color}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 13, color, flexShrink: 0,
        }}>
          {agent.name.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em' }}>{agent.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.role}</div>
        </div>
        <span style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'capitalize' }}>{agent.category}</span>
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
        {agent.tagline}
      </p>
    </div>
  );
}
