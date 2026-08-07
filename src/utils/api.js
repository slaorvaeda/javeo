import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.clickkarte.com/api' || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
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
