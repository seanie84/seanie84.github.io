import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

const STALE =
  /dynamically imported module|importing a module script failed|ChunkLoadError|Loading chunk|Failed to fetch|Unable to preload|Failed to load module script|Unexpected token '<'|error loading module/i;

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

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('[NEXAS ErrorBoundary]', error);
    if (isStale(error)) void purgeAndReload();
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const error = this.state.error;
    const stale = isStale(error);

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 24,
        background: '#2E4266',
        color: '#fff',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        <div style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', color: '#7dd3fc', marginBottom: 12 }}>
            NEXAS AI
          </p>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
            {stale ? 'This app has been updated' : 'Something went wrong'}
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>
            {stale
              ? 'Your device is holding an older version of NEXAS, so part of it failed to load. Updating takes a second and you will not lose anything.'
              : 'That screen hit an error and could not finish loading. You can go back and carry on using the rest of the app.'}
          </p>

          {stale ? (
            <button
              type="button"
              onClick={() => { void purgeAndReload(); }}
              style={btnPrimary}
            >
              Update and reload
            </button>
          ) : (
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              style={btnPrimary}
            >
              Try again
            </button>
          )}

          <button
            type="button"
            onClick={() => { void purgeAndReload(); }}
            style={btnGhost}
          >
            Clear cached data and restart
          </button>

          <button
            type="button"
            onClick={() => { window.location.assign('/dashboard'); }}
            style={{ ...btnGhost, border: 'none', color: 'rgba(255,255,255,0.7)' }}
          >
            Go to home
          </button>

          <details style={{ textAlign: 'left', marginTop: 8 }}>
            <summary style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
              Technical detail
            </summary>
            <p style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.6)', wordBreak: 'break-word' }}>
              {String(error?.message || error || 'Unknown error')}
            </p>
          </details>
        </div>
      </div>
    );
  }
}

const btnPrimary: React.CSSProperties = {
  width: '100%',
  minHeight: 44,
  borderRadius: 16,
  border: 'none',
  background: '#FFA23A',
  color: '#1B2A4A',
  fontWeight: 600,
  cursor: 'pointer',
  marginBottom: 10,
};

const btnGhost: React.CSSProperties = {
  width: '100%',
  minHeight: 44,
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.25)',
  background: 'transparent',
  color: 'rgba(255,255,255,0.85)',
  fontSize: 14,
  cursor: 'pointer',
  marginBottom: 10,
};
