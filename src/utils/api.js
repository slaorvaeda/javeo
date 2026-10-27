import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8085/api' || 'https://api.clickkarte.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach customer auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('javeo_customer_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor to unwrap data payloads and unify error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorData = error.response ? error.response.data : error;
    const errorMessage = errorData?.message || error.message || 'An error occurred';

    const enhancedError = new Error(errorMessage);
    enhancedError.response = error.response;
    enhancedError.data = errorData;

    return Promise.reject(enhancedError);
  }
);

export default api;
