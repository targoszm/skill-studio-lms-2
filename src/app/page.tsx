'use client';

import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import StatCard from './components/StatCard';
import CoursesPanel from './components/CoursesPanel';

export default function Page() {
  return (
    <div style={{ display: 'grid', gridTemplateRows: '64px 1fr', minHeight: '100vh' }}>
      <TopBar />
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
        <SideNav />
        <main style={{ padding: 20, display: 'grid', gap: 16 }}>
          {/* Stats row */}
          <section
            style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            }}
          >
            <StatCard icon="groups" label="Active Students" value="1,204" trend="+8%" color="#3b82f6" />
            <StatCard icon="library_books" label="Courses" value="32" trend="+1%" color="#8b5cf6" />
            <StatCard icon="task_alt" label="Completions" value="642" trend="+12%" color="#10b981" />
            <StatCard icon="payments" label="Revenue" value="$12,480" trend="+5%" color="#f59e0b" />
          </section>

          {/* Courses list */}
          <CoursesPanel />
        </main>
      </div>
    </div>
  );
}
