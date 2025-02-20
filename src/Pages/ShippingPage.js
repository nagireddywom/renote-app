// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ShippingPage.css';

// const ShippingPage = () => {
//   const navigate = useNavigate();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [shippingInfo, setShippingInfo] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address1: '',
//     address2: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: 'US',
//     isGift: false,
//     giftMessage: ''
//   });

//   useEffect(() => {
//     const savedOrder = localStorage.getItem('currentOrder');
//     if (!savedOrder) {
//       navigate('/customize');
//       return;
//     }
//     setOrderDetails(JSON.parse(savedOrder));
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setShippingInfo(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically submit the order to your backend
//     // For now, we'll just show an alert
//     alert('Order submitted successfully!');
//     localStorage.removeItem('currentOrder');
//     navigate('/order-confirmation');
//   };

//   if (!orderDetails) return <div>Loading...</div>;

//   return (
//     <div className="shipping-container">
//       <div className="shipping-grid">
//         <div className="shipping-form">
//           <h2>Shipping Information</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={shippingInfo.firstName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={shippingInfo.lastName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={shippingInfo.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={shippingInfo.phone}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Address Line 1</label>
//               <input
//                 type="text"
//                 name="address1"
//                 value={shippingInfo.address1}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Address Line 2</label>
//               <input
//                 type="text"
//                 name="address2"
//                 value={shippingInfo.address2}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={shippingInfo.city}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>State</label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={shippingInfo.state}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>ZIP Code</label>
//                 <input
//                   type="text"
//                   name="zipCode"
//                   value={shippingInfo.zipCode}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="gift-section">
//               <div className="form-group checkbox">
//                 <input
//                   type="checkbox"
//                   name="isGift"
//                   checked={shippingInfo.isGift}
//                   onChange={handleInputChange}
//                   id="isGift"
//                 />
//                 <label htmlFor="isGift">This is a gift</label>
//               </div>

//               {shippingInfo.isGift && (
//                 <div className="form-group">
//                   <label>Gift Message</label>
//                   <textarea
//                     name="giftMessage"
//                     value={shippingInfo.giftMessage}
//                     onChange={handleInputChange}
//                     rows="4"
//                   />
//                 </div>
//               )}
//             </div>

//             <button type="submit" className="submit-button">
//               Complete Order (${orderDetails.pricing.totalPrice})
//             </button>
//           </form>
//         </div>

//         <div className="order-summary">
//           <h2>Order Summary</h2>
//           <div className="summary-details">
//             <p>Quantity: {orderDetails.customization.quantity}</p>
//             <p>Pages: {orderDetails.customization.pages.selected}</p>
//             <p>Paper Type: {orderDetails.customization.paperType}</p>
//             <p>Binding: {orderDetails.customization.bindingType}</p>
//             {orderDetails.pricing.discount > 0 && (
//               <p>Bulk Discount: {orderDetails.pricing.discount}% off</p>
//             )}
//             <p className="total">Total: ${orderDetails.pricing.totalPrice}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShippingPage;
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/ShippingPage.css';
import { useAuth } from '../Context/AuthContext';
import { createOrder, updateShippingInfo } from '../Services/order.service';
import RazorpayPayment from '../Components/Products/Razorpay';

const GIFT_WRAPPING_PRICE = 40;

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];



const ShippingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth(); 
  const [orderDetails, setOrderDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const popupRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  // const [showCreateAccount, setShowCreateAccount] = useState(false);
  // const [password, setPassword] = useState('');
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [stateSearchValue, setStateSearchValue] = useState('');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const stateDropdownRef = useRef(null);


  useEffect(() => {
    console.log('Current user state:', user);
    console.log('Loading state:', loading);
    console.log('Local storage user:', localStorage.getItem('user'));
    console.log('Local storage token:', localStorage.getItem('token'));
  }, [user, loading]);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setIsStateDropdownOpen(false);
        setStateSearchValue(''); // Clear search value when closing
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Modified handleStateSelect function
  const handleStateSelect = (state) => {
    setShippingInfo(prev => ({ ...prev, state }));
    setStateSearchValue('');
    setIsStateDropdownOpen(false);
    if (formErrors.state) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.state;
        return newErrors;
      });
    }
  };
  
  
  const validateShippingForm = () => {
    const errors = {};
  
    // First Name Validation
    if (!shippingInfo.firstName || shippingInfo.firstName.trim() === '') {
      errors.firstName = 'First Name is required';
    } else if (shippingInfo.firstName.length < 2) {
      errors.firstName = 'First Name must be at least 2 characters long';
    } else if (!/^[A-Za-z\s]+$/.test(shippingInfo.firstName)) {
      errors.firstName = 'First Name can only contain letters';
    }
  
    // Last Name Validation
    if (!shippingInfo.lastName || shippingInfo.lastName.trim() === '') {
      errors.lastName = 'Last Name is required';
    } else if (shippingInfo.lastName.length < 2) {
      errors.lastName = 'Last Name must be at least 2 characters long';
    } else if (!/^[A-Za-z\s]+$/.test(shippingInfo.lastName)) {
      errors.lastName = 'Last Name can only contain letters';
    }
  
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!shippingInfo.email || shippingInfo.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(shippingInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    // Phone Number Validation
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!shippingInfo.phone || shippingInfo.phone.trim() === '') {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(shippingInfo.phone)) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
  
    // Address Line 1 Validation
    if (!shippingInfo.address1 || shippingInfo.address1.trim() === '') {
      errors.address1 = 'Address Line 1 is required';
    } else if (shippingInfo.address1.length < 5) {
      errors.address1 = 'Address must be at least 5 characters long';
    }
  
    // City Validation
    if (!shippingInfo.city || shippingInfo.city.trim() === '') {
      errors.city = 'City is required';
    }
      else if (shippingInfo.city.length < 4) {
        errors.city = 'Last Name must be at least 4 characters long';
      
    } else if (!/^[A-Za-z\s]+$/.test(shippingInfo.city)) {
      errors.city = 'City name can only contain letters';
    }
  
    // State Validation
    // if (!shippingInfo.state || shippingInfo.state.trim() === '') {
    //   errors.state = 'State is required';
    // }
    if (!shippingInfo.state || shippingInfo.state.trim() === '') {
      errors.state = 'Please select a state';
    }
      else if (shippingInfo.state.length < 3) {
        errors.state = 'Last Name must be at least 3 characters long';
    } else if (!/^[A-Za-z\s]+$/.test(shippingInfo.state)) {
      errors.state = 'State name can only contain letters';
    }
  
    // ZIP Code Validation
    const zipRegex = /^[1-9][0-9]{5}$/; // Indian PIN code format
    if (!shippingInfo.zipCode || shippingInfo.zipCode.trim() === '') {
      errors.zipCode = 'ZIP Code is required';
    } else if (!zipRegex.test(shippingInfo.zipCode)) {
      errors.zipCode = 'Please enter a valid 6-digit PIN code';
    }
  
    return errors;
  };
  
  const handleProceedToPayment = () => {
    // Validate all fields
    const validationErrors = validateShippingForm();
  
    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) {
      // Set errors in state to display
      setFormErrors(validationErrors);
      return;
    }
  
    // Clear any previous errors
    setFormErrors({});
  
    // Proceed to payment popup
    setShowPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };
  
  
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClosePaymentPopup();
      }
    };
  
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClosePaymentPopup();
      }
    };
  
    if (showPaymentPopup) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPaymentPopup]);
  
    useEffect(() => {
      console.log('Current user state:', user);
      console.log('Loading state:', loading);
      console.log('Local storage user:', localStorage.getItem('user'));
      console.log('Local storage token:', localStorage.getItem('token'));
    }, [user, loading]);
  
  
    
    
      // const validateAuth = async () => {
      //   if (!loading) {
      //     const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      //     const token = localStorage.getItem('token');
          
      //     console.log('Auth Validation Debug:', {
      //       token: !!token,
      //       storedUser,
      //       contextUser: user,
      //       storedUserId: storedUser?._id || storedUser?.id,
      //       contextUserId: user?._id || user?.id
      //     });
      
      //     // More comprehensive user ID check
      //     const hasValidUserId = 
      //       (storedUser?._id || storedUser?.id) || 
      //       (user?._id || user?.id);
      
      //     if (!token || !hasValidUserId) {
      //       console.log('Authentication failed, redirecting to login...');
      //       navigate('/login', {
      //         state: {
      //           returnTo: location.pathname,
      //           orderData: orderDetails || localStorage.getItem('currentOrder')
      //         }
      //       });
      //       return false;
      //     }
      //     return true;
      //   }
      //   return false;
      // };
      
      // useEffect(() => {
      //   if (!loading) {
      //     validateAuth();
      //   }
      // }, [user, loading, navigate, location.pathname, orderDetails]);

      const validateAuth = async () => {
        if (!loading) {
          const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
          const token = localStorage.getItem('token');
          
          console.log('Auth Validation Debug:', {
            token: !!token,
            storedUser,
            contextUser: user,
            storedUserId: storedUser?._id || storedUser?.id,
            contextUserId: user?._id || user?.id
          });
      
          const hasValidUserId = 
            (storedUser?._id || storedUser?.id) || 
            (user?._id || user?.id);
      
          if (!token || !hasValidUserId) {
            setShowAuthPrompt(true);
            return false;
          }
          
          setShowAuthPrompt(false);
          return true;
        }
        return false;
      };
          useEffect(() => {
            if (!loading) {
              validateAuth();
            }
          }, [user, loading, navigate, location.pathname, orderDetails]);
    // Initialize shipping info with user data
    const [shippingInfo, setShippingInfo] = useState(() => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const currentUser = user || storedUser;
      const userId = currentUser?.id || currentUser?._id;
      
      console.log('Initializing shipping info with user:', {
        userId,
        name: currentUser?.name,
        email: currentUser?.email
      });
  
      return {
        firstName: currentUser?.name?.split(' ')[0] || '',
        lastName: currentUser?.name?.split(' ')[1] || '',
        email: currentUser?.email || '',
        phone: currentUser?.phoneNumber || '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'INDIA',
        isGift: false,
        giftMessage: ''
      };
    });
    useEffect(() => {
      const loadOrderDetails = () => {
        try {
          let orderData = null;
    
          // First, check location state
          if (location.state?.product) {
            const { product, quantity, pages, totalCost, isCustomized } = location.state;
            orderData = {
              product,
              isCustomized: isCustomized || false,
              customization: {
                quantity: Number(quantity),
                pages: { selected: Number(pages) },
                paperType: 'Standard',
                bindingType: 'Standard'
              },
              pricing: {
                basePrice: Number(totalCost) / Number(quantity),
                totalPrice: Number(totalCost),
                discount: 0
              }
            };
          } 
          
          // If no location state, check local storage
          if (!orderData) {
            const savedOrder = localStorage.getItem('currentOrder');
            if (savedOrder) {
              const parsedOrder = JSON.parse(savedOrder);
              orderData = {
                product: parsedOrder.product,
                isCustomized: parsedOrder.isCustomized || false,
                customization: {
                  quantity: Number(parsedOrder.quantity),
                  pages: { selected: Number(parsedOrder.pages) },
                  paperType: parsedOrder.paperType || 'Standard',
                  bindingType: parsedOrder.bindingType || 'Standard'
                },
                pricing: {
                  basePrice: Number(parsedOrder.totalCost) / Number(parsedOrder.quantity),
                  totalPrice: Number(parsedOrder.totalCost),
                  discount: 0
                }
              };
            }
          }
    
          // Debugging logs
          console.log('Order Data Loading:', {
            locationState: location.state,
            localStorageOrder: localStorage.getItem('currentOrder'),
            parsedOrderData: orderData
          });
    
          if (!orderData) {
            console.log('No order data found');
            setError('No order details available. Please start a new order.');
            return;
          }
    
          setOrderDetails(orderData);
          setTotalPrice(Number(orderData.pricing.totalPrice));
        } catch (error) {
          console.error('Error loading order details:', error);
          setError('Failed to load order details. Please try again.');
        }
      };
    
      if (!loading) {
        loadOrderDetails();
      }
    }, [location, loading, navigate]);
  
    useEffect(() => {
      if (orderDetails) {
        const basePrice = Number(orderDetails.pricing.totalPrice);
        const giftPrice = shippingInfo.isGift ? GIFT_WRAPPING_PRICE : 0;
        setTotalPrice(basePrice + giftPrice);
      }
    }, [shippingInfo.isGift, orderDetails]);
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setShippingInfo(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
      if (formErrors[name]) {
        setFormErrors(prev => {
          const newErrors = {...prev};
          delete newErrors[name];
          return newErrors;
        });
      }
    };
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   setIsSubmitting(true);
    //   setError(null);
  
    //   try {
    //     const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    //     const userId = user?.id || user?._id || storedUser?.id || storedUser?._id;
  
    //     if (!userId) {
    //       throw new Error('Please login to place an order');
    //     }
  
    //     console.log('Creating order for user:', userId);
  
    //     const orderData = {
    //       user: userId,
    //       orderDetails: {
    //         product: orderDetails.product,
    //         isCustomized: orderDetails.isCustomized,
    //         customization: {
    //           quantity: orderDetails.customization.quantity,
    //           pages: {
    //             selected: orderDetails.customization.pages.selected
    //           },
    //           paperType: orderDetails.customization.paperType,
    //           bindingType: orderDetails.customization.bindingType
    //         },
    //         pricing: {
    //           basePrice: orderDetails.pricing.basePrice,
    //           totalPrice: orderDetails.pricing.totalPrice,
    //           discount: orderDetails.pricing.discount || 0
    //         }
    //       },
    //       shippingInfo: {
    //         firstName: shippingInfo.firstName,
    //         lastName: shippingInfo.lastName,
    //         email: shippingInfo.email,
    //         phone: shippingInfo.phone,
    //         address1: shippingInfo.address1,
    //         address2: shippingInfo.address2 || '',
    //         city: shippingInfo.city,
    //         state: shippingInfo.state,
    //         zipCode: shippingInfo.zipCode,
    //         country: shippingInfo.country
    //       },
    //       giftDetails: {
    //         isGift: shippingInfo.isGift,
    //         giftMessage: shippingInfo.giftMessage || '',
    //         giftWrapPrice: shippingInfo.isGift ? GIFT_WRAPPING_PRICE : 0
    //       },
    //       finalPrice: totalPrice,
    //       status: 'pending'
    //     };
  
    //     const response = await createOrder(orderData);
        
    //     if (!response || !response.orderNumber) {
    //       throw new Error('Failed to create order');
    //     }
  
    //     const createdOrderWithPrice = {
    //       ...response,
    //       finalPrice: totalPrice
    //     };
        
    //     setCreatedOrder(createdOrderWithPrice);
    //     setShowPayment(true);
    //     setIsSubmitting(false);
  
    //   } catch (error) {
    //     console.error('Order creation error:', error);
    //     if (error.message.includes('login')) {
    //       navigate('/login', {
    //         state: {
    //           returnTo: location.pathname,
    //           orderData: orderDetails
    //         }
    //       });
    //     }
    //     setError(error.message || 'Failed to process order. Please try again.');
    //     setIsSubmitting(false);
    //   }
    // };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);
    
      try {
        const validationErrors = validateShippingForm();
        if (Object.keys(validationErrors).length > 0) {
          setFormErrors(validationErrors);
          setIsSubmitting(false);
          return;
        }
    
        const orderData = {
          orderDetails: {
            product: orderDetails.product,
            isCustomized: orderDetails.isCustomized,
            customization: orderDetails.customization,
            pricing: orderDetails.pricing
          },
          shippingInfo: {
            firstName: shippingInfo.firstName,
            lastName: shippingInfo.lastName,
            email: shippingInfo.email,
            phone: shippingInfo.phone,
            address1: shippingInfo.address1,
            address2: shippingInfo.address2 || '',
            city: shippingInfo.city,
            state: shippingInfo.state,
            zipCode: shippingInfo.zipCode,
            country: shippingInfo.country
          },
          giftDetails: {
            isGift: shippingInfo.isGift,
            giftMessage: shippingInfo.giftMessage || '',
            giftWrapPrice: shippingInfo.isGift ? GIFT_WRAPPING_PRICE : 0
          },
          finalPrice: totalPrice,
          status: 'pending'
        };
    
        // Add user ID if authenticated
        if (!isGuestCheckout) {
          const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
          const userId = user?.id || user?._id || storedUser?.id || storedUser?._id;
          orderData.user = userId;
        }
    
        const response = await createOrder(orderData);
        
        if (!response || !response.orderNumber) {
          throw new Error('Failed to create order');
        }
    
        const createdOrderWithPrice = {
          ...response,
          finalPrice: totalPrice
        };
        
        setCreatedOrder(createdOrderWithPrice);
        setShowPaymentPopup(true);
        setIsSubmitting(false);
    
      } catch (error) {
        console.error('Order creation error:', error);
        setError(error.message || 'Failed to process order. Please try again.');
        setIsSubmitting(false);
      }
    };
  
    //        
    //       
  
  
    const handlePaymentSuccess = (paymentResponse) => {
      setIsSuccess(true);
      setIsSubmitting(false);
      
      navigate(`/order-confirmation/${createdOrder.orderNumber}`, {
        state: {
          orderDetails: createdOrder,
          shippingInfo: createdOrder.shippingInfo
        }
      });
    };
  
    const handlePaymentError = (errorMessage) => {
      setError(errorMessage);
      setIsSubmitting(false);
    };
  
    const handlePaymentCancel = () => {
      setIsSubmitting(false);
      setShowPayment(false);
    };
  
    const formatPrice = (price) => {
      const number = Number(price);
      return isNaN(number) ? "0.00" : number.toFixed(2);
    };
  
    if (error) {
      return (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => setError(null)} className="return-button">
            Try Again
          </button>
        </div>
      );
    }
  
    if (!orderDetails) {
      return <div className="loading">Loading order details...</div>;
    }

  

  const subtotal = Number(orderDetails.pricing.totalPrice);
  const giftWrappingCost = shippingInfo.isGift ? GIFT_WRAPPING_PRICE : 0;

  return (
//     <div className="shipping-container">
//       <div className="shipping-grid">
//         <div className="shipping-form">
//           <h2>Shipping Information</h2>
//           <form onSubmit={handleSubmit}>
//           <div className="gift-section-container">
//               <div className="gift-section">
//                 <div className="gift-header">
//                   <div className="gift-icon">🎁</div>
//                   <div className="gift-option">
//                     <h3>Gift Options</h3>
//                     <p>Make your order special with gift wrapping</p>
//                   </div>
//                 </div>
//                 <div className="gift-content">
//                   <div className="form-group checkbox">
//                     <input
//                       type="checkbox"
//                       name="isGift"
//                       checked={shippingInfo.isGift}
//                       onChange={handleInputChange}
//                       id="isGift"
//                     />
//                     <label htmlFor="isGift">
//                       Add Gift Wrapping (+{formatPrice(GIFT_WRAPPING_PRICE)})
//                     </label>
//                   </div>

//                   {shippingInfo.isGift && (
//                     <div className="gift-message-container">
//                       <label>Gift Message</label>
//                       <textarea
//                         name="giftMessage"
//                         value={shippingInfo.giftMessage}
//                         onChange={handleInputChange}
//                         rows="4"
//                         placeholder="Write your personal message here..."
//                         maxLength="200"
//                       />
//                       <div className="message-limit">
//                         {shippingInfo.giftMessage.length}/200 characters
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={shippingInfo.firstName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={shippingInfo.lastName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={shippingInfo.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={shippingInfo.phone}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Address Line 1</label>
//               <input
//                 type="text"
//                 name="address1"
//                 value={shippingInfo.address1}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Address Line 2</label>
//               <input
//                 type="text"
//                 name="address2"
//                 value={shippingInfo.address2}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={shippingInfo.city}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>State</label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={shippingInfo.state}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Postal Code</label>
//                 <input
//                   type="text"
//                   name="zipCode"
//                   value={shippingInfo.zipCode}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* {showPayment && createdOrder ? (

// <RazorpayPayment
// order={createdOrder}
// shippingInfo={shippingInfo} // Pass shipping info separately
// onPaymentSuccess={handlePaymentSuccess}
// onPaymentError={handlePaymentError}
// onPaymentCancel={handlePaymentCancel}
// buttonText={`Complete Order (RS ${formatPrice(totalPrice)})`}
// isDisabled={isSubmitting}
//     />
// ) : (
//   <button 
//     type="submit" 
//     className={`submit-button ${isSubmitting ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
//     disabled={isSubmitting}
//   >
//     {isSubmitting ? 'Processing...' : `Proceed to Payment (RS ${formatPrice(totalPrice)})`}
//   </button>
// )} */}
//   {/* {error && (
//         <div className="validation-error-banner">
//           <p>{error}</p>
//           <button 
//             type="button" 
//             onClick={() => setError(null)} 
//             className="close-error-btn"
//           >
//             &times;
//           </button>
//         </div>
//       )} */}

// <button 
//         type="submit" 
//         className={`submit-button ${isSubmitting ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
//         disabled={isSubmitting}
//         onClick={handleProceedToPayment}
//       >
//         {isSubmitting ? 'Processing...' : `Proceed to Payment (RS ${formatPrice(totalPrice)})`}
//       </button>

//       {/* Payment Popup */}
//       {showPaymentPopup && (
//         <div className="payment-popup-overlay">
//           <div className="payment-popup-container">
//             <div className="payment-popup-header">
//               <h2>Complete Your Payment</h2>
//               <button 
//                 className="close-popup-btn" 
//                 onClick={handleClosePaymentPopup}
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="payment-popup-content">
//               <div className="order-summary">
//                 <h3>Order Summary</h3>
//                 <p>Product: {orderDetails.product}</p>
//                 <p>Quantity: {orderDetails.customization.quantity}</p>
//                 <p>Total Amount: RS {formatPrice(totalPrice)}</p>
//               </div>

//               <RazorpayPayment
//                 order={createdOrder}
//                 shippingInfo={shippingInfo}
//                 onPaymentSuccess={handlePaymentSuccess}
//                 onPaymentError={handlePaymentError}
//                 onPaymentCancel={handlePaymentCancel}
//                 buttonText={`Pay Now (RS ${formatPrice(totalPrice)})`}
//                 isDisabled={isSubmitting}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//           </form>
//         </div>

//         <div className="order-summary">
//           <h2>Order Summary</h2>
//           <div className="summary-details">
//           <div className="order-type">

// <span className={`order-badge ${orderDetails.isCustomized ? 'customized' : 'standard'}`}>

//   {orderDetails.isCustomized ? 'Customized Order' : 'Standard Order'}

// </span>

// </div>
//             <p>Product: {orderDetails.product}</p>
//             <p>Quantity: {orderDetails.customization.quantity}</p>
//             <p>Pages: {orderDetails.customization.pages.selected}</p>
//             {orderDetails.isCustomized ? (
//               <>
//                 <p>Paper Type: {orderDetails.customization.paperType}</p>
//                 <p>Binding: {orderDetails.customization.bindingType}</p>
//                 {orderDetails.pricing.discount > 0 && (
//                   <p>Bulk Discount: {orderDetails.pricing.discount}% off</p>
//                 )}
//               </>
//                ) : (

//                 <p className="standard-note">Standard configuration with default options</p>
//             )}
//             <div className="price-breakdown">
//               <p>Subtotal: RS{formatPrice(subtotal)}</p>
//               {shippingInfo.isGift && (
//                 <p>Gift Wrapping: RS {formatPrice(GIFT_WRAPPING_PRICE)}</p>
//               )}
//               <p className="total">Total: RS {formatPrice(totalPrice)}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShippingPage;
<div className="shipping-container">
{showAuthPrompt ? (
<div className="auth-prompt">
 {/* <p>Continue as guest or sign in for a better experience</p> */}
 <div className="auth-buttons">
   <button 
     className="guest-button"
     onClick={() => {
       setIsGuestCheckout(true);
       setShowAuthPrompt(false);
     }}
   >
     Continue as Guest
   </button>
   {/* <button 
     className="login-button"
     onClick={() => navigate('/login', {
       state: {
         returnTo: location.pathname,
         orderData: orderDetails || localStorage.getItem('currentOrder')
       }
     })}
   >
     Sign In
   </button> */}
   <button 
     className="register-button"
     onClick={() => navigate('/register', {
       state: {
         returnTo: location.pathname,
         orderData: orderDetails || localStorage.getItem('currentOrder')
       }
     })}
   >
     Create Account
   </button>
 </div>
</div>
) : (
<div className="shipping-grid">
 <div className="shipping-form">
   <h2>Shipping Information</h2>
   <form onSubmit={handleSubmit}>
   <div className="gift-section-container">
       <div className="gift-section">
         <div className="gift-header">
           <div className="gift-icon">🎁</div>
           <div className="gift-option">
             <h3>Gift Options</h3>
             <p>Make your order special with gift wrapping</p>
           </div>
         </div>
         <div className="gift-content">
           <div className="form-group checkbox">
             <input
               type="checkbox"
               name="isGift"
               checked={shippingInfo.isGift}
               onChange={handleInputChange}
               id="isGift"
             />
             <label htmlFor="isGift">
               Add Gift Wrapping (+${formatPrice(GIFT_WRAPPING_PRICE)})
             </label>
           </div>

           {shippingInfo.isGift && (
             <div className="gift-message-container">
               <label>Gift Message</label>
               <textarea
                 name="giftMessage"
                 value={shippingInfo.giftMessage}
                 onChange={handleInputChange}
                 rows="4"
                 placeholder="Write your personal message here..."
                 maxLength="200"
               />
               <div className="message-limit">
                 {shippingInfo.giftMessage.length}/200 characters
               </div>
             </div>
           )}
         </div>
       </div>
     </div>

     <div className="form-row">
       <div className="form-group">
         <label>First Name</label>
         <input
           type="text"
           name="firstName"
           value={shippingInfo.firstName}
           onChange={handleInputChange}
           required
           className={formErrors.firstName ? 'input-error' : ''}
           
         />
          {formErrors.firstName && (
     <span className="error-message">{formErrors.firstName}</span>
   )}
       </div>
       <div className="form-group">
         <label>Last Name</label>
         <input
           type="text"
           name="lastName"
           value={shippingInfo.lastName}
           onChange={handleInputChange}
           required
           className={formErrors.lastName ? 'input-error' : ''}
         />
          {formErrors.lastName && (
     <span className="error-message">{formErrors.lastName}</span>
   )}
       </div>
     </div>

     <div className="form-row">
       <div className="form-group">
         <label>Email</label>
         <input
           type="email"
           name="email"
           value={shippingInfo.email}
           onChange={handleInputChange}
           
           className={formErrors.email ? 'input-error' : ''}
         />
         {formErrors.email && (
     <span className="error-message">{formErrors.email}</span>
         )}  
       </div>
       <div className="form-group">
         <label>Phone</label>
         <input
           type="tel"
           name="phone"
           value={shippingInfo.phone}
           onChange={handleInputChange}
           
           className={formErrors.phone ? 'input-error' : ''}
         />
           {formErrors.phone && (
     <span className="error-message">{formErrors.phone}</span>
         )}  
       </div>
     </div>

     <div className="form-group">
       <label>Address Line 1</label>
       <input
         type="text"
         name="address1"
         value={shippingInfo.address1}
         onChange={handleInputChange}
         
         className={formErrors.address1 ? 'input-error' : ''}
       />
         {formErrors.address1 && (
     <span className="error-message">{formErrors.address1}</span>
         )}  
     </div>

     <div className="form-group">
       <label>Address Line 2</label>
       <input
         type="text"
         name="address2"
         value={shippingInfo.address2}
         onChange={handleInputChange}
       />
     </div>

     <div className="form-row">
       <div className="form-group">
         <label>City</label>
         <input
           type="text"
           name="city"
           value={shippingInfo.city}
           onChange={handleInputChange}
       
           className={formErrors.city ? 'input-error' : ''}
         />
              {formErrors.city && (
     <span className="error-message">{formErrors.city}</span>
         )}
       </div>
       {/* <div className="form-group">
         <label>State</label>
         <input
           type="text"
           name="state"
           value={shippingInfo.state}
           onChange={handleInputChange}
           required
           className={formErrors.state ? 'input-error' : ''}
         />
                      {formErrors.state && (
     <span className="error-message">{formErrors.state}</span>
         )}
       </div> */}
<div className="form-group" ref={stateDropdownRef}>
<label>State</label>
<div className="searchable-dropdown">
<input
type="text"
placeholder="Search or select state"
value={isStateDropdownOpen ? stateSearchValue : shippingInfo.state || ''}
onChange={(e) => {
 setStateSearchValue(e.target.value);
 setIsStateDropdownOpen(true);
}}
onFocus={() => {
 setIsStateDropdownOpen(true);
 setStateSearchValue('');
}}
className={formErrors.state ? 'input-error' : ''}
/>
{isStateDropdownOpen && (
<div className="dropdown-list">
 {INDIAN_STATES
   .filter(state => 
     state.toLowerCase().includes(stateSearchValue.toLowerCase())
   )
   .map(state => (
     <div
       key={state}
       className={`dropdown-item ${shippingInfo.state === state ? 'selected' : ''}`}
       onClick={() => handleStateSelect(state)}
     >
       {state}
     </div>
   ))}
</div>
)}
</div>
{formErrors.state && (
<span className="error-message">{formErrors.state}</span>
)}
</div>
       <div className="form-group">
         <label>Postal Code</label>
         <input
           type="text"
           name="zipCode"
           value={shippingInfo.zipCode}
           onChange={handleInputChange}
           required
           className={formErrors.zipCode ? 'input-error' : ''}
         />
                      {formErrors.zipCode && (
     <span className="error-message">{formErrors.zipCode}</span>
         )}
       </div>

     </div>
{/* 
     {showPayment && createdOrder ? (

<RazorpayPayment
order={createdOrder}
shippingInfo={shippingInfo} // Pass shipping info separately
onPaymentSuccess={handlePaymentSuccess}
onPaymentError={handlePaymentError}
onPaymentCancel={handlePaymentCancel}
buttonText={`Complete Order (RS ${formatPrice(totalPrice)})`}
isDisabled={isSubmitting}
/>
) : (
<button 
type="submit" 
className={`submit-button ${isSubmitting ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
disabled={isSubmitting}
>
{isSubmitting ? 'Processing...' : `Proceed to Payment (RS ${formatPrice(totalPrice)})`}
</button>
)} */}
{/* {error && (
 <div className="validation-error-banner">
   <p>{error}</p>
   <button 
     type="button" 
     onClick={() => setError(null)} 
     className="close-error-btn"
   >
     &times;
   </button>
 </div>
)} */}

<button 
 type="submit" 
 className={`submit-button ${isSubmitting ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
 disabled={isSubmitting}
 onClick={handleProceedToPayment}
>
 {isSubmitting ? 'Processing...' : `Proceed to Payment (RS ${formatPrice(totalPrice)})`}
</button>

{/* Payment Popup */}
{showPaymentPopup && (
 <div className="payment-popup-overlay">
   <div className="payment-popup-container">
     <div className="payment-popup-header">
       <h2>Complete Your Payment</h2>
       <button 
         className="close-popup-btn" 
         onClick={handleClosePaymentPopup}
       >
         &times;
       </button>
     </div>
     
     <div className="payment-popup-content">
       <div className="order-summary">
         <h3>Order Summary</h3>
         <p>Product: {orderDetails.product}</p>
         <p>Quantity: {orderDetails.customization.quantity}</p>
         <p>Total Amount: RS {formatPrice(totalPrice)}</p>
       </div>

       <RazorpayPayment
         order={createdOrder}
         shippingInfo={shippingInfo}
         onPaymentSuccess={handlePaymentSuccess}
         onPaymentError={handlePaymentError}
         onPaymentCancel={handlePaymentCancel}
         buttonText={`Pay Now (RS ${formatPrice(totalPrice)})`}
         isDisabled={isSubmitting}
       />
     </div>
   </div>
 </div>
)}
   </form>
 </div>

 <div className="order-summary">
   <h2>Order Summary</h2>
   <div className="summary-details">
   <div className="order-type">

<span className={`order-badge ${orderDetails.isCustomized ? 'customized' : 'standard'}`}>

{orderDetails.isCustomized ? 'Customized Order' : 'Standard Order'}

</span>

</div>
     <p>Product: {orderDetails.product}</p>
     <p>Quantity: {orderDetails.customization.quantity}</p>
     <p>Pages: {orderDetails.customization.pages.selected}</p>
     {orderDetails.isCustomized ? (
       <>
         <p>Paper Type: {orderDetails.customization.paperType}</p>
         <p>Binding: {orderDetails.customization.bindingType}</p>
         {orderDetails.pricing.discount > 0 && (
           <p>Bulk Discount: {orderDetails.pricing.discount}% off</p>
         )}
       </>
        ) : (

         <p className="standard-note">Standard configuration with default options</p>
     )}
     <div className="price-breakdown">
       <p>Subtotal: RS{formatPrice(subtotal)}</p>
       {shippingInfo.isGift && (
         <p>Gift Wrapping: RS {formatPrice(GIFT_WRAPPING_PRICE)}</p>
       )}
       <p className="total">Total: RS {formatPrice(totalPrice)}</p>
     </div>
   </div>
 </div>
</div>
)}
</div>
);
};

export default ShippingPage;