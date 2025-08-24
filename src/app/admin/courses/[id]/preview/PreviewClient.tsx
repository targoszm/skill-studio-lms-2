'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Load the video player only in the browser
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl?: string;
  lessons?: string[];
};

// Fallback sample data if nothing is in storage
const SAMPLE_COURSES: Course[] = [
  {
    id: 'ml-fundamentals',
    title: 'ML Fundamentals',
    description: 'Intro to ML, data prep, models, evaluation.',
    category: 'AI',
    videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk', // any public URL supported by react-player
    lessons: ['Intro', 'Data Basics', 'Linear Models', 'Evaluation'],
  },
  {
    id: 'react-for-designers',
    title: 'React for Designers',
    description: 'Design-friendly React patterns & component thinking.',
    category: 'Frontend',
    videoUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
    lessons: ['Thinking in Components', 'Props & State', 'Styling', 'Patterns'],
  },
];

function getAllCourses(): Course[] {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem('courses');
      if (raw) return JSON.parse(raw) as Course[];
    } catch {
      // ignore and fall back to sample
    }
  }
  return SAMPLE_COURSES;
}

export default function PreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const course = useMemo(() => {
    const all = getAllCourses();
    return all.find((c) => c.id === id) ?? SAMPLE_COURSES[0];
  }, [id]);

  return (
    <div style={{ display: 'grid', gap: 20, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ margin: 0 }}>Preview: {course.title}</h1>
        <button
          onClick={() => router.push(`/admin/courses/${course.id}`)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #ccc',
            cursor: 'pointer',
            background: 'white',
          }}
        >
          ← Back to Edit
        </button>
      </div>

      <p style={{ color: '#555', marginTop: -8 }}>{course.description}</p>

      <div
        style={{
          border: '1px solid #eee',
          borderRadius: 12,
          padding: 12,
          background: '#fafafa',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Video</h3>
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <ReactPlayer
              url={course.videoUrl || 'https://www.youtube.com/watch?v=ysz5S6PUM-U'}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          border: '1px solid #eee',
          borderRadius: 12,
          padding: 12,
          background: '#fff',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Syllabus</h3>
        <ol style={{ paddingLeft: 20, margin: 0 }}>
          {(course.lessons ?? ['Introduction', 'Module 1', 'Module 2', 'Wrap-up']).map((l, i) => (
            <li key={i} style={{ padding: '6px 0' }}>
              {l}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
