// src/app/components/SideNav.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type NavItem = { href: string; label: string; icon?: string };

const main: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/analytics', label: 'Analytics', icon: 'insights' },
];

const courses: NavItem[] = [
  { href: '/admin/courses', label: 'My Courses', icon: 'library_books' },
  { href: '/admin/courses/new', label: 'Create Course', icon: 'add_circle' },
  { href: '/admin/templates', label: 'Templates', icon: 'design_services' },
];

const users: NavItem[] = [
  { href: '/admin/students', label: 'Students', icon: 'people' },
  { href: '/admin/avatars', label: 'AI Avatars', icon: 'face' },
];

function Group({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 10,
              color: '#111827',
              textDecoration: 'none',
            }}
          >
            <span className="material-icons-outlined" style={{ fontSize: 18 }}>
              {it.icon ?? 'chevron_right'}
            </span>
            <span>{it.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SideNav() {
  const [displayName, setDisplayName] = useState<string>('John Doe');
  const [email, setEmail] = useState<string>('Administrator');

  useEffect(() => {
    // Try hydrate name/email from Supabase if logged in
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setEmail(data.user.email ?? 'Administrator');
        const { data: profile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', data.user.id)
          .maybeSingle();
        if (profile?.display_name) setDisplayName(profile.display_name);
      }
    })();
  }, []);

  return (
    <aside
      style={{
        width: 260,
        borderRight: '1px solid #e5e7eb',
        padding: 16,
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr auto',
        gap: 20,
        height: '100%',
        background: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            display: 'grid',
            placeItems: 'center',
            background:
              'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(16,185,129,0.15))',
            border: '1px solid #e5e7eb',
          }}
        >
          <span className="material-icons">school</span>
        </div>
        <div style={{ fontWeight: 700 }}>MatDash LMS</div>
      </div>

      <Group title="MAIN" items={main} />
      <div>
        <Group title="COURSES" items={courses} />
        <Group title="USERS" items={users} />
      </div>

      {/* User card -> now clickable */}
      <Link
        href="/admin/profile"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: 12,
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          textDecoration: 'none',
          color: '#111827',
          background: '#fff',
        }}
        title="Open profile"
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background:
              'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(16,185,129,0.2))',
            display: 'grid',
            placeItems: 'center',
            border: '1px solid #e5e7eb',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {displayName
            .split(' ')
            .map((s) => s[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()}
        </div>
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontWeight: 600 }}>{displayName}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>{email}</div>
        </div>
        <span
          className="material-icons-outlined"
          style={{ marginLeft: 'auto', color: '#6b7280' }}
        >
          more_vert
        </span>
      </Link>
    </aside>
  );
}
