import { useState } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState('dark')
  
  // create a function to toggle the theme; I can use that in e.g. buttons
  function toggleTheme() {
    setTheme(
      (prev) => (prev === 'light' ? 'dark' : 'light')
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
