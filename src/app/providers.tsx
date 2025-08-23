'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import NextTopLoader from 'nextjs-toploader';

// ---- simple root reducer (replace with real slices later) ----
const rootReducer = (state = { ready: true }, _action: any) => state;

const theme = createTheme({});

// Detect v0 preview sandbox (no redux-persist there)
const isBrowser = typeof window !== 'undefined';
const isV0Preview =
  isBrowser &&
  /vusercontent\.net|^preview-|v0\.app/.test(window.location.host);

type PersistBundle = {
  PersistGate: React.ComponentType<any>;
  persistReducer: any;
  persistStore: any;
  storage: any;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  // For non-v0 environments, we’ll lazy-load redux-persist and build the store then.
  const [persistRuntime, setPersistRuntime] = useState<null | {
    store: any;
    persistor: any;
    PersistGate: React.ComponentType<any>;
  }>(null);

  // In v0 preview we **don’t** use redux-persist at all.
  const v0Store = useMemo(() => {
    if (isV0Preview) {
      return configureStore({ reducer: rootReducer });
    }
    return null;
  }, []);

  useEffect(() => {
    if (!isV0Preview && isBrowser) {
      (async () => {
        // Lazy-import redux-persist only in real browser builds
        const { persistReducer, persistStore } = await import('redux-persist');
        const storage = (await import('redux-persist/lib/storage')).default;
        const { PersistGate } = await import('redux-persist/integration/react');

        const persistedReducer = persistReducer(
          { key: 'root', storage },
          rootReducer
        );

        const store = configureStore({
          reducer: persistedReducer,
          middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: {
                ignoredActions: [
                  'persist/FLUSH',
                  'persist/REHYDRATE',
                  'persist/PAUSE',
                  'persist/PERSIST',
                  'persist/PURGE',
                  'persist/REGISTER',
                ],
              },
            }),
        });

        const persistor = persistStore(store);
        setPersistRuntime({ store, persistor, PersistGate });
      })().catch(() => setPersistRuntime(null));
    }
  }, []);

  const ui = (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NextTopLoader showSpinner={false} />
      {children}
    </ThemeProvider>
  );

  // v0 preview path: no redux-persist
  if (isV0Preview && v0Store) {
    return <Provider store={v0Store}>{ui}</Provider>;
  }

  // non-v0 path, after lazy-load completes: wrap with PersistGate
  if (persistRuntime) {
    const PG = persistRuntime.PersistGate;
    return (
      <Provider store={persistRuntime.store}>
        <PG loading={null} persistor={persistRuntime.persistor}>
          {ui}
        </PG>
      </Provider>
    );
  }

  // Fallback (SSR / before lazy-load): plain store so the app renders immediately
  const tempStore = useMemo(
    () => configureStore({ reducer: rootReducer }),
    []
  );
  return <Provider store={tempStore}>{ui}</Provider>;
}
