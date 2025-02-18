// src/Components/auth/RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { register } from '../../Services/Auth.service';
import InputField from '../common/InputFeild'; // Fixed import name
import Button from '../common/Button';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Register user
      const response = await register(formData);
      setUser(response.user);
      
      // Store shipping info
      const shippingInfo = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      };
      
      localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        submit: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Create Account</h2>
      {errors.submit && <div className="error-message">{errors.submit}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <InputField
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            required
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          <InputField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            error={errors.phoneNumber}
            required
          />
        </div>

        <div className="form-section">
          <h3>Shipping Address</h3>
          <InputField
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={errors.address}
            required
          />

          <InputField
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            error={errors.city}
            required
          />

          <InputField
            label="State"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            error={errors.state}
            required
          />

          <InputField
            label="Pincode"
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            error={errors.pincode}
            required
          />
        </div>

        <div className="form-section">
          <h3>Account Security</h3>
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
          />
        </div>

        <Button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account & Continue'}
        </Button>
      </form>

      <div className="auth-links">
        Already have an account?{' '}
        <a href="/login" className="auth-link">
          Sign In
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;