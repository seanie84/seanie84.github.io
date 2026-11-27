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
      <a className="skip-link" href="#main">Skip to content</a>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{
        marginLeft: sidebarOpen ? 'var(--sidebar-w)' : 0,
        flex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.2s ease',
      }}>
        {!sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            style={{
              position: 'fixed', top: 12, left: 12, zIndex: 50,
              padding: 10, minWidth: 40, minHeight: 40, borderRadius: 10, border: '1px solid var(--line)',
              background: '#ffffff', color: 'var(--ink-2)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--elev-card)',
            }}
          >
            <Menu size={18} />
          </button>
        )}
        <TopBar />
        <main id="main" tabIndex={-1} style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px 32px 112px',
          background: 'var(--void)',
          outline: 'none',
        }}>
          {children}
        </main>
      </div>
      <button
        type="button"
        onClick={() => setDock((v) => !v)}
        aria-expanded={dock}
        aria-controls="nexa-dock"
        style={{
          position: 'fixed', right: 24, bottom: 24, zIndex: 80,
          padding: '12px 18px',
          border: 'none',
          borderRadius: 999,
          background: dock ? '#ffffff' : 'var(--cyan)',
          color: dock ? 'var(--ink)' : '#ffffff',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(13,148,136,.25)',
          borderWidth: dock ? 1 : 0,
          borderStyle: 'solid',
          borderColor: 'var(--line)',
          minHeight: 44,
        }}
      >
        {dock ? 'Close' : 'Ask NEXA'}
      </button>
      {dock && (
        <div id="nexa-dock" role="dialog" aria-label="Ask NEXA" className="glass" style={{
          position: 'fixed', right: 24, bottom: 80, zIndex: 80,
          width: 'min(400px, calc(100vw - 32px))', padding: 18,
        }}>
          <GeminiChat />
        </div>
      )}
    </div>
  );
}
