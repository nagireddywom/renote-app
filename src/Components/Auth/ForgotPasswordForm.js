import React, { useState } from 'react';
import { forgotPassword } from '../../Services/Auth.service';
import InputField from '../common/InputFeild';
import Button from '../common/Button';

const ForgotPasswordForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await forgotPassword(identifier);
      setMessage(data.message);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Forgot Password</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <InputField
          label="Email or Phone Number"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <Button type="submit" className="submit-button">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;