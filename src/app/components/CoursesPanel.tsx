'use client';

type Course = { id: string; title: string; learners: number; status: 'Draft' | 'Published' };

const sample: Course[] = [
  { id: 'crs-001', title: 'Intro to Product Thinking', learners: 128, status: 'Published' },
  { id: 'crs-002', title: 'AI for Instructors', learners: 76, status: 'Draft' },
  { id: 'crs-003', title: 'Storytelling for UX', learners: 54, status: 'Published' },
];

export default function CoursesPanel() {
  return (
    <section
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 16,
        display: 'grid',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Courses</h3>
        <button
          className="btn btn-primary"
          style={{
            background: '#111827',
            color: '#fff',
            border: '1px solid #111827',
            borderRadius: 8,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span className="material-icons" style={{ fontSize: 18 }}>
            add
          </span>
          Create Course
        </button>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        {sample.map((c) => (
          <div
            key={c.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 120px',
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="material-icons" style={{ color: '#6b7280' }}>
                video_library
              </span>
              <div style={{ fontWeight: 600 }}>{c.title}</div>
            </div>
            <div style={{ color: '#6b7280' }}>{c.learners} learners</div>
            <div
              style={{
                justifySelf: 'end',
                padding: '4px 8px',
                borderRadius: 999,
                fontSize: 12,
                border: '1px solid #e5e7eb',
                background: c.status === 'Published' ? '#ecfdf5' : '#fff7ed',
                color: c.status === 'Published' ? '#065f46' : '#9a3412',
              }}
            >
              {c.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
