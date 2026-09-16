import { useState, type CSSProperties } from 'react';
import {
  DEFAULT_MODEL,
  MODELS,
  clearGeminiKey,
  getGeminiKey,
  getGeminiModel,
  pingGemini,
  setGeminiKey,
  setGeminiModel,
} from '../lib/gemini';

export default function Settings() {
  const [key, setKey] = useState(() => getGeminiKey());
  const [model, setModel] = useState(() => getGeminiModel() || DEFAULT_MODEL);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  function save() {
    setGeminiKey(key);
    setGeminiModel(model);
    setStatus(key.trim() ? 'Saved on this device only. Not uploaded to GitHub.' : 'Key cleared.');
  }

  async function test() {
    setGeminiKey(key);
    setGeminiModel(model);
    setBusy(true);
    setStatus('Calling Gemini…');
    try {
      const reply = await pingGemini();
      setStatus('Online — ' + reply);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>
        Settings
      </h1>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 28 }}>
        GEMINI IS THE NEXAS ENGINE AND BRAIN
      </p>

      <div className="glass" style={{ padding: 24, maxWidth: 560, boxShadow: 'var(--elev-card)' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em', marginBottom: 10 }}>
          GOOGLE AI STUDIO API KEY
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)', marginBottom: 12, lineHeight: 1.5 }}>
          Create a key at aistudio.google.com/apikey. It stays in this browser only.
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="AIza…"
          autoComplete="off"
          style={{
            width: '100%', padding: '10px 12px', marginBottom: 14,
            background: 'var(--void)', border: '1px solid var(--line)', borderRadius: 8,
            color: 'var(--ink)', fontFamily: 'JetBrains Mono', fontSize: 13, outline: 'none',
          }}
        />
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em', marginBottom: 8 }}>MODEL</div>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          style={{
            width: '100%', padding: '10px 12px', marginBottom: 18,
            background: 'var(--void)', border: '1px solid var(--line)', borderRadius: 8,
            color: 'var(--ink)', fontFamily: 'Inter', fontSize: 13,
          }}
        >
          {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={save} style={btn}>Save</button>
          <button type="button" onClick={() => void test()} disabled={busy} style={btn}>{busy ? 'Testing…' : 'Test Gemini'}</button>
          <button type="button" onClick={() => { clearGeminiKey(); setKey(''); setStatus('Key removed from this device.'); }} style={{ ...btn, background: 'transparent', color: 'var(--ink-2)', border: '1px solid var(--line)' }}>Remove key</button>
        </div>
        {status && <p style={{ marginTop: 16, fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)', whiteSpace: 'pre-wrap' }}>{status}</p>}
      </div>
    </div>
  );
}

const btn: CSSProperties = {
  padding: '10px 16px',
  borderRadius: 8,
  border: 'none',
  background: 'var(--cyan)',
  color: 'var(--bg)',
  fontWeight: 700,
  cursor: 'pointer',
};
