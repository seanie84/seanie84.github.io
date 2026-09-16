import { useState, type CSSProperties } from 'react';
import {
  ENGINE_LABEL,
  getEngine,
  getGroqKey,
  getLocalModel,
  getLocalUrl,
  pingEngine,
  setEngine,
  setGroqKey,
  setLocalModel,
  setLocalUrl,
  type EngineId,
} from '../lib/engine';
import {
  DEFAULT_MODEL,
  MODELS,
  clearGeminiKey,
  getGeminiKey,
  getGeminiModel,
  setGeminiKey,
  setGeminiModel,
} from '../lib/gemini';

export default function Settings() {
  const [engine, setEng] = useState<EngineId>(() => getEngine());
  const [key, setKey] = useState(() => getGeminiKey());
  const [gmodel, setGmodel] = useState(() => getGeminiModel() || DEFAULT_MODEL);
  const [groq, setGroq] = useState(() => getGroqKey());
  const [localUrl, setUrl] = useState(() => getLocalUrl());
  const [localModel, setLmodel] = useState(() => getLocalModel());
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  function save() {
    setEngine(engine);
    setGeminiKey(key);
    setGeminiModel(gmodel);
    setGroqKey(groq);
    setLocalUrl(localUrl);
    setLocalModel(localModel);
    setStatus('Saved on this device only.');
  }

  async function test() {
    save();
    setBusy(true);
    setStatus('Calling engine…');
    try {
      setStatus('Online — ' + await pingEngine());
    } catch (e) {
      setStatus(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>Settings</h1>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 28 }}>FREE ENGINES · GEMINI QUOTA · GROQ · OLLAMA · LM STUDIO</p>

      <div className="glass" style={{ padding: 24, maxWidth: 560, boxShadow: 'var(--elev-card)' }}>
        <div style={label}>ENGINE</div>
        <select value={engine} onChange={(e) => setEng(e.target.value as EngineId)} style={field}>
          {(Object.keys(ENGINE_LABEL) as EngineId[]).map((id) => (
            <option key={id} value={id}>{ENGINE_LABEL[id]}</option>
          ))}
        </select>

        {engine === 'gemini' && (
          <>
            <div style={label}>GOOGLE AI STUDIO KEY (FREE)</div>
            <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="AIza…" autoComplete="off" style={field} />
            <div style={label}>GEMINI MODEL</div>
            <select value={gmodel} onChange={(e) => setGmodel(e.target.value)} style={field}>
              {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </>
        )}

        {engine === 'groq' && (
          <>
            <div style={label}>GROQ KEY (FREE TIER)</div>
            <input type="password" value={groq} onChange={(e) => setGroq(e.target.value)} placeholder="gsk_…" autoComplete="off" style={field} />
            <div style={label}>GROQ MODEL</div>
            <input value={localModel} onChange={(e) => setLmodel(e.target.value)} placeholder="llama-3.3-70b-versatile" style={field} />
          </>
        )}

        {(engine === 'ollama' || engine === 'lmstudio') && (
          <>
            <div style={label}>LOCAL API URL</div>
            <input value={localUrl} onChange={(e) => setUrl(e.target.value)} style={field} />
            <div style={label}>LOCAL MODEL</div>
            <input value={localModel} onChange={(e) => setLmodel(e.target.value)} placeholder="qwen3:8b" style={field} />
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--ink-2)', marginBottom: 12, lineHeight: 1.5 }}>
              GitHub Pages may block localhost. Fastest free path: run NEXAS with npm run dev on this PC, or set OLLAMA_ORIGINS=https://seanie84.github.io
            </p>
          </>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={save} style={btn}>Save</button>
          <button type="button" onClick={() => void test()} disabled={busy} style={btn}>{busy ? 'Testing…' : 'Test engine'}</button>
          <button type="button" onClick={() => { clearGeminiKey(); setKey(''); setStatus('Gemini key removed.'); }} style={{ ...btn, background: 'transparent', color: 'var(--ink-2)', border: '1px solid var(--line)' }}>Remove Gemini key</button>
        </div>
        {status && <p style={{ marginTop: 16, fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)', whiteSpace: 'pre-wrap' }}>{status}</p>}
      </div>
    </div>
  );
}

const label: CSSProperties = {
  fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em', marginBottom: 8,
};
const field: CSSProperties = {
  width: '100%', padding: '10px 12px', marginBottom: 14,
  background: 'var(--void)', border: '1px solid var(--line)', borderRadius: 8,
  color: 'var(--ink)', fontFamily: 'Inter', fontSize: 13, outline: 'none',
};
const btn: CSSProperties = {
  padding: '10px 16px', borderRadius: 8, border: 'none',
  background: 'var(--cyan)', color: 'var(--bg)', fontWeight: 700, cursor: 'pointer',
};
