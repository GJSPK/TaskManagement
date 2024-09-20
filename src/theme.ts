// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Use light mode
    primary: {
      main: '#1976d2', // You can adjust primary color
    },
    background: {
      default: '#f5f5f5', // Set a light background
    },
  },
});

export default theme;
