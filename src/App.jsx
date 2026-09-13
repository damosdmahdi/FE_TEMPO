import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import { AnimatePresence } from 'framer-motion';

import Home from './features/company-profile/pages/Home';
import TentangKami from './features/company-profile/pages/TentangKami';
import Departemen from './features/company-profile/pages/Departemen';
import CariAnggota from './features/company-profile/pages/CariAnggota';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/departemen" element={<Departemen />} />
        <Route path="/departemen/:id" element={<Departemen />} />
        <Route path="/cari-anggota" element={<CariAnggota />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;