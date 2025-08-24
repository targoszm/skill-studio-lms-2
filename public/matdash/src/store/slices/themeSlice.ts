import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
  primaryColor: string;
  borderRadius: number;
  sidebarCollapsed: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false,
  primaryColor: '#1976d2',
  borderRadius: 12,
  sidebarCollapsed: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<number>) => {
      state.borderRadius = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setPrimaryColor,
  setBorderRadius,
  toggleSidebar,
  setSidebarCollapsed,
} = themeSlice.actions;

export default themeSlice.reducer;