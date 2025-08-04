import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export type ColorScheme = 'default' | 'blue' | 'purple' | 'green' | 'red' | 'orange';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const colorSchemes = {
  default: {
    primary: { h: 24, s: 95, l: 53 }, // Orange
    secondary: { h: 45, s: 100, l: 51 } // Yellow
  },
  blue: {
    primary: { h: 217, s: 91, l: 60 },
    secondary: { h: 200, s: 98, l: 39 }
  },
  purple: {
    primary: { h: 262, s: 83, l: 58 },
    secondary: { h: 290, s: 84, l: 60 }
  },
  green: {
    primary: { h: 142, s: 71, l: 45 },
    secondary: { h: 120, s: 60, l: 50 }
  },
  red: {
    primary: { h: 0, s: 84, l: 60 },
    secondary: { h: 15, s: 80, l: 50 }
  },
  orange: {
    primary: { h: 33, s: 100, l: 50 },
    secondary: { h: 39, s: 100, l: 50 }
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('default');

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColorScheme = localStorage.getItem('colorScheme') as ColorScheme;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    
    if (savedColorScheme) {
      setColorSchemeState(savedColorScheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
    
    // Apply dark class for Tailwind compatibility
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Also update the body class for consistency
    document.body.className = document.body.className.replace(/\b(light|dark)\b/g, '');
    document.body.classList.add(theme);
    
    // Update CSS custom properties
    const colors = colorSchemes[colorScheme];
    const root = document.documentElement;
    
    root.style.setProperty('--primary-h', colors.primary.h.toString());
    root.style.setProperty('--primary-s', `${colors.primary.s}%`);
    root.style.setProperty('--primary-l', `${colors.primary.l}%`);
    
    root.style.setProperty('--secondary-h', colors.secondary.h.toString());
    root.style.setProperty('--secondary-s', `${colors.secondary.s}%`);
    root.style.setProperty('--secondary-l', `${colors.secondary.l}%`);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('colorScheme', colorScheme);
  }, [theme, colorScheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, toggleTheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { colorSchemes };