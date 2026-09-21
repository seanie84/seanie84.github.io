import { type ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Menu } from 'lucide-react';
import GeminiChat from '../GeminiChat';

export default function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });
  const [dock, setDock] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--void)' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main style={{
        marginLeft: sidebarOpen ? 'var(--sidebar-w)' : 0,
        flex: 1,
        minHeight: '100vh',
        overflowY: 'auto',
        background:
          'radial-gradient(1200px 500px at 80% -10%, rgba(61,154,140,0.07), transparent 55%), var(--void)',
        padding: '28px 32px 96px',
        transition: 'margin-left 0.2s',
      }}>
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            style={{
              position: 'fixed', top: 8, left: 8, zIndex: 50,
              padding: 8, borderRadius: 2, border: '1px solid var(--line)',
              background: 'var(--navy)', color: 'var(--ink-2)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Menu size={18} />
          </button>
        )}
        <TopBar />
        {children}
      </main>
      <button
        type="button"
        onClick={() => setDock((v) => !v)}
        style={{
          position: 'fixed', right: 0, bottom: 88, zIndex: 80,
          writingMode: 'vertical-rl',
          padding: '14px 8px',
          border: '1px solid var(--line-strong)',
          borderRight: 'none',
          borderRadius: '3px 0 0 3px',
          background: dock ? 'var(--cyan)' : 'var(--navy)',
          color: dock ? '#0e1013' : 'var(--ink)',
          fontFamily: 'IBM Plex Mono, monospace',
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: '0.16em',
          cursor: 'pointer',
        }}
      >
        {dock ? 'CLOSE' : 'ASK NEXA'}
      </button>
      {dock && (
        <div className="glass" style={{
          position: 'fixed', right: 36, bottom: 72, zIndex: 80,
          width: 'min(420px, calc(100vw - 48px))', padding: 16,
        }}>
          <GeminiChat />
        </div>
      )}
    </div>
  );
}
