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
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/ShippingPage.css';
import { useAuth } from '../Context/AuthContext';
import { createOrder, updateShippingInfo } from '../Services/order.service';
import RazorpayPayment from '../Components/Products/Razorpay';

const GIFT_WRAPPING_PRICE = 5.99;

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

  useEffect(() => {
    console.log('Current user state:', user);
    console.log('Loading state:', loading);
    console.log('Local storage user:', localStorage.getItem('user'));
    console.log('Local storage token:', localStorage.getItem('token'));
  }, [user, loading]);

  // Authentication check
  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log('No user found, redirecting to login');
        navigate('/login', { 
          state: { 
            returnTo: location.pathname,
            orderData: orderDetails 
          }
        });
      } else {
        console.log('User authenticated:', user._id);
      }
    }
  }, [user, loading, navigate, location.pathname, orderDetails]);
  

  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'INDIA',
    isGift: false,
    giftMessage: ''
  });

  useEffect(() => {
    const loadOrderDetails = () => {
      try {
        let orderData = null;

        if (location.state?.product) {
          const { product, quantity, pages, totalCost, isCustomized } = location.state;
          orderData = {
            product,
            isCustomized,
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
        } else {
          const savedOrder = localStorage.getItem('currentOrder');
          if (savedOrder) {
            orderData = JSON.parse(savedOrder);
          }
        }

        if (orderData) {
          setOrderDetails(orderData);
          setTotalPrice(Number(orderData.pricing.totalPrice));
        } else {
          navigate('/products');
        }
      } catch (error) {
        console.error('Error loading order details:', error);
        setError('Error loading order details. Please try again.');
      }
    };

    loadOrderDetails();
  }, [location, navigate]);

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
  };

      // Prepare order data according to your schema
 
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setError(null);

//   console.log('Submit handler - Current user:', user);
//   console.log('Submit handler - User ID:', user?._id);

//   try {
//     if (!user) {
//       console.log('No user object found');
//       throw new Error('Please login to place an order');
//     }
//     const userId = user._id || user.id;
//     console.log('Using user ID:', userId);


//     if (!userId) {
//       console.log('No user ID found in user object');
//       throw new Error('Please login to place an order');
//     }

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
//           //need to page layout
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
  
//     const createdOrder = await createOrder(orderData);
//     setCreatedOrder(createdOrder); // Add this state variable
//     setShowPayment(true); // Add this state variable

  

// // Add these near your other state declarations

// // Add these handler functions


//     if (createdOrder && createdOrder.orderNumber) {
//       localStorage.removeItem('currentOrder');
//       sessionStorage.setItem('lastOrderNumber', createdOrder.orderNumber);
//       setIsSuccess(true);
//       // navigate(`/order-confirmation?order=${response.orderNumber}`, { replace: true });
//       navigate(`/order-confirmation/${createdOrder.orderNumber}`, {
//         state: {
//           orderDetails: createdOrder.order,
//           shippingInfo: orderData.shippingInfo
//         }
//       });
//     } else {
//       throw new Error('Failed to create order');
//     }
//   } catch (error) {
//     console.error('Error creating order:', error);
//     setError(error.message || 'Failed to process order. Please try again.');
//     setIsSubmitting(false);
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    if (!user) {
      throw new Error('Please login to place an order');
    }
    const userId = user._id || user.id;

    if (!userId) {
      throw new Error('Please login to place an order');
    }

    const orderData = {
      user: userId,
      orderDetails: {
        product: orderDetails.product,
        isCustomized: orderDetails.isCustomized,
        customization: {
          quantity: orderDetails.customization.quantity,
          pages: {
            selected: orderDetails.customization.pages.selected
          },
          paperType: orderDetails.customization.paperType,
          bindingType: orderDetails.customization.bindingType
        },
        pricing: {
          basePrice: orderDetails.pricing.basePrice,
          totalPrice: orderDetails.pricing.totalPrice,
          discount: orderDetails.pricing.discount || 0
        }
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

    // Create order in database
    const response = await createOrder(orderData);
    
    if (!response || !response.orderNumber) {
      throw new Error('Failed to create order');
    }

    // Set the created order with the final price
    const createdOrderWithPrice = {
      ...response,
      finalPrice: totalPrice // Explicitly set finalPrice
    };
    
    setCreatedOrder(createdOrderWithPrice);
    setShowPayment(true);
    setIsSubmitting(false);

  } catch (error) {
    console.error('Error creating order:', error);
    setError(error.message || 'Failed to process order. Please try again.');
    setIsSubmitting(false);
  }
};

// Modify the payment success handler
const handlePaymentSuccess = (paymentResponse) => {
  setIsSuccess(true);
  setIsSubmitting(false);

 
  
  // Now navigate to order confirmation
  navigate(`/order-confirmation/${createdOrder.orderNumber}`, {
    state: {
      orderDetails: createdOrder,
      shippingInfo: createdOrder.shippingInfo
    }
  });
}

const handlePaymentError = (errorMessage) => {
  setError(errorMessage);
  setIsSubmitting(false);
};

const handlePaymentCancel = () => {
  setIsSubmitting(false);
  setShowPayment(false);
};
// };
// const handlePaymentSuccess = (paymentResponse) => {
//   setIsSuccess(true);
//   setIsSubmitting(false);
// };


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
    <div className="shipping-container">
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
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleInputChange}
                  required
                />
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
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address Line 1</label>
              <input
                type="text"
                name="address1"
                value={shippingInfo.address1}
                onChange={handleInputChange}
                required
              />
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
                  required
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

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
    </div>
  );
};

export default ShippingPage;