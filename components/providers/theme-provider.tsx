'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemeToggle() {
  const { theme, setTheme } = React.useContext(React.createContext({ theme: 'light', setTheme: () => {} }));

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
    >
      <span className="sr-only">Toggle theme</span>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
