import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Component/Home';
import Books from './Component/Books';
import Users from './Component/Users';
import BorrowingHistory from './Component/BorrowingHistory';

const AppRouter = () => {
  return (
    <>
    <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<Users />} />
        <Route path="/history" element={<BorrowingHistory />} />

         
    </Routes>
    </>
  )
}

export default AppRouter