import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import ProductCard from './components/ProductCard'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/products',
    element: <ProductCard />,
  }
])


export default function App() {



  return (
    <>
      <RouterProvider router={router} /> 
    </>
  )
}
