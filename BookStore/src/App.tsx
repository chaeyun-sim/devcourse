import React from 'react'
import './App.css'
import Layout from './components/layout/Layout'
import Home from './pages/home'
import ThemeSwitch from './components/header/ThemeSwitch'
import { BookStoreThemeProvider } from './context/themeContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import Books from './pages/Books'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/books',
    element: <div>도서목록</div>
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/reset',
    element: <ResetPassword />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/books',
    element: <Books />
  }
])

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitch />
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </BookStoreThemeProvider>
  )
}

export default App
