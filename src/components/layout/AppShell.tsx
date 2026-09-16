import { type ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main style={{
        marginLeft: sidebarOpen ? 'var(--sidebar-w)' : 0,
        flex: 1,
        minHeight: '100vh',
        overflowY: 'auto',
        background: 'var(--void)',
        padding: '28px 32px 96px',
        transition: 'margin-left 0.2s',
      }}>
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              position: 'fixed', top: 16, left: 16, zIndex: 50,
              padding: 8, borderRadius: 8, border: '1px solid var(--line)',
              background: 'rgba(5,13,31,0.8)', color: 'var(--cyan)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Menu size={18} />
          </button>
        )}
        {children}
      </main>
      <button
        type="button"
        onClick={() => setDock((v) => !v)}
        style={{
          position: 'fixed', right: 20, bottom: 20, zIndex: 80,
          padding: '10px 14px', borderRadius: 999,
          border: '1px solid var(--cyan)', background: 'rgba(5,13,31,0.92)',
          color: 'var(--cyan)', fontFamily: 'Rajdhani', fontWeight: 700,
          letterSpacing: '0.08em', cursor: 'pointer',
        }}
      >
        {dock ? 'CLOSE NEXA' : 'ASK NEXA'}
      </button>
      {dock && (
        <div className="glass" style={{
          position: 'fixed', right: 20, bottom: 72, zIndex: 80,
          width: 'min(420px, calc(100vw - 40px))', padding: 16,
          boxShadow: 'var(--elev-glow)',
        }}>
          <GeminiChat />
        </div>
      )}
    </div>
  );
}
