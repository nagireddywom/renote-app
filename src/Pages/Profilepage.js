// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../Hooks/UseAuth';
// import InputField from '../Components/common/InputFeild';
// import Button from '../Components/common/Button';

// const CompleteProfilePage = () => {
//   const { user, updateUser } = useAuth();
//   const [name, setName] = useState(user?.name || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/auth/update-profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ name, email })
//       });

//       const data = await response.json();
//       if (response.ok) {
//         updateUser(data.user);
//         navigate('/shipping');
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError('Failed to update profile');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="page-container">
//       <div className="auth-form-container">
//         <h2 className="auth-title">Complete Your Profile</h2>
//         {error && <div className="error-message">{error}</div>}
//         <form onSubmit={handleSubmit} className="auth-form">
//           <InputField
//             label="Full Name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <InputField
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <Button
//             type="submit"
//             className="submit-button"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Saving...' : 'Save and Continue'}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CompleteProfilePage;

// CompleteProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/UseAuth';
// import OrderCard from './OrderCard';
import '../Styles/profilepage.css';

const CompleteProfilePage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        updateUser(data.user);
        setSuccess('Profile updated successfully!');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setSuccess('Verification email sent successfully!');
      } else {
        setError('Failed to send verification email');
      }
    } catch (error) {
      setError('Failed to send verification email');
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Dashboard</h1>
      
      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="tab-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="email-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {!user?.emailVerified && (
                    <button 
                      type="button" 
                      className="verify-button"
                      onClick={sendVerificationEmail}
                    >
                      Verify Email
                    </button>
                  )}
                  {user?.emailVerified && (
                    <span className="verified-badge">Verified</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {/* {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Order History</h2>
            {orders.length === 0 ? (
              <p className="no-orders">No orders found</p>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <OrderCard 
                    key={order.id} 
                    order={order}
                    onClick={() => navigate(`/orders/${order.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )} */}

        {activeTab === 'security' && (
          <div className="security-section">
            <h2>Security Settings</h2>
            <div className="security-card">
              <div className="security-item">
                <div>
                  <h3>Email Verification</h3>
                  <p>Verify your email address for account security</p>
                </div>
                {user?.emailVerified ? (
                  <span className="verified-badge">Verified</span>
                ) : (
                  <button 
                    className="verify-button"
                    onClick={sendVerificationEmail}
                  >
                    Verify Now
                  </button>
                )}
              </div>

              <div className="security-item">
                <div>
                  <h3>Password</h3>
                  <p>Change your account password</p>
                </div>
                <button 
                  className="change-button"
                  onClick={() => navigate('/change-password')}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteProfilePage;

