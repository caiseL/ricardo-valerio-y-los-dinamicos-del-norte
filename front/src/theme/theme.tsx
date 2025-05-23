import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f59e0b',
      light: '#fcd34d',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#fca5a5',
      dark: '#dc2626',
    },
    success: {
      main: '#22c55e',
      light: '#86efac',
      dark: '#16a34a',
    },
    warning: {
      main: '#f59e0b',
      light: '#fcd34d',
      dark: '#d97706',
    },
    info: {
      main: '#0ea5e9',
      light: '#7dd3fc',
      dark: '#0284c7',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    divider: 'rgba(100, 116, 139, 0.12)',
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
    h1: { 
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: { 
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: { 
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: { 
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: { 
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: { 
      fontWeight: 600,
      fontSize: '1rem',
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
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 6px rgba(0,0,0,0.07)',
    '0px 6px 8px rgba(0,0,0,0.08)',
    '0px 8px 12px rgba(0,0,0,0.10)',
    '0px 10px 14px rgba(0,0,0,0.12)',
    '0px 12px 16px rgba(0,0,0,0.14)',
    '0px 14px 20px rgba(0,0,0,0.16)',
    '0px 16px 24px rgba(0,0,0,0.18)',
    '0px 18px 28px rgba(0,0,0,0.20)',
    '0px 20px 32px rgba(0,0,0,0.22)',
    '0px 22px 36px rgba(0,0,0,0.24)',
    '0px 24px 38px rgba(0,0,0,0.26)',
    '0px 26px 40px rgba(0,0,0,0.28)',
    '0px 28px 42px rgba(0,0,0,0.30)',
    '0px 30px 44px rgba(0,0,0,0.32)',
    '0px 32px 46px rgba(0,0,0,0.34)',
    '0px 34px 48px rgba(0,0,0,0.36)',
    '0px 36px 50px rgba(0,0,0,0.38)',
    '0px 38px 52px rgba(0,0,0,0.40)',
    '0px 40px 54px rgba(0,0,0,0.42)',
    '0px 42px 56px rgba(0,0,0,0.44)',
    '0px 44px 58px rgba(0,0,0,0.46)',
    '0px 46px 60px rgba(0,0,0,0.48)',
    '0px 48px 62px rgba(0,0,0,0.50)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 20px',
          fontSize: '0.875rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 6px rgba(0,0,0,0.12)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '20px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3b82f6',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
        outlined: {
          borderWidth: '1.5px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
          },
        },
      },
    },
  },
});

export default theme;