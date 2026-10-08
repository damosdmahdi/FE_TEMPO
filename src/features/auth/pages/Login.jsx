import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        identifier,
        password
      });

      // Assuming the response structure based on entity/auth.go
      // The frontend api instance might return response.data directly or response itself depending on interceptors
      // We will check for response.data or response
      const token = response.token || response.data?.token || response.data?.data?.token;
      
      if (token) {
        localStorage.setItem('adminToken', token);
        // Redirect back to Cari Anggota
        navigate('/cari-anggota');
      } else {
        setErrorMsg('Login failed: No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#e6992d' // Temporary background color mimicking the doodle's main color
    }}>
      <div style={{
        backgroundColor: 'white', 
        padding: '2rem 3rem', 
        borderRadius: '12px', 
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        border: '3px solid #333'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'sans-serif' }}>LOGIN</h2>
        
        {errorMsg && (
          <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email / Username</label>
            <input 
              type="text" 
              placeholder="email" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
            <input 
              type="password" 
              placeholder="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              backgroundColor: '#3b5998',
              color: 'white',
              padding: '0.75rem',
              border: '2px solid #222',
              borderRadius: '24px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '1rem'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
