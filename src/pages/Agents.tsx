import { useState, useMemo } from 'react';
import agentsRaw from '../data/agents.json';
import { type Agent } from '../data/types';
import { CATEGORIES, getCategoryColor } from '../data/categories';
import { Search, LayoutGrid, List } from 'lucide-react';

const agents = agentsRaw as Agent[];

export default function Agents() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<Agent | null>(null);

  const filtered = useMemo(() => agents.filter(a => {
    const q = search.toLowerCase();
    const matchQ = !q || a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.tagline.toLowerCase().includes(q);
    const matchC = !category || a.category === category;
    return matchQ && matchC;
  }), [search, category]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>Agent Directory</h1>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.15em' }}>77 SPECIALISED AI AGENTS · STANDING BY</p>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 360 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search agents…"
            style={{
              width: '100%', padding: '9px 12px 9px 36px',
              background: 'var(--glass)', border: '1px solid var(--line)',
              borderRadius: 8, color: 'var(--ink)', fontFamily: 'Inter', fontSize: 13, outline: 'none',
            }}
          />
        </div>

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            padding: '9px 12px', background: 'var(--glass)', border: '1px solid var(--line)',
            borderRadius: 8, color: 'var(--ink)', fontFamily: 'Inter', fontSize: 13, cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="">All categories</option>
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>

        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
          {(['grid', 'list'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
              background: view === v ? 'rgba(34,211,238,0.12)' : 'var(--glass)',
              border: `1px solid ${view === v ? 'rgba(34,211,238,0.3)' : 'var(--line)'}`,
              color: view === v ? 'var(--cyan)' : 'var(--ink-3)',
            }}>
              {v === 'grid' ? <LayoutGrid size={15} /> : <List size={15} />}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', marginBottom: 16, letterSpacing: '0.1em' }}>
        SHOWING {filtered.length} OF {agents.length} AGENTS
      </p>

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {filtered.map(agent => <GridCard key={agent.id} agent={agent} onSelect={() => setSelected(agent)} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map(agent => <ListRow key={agent.id} agent={agent} onSelect={() => setSelected(agent)} />)}
        </div>
      )}

      {selected && <AgentModal agent={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function GridCard({ agent, onSelect }: { agent: Agent; onSelect: () => void }) {
  const color = getCategoryColor(agent.category);
  return (
    <div
      className="glass"
      onClick={onSelect}
      style={{ padding: '18px', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--line-strong)'; el.style.boxShadow = 'var(--elev-glow)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--line)'; el.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 10,
          background: `${color}18`, border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 16, color,
        }}>
          {agent.name.slice(0, 2).toUpperCase()}
        </div>
        <span style={{
          padding: '3px 8px', borderRadius: 20,
          background: `${color}12`, border: `1px solid ${color}40`,
          fontFamily: 'JetBrains Mono', fontSize: 9, color, textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>{agent.category}</span>
      </div>
      <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 17, color: 'var(--ink)', marginBottom: 2 }}>{agent.name}</div>
      <div style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--ink-2)', marginBottom: 10 }}>{agent.role}</div>
      <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.5 }}>"{agent.tagline}"</p>
    </div>
  );
}

function ListRow({ agent, onSelect }: { agent: Agent; onSelect: () => void }) {
  const color = getCategoryColor(agent.category);
  return (
    <div
      className="glass"
      onClick={onSelect}
      style={{ padding: '12px 16px', cursor: 'pointer', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 14, transition: 'border-color 0.15s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--line-strong)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'; }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 8, flexShrink: 0,
        background: `${color}18`, border: `1px solid ${color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 13, color,
      }}>{agent.name.slice(0, 2).toUpperCase()}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>{agent.name}</span>
        <span style={{ marginLeft: 10, fontFamily: 'Inter', fontSize: 11, color: 'var(--ink-2)' }}>{agent.role}</span>
      </div>
      <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--ink-3)', fontStyle: 'italic', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>"{agent.tagline}"</p>
      <span style={{
        padding: '3px 8px', borderRadius: 20, flexShrink: 0,
        background: `${color}12`, border: `1px solid ${color}40`,
        fontFamily: 'JetBrains Mono', fontSize: 9, color, textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>{agent.category}</span>
    </div>
  );
}

function AgentModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const color = getCategoryColor(agent.category);
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100, display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: 24,
        background: 'rgba(5,13,31,0.8)', backdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="glass"
        style={{ width: '100%', maxWidth: 520, padding: 32, boxShadow: 'var(--elev-glow)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 14,
            background: `${color}18`, border: `1px solid ${color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 20, color,
          }}>{agent.name.slice(0, 2).toUpperCase()}</div>
          <div>
            <h2 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 22, color: 'var(--ink)' }}>{agent.name}</h2>
            <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)' }}>{agent.role}</p>
          </div>
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--ink-3)', cursor: 'pointer', fontSize: 20 }}>✕</button>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)', fontStyle: 'italic', marginBottom: 20, lineHeight: 1.6 }}>"{agent.tagline}"</p>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Capabilities</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {agent.capabilities.map(cap => (
              <span key={cap} style={{
                padding: '4px 10px', borderRadius: 20,
                background: `${color}10`, border: `1px solid ${color}30`,
                fontFamily: 'Inter', fontSize: 11, color: 'var(--ink-2)',
              }}>{cap}</span>
            ))}
          </div>
        </div>
        <div style={{ padding: '12px 14px', background: 'rgba(34,211,238,0.06)', borderRadius: 8, border: '1px solid var(--line)' }}>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--cyan)', letterSpacing: '0.1em' }}>
            CONNECT YOUR AI API KEY IN SETTINGS TO CHAT WITH {agent.name.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
