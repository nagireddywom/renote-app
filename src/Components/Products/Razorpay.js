// // // components/RazorpayPayment.js
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const RazorpayPayment = ({ order, onPaymentSuccess }) => {
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const loadRazorpayScript = () => {
// //     return new Promise((resolve) => {
// //       const script = document.createElement('script');
// //       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //       script.onload = () => resolve(true);
// //       script.onerror = () => resolve(false);
// //       document.body.appendChild(script);
// //     });
// //   };

// //   const handlePayment = async () => {
// //     setLoading(true);

// //     const isLoaded = await loadRazorpayScript();
// //     if (!isLoaded) {
// //       alert('Failed to load Razorpay SDK');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       // Create order on your backend
// //       const response = await fetch('/api/create-razorpay-order', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           orderId: order.orderNumber,
// //           amount: order.finalPrice,
// //         }),
// //       });

// //       const orderData = await response.json();

// //       const options = {
// //         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
// //         amount: order.finalPrice * 100, // Convert to smallest currency unit
// //         currency: 'INR',
// //         name: 'Your Store Name',
// //         description: `Order #${order.orderNumber}`,
// //         order_id: orderData.id,
// //         prefill: {
// //           name: `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`,
// //           email: order.shippingInfo.email,
// //           contact: order.shippingInfo.phone,
// //         },
// //         handler: function (response) {
// //           handlePaymentSuccess(response);
// //         },
// //         modal: {
// //           ondismiss: function () {
// //             setLoading(false);
// //           },
// //         },
// //         theme: {
// //           color: '#528FF0',
// //         },
// //       };

// //       const razorpayInstance = new window.Razorpay(options);
// //       razorpayInstance.open();
// //     } catch (error) {
// //       console.error('Payment initialization failed:', error);
// //       alert('Unable to initialize payment. Please try again.');
// //       setLoading(false);
// //     }
// //   };

// //   const handlePaymentSuccess = async (response) => {
// //     try {
// //       const verifyResponse = await fetch('/api/verify-payment', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           razorpay_payment_id: response.razorpay_payment_id,
// //           razorpay_order_id: response.razorpay_order_id,
// //           razorpay_signature: response.razorpay_signature,
// //           orderId: order.orderNumber,
// //         }),
// //       });

// //       const verification = await verifyResponse.json();

// //       if (verification.success) {
// //         if (onPaymentSuccess) {
// //           onPaymentSuccess(response);
// //         }
// //         // Navigate to order confirmation
// //         navigate(`/order-confirmation/${order.orderNumber}`, {
// //           state: { orderDetails: { ...order, status: 'PAID' } }
// //         });
// //       } else {
// //         alert('Payment verification failed. Please contact support.');
// //       }
// //     } catch (error) {
// //       console.error('Payment verification failed:', error);
// //       alert('Payment verification failed. Please contact support.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <button
// //       onClick={handlePayment}
// //       disabled={loading}
// //       className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
// //                  disabled:bg-gray-400 disabled:cursor-not-allowed w-full md:w-auto
// //                  transition-colors duration-200 font-medium"
// //     >
// //       {loading ? 'Processing Payment...' : 'Pay Now'}
// //     </button>
// //   );
// // };

// // export default RazorpayPayment;

// // // Updated OrderConfirmation.js with payment integration
// // import React, { useEffect, useState } from 'react';
// // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // import { getOrder } from '../Services/order.service';
// // import RazorpayPayment from './RazorpayPayment';

// // const OrderConfirmation = () => {
// //   // ... (previous state and useEffect code remains the same)

// //   const handlePaymentSuccess = (paymentResponse) => {
// //     // Update order status or handle any post-payment logic
// //     setOrder(prevOrder => ({
// //       ...prevOrder,
// //       status: 'PAID',
// //       paymentDetails: paymentResponse
// //     }));
// //   };

// //   return (
// //     <div className="order-confirmation-container">
// //       {/* ... (previous JSX remains the same until action-buttons div) */}
      
// //       <div className="action-buttons">
// //         {order.status !== 'PAID' ? (
// //           <RazorpayPayment 
// //             order={order}
// //             onPaymentSuccess={handlePaymentSuccess}
// //           />
// //         ) : (
// //           <>
// //             <button 
// //               onClick={() => navigate('/account/orders')} 
// //               className="view-orders-button"
// //             >
// //               View All Orders
// //             </button>
// //             <button 
// //               onClick={() => navigate('/')} 
// //               className="continue-shopping-button"
// //             >
// //               Continue Shopping
// //             </button>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderConfirmation;



// // // components/RazorpayPayment.js
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const RazorpayPayment = ({ 
// //   order, 
// //   onPaymentSuccess, 
// //   onPaymentError, 
// //   onPaymentCancel,
// //   buttonText,
// //   isDisabled 
// // }) => {
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();


// //   const API_URL = 'http://localhost:5000/api';

// //   const loadRazorpayScript = () => {
// //     return new Promise((resolve) => {
// //       const script = document.createElement('script');
// //       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //       script.onload = () => resolve(true);
// //       script.onerror = () => resolve(false);
// //       document.body.appendChild(script);
// //     });
// //   };

// //   const handlePayment = async () => {
// //     setLoading(true);

// //     try {
// //       const isLoaded = await loadRazorpayScript();
// //       if (!isLoaded) {
// //         throw new Error('Failed to load payment gateway');
// //       }

// //       // Create Razorpay order
// //       const response = await fetch(`${API_URL}/create-razorpay-order`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           orderNumber: order.orderNumber,
// //           amount: order.finalPrice,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to create payment order');
// //       }

// //       const razorpayOrder = await response.json();

// //       const options = {
// //         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
// //         amount: razorpayOrder.amount,
// //         currency: razorpayOrder.currency,
// //         name: "Your Company Name",
// //         description: `Order #${order.orderNumber}`,
// //         order_id: razorpayOrder.id,
// //         prefill: {
// //           name: `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`,
// //           email: order.shippingInfo.email,
// //           contact: order.shippingInfo.phone,
// //         },
// //         handler: async function (response) {
// //           try {
// //             const verifyResponse = await fetch(`${API_URL}/api/verify-payment`, {
// //               method: 'POST',
// //               headers: {
// //                 'Content-Type': 'application/json',
// //               },
// //               body: JSON.stringify({
// //                 orderNumber: order.orderNumber,
// //                 razorpay_payment_id: response.razorpay_payment_id,
// //                 razorpay_order_id: response.razorpay_order_id,
// //                 razorpay_signature: response.razorpay_signature,
// //               }),
// //             });

// //             const verification = await verifyResponse.json();
            
// //             if (verification.success) {
// //               localStorage.removeItem('currentOrder');
// //               if (onPaymentSuccess) {
// //                 onPaymentSuccess(verification);
// //               }
// //               navigate(`/order-confirmation/${order.orderNumber}`, {
// //                 state: {
// //                   orderDetails: { ...order, status: 'PAID' }
// //                 }
// //               });
// //             } else {
// //               throw new Error('Payment verification failed');
// //             }
// //           } catch (error) {
// //             if (onPaymentError) {
// //               onPaymentError(error.message);
// //             }
// //           }
// //         },
// //         modal: {
// //           ondismiss: function() {
// //             setLoading(false);
// //             if (onPaymentCancel) {
// //               onPaymentCancel();
// //             }
// //           }
// //         },
// //         theme: {
// //           color: "#528FF0"
// //         }
// //       };

// //       const razorpayInstance = new window.Razorpay(options);
// //       razorpayInstance.open();
// //     } catch (error) {
// //       if (onPaymentError) {
// //         onPaymentError(error.message);
// //       }
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <button
// //       onClick={handlePayment}
// //       disabled={loading || isDisabled}
// //       className={`submit-button ${loading ? 'loading' : ''}`}
// //     >
// //       {loading ? 'Processing Payment...' : buttonText || `Pay ${order.finalPrice}`}
// //     </button>
// //   );
// // };

// // export default RazorpayPayment;



// // // Components/Products/Razorpay.js
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const RazorpayPayment = ({ 
// //   order, 
// //   onPaymentSuccess, 
// //   onPaymentError, 
// //   onPaymentCancel,
// //   buttonText,
// //   isDisabled 
// // }) => {
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const loadRazorpayScript = () => {
// //     return new Promise((resolve) => {
// //       const script = document.createElement('script');
// //       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
// //       script.onload = () => resolve(true);
// //       script.onerror = () => resolve(false);
// //       document.body.appendChild(script);
// //     });
// //   };
// //   const handlePayment = async () => {
// //     setLoading(true);
  
// //     try {
// //       // Validate the amount
// //       if (!order.finalPrice || isNaN(order.finalPrice)) {
// //         throw new Error('Invalid order amount');
// //       }
      
// //       const isLoaded = await loadRazorpayScript();
// //             if (!isLoaded) {
// //               throw new Error('Failed to load payment gateway');
// //             }
  
// //       console.log('Payment details:', {
// //         orderNumber: order.orderNumber,
// //         amount: order.finalPrice,
// //         totalAmount: parseFloat(order.finalPrice)
// //       });
  
// //       const response = await fetch('http://localhost:5000/api/create-razorpay-order', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           orderNumber: order.orderNumber,
// //           amount: parseFloat(order.finalPrice)
// //         }),
// //       });
// // //   const handlePayment = async () => {
// // //     setLoading(true);

// // //     try {
// // //       const isLoaded = await loadRazorpayScript();
// // //       if (!isLoaded) {
// // //         throw new Error('Failed to load payment gateway');
// // //       }

// // //       // Log the order details for debugging
// // //       console.log('Creating order with details:', {
// // //         orderNumber: order.orderNumber,
// // //         amount: order.finalPrice
// // //       });

// // //       // Create Razorpay order
// // //       const response = await fetch('http://localhost:5000/api/create-razorpay-order', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           orderNumber: order.orderNumber,
// // //           amount: parseFloat(order.finalPrice),
// // //         }),
// // //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || 'Failed to create payment order');
// //       }

// //       const razorpayOrder = await response.json();

// //       const options = {
// //         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
// //         amount: razorpayOrder.amount, // Amount from Razorpay order
// //         currency: razorpayOrder.currency,
// //         name: "Your Company Name",
// //         description: `Order #${order.orderNumber}`,
// //         order_id: razorpayOrder.id,
// //         prefill: {
// //           name: `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`,
// //           email: order.shippingInfo.email,
// //           contact: order.shippingInfo.phone,
// //         },
// //         handler: async function (response) {
// //           try {
// //             const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
// //               method: 'POST',
// //               headers: {
// //                 'Content-Type': 'application/json',
// //               },
// //               body: JSON.stringify({
// //                 orderNumber: order.orderNumber,
// //                 razorpay_payment_id: response.razorpay_payment_id,
// //                 razorpay_order_id: response.razorpay_order_id,
// //                 razorpay_signature: response.razorpay_signature,
// //               }),
// //             });

// //             if (!verifyResponse.ok) {
// //               const errorData = await verifyResponse.json();
// //               throw new Error(errorData.error || 'Payment verification failed');
// //             }

// //             const verification = await verifyResponse.json();
            
// //             if (verification.success) {
// //               if (onPaymentSuccess) {
// //                 onPaymentSuccess(verification);
// //               }
// //               navigate(`/order-confirmation/${order.orderNumber}`, {
// //                 state: {
// //                   orderDetails: { ...order, status: 'PAID' }
// //                 }
// //               });
// //             } else {
// //               throw new Error('Payment verification failed');
// //             }
// //           } catch (error) {
// //             console.error('Payment verification error:', error);
// //             if (onPaymentError) {
// //               onPaymentError(error.message);
// //             }
// //           } finally {
// //             setLoading(false);
// //           }
// //         },
// //         modal: {
// //           ondismiss: function() {
// //             setLoading(false);
// //             if (onPaymentCancel) {
// //               onPaymentCancel();
// //             }
// //           }
// //         },
// //         theme: {
// //           color: "#528FF0"
// //         }
// //       };

// //       const razorpayInstance = new window.Razorpay(options);
// //       razorpayInstance.open();
// //     } catch (error) {
// //       console.error('Payment initialization error:', error);
// //       if (onPaymentError) {
// //         onPaymentError(error.message);
// //       }
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <button
// //       onClick={handlePayment}
// //       disabled={loading || isDisabled}
// //       className={`submit-button ${loading ? 'loading' : ''}`}
// //     >
// //       {loading ? 'Processing Payment...' : buttonText || `Pay ${order.finalPrice}`}
// //     </button>
// //   );
// // };

// // export default RazorpayPayment;





// // Components/Products/Razorpay.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const RazorpayPayment = ({ 
//   order, 
//   shippingInfo, // Add this prop
//   onPaymentSuccess, 
//   onPaymentError, 
//   onPaymentCancel,
//   buttonText,
//   isDisabled 
// }) => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     setLoading(true);

//     try {
//       const isLoaded = await loadRazorpayScript();
//       if (!isLoaded) {
//         throw new Error('Failed to load payment gateway');
//       }

//       // Validate required data
//       if (!order.orderNumber || !order.finalPrice) {
//         throw new Error('Invalid order details');
//       }

//       if (!shippingInfo) {
//         throw new Error('Shipping information is required');
//       }

//       console.log('Payment details:', {
//         orderNumber: order.orderNumber,
//         amount: order.finalPrice,
//         shippingInfo: shippingInfo
//       });

//       const response = await fetch('http://localhost:5000/api/create-razorpay-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           orderNumber: order.orderNumber,
//           amount: parseFloat(order.finalPrice)
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to create payment order');
//       }

//       const razorpayOrder = await response.json();

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         name: "Your Company Name",
//         description: `Order #${order.orderNumber}`,
//         order_id: razorpayOrder.id,
//         prefill: {
//           name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
//           email: shippingInfo.email,
//           contact: shippingInfo.phone
//         },
//         handler: async function (response) {
//           try {
//             const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 orderNumber: order.orderNumber,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//               }),
//             });

//             if (!verifyResponse.ok) {
//               const errorData = await verifyResponse.json();
//               throw new Error(errorData.error || 'Payment verification failed');
//             }

//             const verification = await verifyResponse.json();
            
//             if (verification.success) {
//               if (onPaymentSuccess) {
//                 onPaymentSuccess(verification);
//               }
//               navigate(`/order-confirmation/${order.orderNumber}`, {
//                 state: {
//                   orderDetails: { ...order, status: 'PAID' },
//                   shippingInfo: shippingInfo
//                 }
//               });
//             } else {
//               throw new Error('Payment verification failed');
//             }
//           } catch (error) {
//             console.error('Payment verification error:', error);
//             if (onPaymentError) {
//               onPaymentError(error.message);
//             }
//           } finally {
//             setLoading(false);
//           }
//         },
//         modal: {
//           ondismiss: function() {
//             setLoading(false);
//             if (onPaymentCancel) {
//               onPaymentCancel();
//             }
//           }
//         },
//         theme: {
//           color: "#528FF0"
//         }
//       };

//       const razorpayInstance = new window.Razorpay(options);
//       razorpayInstance.open();
//     } catch (error) {
//       console.error('Payment initialization error:', error);
//       if (onPaymentError) {
//         onPaymentError(error.message);
//       }
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       disabled={loading || isDisabled}
//       className={`submit-button ${loading ? 'loading' : ''}`}
//     >
//       {loading ? 'Processing Payment...' : buttonText || `Pay ₹${order.finalPrice}`}
//     </button>
//   );
// };

// export default RazorpayPayment;



// Components/Products/Razorpay.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RazorpayPayment = ({ 
  order, 
  shippingInfo,
  onPaymentSuccess, 
  onPaymentError, 
  onPaymentCancel,
  buttonText,
  isDisabled 
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

  const handlePayment = async () => {
    setLoading(true);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Validate required data
      if (!order.orderNumber || !order.finalPrice) {
        throw new Error('Invalid order details');
      }

      if (!shippingInfo) {
        throw new Error('Shipping information is required');
      }

      console.log('Creating Razorpay order:', {
        orderNumber: order.orderNumber,
        amount: order.finalPrice,
        shippingInfo: shippingInfo
      });

      const response = await fetch(`${API_URL}/create-razorpay-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          amount: parseFloat(order.finalPrice)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment order');
      }

      const razorpayOrder = await response.json();
      console.log('Razorpay order created:', razorpayOrder);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Your Company Name",
        description: `Order #${order.orderNumber}`,
        order_id: razorpayOrder.id,
        prefill: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          email: shippingInfo.email,
          contact: shippingInfo.phone
        },
        handler: async function (paymentResponse) {
          try {
            console.log('Payment response received:', paymentResponse);


            if (!paymentResponse.razorpay_payment_id || 
                !paymentResponse.razorpay_order_id || 
                !paymentResponse.razorpay_signature) {
              throw new Error('Missing payment response data');
            }

            const verifyResponse = await fetch(`${API_URL}/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderNumber: order.orderNumber,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              }),
            });

            const verificationData = await verifyResponse.json();
            console.log('Verification response:', verificationData);

            if (!verifyResponse.ok) {
              throw new Error(verificationData.error || 'Payment verification failed');
            }

            if (!verificationData.success) {
              throw new Error(verificationData.error || 'Payment verification failed');
            }

            // Payment verified successfully
            if (onPaymentSuccess) {
              onPaymentSuccess(verificationData);
            }

            // Navigate to confirmation page
            navigate(`/order-confirmation/${order.orderNumber}`, {
              state: {
                orderDetails: { 
                  ...order, 
                  status: 'PAID',
                  paymentDetails: {
                    paymentId: verificationData.paymentId,
                    amount: verificationData.amount
                  }
                },
                shippingInfo: shippingInfo
              }
            });
          } catch (error) {
            console.error('Payment verification error:', error);
            if (onPaymentError) {
              onPaymentError(error.message);
            }
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setLoading(false);
            if (onPaymentCancel) {
              onPaymentCancel();
            }
          }
        },
        theme: {
          color: "#528FF0"
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      if (onPaymentError) {
        onPaymentError(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || isDisabled}
      className={`submit-button ${loading ? 'loading' : ''}`}
    >
      {loading ? 'Processing Payment...' : buttonText || `Pay ₹${order.finalPrice}`}
    </button>
  );
};

export default RazorpayPayment;