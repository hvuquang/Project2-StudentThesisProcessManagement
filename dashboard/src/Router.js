import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AccountManagement from "./pages/Account/AccountManagement";
import ReportManagement from './pages/Report/ReportManagement';

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<AccountManagement />} />
        <Route path="/manage-account" element={<AccountManagement />} />
      <Route path="/manage-reports" element={<ReportManagement />} />
    </Routes>
  )
}

export default AppRouter
