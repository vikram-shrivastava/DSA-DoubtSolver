import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Theme Context
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// 2. Create a custom hook for easy access to the context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// 3. Create the ThemeProvider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme state from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Effect to update the 'dark' class on the HTML element
  // and persist the theme to localStorage whenever isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const contextValue = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};