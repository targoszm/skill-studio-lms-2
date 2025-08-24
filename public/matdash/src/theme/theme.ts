import { createTheme, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// MatDash Theme Configuration - Matching the professional design
declare module '@mui/material/styles' {
  interface Palette {
    gradients: {
      primary: string;
      secondary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
    };
  }

  interface PaletteOptions {
    gradients?: {
      primary?: string;
      secondary?: string;
      info?: string;
      success?: string;
      warning?: string;
      error?: string;
    };
  }
}

const baseTheme = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 700,
      lineHeight: 2.66,
      textTransform: 'uppercase' as const,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.12)',
    '0px 8px 16px rgba(0, 0, 0, 0.15)',
    '0px 16px 32px rgba(0, 0, 0, 0.15)',
    '0px 24px 48px rgba(0, 0, 0, 0.15)',
    '0px 32px 64px rgba(0, 0, 0, 0.15)',
    '0px 2px 8px rgba(0, 0, 0, 0.15)',
    '0px 4px 16px rgba(0, 0, 0, 0.15)',
    '0px 8px 32px rgba(0, 0, 0, 0.15)',
    '0px 16px 64px rgba(0, 0, 0, 0.15)',
    '0px 24px 96px rgba(0, 0, 0, 0.15)',
    '0px 32px 128px rgba(0, 0, 0, 0.15)',
    '0px 40px 160px rgba(0, 0, 0, 0.15)',
    '0px 48px 192px rgba(0, 0, 0, 0.15)',
    '0px 56px 224px rgba(0, 0, 0, 0.15)',
    '0px 64px 256px rgba(0, 0, 0, 0.15)',
    '0px 72px 288px rgba(0, 0, 0, 0.15)',
    '0px 80px 320px rgba(0, 0, 0, 0.15)',
  ],
};

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#ffffff',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#ffffff',
    },
    grey: {
      50: '#fafbfb',
      100: '#f4f6f8',
      200: '#ddd5e0',
      300: '#c2c2c2',
      400: '#9e9e9e',
      500: '#757575',
      600: '#616161',
      700: '#424242',
      800: '#303030',
      900: '#212121',
    },
    background: {
      default: '#fafbfb',
      paper: '#ffffff',
    },
    text: {
      primary: '#2a3547',
      secondary: '#5a6a85',
      disabled: 'rgba(42, 53, 71, 0.38)',
    },
    divider: 'rgba(42, 53, 71, 0.12)',
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      info: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      success: 'linear-gradient(135deg, #81ecec 0%, #00b894 100%)',
      warning: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
      error: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: '#000000',
    },
    secondary: {
      main: '#f48fb1',
      light: '#fce4ec',
      dark: '#ad1457',
      contrastText: '#000000',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#000000',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
      contrastText: '#000000',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#4caf50',
      contrastText: '#000000',
    },
    grey: {
      50: '#303030',
      100: '#424242',
      200: '#616161',
      300: '#757575',
      400: '#9e9e9e',
      500: '#c2c2c2',
      600: '#ddd5e0',
      700: '#f4f6f8',
      800: '#fafbfb',
      900: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      info: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      success: 'linear-gradient(135deg, #81ecec 0%, #00b894 100%)',
      warning: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
      error: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
    },
  },
});

export const createCustomTheme = (isDarkMode: boolean): Theme => {
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  return createTheme(theme, {
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: isDarkMode 
              ? '0px 4px 20px rgba(0, 0, 0, 0.25)' 
              : '0px 4px 20px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
            padding: '8px 22px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            '&:hover': {
              transform: 'translateY(-1px)',
              transition: 'all 0.2s ease-in-out',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: isDarkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: isDarkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: 'none',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              backgroundColor: isDarkMode 
                ? alpha(theme.palette.primary.main, 0.1)
                : alpha(theme.palette.primary.main, 0.05),
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            height: 8,
          },
        },
      },
    },
  });
};