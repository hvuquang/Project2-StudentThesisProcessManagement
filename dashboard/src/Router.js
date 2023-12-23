import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AccountManagement from "./pages/Account/AccountManagement";
import ChangeTopicManagement from './pages/ChangeTopic/ChangeTopicManagement';
import ReportManagement from "./pages/Report/ReportManagement"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<AccountManagement />} />
        <Route path="/manage-account" element={<AccountManagement />} />
      <Route path="/manage-reports" element={<ReportManagement />} />
      <Route path="/manage-change-topics" element={<ChangeTopicManagement />} />
    </Routes>
  )
}

export default AppRouter
