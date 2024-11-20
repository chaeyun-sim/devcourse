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
import BookDetail from './components/books/BookDetail'
import Cart from './pages/Cart'
import Order from './pages/Order'
import OrderList from './pages/OrderList'
import Error from './components/common/Error'
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from './api/queryClient'
import ToastContainer from './components/common/ToastContainer'

const routeList = [
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
    path: '/book/:bookId',
    element: <BookDetail />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/order',
    element: <Order />
  },
  {
    path: '/orderlist',
    element: <OrderList />
  }
]

const newRouteList = routeList.map(item => {
  return {
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: <Error />
  }
})

const router = createBrowserRouter(newRouteList)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <ThemeSwitch />
        <RouterProvider router={router} />
        <ToastContainer />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  )
}

export default App
