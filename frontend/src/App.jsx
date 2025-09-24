import React from 'react';
import { useState } from 'react'
import './App.css'
import { Button, Space, DatePicker, version } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'; 

import AddVehicle from './pages/AddVehicle';
import SearchAndBook from './pages/SearchAndBook';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import BookingsPage from './pages/BookingsPage';


function App() {

  return (
    <>
  <Router>
    <Toaster />
      <div className="App ">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/search-book" element={<SearchAndBook />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>

    </> 
  )
} 

export default App
