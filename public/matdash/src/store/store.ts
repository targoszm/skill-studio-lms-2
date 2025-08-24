import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Slices
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import dashboardSlice from './slices/dashboardSlice';
import coursesSlice from './slices/coursesSlice';
import avatarsSlice from './slices/avatarsSlice';
import studentsSlice from './slices/studentsSlice';
import notificationSlice from './slices/notificationSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'theme'], // Only persist auth and theme
};

const rootReducer = {
  auth: persistReducer(
    { key: 'auth', storage, version: 1 },
    authSlice
  ),
  theme: persistReducer(
    { key: 'theme', storage, version: 1 },
    themeSlice
  ),
  dashboard: dashboardSlice,
  courses: coursesSlice,
  avatars: avatarsSlice,
  students: studentsSlice,
  notifications: notificationSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;