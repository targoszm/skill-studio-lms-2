'use client';

import Link from 'next/link';

type Course = {
  id: string;
  title: string;
  blurb: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  students: number;
  weeks: number;
  rating: number;
};

const COURSES: Course[] = [
  {
    id: 'ml-fundamentals',
    title: 'Machine Learning Fundamentals',
    blurb:
      'Comprehensive introduction to machine learning concepts and practical applications',
    level: 'INTERMEDIATE',
    students: 1247,
    weeks: 8,
    rating: 4.8,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Strategy',
    blurb: 'Master modern digital marketing techniques and strategies',
    level: 'BEGINNER',
    students: 856,
    weeks: 6,
    rating: 4.6,
  },
  {
    id: 'uiux-principles',
    title: 'UI/UX Design Principles',
    blurb: 'Create beautiful and functional user interfaces',
    level: 'INTERMEDIATE',
    students: 542,
    weeks: 10,
    rating: 4.9,
  },
];

function LevelTag({ level }: { level: Course['level'] }) {
  const color =
    level === 'BEGINNER' ? '#10b981' : level === 'INTERMEDIATE' ? '#f59e0b' : '#ef4444';
  return (
    <span
      style={{
        fontSize: 12,
        padding: '4px 8px',
        borderRadius: 999,
        background: `${color}15`,
        color,
        border: `1px solid ${color}55`,
      }}
    >
      {level}
    </span>
  );
}

function CourseCard({ c }: { c: Course }) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fff',
        display: 'grid',
      }}
    >
      <div
        style={{
          height: 140,
          background:
            'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(99,102,241,0.9))',
          display: 'grid',
          placeItems: 'center',
          color: 'white',
          fontSize: 40,
        }}
      >
        <span className="material-icons" style={{ opacity: 0.9 }}>
          description
        </span>
      </div>
      <div style={{ padding: 16, display: 'grid', gap: 8 }}>
        <h3 style={{ margin: 0 }}>{c.title}</h3>
        <p style={{ margin: 0, color: '#4b5563' }}>{c.blurb}</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <LevelTag level={c.level} />
          <span style={{ fontSize: 12, color: '#6b7280' }}>{c.students} students</span>
          <span style={{ fontSize: 12, color: '#6b7280' }}>{c.weeks} weeks</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: '#6b7280' }}>
            ★ {c.rating}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Link
            href={`/admin/courses/${c.id}`}
            style={{
              flex: 1,
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: '10px 12px',
              textAlign: 'center',
              textDecoration: 'none',
              color: '#111827',
              background: '#fff',
            }}
          >
            ✏️ Edit
          </Link>
          <Link
            href={`/admin/courses/${c.id}/preview`}
            style={{
              flex: 1,
              borderRadius: 8,
              padding: '10px 12px',
              textAlign: 'center',
              textDecoration: 'none',
              color: 'white',
              background: '#2563eb',
            }}
          >
            👁️ View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>My Courses</h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button
            style={{
              border: '1px solid #e5e7eb',
              background: '#fff',
              borderRadius: 8,
              padding: '10px 14px',
              cursor: 'pointer',
            }}
          >
            <span className="material-icons" style={{ verticalAlign: 'middle' }}>
              filter_list
            </span>{' '}
            Filter
          </button>
          <button
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 14px',
              cursor: 'pointer',
            }}
          >
            + Create Course
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3,1fr)' }}>
        {COURSES.map((c) => (
          <CourseCard key={c.id} c={c} />
        ))}
      </div>
    </div>
  );
}
