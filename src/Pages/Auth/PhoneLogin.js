import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/UseAuth';
import InputField from '../common/InputField';
import Button from '../common/Button';

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('PHONE'); // PHONE or OTP
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });

      const data = await response.json();
      if (response.ok) {
        setStep('OTP');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/shipping');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Phone Login</h2>
      {error && <div className="error-message">{error}</div>}

      {step === 'PHONE' ? (
        <form onSubmit={handleSendOTP} className="auth-form">
          <InputField
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
          <Button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="auth-form">
          <InputField
            label="Enter OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            required
          />
          <Button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>
          <button
            type="button"
            onClick={() => setStep('PHONE')}
            className="link-button"
          >
            Change Phone Number
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin;