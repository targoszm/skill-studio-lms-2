'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Item = ({ href, icon, label }: { href: string; icon: string; label: string }) => {
  const path = usePathname();
  const active = path === href || (href !== '/admin/dashboard' && path.startsWith(href));
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        borderRadius: 8,
        background: active ? '#eef2ff' : 'transparent',
        color: active ? '#111827' : '#374151',
        textDecoration: 'none',
      }}
    >
      <span className="material-icons">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

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
      <Item href="/admin/dashboard" icon="dashboard" label="Dashboard" />
      <Item href="/admin/courses" icon="library_books" label="My Courses" />
      <Item href="/admin/students" icon="people" label="Students" />
    </aside>
  );
}
