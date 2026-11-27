import { useState, type CSSProperties } from 'react';
import { useAuth } from '../hooks/useAuth';
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
import {
  AG_UI_ENDPOINT_KEY,
  AG_UI_FLAG_KEY,
  DEFAULT_LOCAL_OLLAMA_MODELS,
  DEFAULT_LOCAL_OLLAMA_URL,
  LOCAL_OLLAMA_MODEL_KEY,
  LOCAL_OLLAMA_URL_KEY,
  getAgUiEndpoint,
  getLocalOllamaConfig,
  isAgUiEnabled,
} from '../lib/nexa-ag-ui';

export default function Settings() {
  const { resetPassword } = useAuth();
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
  const [agUiOn, setAgUiOn] = useState(() => isAgUiEnabled());
  const [agUiEndpoint, setAgUiEndpoint] = useState(() => getAgUiEndpoint());
  const initialOllama = getLocalOllamaConfig();
  const [ollamaUrl, setOllamaUrl] = useState(initialOllama.baseUrl || DEFAULT_LOCAL_OLLAMA_URL);
  const [ollamaModel, setOllamaModel] = useState(initialOllama.models[0] || DEFAULT_LOCAL_OLLAMA_MODELS[0]);
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
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 6 }}>Settings</h1>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 28 }}>Primary engine and Gemini → Qwen failover.</p>

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

      <div className="nexa-card" style={{ padding: 22, marginTop: 18 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 16 }}>AG-UI and local Ollama</h2>
        <p style={{ margin: '0 0 14px', color: 'var(--ink-2)', fontSize: 13 }}>
          Optional. The chat widget stays off and the endpoint starts empty so this site never talks to NEXORA unless you set a URL. Local Ollama values are stored in this browser only.
        </p>
        <label style={label} htmlFor="agui-flag">Enable AG-UI widget</label>
        <select id="agui-flag" value={agUiOn ? 'on' : 'off'} onChange={(e) => setAgUiOn(e.target.value === 'on')} style={field}>
          <option value="off">Off (default)</option>
          <option value="on">On</option>
        </select>
        <label style={label} htmlFor="agui-endpoint">AG-UI endpoint</label>
        <input id="agui-endpoint" value={agUiEndpoint} onChange={(e) => setAgUiEndpoint(e.target.value)} placeholder="Leave empty by default" style={field} />
        <label style={label} htmlFor="ollama-url">Local Ollama base URL</label>
        <input id="ollama-url" value={ollamaUrl} onChange={(e) => setOllamaUrl(e.target.value)} placeholder={DEFAULT_LOCAL_OLLAMA_URL} style={field} />
        <label style={label} htmlFor="ollama-model">Preferred local model</label>
        <input id="ollama-model" value={ollamaModel} onChange={(e) => setOllamaModel(e.target.value)} placeholder={DEFAULT_LOCAL_OLLAMA_MODELS[0]} style={field} />
        <button type="button" onClick={() => {
          localStorage.setItem(AG_UI_FLAG_KEY, agUiOn ? 'on' : 'off');
          localStorage.setItem(AG_UI_ENDPOINT_KEY, agUiEndpoint.trim());
          localStorage.setItem(LOCAL_OLLAMA_URL_KEY, ollamaUrl.trim() || DEFAULT_LOCAL_OLLAMA_URL);
          localStorage.setItem(LOCAL_OLLAMA_MODEL_KEY, ollamaModel.trim() || DEFAULT_LOCAL_OLLAMA_MODELS[0]);
          setStatus('AG-UI settings saved in this browser.');
        }} style={btn}>Save AG-UI settings</button>
      </div>

      <div className="glass" style={{ padding: 24, maxWidth: 560, marginTop: 16 }}>
        <div style={label}>OPERATOR PASSWORD</div>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)', marginBottom: 12, lineHeight: 1.5 }}>
          Forgot the password? This clears the local hash so the next visit can set a new one. You will be signed out.
        </p>
        <button type="button" onClick={() => { resetPassword(); setStatus('Password cleared. Sign in again to set a new one.'); }} style={{ ...btn, background: 'transparent', color: 'var(--ink-2)', border: '1px solid var(--line)' }}>Reset password</button>
      </div>
    </div>
  );
}

const label: CSSProperties = {
  fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8,
};
const field: CSSProperties = {
  width: '100%', padding: '12px 14px', marginBottom: 14,
  background: 'var(--void)', border: '1px solid var(--line)', borderRadius: 12,
  color: 'var(--ink)', fontSize: 14, outline: 'none',
};
const btn: CSSProperties = {
  padding: '10px 16px', borderRadius: 12, border: 'none',
  background: 'var(--cyan)', color: '#042f2e', fontWeight: 700, cursor: 'pointer',
};
