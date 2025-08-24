// src/app/admin/profile/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabaseClient';
import { useRouter } from 'next/navigation';

type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
};

export default function AdminProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      if (!user) {
        // Not logged in -> send to home or your login route if you have one
        router.push('/');
        return;
      }
      setEmail(user.email ?? '');

      // Try fetch profile row
      const { data, error: pErr } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_url')
        .eq('id', user.id)
        .maybeSingle();

      if (pErr) {
        setError(pErr.message);
        setLoading(false);
        return;
      }

      // If no row, create a default one
      if (!data) {
        const { data: inserted, error: iErr } = await supabase
          .from('profiles')
          .insert({ id: user.id, display_name: 'John Doe', avatar_url: null })
          .select()
          .maybeSingle();
        if (iErr) {
          setError(iErr.message);
          setLoading(false);
          return;
        }
        setProfile(inserted as Profile);
        setDisplayName(inserted?.display_name ?? '');
      } else {
        setProfile(data as Profile);
        setDisplayName(data.display_name ?? '');
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const onSave = async () => {
    if (!profile) return;
    setSaving(true);
    setError('');
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('id', profile.id);
    if (error) setError(error.message);
    setSaving(false);
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return <div style={{ padding: 24 }}>Loading profile…</div>;
  }

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Admin Profile</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '160px 1fr',
          gap: 24,
          alignItems: 'center',
          padding: 24,
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          background: '#fff',
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background:
              'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(16,185,129,0.15))',
            display: 'grid',
            placeItems: 'center',
            color: '#111827',
            fontWeight: 700,
            fontSize: 28,
            border: '1px solid #e5e7eb',
          }}
          title="Avatar"
        >
          {(displayName || 'JD')
            .split(' ')
            .map((s) => s[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()}
        </div>

        <div>
          <div style={{ marginBottom: 8, color: '#6b7280' }}>Email</div>
          <div style={{ marginBottom: 24, fontWeight: 600 }}>{email}</div>

          <label style={{ display: 'block', marginBottom: 8, color: '#6b7280' }}>
            Display name
          </label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              outline: 'none',
              fontSize: 14,
            }}
          />

          {error && (
            <div style={{ color: '#b91c1c', marginTop: 12 }}>Error: {error}</div>
          )}

          <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
            <button
              onClick={onSave}
              disabled={saving}
              style={{
                padding: '10px 14px',
                background: '#2563eb',
                color: '#fff',
                border: 0,
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>

            <button
              onClick={onSignOut}
              style={{
                padding: '10px 14px',
                background: '#f3f4f6',
                color: '#111827',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
