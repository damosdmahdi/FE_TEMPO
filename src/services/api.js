import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://hmik-api.jollydesert-d738a848.southeastasia.azurecontainerapps.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hmik_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Unwrap JSend response
api.interceptors.response.use(
  (response) => {
    // If backend returns JSend format { status: "success", data: [...] }
    if (response.data && response.data.status === 'success') {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('hmik_token');
    }
    const errorMessage = error.response?.data?.message || 'Terjadi kesalahan jaringan';
    return Promise.reject(errorMessage);
  }
);

export default api;
