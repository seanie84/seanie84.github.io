import { Users2 } from 'lucide-react';

export default function CRM() {
  const iconColor = 'var(--ok)';
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
            <Users2 size={18} style={{ color: iconColor }} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)' }}>CRM</h1>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Manage contacts, leads and customer relationships.</p>
          </div>
        </div>
      </div>
      <div className="glass" style={{ padding: 40, textAlign: 'center', boxShadow: 'var(--elev-card)' }}>
        <Users2 size={48} style={{ color: iconColor, opacity: 0.3, marginBottom: 20, display: 'block', margin: '0 auto 20px' }} />
        <h2 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 20, color: 'var(--ink)', marginBottom: 10, textTransform: 'uppercase' }}>Coming Soon</h2>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-3)', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
          Manage contacts, leads and customer relationships. Connect your AI API keys in Settings to unlock full functionality.
        </p>
      </div>
    </div>
  );
}
