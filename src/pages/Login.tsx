import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { OPERATOR_EMAIL, savedName, useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login, hasPassword } = useAuth();
  const navigate = useNavigate();
  const known = savedName();
  const first = known.split(' ')[0];
  const [name, setName] = useState(known);
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
    <div className="login-stage">
      <div className="login-rail" style={{
        position: 'relative', overflow: 'hidden', minHeight: 320,
        background: 'url(/finish/desk.jpg) center/cover no-repeat',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(243,239,230,.08) 0%, rgba(159,18,57,.28) 100%)',
        }} />
        <div style={{ position: 'absolute', left: 36, bottom: 36, color: '#fff', maxWidth: 460 }}>
          <img src="/finish/mark.jpg" alt="" width={64} height={64} style={{ borderRadius: 18, objectFit: 'cover', marginBottom: 16, boxShadow: '0 10px 28px rgba(28,25,21,.3)' }} />
          <div style={{ fontWeight: 800, fontSize: 36, letterSpacing: '-0.05em', lineHeight: 1 }}>NEXAS</div>
          <div style={{ fontSize: 16, marginTop: 8, opacity: 0.95 }}>Your desk. Your specialists. Your name on the door.</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28, background: 'linear-gradient(180deg, #f7f3ea, #f3efe6)' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <div className="glass" style={{ padding: 36 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--cyan)', marginBottom: 8 }}>
              {hasPassword ? 'WELCOME BACK' : 'FIRST VISIT'}
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.05em', marginBottom: 8, color: 'var(--ink)', lineHeight: 1.05 }}>
              {hasPassword && first ? `Good to see you, ${first}.` : hasPassword ? 'Welcome back.' : 'Set your desk.'}
            </h1>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 24, lineHeight: 1.5 }}>
              {hasPassword
                ? 'Sign in and the desk will greet you by name.'
                : 'Choose a password for this browser. Minimum 8 characters.'}
            </p>
            <form onSubmit={(e) => void handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }} aria-describedby={error ? 'login-error' : undefined}>
              <Field label="Name" type="text" value={name} onChange={setName} autoComplete="name" placeholder="Your name" />
              <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder={OPERATOR_EMAIL} />
              <Field label={hasPassword ? 'Password' : 'Choose password'} type="password" value={password} onChange={setPassword} autoComplete={hasPassword ? 'current-password' : 'new-password'} placeholder="••••••••" />
              {!hasPassword && (
                <Field label="Confirm password" type="password" value={confirm} onChange={setConfirm} autoComplete="new-password" placeholder="••••••••" />
              )}
              <div id="login-error" role="alert" aria-live="assertive">
                {error && (
                  <p style={{ fontSize: 13, color: 'var(--danger)', padding: '10px 12px', background: 'rgba(159,18,57,.08)', borderRadius: 10 }}>{error}</p>
                )}
              </div>
              <button type="submit" disabled={busy} style={{
                marginTop: 6, padding: '14px', borderRadius: 14, border: 'none', minHeight: 48,
                background: 'linear-gradient(180deg, #be123c, #9f1239)', color: '#ffffff',
                fontWeight: 700, fontSize: 15, cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(159,18,57,.22)',
              }}>{busy ? 'Please wait…' : hasPassword ? 'Enter the desk' : 'Save password and enter'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, autoComplete, placeholder }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; autoComplete?: string; placeholder?: string;
}) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <label htmlFor={id} style={{ display: 'block' }}>
      <span style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</span>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} autoComplete={autoComplete} placeholder={placeholder} style={{
        width: '100%', padding: '13px 14px', background: '#fffdf8', border: '1px solid var(--line)',
        borderRadius: 12, color: 'var(--ink)', fontSize: 15, outline: 'none', minHeight: 46,
      }} />
    </label>
  );
}
