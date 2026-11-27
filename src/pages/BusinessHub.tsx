import { useNavigate } from 'react-router-dom';
import { Building2, Briefcase, Users2, FileText, BarChart2, Target, Wallet, Scale } from 'lucide-react';

const CENTERS = [
  { to: '/sme', label: 'SME Center', blurb: 'Growth, funding and compliance for South African small business', Icon: Briefcase },
  { to: '/crm', label: 'CRM', blurb: 'Contacts and pipeline kept on this device', Icon: Users2 },
  { to: '/quotes', label: 'Quotes', blurb: 'Draft proposals and pricing', Icon: FileText },
  { to: '/analytics', label: 'Analytics', blurb: 'Numbers and performance', Icon: BarChart2 },
  { to: '/missions', label: 'Missions', blurb: 'Amber turns a brief into a plan', Icon: Target },
  { to: '/documents', label: 'Documents', blurb: 'Files and records', Icon: FileText },
];

const SNAPSHOT = [
  { label: 'Active centers', value: '6', Icon: Building2 },
  { label: 'CRM contacts', value: 'Local', Icon: Users2 },
  { label: 'Finance', value: 'Ready', Icon: Wallet },
  { label: 'Compliance', value: 'SA', Icon: Scale },
];

export default function BusinessHub() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="glass" style={{ overflow: 'hidden', marginBottom: 24, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(200px, 340px)' }}>
        <div style={{ padding: 28 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)' }}>Business Hub</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 8 }}>ClearVision AI operations in one place. NEXAS runs the agents. NEXORA stays separate.</p>
        </div>
        <img src="/finish/hub.jpg" alt="Business park model" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 180 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 32 }}>
        {SNAPSHOT.map(({ label, value, Icon }) => (
          <div key={label} className="glass" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: 'var(--ink-3)' }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
              <Icon size={16} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>{value}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: 'var(--ink)' }}>Centers</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {CENTERS.map(({ to, label, blurb, Icon }) => (
          <button key={to} type="button" onClick={() => navigate(to)} className="glass" style={{
            textAlign: 'left', padding: 18, cursor: 'pointer', border: '1px solid var(--line)', background: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Icon size={18} color="var(--cyan)" />
              <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{blurb}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
