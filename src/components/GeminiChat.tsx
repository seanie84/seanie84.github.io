import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Agent } from '../data/types';
import { hasGeminiKey, type ChatTurn } from '../lib/gemini';
import { askAgent, askNexa } from '../lib/brain';

export default function GeminiChat({ agent }: { agent?: Agent }) {
  const [ready, setReady] = useState(hasGeminiKey());
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const end = useRef<HTMLDivElement>(null);
  const name = agent?.name || 'NEXA';

  useEffect(() => {
    setReady(hasGeminiKey());
  }, []);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    setErr('');
    const next = [...turns, { role: 'user' as const, text }];
    setTurns(next);
    setBusy(true);
    try {
      const reply = agent
        ? await askAgent(agent, text, turns)
        : await askNexa(text, turns);
      setTurns([...next, { role: 'model', text: reply }]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  if (!ready) {
    return (
      <div style={{ padding: '12px 14px', background: 'rgba(34,211,238,0.06)', borderRadius: 8, border: '1px solid var(--line)' }}>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--cyan)', letterSpacing: '0.08em', lineHeight: 1.6 }}>
          GEMINI RUNS NEXAS. PASTE YOUR GOOGLE AI STUDIO KEY IN{' '}
          <Link to="/settings" style={{ color: 'var(--cyan)' }}>SETTINGS</Link>
          {' '}TO TALK TO {name.toUpperCase()}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: 8 }}>
        GEMINI · {name.toUpperCase()}
      </div>
      <div style={{ maxHeight: 240, overflowY: 'auto', marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {turns.map((t, i) => (
          <div key={i} style={{
            alignSelf: t.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '92%',
            padding: '8px 10px',
            borderRadius: 10,
            background: t.role === 'user' ? 'rgba(34,211,238,0.12)' : 'var(--glass)',
            border: '1px solid var(--line)',
            fontFamily: 'Inter', fontSize: 13, color: 'var(--ink)', whiteSpace: 'pre-wrap',
          }}>{t.text}</div>
        ))}
        {busy && <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)' }}>GEMINI THINKING…</div>}
        <div ref={end} />
      </div>
      {err && <p style={{ color: '#fca5a5', fontSize: 12, marginBottom: 8 }}>{err}</p>}
      <form onSubmit={(e) => { e.preventDefault(); void send(); }} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask ${name}…`}
          style={{
            flex: 1, padding: '9px 12px', background: 'var(--glass)',
            border: '1px solid var(--line)', borderRadius: 8, color: 'var(--ink)',
            fontFamily: 'Inter', fontSize: 13, outline: 'none',
          }}
        />
        <button type="submit" disabled={busy} style={{
          padding: '9px 14px', borderRadius: 8, border: 'none',
          background: 'var(--cyan)', color: 'var(--bg)', fontWeight: 700, cursor: 'pointer',
        }}>Send</button>
      </form>
    </div>
  );
}
