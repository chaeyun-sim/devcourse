import { GlobalStyle } from '@/styles/global';
import { getTheme, ThemeName } from '@/styles/theme';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

const DEFAULT_THEME_NAME = 'light';
const THEME_LOCALSTORAGE_KEY = 'book_store_theme';

interface State {
  themeName: ThemeName
  toggleTheme: () => void
}

const state = {
  themeName: DEFAULT_THEME_NAME as ThemeName,
  toggleTheme: () => {}
}

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({ children }: { children: ReactNode }) => {
	const [themeName, setThemeName] = useState<ThemeName>('light');

  const toggleTheme = () => {
    const newThemeName = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newThemeName)
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, newThemeName)
  }
  
  useEffect(() => {
    const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY)
    setThemeName((savedThemeName || DEFAULT_THEME_NAME) as ThemeName)
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, savedThemeName || DEFAULT_THEME_NAME)
  }, [])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
};