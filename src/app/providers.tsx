'use client';

// v0-safe Providers: NO @mui/x-date-pickers imports.
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import NextTopLoader from 'nextjs-toploader';
import { store, persistor } from '../store/store';

const theme = createTheme({});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NextTopLoader showSpinner={false} />
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
