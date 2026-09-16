import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (login(name, email, password)) navigate('/dashboard');
    else setError('Sign-in refused. Check the operator email and password.');
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--void)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg, var(--cyan), var(--gold))',
            marginBottom: 16, boxShadow: '0 0 40px rgba(34,211,238,0.3)',
          }}>
            <span style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 22, color: '#000' }}>NX</span>
          </div>
          <h1 style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '0.12em', marginBottom: 6 }}>NEXAS AI</h1>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            77 AGENTS · FREE ENGINE · NOT NEXORA
          </p>
        </div>
        <div className="glass" style={{ padding: 32, boxShadow: 'var(--elev-glow)' }}>
          <h2 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 18, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 24 }}>Operator Sign-In</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Name" type="text" value={name} onChange={setName} autoComplete="name" placeholder="Your name" />
            <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="operator@yourdomain" />
            <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" placeholder="••••••••" />
            {error && (
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--danger)', padding: '10px 12px', background: 'rgba(251,113,133,0.08)', borderRadius: 8, border: '1px solid rgba(251,113,133,0.2)' }}>{error}</p>
            )}
            <button type="submit" style={{
              marginTop: 8, padding: '12px', borderRadius: 10, border: '1px solid var(--cyan)',
              background: 'rgba(34,211,238,0.12)', color: 'var(--cyan)', fontFamily: 'Rajdhani',
              fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
            }}>Authenticate</button>
          </form>
        </div>
        <p style={{ textAlign: 'center', marginTop: 24, fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>
          NEXAS · ClearVision AI · Different app from NEXORA
        </p>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, autoComplete, placeholder }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; autoComplete?: string; placeholder?: string;
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', marginBottom: 6, fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} autoComplete={autoComplete} placeholder={placeholder} style={{
        width: '100%', padding: '11px 14px', background: 'rgba(14,37,71,0.6)', border: '1px solid var(--line)',
        borderRadius: 8, color: 'var(--ink)', fontFamily: 'Inter', fontSize: 14, outline: 'none',
      }} />
    </label>
  );
}
