import { useState } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }) {

  // skeleton for now

  return (
    <ThemeContext.Provider>
      {children}
    </ThemeContext.Provider>
  );
}