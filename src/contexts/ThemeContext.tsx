import React, { useEffect, useState, createContext, useContext } from 'react';
type ThemeType = 'light' | 'dark';
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    // Check for system preference if no saved preference
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return savedTheme as ThemeType || 'light';
  });
  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return <ThemeContext.Provider value={{
    theme,
    toggleTheme
  }}>
      {children}
    </ThemeContext.Provider>;
};