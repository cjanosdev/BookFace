import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#6C5DD3',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F8FC',
      paper: '#FFFFFF',
    },
    grey: {
      100: '#F5F6FA',
      200: '#E6E8F0',
      300: '#D6D9E4',
      500: '#6B7280',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
