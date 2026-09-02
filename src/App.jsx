import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // npm install react-router-dom belum diinstall

// 1. Import Halaman Publik
import Home from './pages/public/Home';
// Import file lainnya nanti saat sudah dibuat:
// import Members from './pages/public/Members';
// import MemberDetail from './pages/public/MemberDetail';
// import Learning from './pages/public/Learning';
// import Election from './pages/public/Election';

// 2. Import Halaman Admin
// import AdminLogin from './pages/admin/AdminLogin';
// import Dashboard from './pages/admin/Dashboard';

// 3. Import Halaman 404
// import NotFound from './pages/NotFound';

/* 
 * 🛡️ ROUTE GUARD (Sesuai Spesifikasi)
 * Komponen ini akan mengecek apakah token admin ada di LocalStorage.
 * Jika tidak ada, paksa pindah (redirect) ke halaman login.
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken'); // Sesuaikan dengan nama key token Anda nantinya
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* =========================================
            🌐 PUBLIC ROUTES (Halaman Publik)
            ========================================= */}
        <Route path="/" element={<Home />} />
        
        {/* Komentar sementara, buka jika file sudah ada */}
        {/* <Route path="/members" element={<Members />} /> */}
        {/* <Route path="/members/:nim" element={<MemberDetail />} /> */}
        {/* <Route path="/learning" element={<Learning />} /> */}
        {/* <Route path="/election" element={<Election />} /> */}

        {/* =========================================
            🔐 PROTECTED ROUTES (Halaman Admin)
            ========================================= */}
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        
        {/* Contoh penerapan PrivateRoute untuk Dashboard Admin */}
        {/* <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        /> */}

        {/* =========================================
            🛡️ CATCH-ALL ROUTE (404 Not Found)
            ========================================= */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;