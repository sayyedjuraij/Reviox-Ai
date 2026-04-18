import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import DemoPage from './pages/DemoPage';
import SuperAdminPage from './pages/SuperAdminPage';

// Layout
import Navbar from './components/Navbar';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/signup"      element={<SignupPage />} />
        <Route path="/dashboard"   element={<DashboardPage />} />
        <Route path="/admin"       element={<AdminPage />} />
        <Route path="/demo"        element={<DemoPage />} />
        <Route path="/superadmin"  element={<SuperAdminPage />} />
      </Routes>
      <WhatsAppFloat />
    </>
  );
}

export default App;
