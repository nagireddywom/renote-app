// // src/services/api-config.js
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     withCredentials: true,
//     'Content-Type': 'application/json'
//   }
// });

// // Request interceptor for adding token
// const getCsrfToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

// apiClient.interceptors.request.use(config => {
//   const token = getCsrfToken();
//   if (token) {
//     config.headers['X-CSRF-Token'] = token;
//   }
//   return config;
// },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for handling errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;


import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://backend-wzk0.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect on 401, let components handle it
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;