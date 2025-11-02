import { ThemeOptions } from '@mui/material/styles';
import { baseColors } from './colors';

export type ThemePreset = 'light' | 'dark' | 'partner';

const typography = {
  fontFamily: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  h1: {
    fontWeight: 700,
    letterSpacing: '-0.04em',
  },
  h2: {
    fontWeight: 700,
    letterSpacing: '-0.03em',
  },
  h3: {
    fontWeight: 600,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.7,
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
};

const shape = {
  borderRadius: 18,
};

export const themePresets: Record<ThemePreset, ThemeOptions> = {
  light: {
    palette: {
      mode: 'light',
      primary: {
        main: baseColors.blue[500],
        light: baseColors.blue[300],
        dark: baseColors.blue[700],
      },
      secondary: {
        main: baseColors.teal[500],
        light: baseColors.teal[300],
        dark: baseColors.teal[700],
      },
      background: {
        default: baseColors.slate[50],
        paper: 'rgba(255,255,255,0.75)',
      },
      text: {
        primary: baseColors.slate[900],
        secondary: baseColors.slate[600],
      },
    },
    shape,
    typography,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 24,
          },
        },
      },
    },
  },
  dark: {
    palette: {
      mode: 'dark',
      primary: {
        main: baseColors.purple[400],
      },
      secondary: {
        main: baseColors.teal[400],
      },
      background: {
        default: baseColors.slate[900],
        paper: 'rgba(15, 23, 42, 0.85)',
      },
      text: {
        primary: '#F8FAFC',
        secondary: baseColors.slate[300],
      },
    },
    shape,
    typography,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 24,
          },
        },
      },
    },
  },
  partner: {
    palette: {
      mode: 'light',
      primary: {
        main: baseColors.amber[400],
        contrastText: baseColors.slate[900],
      },
      secondary: {
        main: baseColors.blue[600],
      },
      background: {
        default: '#FFF7ED',
        paper: 'rgba(255, 247, 237, 0.85)',
      },
      text: {
        primary: baseColors.slate[800],
        secondary: baseColors.slate[500],
      },
    },
    shape,
    typography,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 24,
          },
        },
      },
    },
  },
};
