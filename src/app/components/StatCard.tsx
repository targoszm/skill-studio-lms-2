'use client';

export default function StatCard({
  icon,
  label,
  value,
  trend = '+0%',
  color = '#3b82f6',
}: {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
}) {
  return (
    <div
      className="stat-card"
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: color + '20',
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
        }}
      >
        <span className="material-icons">{icon}</span>
      </div>
      <div style={{ display: 'grid' }}>
        <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
        <div style={{ fontSize: 12, color: trend.startsWith('+') ? '#16a34a' : '#dc2626' }}>
          {trend} this week
        </div>
      </div>
    </div>
  );
}
