// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// ---- SSR-safe storage (NO top-level await) ----
const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

let storage: any;
if (typeof window !== 'undefined') {
  // only require real storage in the browser
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  storage = require('redux-persist/lib/storage').default;
} else {
  storage = createNoopStorage();
}

// ---- Minimal valid reducer so Redux is happy ----
const dummyReducer = (state = { ready: true }, _action: any) => state;

const rootReducer = combineReducers({
  app: dummyReducer, // add real slices here later
});

// ---- Persist config ----
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [], // add slice keys you want persisted (e.g., ['auth'])
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ---- Store ----
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // ignore redux-persist non-serializable action warnings
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ---- Persistor ----
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
