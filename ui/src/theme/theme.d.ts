import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    name?: string;
  }
  interface ThemeOptions {
    name?: string;
  }
}
