// // frontend/src/services/order.service.js
// import apiClient from './api.config';

// export const createOrder = async (orderData) => {
//   try {
//     const response = await apiClient.post('/orders', orderData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getOrder = async (orderNumber) => {
//   try {
//     const response = await apiClient.get(`/orders/${orderNumber}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getUserOrders = async () => {
//   try {
//     const response = await apiClient.get('/orders/user/orders');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateShippingInfo = async (orderNumber, shippingInfo) => {
//   try {
//     const response = await apiClient.put(`/orders/${orderNumber}/shipping`, { shippingInfo });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const cancelOrder = async (orderNumber) => {
//   try {
//     const response = await apiClient.put(`/orders/${orderNumber}/cancel`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// import apiClient from './api.config';

// export const createOrder = async (orderData) => {
//   try {
//     // Get the auth token
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       throw new Error('Authentication required');
//     }

//     const response = await apiClient.post('/orders', orderData, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     return response.data;
//   } catch (error) {
//     if (error.response?.status === 401) {
//       // Instead of redirecting, throw an error to be handled by the component
//       throw new Error('Please login to continue');
//     }
//     throw error.response?.data?.message || error.message || 'Failed to create order';
//   }
// };

// export const getOrder = async (orderNumber) => {
//   try {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       throw new Error('Authentication required');
//     }

//     const response = await apiClient.get(`/orders/${orderNumber}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || error.message || 'Failed to fetch order';
//   }
// };


// Services/order.service.js// services/order.service.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://backend-wzk0.onrender.com/api';


// Create order for both authenticated and guest users
export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };

    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('Sending order data:', orderData);

    const response = await axios.post(`${API_URL}/orders`, orderData, { headers });

    console.log('Order creation response:', response.data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create order');
    }

    return response.data;
  } catch (error) {
    console.error('Create order error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

// Get order - works for both authenticated and guest orders
export const getOrder = async (orderNumber, email = null) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${API_URL}/orders/${orderNumber}`, { headers });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch order');
      }
      return response.data.order;
    } else if (email) {
      // Guest order lookup
      const response = await axios.post(`${API_URL}/orders/guest/track`, {
        orderNumber,
        email
      }, { headers });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch order');
      }
      return response.data.order;
    } else {
      throw new Error('Either authentication or email is required to fetch order');
    }
  } catch (error) {
    console.error('Get order error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch order');
  }
};

// Get user orders (authenticated users only)
export const getUserOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await axios.get(`${API_URL}/orders/user/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch orders');
    }

    return response.data.orders;
  } catch (error) {
    console.error('Get user orders error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

// New function to track guest orders
export const trackGuestOrder = async (orderNumber, email) => {
  try {
    const response = await axios.post(`${API_URL}/orders/guest/track`, {
      orderNumber,
      email
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to track order');
    }

    return response.data.order;
  } catch (error) {
    console.error('Track guest order error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to track order');
  }
};