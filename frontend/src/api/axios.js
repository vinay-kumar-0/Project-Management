import axios from 'axios';

// Create a custom instance of Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
});

// Add an interceptor to inject the token before the request leaves
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // The exact format your backend expects
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;