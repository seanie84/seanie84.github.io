import { Link } from 'react-router-dom';

const PLUGINS = [
  ['Gemini', 'Google AI Studio free quota'],
  ['Groq', 'Free cloud OpenAI-compatible API'],
  ['Ollama', 'Local models on this PC'],
  ['LM Studio', 'Local GUI + localhost:1234'],
];

export default function Plugins() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>Plugins</h1>
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 24 }}>FREE ENGINES ONLY</p>
      {PLUGINS.map(([name, blurb]) => (
        <div key={name} className="glass" style={{ padding: 16, marginBottom: 10, maxWidth: 560 }}>
          <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, color: 'var(--ink)' }}>{name}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)' }}>{blurb}</div>
        </div>
      ))}
      <p style={{ marginTop: 12, fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-2)' }}>
        Arm one in <Link to="/settings" style={{ color: 'var(--cyan)' }}>Settings</Link>. See FREE_RUN.md in the repo.
      </p>
    </div>
  );
}
