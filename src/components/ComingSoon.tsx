import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  step?: number;
  totalSteps?: number;
}

export default function ComingSoon({ icon: Icon, title, description, step, totalSteps }: Props) {
  const iconColor = 'var(--violet)';
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'rgba(34,211,238,0.08)',
            border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={18} style={{ color: iconColor }} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)' }}>{title}</h1>
            {step && totalSteps && (
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Module {step} of {totalSteps}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="glass" style={{ padding: 40, textAlign: 'center', boxShadow: 'var(--elev-card)' }}>
        {/* Loading animation */}
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--cyan)',
                animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
        <Icon size={48} style={{ color: iconColor, opacity: 0.3, marginBottom: 20, display: 'block', margin: '0 auto 20px' }} />
        <h2 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 20, color: 'var(--ink)', marginBottom: 10, textTransform: 'uppercase' }}>
          Coming Soon
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-3)', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
