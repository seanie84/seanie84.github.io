import { useNavigate } from 'react-router-dom';
import agentsRaw from '../data/agents.json';
import { type Agent } from '../data/types';
import { CATEGORIES, getCategoryColor } from '../data/categories';
import { ScrollText, Bot, Boxes, LayoutGrid, KeyRound, ChevronRight } from 'lucide-react';

const agents = agentsRaw as Agent[];

const FEATURES = [
  { k: '77 specialised agents', v: 'A full virtual staff complement — every agent named, titled and scoped to a real business role with defined capabilities.' },
  { k: 'NEXA command core', v: 'One login and one interface in front of the entire workforce: business Q&A across all domains, memory and mission planning.' },
  { k: 'Multi-agent missions', v: 'Brief once. Amber the orchestrator designs the plan, routes tasks to the right agents, tracks progress and synthesises the result.' },
  { k: 'War Room', v: 'A live operations centre for monitoring active agent tasks as they run.' },
  { k: 'Command dashboard', v: 'Real-time view of active agents, open missions, operations, contacts and performance the moment you sign in.' },
  { k: 'Agent directory', v: 'Browse, search and filter all 77 agents by division and capability — role, tagline and skills on every card.' },
  { k: 'Business workspace', v: 'CRM, document generation, quotes and proposals, and analytics dashboards in the same place the agents work.' },
  { k: 'Memory', v: 'Long-term context and knowledge base management, so the platform knows your business and never starts from zero.' },
  { k: 'Classroom', v: 'AI-powered training and learning modules for you and your team.' },
  { k: 'Plugins', v: 'Connect external tools and integrations to extend what the workforce can reach.' },
  { k: 'Theme Studio', v: 'Customise the look of your command center to suit the operator.' },
  { k: 'Secure operator sign-in', v: 'A private, per-business workspace behind authentication.' },
  { k: 'South African specialisation', v: 'CIPC, SARS, CCMA, POPIA, OHS Act and CAPS expertise as a first-class capability — priced in Rand, planned around load-shedding.' },
  { k: 'Plain-language delivery', v: 'Every agent explains clearly, honestly and practically — and refers you to real professionals where that is the right answer.' },
];

const MODULES = [
  { name: 'Dashboard', desc: 'Live stats on agents, missions, operations, contacts and performance, plus featured agents.' },
  { name: 'War Room', desc: 'Active operations centre — monitor live agent tasks in real time.' },
  { name: 'Mission Control', desc: 'Create and track multi-agent missions from a single brief.' },
  { name: 'Agents', desc: 'The full directory of all 77 agents — divisions, roles, taglines and capabilities.' },
  { name: 'CRM', desc: 'Manage contacts, leads and customer relationships.' },
  { name: 'Document Studio', desc: 'Generate and manage business documents with AI agents.' },
  { name: 'Analytics', desc: 'Business intelligence and performance dashboards.' },
  { name: 'Classroom', desc: 'AI-powered training and learning modules.' },
  { name: 'Memory', desc: 'Long-term context and knowledge base management.' },
  { name: 'Plugins', desc: 'Connect external tools and integrations.' },
  { name: 'Quotes', desc: 'Generate professional quotes and proposals.' },
  { name: 'Theme Studio', desc: "Customise your command center's appearance." },
  { name: 'Settings', desc: 'Configure your NEXA command center.' },
];

const STEPS = [
  { k: 'Ask NEXA anything', v: 'Put any business question or task to the command core. NEXA answers directly or brings in the right specialist — and remembers your context between conversations.' },
  { k: 'Go straight to a specialist', v: 'Open the agent directory and pick the expert for the job — the tax consultant, the labour lawyer, the SEO specialist, the master mechanic — and work one-on-one.' },
  { k: 'Launch a mission for bigger jobs', v: 'When the work spans departments, brief Amber in Mission Control. She breaks it into steps, assigns agents and reports back with one synthesised result.' },
  { k: 'Monitor from the War Room', v: 'Watch live agent operations in the active operations centre, and track the big picture from your dashboard.' },
  { k: 'Keep outputs where you work', v: 'Deals live in the CRM, generated documents in Document Studio, client-ready quotes in Quotes, performance in Analytics.' },
  { k: 'Make it yours', v: 'Teach it your business through Memory, train your team through Classroom, connect your tools through Plugins, and style it all in Theme Studio.' },
];

const USES = [
  { k: 'Running a business, end to end', v: 'Strategy, sales pipelines, full-funnel marketing and PR, front-desk to warehouse operations, project delivery, HR policy, health & safety and training.' },
  { k: 'Starting a business in South Africa', v: 'From idea to registered, trading company — CIPC guidance, lean launch checklists, first-customer playbooks and funding readiness.' },
  { k: 'Legal and dispute readiness', v: 'Contracts in plain language, labour law done fairly, CCMA processes step by step — including seeing your case the way a judge would.' },
  { k: 'Money, tax and compliance', v: 'Cash flow, collections, banking and procurement; SARS, VAT, PAYE and provisional tax handled penalty-free; POPIA and OHS compliance.' },
  { k: 'Research and decisions', v: 'Evidence-first market and competitor research with sources and confidence labels, deep search, and analysis that ends in a decision.' },
  { k: 'Technology and security', v: 'IT strategy, cloud and infrastructure, automation, architecture reviews, practical cybersecurity and fraud prevention.' },
  { k: 'Documents and collateral', v: 'Proposals, quotes, reports, press releases, policies and SOPs generated and managed in one studio.' },
  { k: 'Learning and education', v: 'CAPS-aligned support from nursery through matric, TVET N1–N6, university tutoring, study accountability, CVs and interviews.' },
  { k: 'The human behind the business', v: 'Personal training and nutrition on a SA budget, wellbeing coaching, sensible health guidance, vehicle diagnostics and side hustles.' },
];

const WHO = [
  "South African SMEs and owner-managers who need a full staff complement's worth of expertise without a full staff complement's payroll.",
  'Founders and first-time entrepreneurs taking an idea to a registered, trading business.',
  'Teams that want sales, marketing, operations, HR, finance and legal support in one shared command center.',
  'Students, parents and lifelong learners using the education specialists from nursery school to university.',
  'Anyone who would rather ask a named expert a straight question and get a straight, practical answer.',
];

const DIVISION_CAPTIONS: Record<string, string> = {
  core: 'The command core and the orchestrator — the front office of the workforce.',
  leadership: 'Executive counsel, from first idea to board-level calls.',
  legal: 'Contracts, disputes, labour law and the CCMA — in plain language.',
  sales: 'Pipeline, outreach, leads and deals bigger than transactions.',
  marketing: 'Found, remembered and talked about — for the right reasons.',
  operations: 'Front desk to warehouse, support to success — nothing dropped.',
  hr: 'People strategy, safety and growth under one roof.',
  project: 'Scope, schedule, budget — delivered with evidence.',
  finance: 'The numbers, the story they tell, and the decisions they demand.',
  research: 'Evidence-first answers with sources and confidence labels.',
  technology: 'Systems, cloud, code and the plumbing between them.',
  security: 'Practical defence for real businesses, not Hollywood fears.',
  maintenance: 'Crews coordinated, root causes found, failures prevented.',
  specialist: 'Education, careers, health, vehicles and the odd problems that fit no department.',
  fitness: 'Programmes and plates that fit a real South African life.',
  creative: 'Websites, identity and spaces people actually want to be in.',
};

const sectionLabel = {
  fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--cyan)',
  letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10,
} as const;

const sectionTitle = {
  fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 22,
  textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 16,
} as const;

const bodyText = {
  fontFamily: 'Inter', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 760,
} as const;

function tint(color: string, pct: number): string {
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`;
}

export default function Profile() {
  const navigate = useNavigate();
  const divisions = CATEGORIES
    .map(c => ({ ...c, members: agents.filter(a => a.category === c.id) }))
    .filter(d => d.members.length > 0);

  const stats = [
    { label: 'Specialised Agents', value: agents.length, icon: Bot, color: 'var(--cyan)' },
    { label: 'Divisions', value: divisions.length, icon: Boxes, color: 'var(--gold)' },
    { label: 'Workspace Modules', value: MODULES.length, icon: LayoutGrid, color: 'var(--violet)' },
    { label: 'Login', value: 1, icon: KeyRound, color: 'var(--ok)' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'rgba(34,211,238,0.08)',
            border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ScrollText size={18} style={{ color: 'var(--cyan)' }} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)' }}>Nexas AI Profile</h1>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>What it is, what it does, and what it's for.</p>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="glass" style={{ padding: '32px 32px 28px', marginBottom: 40, boxShadow: 'var(--elev-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg, var(--cyan), var(--gold))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Orbitron', fontWeight: 900, fontSize: 20, color: '#000',
          }}>N</div>
          <div>
            <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 18, color: 'var(--ink)', letterSpacing: '0.12em' }}>NEXAS AI</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--cyan)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 3 }}>
              AI-Agent Business Command Center · ClearVision AI
            </div>
          </div>
        </div>
        <p style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: 30, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 14, maxWidth: 720 }}>
          One login. <span style={{ color: 'var(--cyan)' }}>Seventy-seven minds.</span> <span style={{ color: 'var(--gold)' }}>Zero pretence.</span>
        </p>
        <p style={bodyText}>
          A complete AI workforce for your business — 77 named specialist agents behind one secure
          command center, with South African law, tax, compliance and market knowledge woven in.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginTop: 26 }}>
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass-2" style={{ padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
                <Icon size={14} style={{ color }} />
              </div>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 22, color, lineHeight: 1 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What is Nexas AI */}
      <section style={{ marginBottom: 44 }}>
        <p style={sectionLabel}>01 · Briefing</p>
        <h2 style={sectionTitle}>What is Nexas AI?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={bodyText}>
            Nexas AI is a complete AI workforce delivered through one secure command center. Instead of
            a single general-purpose chatbot, it puts 77 specialised AI agents at your disposal — each
            with a name, a defined role and a focused set of capabilities — covering every function a
            business needs, from leadership and legal to security, education and health.
          </p>
          <p style={bodyText}>
            At the heart of the platform sits NEXA, the head butler and command core: your single point
            of contact that answers across every domain, manages memory and context, and hands work to
            the right specialist. Alongside NEXA works Amber, the chief orchestrator, who turns a
            plain-language brief into a structured mission — with owners, steps and a finish line —
            then coordinates multiple agents and synthesises their output into one answer.
          </p>
          <p style={bodyText}>
            What makes it different is its grounding in the South African reality: CIPC registration,
            SARS, VAT and PAYE, the CCMA, the BCEA and LRA, POPIA, the OHS Act, the CAPS curriculum and
            TVET colleges. Advice is priced in Rand, planned around load-shedding, and delivered in
            plain language — no jargon, no guru nonsense, no pretence.
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: 44 }}>
        <p style={sectionLabel}>02 · Capabilities</p>
        <h2 style={sectionTitle}>Key Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {FEATURES.map(f => (
            <div key={f.k} className="glass-2" style={{ padding: '16px 18px' }}>
              <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 6 }}>{f.k}</div>
              <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.6 }}>{f.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section style={{ marginBottom: 44 }}>
        <p style={sectionLabel}>03 · The Command Center</p>
        <h2 style={sectionTitle}>Thirteen Modules, One Workspace</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {MODULES.map(m => (
            <div key={m.name} className="glass-2" style={{ padding: '13px 16px' }}>
              <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 14, color: 'var(--ink)', letterSpacing: '0.05em', marginBottom: 3 }}>{m.name}</div>
              <p style={{ fontFamily: 'Inter', fontSize: 11.5, color: 'var(--ink-3)', lineHeight: 1.55 }}>{m.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.08em', marginTop: 14 }}>
          <span style={{ color: 'var(--ok)' }}>●</span> MODULES ARE ROLLING OUT IN PHASES — THE AGENT WORKFORCE AND COMMAND INTERFACE ARE LIVE TODAY.
        </p>
      </section>

      {/* Divisions */}
      <section style={{ marginBottom: 44 }}>
        <p style={sectionLabel}>04 · Personnel File</p>
        <h2 style={sectionTitle}>The {agents.length}-Agent Workforce</h2>
        <p style={{ ...bodyText, marginBottom: 18 }}>
          Every agent is on duty behind the one login, organised into {divisions.length} divisions.
          Open any division to meet its agents in the directory.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {divisions.map(d => {
            const color = getCategoryColor(d.id);
            return (
              <div
                key={d.id}
                className="glass"
                onClick={() => navigate('/agents')}
                style={{ padding: '16px 18px', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--line-strong)'; el.style.boxShadow = 'var(--elev-glow)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--line)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 15, color: 'var(--ink)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{d.label}</span>
                  <span style={{
                    marginLeft: 'auto', padding: '2px 8px', borderRadius: 20,
                    background: tint(color, 10), border: `1px solid ${tint(color, 30)}`,
                    fontFamily: 'JetBrains Mono', fontSize: 9, color,
                  }}>{String(d.members.length).padStart(2, '0')}</span>
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: 11.5, color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.55, marginBottom: 8 }}>{DIVISION_CAPTIONS[d.id]}</p>
                <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  {d.members.map(m => m.name).join(' · ')}
                </p>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => navigate('/agents')}
          style={{
            marginTop: 16, display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 10, border: '1px solid var(--cyan)',
            background: 'rgba(34,211,238,0.1)', color: 'var(--cyan)',
            fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 13,
            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          Meet all {agents.length} agents <ChevronRight size={14} />
        </button>
      </section>

      {/* How it's used */}
      <section style={{ marginBottom: 44 }}>
        <p style={sectionLabel}>05 · Operating Procedure</p>
        <h2 style={sectionTitle}>How Can It Be Used?</h2>
        <p style={{ ...bodyText, marginBottom: 16 }}>
          Nexas AI works the way a well-run company does: you talk to the front office, and the right
          people get it done.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
          {STEPS.map((s, i) => (
            <div key={s.k} style={{ display: 'flex', gap: 16, padding: '14px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--gold)', paddingTop: 2, flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 15, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 3 }}>{s.k}</div>
                <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.6 }}>{s.v}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section style={{ marginBottom: 44 }}>
        <p style={sectionLabel}>06 · Applications</p>
        <h2 style={sectionTitle}>What Can It Be Used For?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
          {USES.map(u => (
            <div key={u.k} className="glass" style={{ padding: '18px 20px' }}>
              <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 15, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 6 }}>{u.k}</div>
              <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.6 }}>{u.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ marginBottom: 44 }}>
        <p style={sectionLabel}>07 · Operators</p>
        <h2 style={sectionTitle}>Who Is It For?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
          {WHO.map((w, i) => (
            <div key={w} style={{ display: 'flex', gap: 12, padding: '11px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
              <span style={{ color: 'var(--cyan)', fontSize: 12, paddingTop: 2 }}>▸</span>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>{w}</p>
            </div>
          ))}
        </div>
      </section>

      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.18em', textTransform: 'uppercase', borderTop: '1px solid var(--line)', paddingTop: 18 }}>
        NEXA · ClearVision AI · {agents.length} Agents · {divisions.length} Divisions · {MODULES.length} Modules
      </p>
    </div>
  );
}
