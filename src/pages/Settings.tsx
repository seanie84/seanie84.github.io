import { useState, type CSSProperties } from 'react';
import {
  DEEPSEEK_MODELS,
  DEFAULT_DEEPSEEK_MODEL,
  DEFAULT_QWEN_MODEL,
  ENGINE_LABEL,
  QWEN_MODELS,
  clearDeepseekKey,
  clearQwenKey,
  getDeepseekKey,
  getDeepseekModel,
  getEngine,
  getFailover,
  getGroqKey,
  getLocalModel,
  getLocalUrl,
  getQwenKey,
  getQwenModel,
  pingEngine,
  setDeepseekKey,
  setDeepseekModel,
  setEngine,
  setFailover,
  setGroqKey,
  setLocalModel,
  setLocalUrl,
  setQwenKey,
  setQwenModel,
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
  const [deepseek, setDeepseek] = useState(() => getDeepseekKey());
  const [dmodel, setDmodel] = useState(() => getDeepseekModel() || DEFAULT_DEEPSEEK_MODEL);
  const [qwen, setQwen] = useState(() => getQwenKey());
  const [qmodel, setQmodel] = useState(() => getQwenModel() || DEFAULT_QWEN_MODEL);
  const [failover, setFail] = useState(() => getFailover());
  const [localUrl, setUrl] = useState(() => getLocalUrl());
  const [localModel, setLmodel] = useState(() => getLocalModel());
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  function save() {
    setEngine(engine);
    setGeminiKey(key);
    setGeminiModel(gmodel);
    setGroqKey(groq);
    setDeepseekKey(deepseek);
    setDeepseekModel(dmodel);
    setQwenKey(qwen);
    setQwenModel(qmodel);
    setFailover(failover);
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
      <h1 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 4 }}>Settings</h1>
      <p style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.12em', marginBottom: 28 }}>PRIMARY ENGINE · FAILOVER GEMINI → QWEN</p>

      <div className="glass" style={{ padding: 24, maxWidth: 560, boxShadow: 'var(--elev-card)', marginBottom: 16 }}>
        <div style={label}>PRIMARY ENGINE</div>
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

        {engine === 'deepseek' && (
          <>
            <div style={label}>DEEPSEEK API KEY</div>
            <input type="password" value={deepseek} onChange={(e) => setDeepseek(e.target.value)} placeholder="sk-…" autoComplete="off" style={field} />
            <div style={label}>DEEPSEEK MODEL</div>
            <select value={dmodel} onChange={(e) => setDmodel(e.target.value)} style={field}>
              {DEEPSEEK_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </>
        )}

        {engine === 'qwen' && (
          <>
            <div style={label}>QWEN DASHSCOPE KEY</div>
            <input type="password" value={qwen} onChange={(e) => setQwen(e.target.value)} placeholder="sk-…" autoComplete="off" style={field} />
            <div style={label}>QWEN MODEL</div>
            <select value={qmodel} onChange={(e) => setQmodel(e.target.value)} style={field}>
              {QWEN_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--ink-2)', marginBottom: 12, lineHeight: 1.5 }}>
              International DashScope: dashscope-intl.aliyuncs.com (Singapore). Same key is used as the Qwen failover.
            </p>
          </>
        )}

        {(engine === 'ollama' || engine === 'lmstudio') && (
          <>
            <div style={label}>LOCAL API URL</div>
            <input value={localUrl} onChange={(e) => setUrl(e.target.value)} style={field} />
            <div style={label}>LOCAL MODEL</div>
            <input value={localModel} onChange={(e) => setLmodel(e.target.value)} placeholder="qwen3:8b" style={field} />
          </>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={save} style={btn}>Save</button>
          <button type="button" onClick={() => void test()} disabled={busy} style={btn}>{busy ? 'Testing…' : 'Test engine'}</button>
        </div>
        {status && <p style={{ marginTop: 16, fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)', whiteSpace: 'pre-wrap' }}>{status}</p>}
      </div>

      <div className="glass" style={{ padding: 24, maxWidth: 560, boxShadow: 'var(--elev-card)' }}>
        <div style={label}>FAILOVER</div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontFamily: 'Inter', fontSize: 14, color: 'var(--ink)', cursor: 'pointer' }}>
          <input type="checkbox" checked={failover} onChange={(e) => setFail(e.target.checked)} />
          If primary dies, try Gemini then Qwen
        </label>
        <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--ink-2)', marginBottom: 16, lineHeight: 1.5 }}>
          Ask NEXA, specialists, and Amber all use this chain. A skipped or failed engine is logged in the Test result as [gemini failover] or [qwen failover].
        </p>

        <div style={label}>GEMINI FAILOVER KEY</div>
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="AIza…" autoComplete="off" style={field} />
        <div style={label}>GEMINI FAILOVER MODEL</div>
        <select value={gmodel} onChange={(e) => setGmodel(e.target.value)} style={field}>
          {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <div style={label}>QWEN FAILOVER KEY (DASHSCOPE)</div>
        <input type="password" value={qwen} onChange={(e) => setQwen(e.target.value)} placeholder="sk-…" autoComplete="off" style={field} />
        <div style={label}>QWEN FAILOVER MODEL</div>
        <select value={qmodel} onChange={(e) => setQmodel(e.target.value)} style={field}>
          {QWEN_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={save} style={btn}>Save failovers</button>
          <button type="button" onClick={() => { clearGeminiKey(); setKey(''); setStatus('Gemini key removed.'); }} style={{ ...btn, background: 'transparent', color: 'var(--ink-2)', border: '1px solid var(--line)' }}>Remove Gemini</button>
          <button type="button" onClick={() => { clearQwenKey(); setQwen(''); setStatus('Qwen key removed.'); }} style={{ ...btn, background: 'transparent', color: 'var(--ink-2)', border: '1px solid var(--line)' }}>Remove Qwen</button>
          <button type="button" onClick={() => { clearDeepseekKey(); setDeepseek(''); setStatus('DeepSeek key removed.'); }} style={{ ...btn, background: 'transparent', color: 'var(--ink-2)', border: '1px solid var(--line)' }}>Remove DeepSeek</button>
        </div>
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
