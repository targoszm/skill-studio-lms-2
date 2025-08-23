'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import NextTopLoader from 'nextjs-toploader';
import { store, persistor } from '../store';

const theme = createTheme({});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [Pickers, setPickers] = useState<null | {
    LocalizationProvider: React.ComponentType<any>;
    AdapterDateFns: any;
  }>(null);

  useEffect(() => {
    (async () => {
      try {
        const [{ LocalizationProvider }, { AdapterDateFns }] = await Promise.all([
          import('@mui/x-date-pickers/LocalizationProvider'),
          import('@mui/x-date-pickers/AdapterDateFns'),
        ]);
        setPickers({ LocalizationProvider, AdapterDateFns });
      } catch {
        setPickers(null);
      }
    })();
  }, []);

  const appTree = (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NextTopLoader showSpinner={false} />
      {Pickers ? (
        <Pickers.LocalizationProvider dateAdapter={Pickers.AdapterDateFns}>
          {children}
        </Pickers.LocalizationProvider>
      ) : (
        children
      )}
    </ThemeProvider>
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {appTree}
      </PersistGate>
    </Provider>
  );
}
