import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// export const login = async (identifier, password) => {
//   const response = await axios.post(`${API_URL}/auth/login`, {
//     identifier,
//     password
//   });
//   if (response.data.token) {
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('user', JSON.stringify(response.data.user));
//   }
//   return response.data;
// };

// export const forgotPassword = async (identifier) => {
//   const response = await axios.post(`${API_URL}/auth/forgot-password`, {
//     identifier
//   });
//   return response.data;
// };

// export const resetPassword = async (token, password) => {
//   const response = await axios.post(`${API_URL}/auth/reset-password`, {
//     token,
//     password
//   });
//   return response.data;
// };

// export const updateProfile = async (data) => {
//   const response = await axios.put(
//     `${API_URL}/auth/profile`,
//     data,
//     {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//     }
//   );
//   return response.data;
// };

// export const verifyEmail = async (token) => {
//   const response = await axios.post(
//     `${API_URL}/auth/verify-email`,
//     { token },
//     {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//     }
//   );
//   return response.data;
// };

// src/services/auth.service.js
import apiClient from './api.config';

const API_URL = process.env.REACT_APP_API_URL || 'https://backend-wzk0.onrender.com/api';

export const login = async (identifier, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        identifier,
        password
      });
  
      if (response.data && response.data.token) {
        // Log the response structure for debugging
        console.log('Login response structure:', {
          hasToken: !!response.data.token,
          hasUser: !!response.data.user,
          userId: response.data.user?._id
        });
  
        return {
          token: response.data.token,
          user: {
            _id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            phoneNumber: response.data.user.phoneNumber,
            isEmailVerified: response.data.user.isEmailVerified
          }
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login service error:', error);
      throw error;
    }
  };
  
  // Add this function to verify token
  export const verifyToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      throw error;
    }
  };

export const register = async (userData) => {
    try {
      console.log('Sending registration request:', userData);
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response || error);
      throw error;
    }
  };

export const forgotPassword = async (identifier) => {
  try {
    const response = await apiClient.post('/auth/forgot-password', {
      identifier
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send reset instructions');
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await apiClient.post('/auth/reset-password', {
      token,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Profile update failed');
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await apiClient.post('/auth/verify-email', { token });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Email verification failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

// New functions for OTP-based login
export const sendOTP = async (phoneNumber) => {
  try {
    const response = await apiClient.post('/auth/send-otp', { phoneNumber });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send OTP');
  }
};

export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await apiClient.post('/auth/verify-otp', { phoneNumber, otp });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'OTP verification failed');
  }
};