import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountManagement from "./pages/AccountManagement";
const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<AccountManagement />} />
        <Route path="/manage-account" element={<AccountManagement />} />
    </Routes>
  )
}

export default AppRouter
