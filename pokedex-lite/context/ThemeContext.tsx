'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component
 * Manages theme state (light, dark, system) with localStorage persistence
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    setIsMounted(true);

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme-preference') as Theme | null;
    const initialTheme = savedTheme || 'system';
    setThemeState(initialTheme);

    // Determine resolved theme (actual theme to apply)
    const resolveTheme = () => {
      if (initialTheme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
      }
      return initialTheme;
    };

    const resolved = resolveTheme();
    setResolvedTheme(resolved);

    // Apply theme to document
    applyTheme(resolved);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (initialTheme === 'system') {
        const isDark = mediaQuery.matches;
        setResolvedTheme(isDark ? 'dark' : 'light');
        applyTheme(isDark ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (themeToApply: 'light' | 'dark') => {
    const html = document.documentElement;
    if (themeToApply === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        themeToApply === 'dark' ? '#111827' : '#3B82F6'
      );
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme-preference', newTheme);

    // Calculate resolved theme
    let resolvedNew: 'light' | 'dark';
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      resolvedNew = prefersDark ? 'dark' : 'light';
    } else {
      resolvedNew = newTheme;
    }

    setResolvedTheme(resolvedNew);
    applyTheme(resolvedNew);
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme hook
 * Access theme state and setter function
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
