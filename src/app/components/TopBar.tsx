'use client';

export default function TopBar() {
  return (
    <header
      className="matdash-topbar"
      style={{
        background: '#fff',
        height: 64,
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <span className="material-icons" style={{ marginRight: 12 }}>
        school
      </span>
      <strong>Instructor Studio — Dashboard</strong>
    </header>
  );
}
