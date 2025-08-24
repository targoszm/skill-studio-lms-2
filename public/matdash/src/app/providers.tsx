'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NextTopLoader from 'nextjs-toploader';

import { store, persistor } from '@/store/store';
import { useAppSelector } from '@/store/hooks';
import { createCustomTheme } from '@/theme/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const theme = createCustomTheme(isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <NextTopLoader
        color="#1976d2"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeWrapper>
              <AuthProvider>
                <NotificationProvider>
                  {children}
                </NotificationProvider>
              </AuthProvider>
            </ThemeWrapper>
          </LocalizationProvider>
        </PersistGate>
      </Provider>
    </AppRouterCacheProvider>
  );
};

export default Providers;