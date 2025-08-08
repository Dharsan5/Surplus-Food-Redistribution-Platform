import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Restaurant from './pages/Restaurant'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="orders" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
              <Route path="restaurant/:id" element={<Restaurant />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App