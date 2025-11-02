import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { themePresets, ThemePreset } from './presets';

export type ThemeContextValue = {
  themeName: ThemePreset;
  theme: Theme;
  rotateTheme: () => void;
  setThemeName: (preset: ThemePreset) => void;
};

const ThemeRuntimeContext = createContext<ThemeContextValue | undefined>(undefined);

const orderedThemes: ThemePreset[] = ['light', 'dark', 'partner'];

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeName, setThemeNameState] = useState<ThemePreset>(prefersDarkMode ? 'dark' : 'light');

  const setThemeName = useCallback((preset: ThemePreset) => {
    setThemeNameState(preset);
  }, []);

  const rotateTheme = useCallback(() => {
    setThemeNameState((prev) => {
      const currentIndex = orderedThemes.indexOf(prev);
      const nextIndex = (currentIndex + 1) % orderedThemes.length;
      return orderedThemes[nextIndex];
    });
  }, []);

  const theme = useMemo(() => {
    const created = createTheme({ ...themePresets[themeName], palette: { ...themePresets[themeName].palette } });
    created.name = themeName;
    return created;
  }, [themeName]);

  const value = useMemo<ThemeContextValue>(
    () => ({ themeName, theme, rotateTheme, setThemeName }),
    [themeName, theme, rotateTheme, setThemeName]
  );

  return (
    <ThemeRuntimeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeRuntimeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeRuntimeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }
  return context;
};
