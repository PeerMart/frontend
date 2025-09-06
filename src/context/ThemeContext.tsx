import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark'; // The actual applied theme
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  actualTheme: 'dark',
  setTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialTheme = (): Theme => (localStorage.getItem('theme') as Theme) || 'system';

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>(() => {
    if (theme === 'system') {
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme as 'light' | 'dark';
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
  };

  // Update actual theme when theme preference changes
  useEffect(() => {
    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setActualTheme(systemDark ? 'dark' : 'light');
    } else {
      setActualTheme(theme as 'light' | 'dark');
    }
  }, [theme]);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);

    const themeLink = document.querySelector('#theme-link') as HTMLLinkElement | null;
    if (themeLink) {
      themeLink.href = themeLink.href.replace(/lara-(light|dark)-blue/, `lara-${actualTheme}-blue`);
    }
  }, [actualTheme]);

  // Listen for system theme changes when using system preference
  useEffect(() => {
    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setActualTheme(e.matches ? 'dark' : 'light');
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>{children}</ThemeContext.Provider>;
};
