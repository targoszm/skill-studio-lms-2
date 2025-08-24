'use client';

import StatCard from '../../components/StatCard';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function DashboardPage() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      { label: 'Enrollments', data: [12, 19, 7, 15, 22, 30], borderColor: '#3b82f6', fill: false },
    ],
  };

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <h1>Dashboard</h1>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <StatCard icon="groups" label="Active Students" value="1,204" trend="+8%" color="#3b82f6" />
        <StatCard icon="library_books" label="Courses" value="32" trend="+1%" color="#8b5cf6" />
        <StatCard icon="task_alt" label="Completions" value="642" trend="+12%" color="#10b981" />
        <StatCard icon="payments" label="Revenue" value="$12,480" trend="+5%" color="#f59e0b" />
      </section>
      <section style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
        <h2>Weekly Enrollments</h2>
        <Line data={data} />
      </section>
    </div>
  );
}
