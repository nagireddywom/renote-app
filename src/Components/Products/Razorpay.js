
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
  const API_URL = process.env.REACT_APP_API_URL || "https://backend-wzk0.onrender.com/api"

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