import React from 'react'
import './App.css'
import Layout from './components/layout/Layout'
import Home from './pages/home'
import ThemeSwitch from './components/header/ThemeSwitch';
import { BookStoreThemeProvider } from './context/themeContext';

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitch />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  )
}

export default App
