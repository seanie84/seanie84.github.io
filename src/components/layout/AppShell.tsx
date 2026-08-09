import { type ReactNode } from 'react';
import Sidebar from './Sidebar';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        marginLeft: 'var(--sidebar-w)',
        flex: 1,
        minHeight: '100vh',
        overflowY: 'auto',
        background: 'var(--void)',
        padding: '28px 32px',
      }}>
        {children}
      </main>
    </div>
  );
}
