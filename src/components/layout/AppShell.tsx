import { type ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

export default function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });

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
        padding: '28px 32px',
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
    </div>
  );
}
