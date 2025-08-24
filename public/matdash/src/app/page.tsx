'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      if (!user) {
        redirect('/auth/login');
      } else {
        // Redirect based on user role
        if (user.role === 'admin') {
          redirect('/admin/dashboard');
        } else {
          redirect('/student/dashboard');
        }
      }
    }
  }, [user, isLoading]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <CircularProgress size={40} />
    </Box>
  );
}