import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { OPERATOR_EMAIL, useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login, hasPassword } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(OPERATOR_EMAIL);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const result = await login(name, email, password, hasPassword ? undefined : confirm);
      if (result.ok) navigate('/dashboard');
      else setError(result.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'linear-gradient(180deg, #f6f7f9 0%, #eef2f6 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, justifyContent: 'center' }}>
          <div className="nexa-mark" style={{ width: 44, height: 44, fontSize: 14 }}>NX</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.04em', color: 'var(--ink)' }}>NEXAS</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>77 agents · one workspace</div>
          </div>
        </div>
        <div className="glass" style={{ padding: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6, color: 'var(--ink)' }}>
            {hasPassword ? 'Welcome back' : 'Set your desk'}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 22 }}>
            {hasPassword
              ? 'Sign in with the password you chose.'
              : 'First visit: choose a password for this browser. Min 8 characters.'}
          </p>
          <form onSubmit={(e) => void handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Name" type="text" value={name} onChange={setName} autoComplete="name" placeholder="Your name" />
            <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder={OPERATOR_EMAIL} />
            <Field label={hasPassword ? 'Password' : 'Choose password'} type="password" value={password} onChange={setPassword} autoComplete={hasPassword ? 'current-password' : 'new-password'} placeholder="••••••••" />
            {!hasPassword && (
              <Field label="Confirm password" type="password" value={confirm} onChange={setConfirm} autoComplete="new-password" placeholder="••••••••" />
            )}
            {error && (
              <p style={{ fontSize: 13, color: 'var(--danger)', padding: '10px 12px', background: 'rgba(225,29,72,.06)', borderRadius: 10 }}>{error}</p>
            )}
            <button type="submit" disabled={busy} style={{
              marginTop: 6, padding: '12px', borderRadius: 12, border: 'none',
              background: 'var(--cyan)', color: '#ffffff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            }}>{busy ? 'Please wait…' : hasPassword ? 'Sign in' : 'Save password and enter'}</button>
          </form>
          <p style={{ marginTop: 16, fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>
            Operator: {OPERATOR_EMAIL}
          </p>
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
        width: '100%', padding: '12px 14px', background: '#ffffff', border: '1px solid var(--line)',
        borderRadius: 12, color: 'var(--ink)', fontSize: 14, outline: 'none',
      }} />
    </label>
  );
}
