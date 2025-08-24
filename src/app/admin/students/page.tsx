'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const MOCK = {
  'ml-fundamentals': {
    title: 'Machine Learning Fundamentals',
    description: 'Edit the details of your course.',
    category: 'Business',
  },
  'digital-marketing': {
    title: 'Digital Marketing Strategy',
    description: 'Plan, run and measure campaigns.',
    category: 'Business',
  },
  'uiux-principles': {
    title: 'UI/UX Design Principles',
    description: 'Great UX begins with empathy.',
    category: 'Design',
  },
} as const;

export default function EditCoursePage() {
  const { id } = useParams<{ id: keyof typeof MOCK }>();
  const router = useRouter();
  const initial = useMemo(() => MOCK[id as keyof typeof MOCK], [id]);

  if (!initial) return notFound();

  const [title, setTitle] = useState<string>(initial.title);
  const [desc, setDesc] = useState<string>(initial.description);
  const [cat, setCat] = useState<string>(initial.category);

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 900 }}>
      <h1>Edit Course</h1>
      <label style={{ display: 'grid', gap: 6 }}>
        <span>Course Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 10, border: '1px solid #e5e7eb', borderRadius: 8 }}
        />
      </label>
      <label style={{ display: 'grid', gap: 6 }}>
        <span>Category</span>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          style={{ padding: 10, border: '1px solid #e5e7eb', borderRadius: 8 }}
        >
          <option>Business</option>
          <option>Design</option>
          <option>Technology</option>
        </select>
      </label>
      <label style={{ display: 'grid', gap: 6 }}>
        <span>Course Description</span>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={6}
          style={{ padding: 10, border: '1px solid #e5e7eb', borderRadius: 8 }}
        />
      </label>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => router.push(`/admin/courses/${id}/preview`)}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 14px',
            cursor: 'pointer',
          }}
        >
          Preview
        </button>
        <button
          onClick={() => router.push('/admin/courses')}
          style={{
            border: '1px solid #e5e7eb',
            background: '#fff',
            borderRadius: 8,
            padding: '10px 14px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
