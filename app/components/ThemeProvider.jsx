// app/components/ThemeProvider.jsx (COMPLETE REPLACEMENT)
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Create context with default values to prevent undefined
const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    setMounted(true);
  }, []);

  // Update DOM when darkMode changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', darkMode);
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }
  }, [darkMode, mounted]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Always provide the context, even during SSR
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // Context should never be undefined because we provide default values
  return context;
}