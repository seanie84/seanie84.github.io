import { Component } from 'react';
import type { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', padding: 20, backgroundColor: 'var(--bg)', color: 'var(--ink)',
        }}>
          <AlertCircle size={48} style={{ marginBottom: 20, color: 'var(--red)' }} />
          <h1 style={{ fontFamily: 'Rajdhani', fontSize: 24, marginBottom: 10, textTransform: 'uppercase' }}>
            Something went wrong
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--ink-3)', marginBottom: 20, maxWidth: 400, textAlign: 'center' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px', borderRadius: 8, border: 'none', backgroundColor: 'var(--cyan)',
              color: 'var(--bg)', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
