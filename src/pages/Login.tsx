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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'radial-gradient(900px 500px at 50% -10%, rgba(45,212,191,.16), transparent 50%), var(--void)',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36, justifyContent: 'center' }}>
          <div className="nexa-mark" style={{ width: 40, height: 40, fontSize: 13 }}>NX</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.04em' }}>NEXAS</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>77 agents · one workspace</div>
          </div>
        </div>
        <div className="glass" style={{ padding: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 22 }}>Sign in to the ClearVision tenant.</p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Name" type="text" value={name} onChange={setName} autoComplete="name" placeholder="Your name" />
            <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="you@company" />
            <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" placeholder="••••••••" />
            {error && (
              <p style={{ fontSize: 13, color: 'var(--danger)', padding: '10px 12px', background: 'rgba(251,113,133,.08)', borderRadius: 10 }}>{error}</p>
            )}
            <button type="submit" style={{
              marginTop: 6, padding: '12px', borderRadius: 12, border: 'none',
              background: 'var(--cyan)', color: '#042f2e', fontWeight: 800, fontSize: 14, cursor: 'pointer',
            }}>Continue</button>
          </form>
        </div>
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
      <span style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} autoComplete={autoComplete} placeholder={placeholder} style={{
        width: '100%', padding: '12px 14px', background: 'var(--void)', border: '1px solid var(--line)',
        borderRadius: 12, color: 'var(--ink)', fontSize: 14, outline: 'none',
      }} />
    </label>
  );
}
