'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import OverviewCards from '@/components/dashboard/OverviewCards';
import RecentActivity from '@/components/dashboard/RecentActivity';
import EnrollmentChart from '@/components/dashboard/EnrollmentChart';
import CoursePerformanceChart from '@/components/dashboard/CoursePerformanceChart';
import { useAppSelector } from '@/store/hooks';

export default function AdminDashboard() {
  const { analytics } = useAppSelector((state) => state.dashboard);

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            color: 'text.primary',
            mb: 3
          }}
        >
          Dashboard Overview
        </Typography>

        {/* Overview Cards */}
        <Box sx={{ mb: 4 }}>
          <OverviewCards data={analytics} />
        </Box>

        {/* Charts Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}>
          <EnrollmentChart />
          <RecentActivity />
        </Box>

        {/* Course Performance */}
        <Box sx={{ mb: 4 }}>
          <CoursePerformanceChart />
        </Box>
      </Container>
    </DashboardLayout>
  );
}