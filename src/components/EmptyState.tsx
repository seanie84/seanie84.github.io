import { Link } from 'react-router-dom';

export default function EmptyState({ title, body, to, action }: {
  title: string; body: string; to?: string; action?: string;
}) {
  return (
    <div className="glass" style={{ padding: 24, maxWidth: 520 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: to ? 14 : 0 }}>{body}</p>
      {to && action && (
        <Link to={to} style={{
          display: 'inline-block', padding: '10px 14px', borderRadius: 10, background: 'var(--cyan)',
          color: '#fff', textDecoration: 'none', fontWeight: 700, minHeight: 40,
        }}>{action}</Link>
      )}
    </div>
  );
}
