import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#38a9eb',
    },
    secondary: {
      main: '#0d48d1',
    },
  },
  typography: {
    fontFamily: [
      'Segoe UI',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
