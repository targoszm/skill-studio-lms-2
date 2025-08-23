'use client';

const Item = ({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) => (
  <div
    className={`sidenav-item ${active ? 'active' : ''}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px',
      borderRadius: 8,
      background: active ? '#eef2ff' : 'transparent',
      color: active ? '#111827' : '#374151',
      cursor: 'pointer',
    }}
  >
    <span className="material-icons">{icon}</span>
    <span>{label}</span>
  </div>
);

export default function SideNav() {
  return (
    <aside
      style={{
        width: 240,
        background: '#fff',
        borderRight: '1px solid #e5e7eb',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <Item icon="dashboard" label="Dashboard" active />
      <Item icon="library_books" label="Courses" />
      <Item icon="people" label="Students" />
      <Item icon="assessment" label="Analytics" />
      <Item icon="settings" label="Settings" />
    </aside>
  );
}
