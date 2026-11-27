import { Component, type CSSProperties, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; recovering: boolean; }

const STALE =
  /dynamically imported module|importing a module script failed|ChunkLoadError|Loading chunk|Failed to fetch|Unable to preload|Failed to load module script|Unexpected token '<'|error loading module|mime type/i;

function isStale(error: unknown): boolean {
  if (error == null) return false;
  const msg = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  return STALE.test(msg);
}

async function purgeAndReload() {
  try {
    if (typeof caches !== 'undefined') {
      const names = await caches.keys();
      await Promise.all(names.map((n) => caches.delete(n)));
    }
  } catch { /* private mode */ }
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
  } catch { /* none */ }
  const url = new URL(window.location.href);
  url.searchParams.set('_nexas_reload', String(Date.now()));
  window.location.replace(url.toString());
}

const btn: CSSProperties = {
  width: '100%', minHeight: 46, borderRadius: 14, border: 'none',
  background: 'linear-gradient(180deg, #be123c, #9f1239)', color: '#fff',
  fontWeight: 700, cursor: 'pointer', marginBottom: 10,
};
const ghost: CSSProperties = {
  width: '100%', minHeight: 44, borderRadius: 14, border: '1px solid #eadfcd',
  background: '#fffaf2', color: '#4a453e', fontWeight: 600, cursor: 'pointer', marginBottom: 8,
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, recovering: false };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    if (isStale(error) && !sessionStorage.getItem('nexas_recovered')) {
      sessionStorage.setItem('nexas_recovered', '1');
      this.setState({ recovering: true });
      void purgeAndReload();
      return;
    }
    sessionStorage.removeItem('nexas_recovered');
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.state.recovering) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f1e6', color: '#1c1915' }}>
          Updating the desk…
        </div>
      );
    }
    const error = this.state.error;
    const stale = isStale(error);
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, background: 'radial-gradient(700px 320px at 0% 0%, rgba(190,18,60,.08), transparent 60%), #f6f1e6',
        color: '#1c1915', fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
      }}>
        <div className="glass" style={{ width: '100%', maxWidth: 420, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: '#9f1239', marginBottom: 8 }}>NEXAS</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 8 }}>
            {stale ? 'The desk updated.' : 'That screen tripped.'}
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: '#4a453e', marginBottom: 20 }}>
            {stale
              ? 'This browser was holding an older copy. A refresh loads the current desk. Nothing is lost.'
              : 'The rest of the desk is fine. Go home, or clear the cache if it keeps happening.'}
          </p>
          <button type="button" onClick={() => { void purgeAndReload(); }} style={btn}>
            {stale ? 'Load the current desk' : 'Clear cache and reload'}
          </button>
          <button type="button" onClick={() => this.setState({ hasError: false, error: null })} style={ghost}>Try again</button>
          <button type="button" onClick={() => { window.location.assign('/dashboard'); }} style={ghost}>Go home</button>
          <details style={{ textAlign: 'left', marginTop: 8 }}>
            <summary style={{ fontSize: 12, color: '#6b645b', cursor: 'pointer' }}>Technical detail</summary>
            <p style={{ marginTop: 8, fontSize: 12, color: '#6b645b', wordBreak: 'break-word' }}>
              {String(error?.message || error || 'Unknown error')}
            </p>
          </details>
        </div>
      </div>
    );
  }
}
