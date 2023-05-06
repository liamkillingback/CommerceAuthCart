import { useState } from 'react'
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, HomePage, ShoppingPage, ProfilePage } from './pages';
import { Navbar } from './components';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = Boolean(useSelector((state) => state.token));

  return (
    <>
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path = '/login' element={<LoginPage />} />
        <Route path = '/products' element={<ShoppingPage />} />
        <Route path = '/products/:catagory' element={<ShoppingPage />} />
        <Route path = '/profile' element={ isAuthenticated ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
