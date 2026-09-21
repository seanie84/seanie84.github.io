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
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--void)' }}>
      <aside className="login-rail" style={{
        width: '42%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '48px 40px',
        background:
          'linear-gradient(180deg, rgba(14,16,19,0.2), rgba(14,16,19,0.92)), radial-gradient(800px 400px at 20% 10%, rgba(61,154,140,0.18), transparent 50%), #12151a',
        borderRight: '1px solid var(--line)',
      }}>
        <div>
          <div className="nexa-mark" style={{ width: 40, height: 40, fontSize: 12 }}>NX</div>
          <h1 style={{ marginTop: 28, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 28, letterSpacing: '0.08em', color: 'var(--ink)' }}>NEXAS</h1>
          <p style={{ marginTop: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.16em' }}>
            AGENT DESK · 77 SPECIALISTS
          </p>
        </div>
        <p style={{ fontFamily: 'IBM Plex Sans', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 360 }}>
          Operator sign-in for the ClearVision AI tenant. One HUD. Local keys. Not Nexora.
        </p>
        <p style={{ fontFamily: 'IBM Plex Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.08em' }}>
          Groq · Gemini · DeepSeek · Qwen · failover chain
        </p>
      </aside>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.16em', marginBottom: 10 }}>CHECKPOINT</div>
          <h2 style={{ fontFamily: 'IBM Plex Sans', fontWeight: 700, fontSize: 22, color: 'var(--ink)', marginBottom: 24 }}>Operator sign-in</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Name" type="text" value={name} onChange={setName} autoComplete="name" placeholder="Your name" />
            <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="operator@yourdomain" />
            <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" placeholder="••••••••" />
            {error && (
              <p style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'var(--danger)', padding: '10px 12px', background: 'rgba(196,92,92,0.1)', border: '1px solid rgba(196,92,92,0.35)' }}>{error}</p>
            )}
            <button type="submit" style={{
              marginTop: 8, padding: '12px', borderRadius: 2, border: '1px solid var(--cyan)',
              background: 'var(--cyan)', color: '#0e1013', fontFamily: 'IBM Plex Sans',
              fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
            }}>Authenticate</button>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, type, value, onChange, autoComplete, placeholder }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; autoComplete?: string; placeholder?: string;
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', marginBottom: 6, fontFamily: 'IBM Plex Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} autoComplete={autoComplete} placeholder={placeholder} style={{
        width: '100%', padding: '11px 14px', background: 'var(--navy-2)', border: '1px solid var(--line)',
        borderRadius: 2, color: 'var(--ink)', fontFamily: 'IBM Plex Sans', fontSize: 14, outline: 'none',
      }} />
    </label>
  );
}
