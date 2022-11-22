import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f3f3f',
    },
    secondary: {
      main: '#ececec',
    },
    background: {
      default: '#0e0e0e',
      paper: '#ececec',
    },
  },
  typography: {
    h1: {
      letterSpacing: '0em',
      lineHeight: 1,
      fontWeight: 500,
      fontSize: 150,
    },
    h5: {
      fontWeight: 50,
      fontSize: 20,
      lineHeight: 1.86,
      letterSpacing: '-0.04em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 100,
    },
  },
});

export default theme;