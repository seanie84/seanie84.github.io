import { type ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BackgroundPlate from './BackgroundPlate';
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
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <BackgroundPlate src1080="/bg-desk-1080.jpg" src4k="/bg-desk.jpg" dim={0.48} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{
        marginLeft: sidebarOpen ? 'var(--sidebar-w)' : 0,
        flex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.2s ease',
        position: 'relative',
        zIndex: 1,
      }}>
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            style={{
              position: 'fixed', top: 12, left: 12, zIndex: 50,
              padding: 8, borderRadius: 10, border: '1px solid var(--line)',
              background: 'var(--panel)', color: 'var(--ink-2)',
              cursor: 'pointer', display: 'flex',
            }}
          >
            <Menu size={18} />
          </button>
        )}
        <TopBar />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 36px 112px',
          background: 'transparent',
        }}>
          {children}
        </main>
      </div>
      <button
        type="button"
        onClick={() => setDock((v) => !v)}
        style={{
          position: 'fixed', right: 24, bottom: 24, zIndex: 80,
          padding: '12px 18px',
          border: 'none',
          borderRadius: 999,
          background: dock ? 'var(--navy-2)' : 'var(--cyan)',
          color: dock ? 'var(--ink)' : '#042f2e',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
          boxShadow: '0 12px 32px rgba(0,0,0,.4)',
        }}
      >
        {dock ? 'Close' : 'Ask NEXA'}
      </button>
      {dock && (
        <div className="glass" style={{
          position: 'fixed', right: 24, bottom: 80, zIndex: 80,
          width: 'min(400px, calc(100vw - 32px))', padding: 18,
        }}>
          <GeminiChat />
        </div>
      )}
    </div>
  );
}
