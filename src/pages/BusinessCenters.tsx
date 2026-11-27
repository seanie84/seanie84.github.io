import { useNavigate } from 'react-router-dom';
import { Briefcase, Scale, Wallet, Users2, Megaphone, Cpu, Shield, Building2 } from 'lucide-react';

const CENTERS = [
  { to: '/sme', label: 'SME', blurb: 'Startup, growth, funding, tenders', Icon: Briefcase, owner: 'Naledi / Thabo' },
  { to: '/crm', label: 'Sales', blurb: 'Pipeline, outreach, quotes', Icon: Users2, owner: 'Charles / Hannah' },
  { to: '/documents', label: 'Legal', blurb: 'Contracts, labour, CCMA', Icon: Scale, owner: 'Cornelius / Peter' },
  { to: '/analytics', label: 'Finance', blurb: 'Cash, tax, collections', Icon: Wallet, owner: 'Liza / Sipho' },
  { to: '/missions', label: 'Marketing', blurb: 'Campaigns, SEO, brand', Icon: Megaphone, owner: 'Evan / Rachel' },
  { to: '/plugins', label: 'Technology', blurb: 'Engines, tools, automation', Icon: Cpu, owner: 'Nadia' },
  { to: '/memory', label: 'People', blurb: 'HR, safety, training notes', Icon: Users2, owner: 'Karen / Cory' },
  { to: '/settings', label: 'Security', blurb: 'Keys, access, operator desk', Icon: Shield, owner: 'NEXAS' },
];

export default function BusinessCenters() {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)' }}>Business Centers</h1>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 8 }}>Each center is a door into the work. Open one to continue.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {CENTERS.map(({ to, label, blurb, Icon, owner }) => (
          <button key={label} type="button" onClick={() => navigate(to)} className="glass" style={{
            textAlign: 'left', padding: 18, cursor: 'pointer', border: '1px solid var(--line)', background: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Building2 size={16} color="var(--cyan)" />
              <Icon size={16} color="var(--ink-2)" />
              <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 8 }}>{blurb}</p>
            <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>Lead: {owner}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
