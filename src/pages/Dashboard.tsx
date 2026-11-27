import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import agentsRaw from '../data/agents.json';
import { type Agent } from '../data/types';
import { getCategoryColor } from '../data/categories';
import { Bot, Target, Swords, Users2, BarChart2, Zap, Building2, Briefcase, Landmark } from 'lucide-react';

const agents = agentsRaw as Agent[];

const STATS = [
  { label: 'Agents', value: '77', icon: Bot },
  { label: 'Missions', value: '3', icon: Target },
  { label: 'War Room', value: '1', icon: Swords },
  { label: 'CRM', value: '0', icon: Users2 },
  { label: 'Analytics', value: '—', icon: BarChart2 },
  { label: 'Status', value: 'Live', icon: Zap },
];

const HUBS = [
  { to: '/hub', label: 'Business Hub', blurb: 'Operations in one place', Icon: Building2, img: '/finish/hub.jpg' },
  { to: '/sme', label: 'SME', blurb: 'SA small-business plans', Icon: Briefcase, img: '/finish/plans.jpg' },
  { to: '/centers', label: 'Centers', blurb: 'Sales, legal, finance, people', Icon: Landmark, img: '/finish/desk.jpg' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = (user?.name ?? 'Operator').split(' ')[0];
  const featured = agents.slice(0, 6);
  const brief = [
    { label: 'Tenders due', value: 'None on the watch yet', to: '/watch' },
    { label: 'Follow-ups', value: 'CRM is empty', to: '/crm' },
    { label: 'Open drafts', value: '0 waiting in Approvals', to: '/catalog' },
    { label: 'Desk', value: 'Open and ready', to: '/hub' },
  ];

  return (
    <div>
      <div className="glass" style={{ overflow: 'hidden', marginBottom: 24, display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(220px, 320px)' }}>
        <div style={{ padding: 28 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.1, color: 'var(--ink)' }}>
            {greeting}, {firstName}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 10, marginBottom: 18, lineHeight: 1.45 }}>
            Seventy-seven specialists are on the desk. What should we move today?
          </p>
          <button onClick={() => navigate('/missions')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px',
            borderRadius: 12, border: 'none', background: 'var(--cyan)', color: '#fff',
            fontWeight: 700, fontSize: 14, cursor: 'pointer', minHeight: 44,
          }}>
            <Target size={15} /> New mission
          </button>
        </div>
        <img src="/finish/desk.jpg" alt="Bright desk" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 180 }} />
      </div>

      <section className="glass" style={{ padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--ink)' }}>Morning brief</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {brief.map((item) => (
            <button key={item.label} type="button" onClick={() => navigate(item.to)} style={{
              textAlign: 'left', padding: 12, borderRadius: 12, border: '1px solid var(--line)', background: '#fff', cursor: 'pointer',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{item.value}</div>
            </button>
          ))}
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, marginBottom: 28 }}>
        {HUBS.map(({ to, label, blurb, img }) => (
          <button key={to} type="button" onClick={() => navigate(to)} className="glass" style={{
            textAlign: 'left', padding: 0, cursor: 'pointer', border: '1px solid var(--line)', background: '#fff', overflow: 'hidden',
          }}>
            <img src={img} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: 16 }}>
              <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>{blurb}</p>
            </div>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginBottom: 40 }}>
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass" style={{ padding: '18px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, color: 'var(--ink-3)' }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
              <Icon size={15} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)' }}>{value}</div>
          </div>
        ))}
      </div>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)' }}>On duty</h2>
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
          background: `${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 13, color, flexShrink: 0,
        }}>
          {agent.name.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{agent.name}</div>
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
