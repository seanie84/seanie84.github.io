import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { OPERATOR_EMAIL, useAuth } from '../hooks/useAuth';
import BackgroundPlate from '../components/layout/BackgroundPlate';

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
      position: 'relative',
      zIndex: 1,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <BackgroundPlate src1080="/bg-login-1080.jpg" src4k="/bg-login.jpg" dim={0.38} />
      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, justifyContent: 'center' }}>
          <div className="nexa-mark" style={{ width: 40, height: 40, fontSize: 13 }}>NX</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.04em' }}>NEXAS</div>
            <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>77 agents · one workspace</div>
          </div>
        </div>
        <div className="glass" style={{ padding: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6 }}>
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
              <p style={{ fontSize: 13, color: 'var(--danger)', padding: '10px 12px', background: 'rgba(251,113,133,.08)', borderRadius: 10 }}>{error}</p>
            )}
            <button type="submit" disabled={busy} style={{
              marginTop: 6, padding: '12px', borderRadius: 12, border: 'none',
              background: 'var(--cyan)', color: '#042f2e', fontWeight: 800, fontSize: 14, cursor: 'pointer',
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
        width: '100%', padding: '12px 14px', background: 'rgba(9,9,11,.65)', border: '1px solid var(--line-strong)',
        borderRadius: 12, color: 'var(--ink)', fontSize: 14, outline: 'none',
      }} />
    </label>
  );
}
