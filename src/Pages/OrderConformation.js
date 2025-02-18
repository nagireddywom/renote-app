// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Invoice from '../Components/Products/InvoiceGenerator';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import '../Styles/OrderConformation.css';
// import { getOrder } from '../Services/order.service';
// import RazorpayPayment from '../Components/Products/Razorpay';

// const OrderConfirmation = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [pdfStatus, setPdfStatus] = useState('idle');
//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [order,setOrder] = useState(null);
//   const invoiceRef = useRef();

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         // If we have order details in location state, use those
//         if (location.state?.orderDetails) {
//           setOrderData(location.state.orderDetails);
//           setLoading(false);
//           return;
//         }

//         // Otherwise try to get order number from URL params
//         const urlParams = new URLSearchParams(location.search);
//         const orderNumber = urlParams.get('orderNumber');

//         if (orderNumber) {
//           const response = await getOrder(orderNumber);
//           setOrderData(response);
//         } else {
//           // If no order details or order number, redirect to home
//           navigate('/');
//         }
//       } catch (error) {
//         console.error('Error fetching order:', error);
//         setError('Failed to load order details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [location, navigate]);

//   const handlePaymentSuccess = (paymentResponse) => {
//     // Update order status or handle any post-payment logic
//     setOrder(prevOrder => ({
//       ...prevOrder,
//       status: 'PAID',
//       paymentDetails: paymentResponse
//     }));
//   };

//   const handlePdfGeneration = (status) => {
//     setPdfStatus(status);
//     if (status === 'success') {
//       setTimeout(() => setPdfStatus('idle'), 3000);
//     }
//   };

//   const generatePdf = async () => {
//     setPdfStatus('loading');
//     try {
//       const element = document.getElementById('invoice-content');
//       if (!element) return;

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         logging: false,
//         useCORS: true,
//         backgroundColor: '#ffffff'
//       });

//       const imgWidth = 210;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgData = canvas.toDataURL('image/png');

//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save(`invoice-${orderData.orderNumber}.pdf`);

//       handlePdfGeneration('success');
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       handlePdfGeneration('error');
//     }
//   };

//   const getButtonContent = () => {
//     switch (pdfStatus) {
//       case 'loading':
//         return (
//           <>
//             <span className="loading-spinner"></span>
//             <span>Generating PDF...</span>
//           </>
//         );
//       case 'success':
//         return (
//           <>
//             <span className="success-icon">✓</span>
//             <span>PDF Downloaded!</span>
//           </>
//         );
//       case 'error':
//         return (
//           <>
//             <span className="error-icon">↻</span>
//             <span>Retry Download</span>
//           </>
//         );
//       default:
//         return (
//           <>
//             <span className="download-icon">↓</span>
//             <span>Download PDF Invoice</span>
//           </>
//         );
//     }
//   };

//   // if (loading) {
//   //   return (
//   //     <div className="loading-container">
//   //       <div className="loading-spinner"></div>
//   //       <p>Loading order details...</p>
//   //     </div>
//   //   );
//   // }
  
//   <div className="action-buttons">
//         {order.status !== 'PAID' ? (
//           <RazorpayPayment 
//             order={order}
//             onPaymentSuccess={handlePaymentSuccess}
//           />
//         ) : (
//           <>
//             <button 
//               onClick={() => navigate('/account/orders')} 
//               className="view-orders-button"
//             >
//               View All Orders
//             </button>
//             <button 
//               onClick={() => navigate('/')} 
//               className="continue-shopping-button"
//             >
//               Continue Shopping
//             </button>
//           </>
//         )}
//       </div>
//   if (error) {
//     return (
//       <div className="error-container">
//         <p className="error-message">{error}</p>
//         <button onClick={() => navigate('/')} className="return-button">
//           Return to Home
//         </button>
//       </div>
//     );
//   }

//   if (!orderData) {
//     return (
//       <div className="error-container">
//         <p className="error-message">No order details found.</p>
//         <button onClick={() => navigate('/')} className="return-button">
//           Return to Home
//         </button>
//       </div>
//     );
//   }

//   const orderDate = new Date(orderData.createdAt).toLocaleDateString();

//   return (
//     <div className="confirmation-container">
//       <div className="confirmation-card">
//         <div className="success-header">
//           <div className="success-icon">✓</div>
//           <h1 className="success-title">Order Placed Successfully!</h1>
//           <p className="success-message">
//             Thank you for your order. We'll send you a confirmation email shortly.
//           </p>
//         </div>

//         <div className="order-info">
//           <div className="info-row">
//             <span className="info-label">Order Number:</span>
//             <span className="info-value">#{orderData.orderNumber}</span>
//           </div>
//           <div className="info-row">
//             <span className="info-label">Order Date:</span>
//             <span className="info-value">{orderDate}</span>
//           </div>
//           <div className="info-row">
//             <span className="info-label">Order Status:</span>
//             <span className="info-value status-badge">{orderData.status}</span>
//           </div>
//         </div>

//         <div className="delivery-info">
//           <h2 className="delivery-title">Estimated Delivery</h2>
//           <p>Your order will be delivered within 5-7 business days.</p>
//           {orderData.shippingInfo && (
//             <div className="shipping-details">
//               <h3>Shipping Address:</h3>
//               <p>{orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}</p>
//               <p>{orderData.shippingInfo.address1}</p>
//               {orderData.shippingInfo.address2 && <p>{orderData.shippingInfo.address2}</p>}
//               <p>{orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}</p>
//             </div>
//           )}
//         </div>

//         <div className="invoice-section">
//           <h2 className="invoice-title">
//             <span className="download-icon">↓</span>
//             Invoice Options
//           </h2>
//           <div className="button-group">
//             <button 
//               onClick={generatePdf}
//               disabled={pdfStatus === 'loading'}
//               className={`invoice-button download-button ${pdfStatus === 'loading' ? 'loading' : ''} ${pdfStatus === 'success' ? 'success' : ''}`}
//             >
//               {getButtonContent()}
//             </button>
            
//             <button 
//               onClick={() => window.print()}
//               className="invoice-button print-button"
//             >
//               <span className="print-icon">⎙</span>
//               <span>Print Invoice</span>
//             </button>
//           </div>
//         </div>

//         <div className="button-group">
//           <button 
//             onClick={() => navigate('/orders')} 
//             className="action-button primary-button"
//           >
//             View Order History
//           </button>
          
//           <button 
//             onClick={() => navigate('/')} 
//             className="action-button secondary-button"
//           >
//             Continue Shopping
//           </button>
//         </div>

//         <div className="support-section">
//           <p>
//             Need help?{' '}
//             <button onClick={() => navigate('/support')} className="support-link">
//               Contact Support
//             </button>
//           </p>
//         </div>

//         {/* Hidden Invoice Content for PDF Generation */}
//         <div id="invoice-content" style={{ display: 'none' }}>
//           <Invoice
//             ref={invoiceRef}
//             orderDetails={orderData}
//             orderNumber={orderData.orderNumber}
//             orderDate={orderDate}
//             onPdfGenerated={handlePdfGeneration}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;

import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Invoice from '../Components/Products/InvoiceGenerator';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import '../Styles/OrderConformation.css';
import { getOrder } from '../Services/order.service';
import RazorpayPayment from '../Components/Products/Razorpay';
import { Link } from 'react-router-dom';
import TrackingPage from './orderTrankingPage';


const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pdfStatus, setPdfStatus] = useState('idle');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const invoiceRef = useRef();
  const [invoiceUrl, setInvoiceUrl] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // If we have order details in location state, use those
        if (location.state?.orderDetails) {
          setOrderData(location.state.orderDetails);
          setLoading(false);
          return;
        }

        // Otherwise try to get order number from URL params
        const urlParams = new URLSearchParams(location.search);
        const orderNumber = urlParams.get('orderNumber');

        if (orderNumber) {
          const response = await getOrder(orderNumber);
          setOrderData(response);
        } else {
          // If no order details or order number, redirect to home
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location, navigate]);

  const handlePaymentSuccess = (paymentResponse) => {
    setOrderData(prevOrder => ({
      ...prevOrder,
      status: 'PAID',
      paymentDetails: paymentResponse
    }));
  };



  const generateShiprocketInvoice = async () => {
  setPdfStatus('loading');

  try {

    // Call Shiprocket invoice API
    const API_URL = process.env.REACT_APP_API_URL 

    const response = await fetch(`${API_URL}/shiprocket/generate-invoice`, {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify({

        orderNumber: orderData.orderNumber,

        shipmentId: orderData.shippingDetails?.shipmentId

      }),

    });



    if (!response.ok) {

      throw new Error('Failed to generate invoice');

    }



    const data = await response.json();

    

    if (data.invoice_url) {

      setInvoiceUrl(data.invoice_url);

      // Open invoice in new tab

      window.open(data.invoice_url, '_blank');

      setPdfStatus('success');

    } else {

      throw new Error('No invoice URL received');

    }

  } catch (error) {

    console.error('Error generating invoice:', error);

    setPdfStatus('error');

  }

};
  const getButtonContent = () => {
    switch (pdfStatus) {
      case 'loading':
        return (
          <>
            <span className="loading-spinner"></span>
           <span>Generating Invoice...</span>
          </>
        );
      case 'success':
        return (
          <>
            <span className="success-icon">✓</span>
            <span>Invoice Generated!</span>
          </>
        );
      case 'error':
        return (
          <>
            <span className="error-icon">↻</span>
            <span>Retry Generate Invoice</span>
          </>
        );
      default:
        return (
          <>
            <span className="download-icon">↓</span>
            <span>Generate Invoice</span>
          </>
        );
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => navigate('/')} className="return-button">
          Return to Home
        </button>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="error-container">
        <p className="error-message">No order details found.</p>
        <button onClick={() => navigate('/')} className="return-button">
          Return to Home
        </button>
      </div>
    );
  }
 
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
  // Usage:
  const orderDate = getCurrentDate(); // Returns like "18/02/2025"
  // const orderDate = new Date(orderData.createdAt).toLocaleDateString();
  
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-message">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        <div className="order-info">
          <div className="info-row">
            <span className="info-label">Order Number:</span>
            <span className="info-value">#{orderData.orderNumber}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Order Date:</span>
            <span className="info-value">{orderDate}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Order Status:</span>
            <span className="info-value status-badge">{orderData.status}</span>
          </div>
        </div>

        <div className="action-buttons">
          {orderData.status !== 'PAID' ? (
            <RazorpayPayment 
              order={orderData}
              onPaymentSuccess={handlePaymentSuccess}
            />
          ) : (

<div className="post-payment-actions">

<div className="delivery-info">
              <h2 className="delivery-title">Estimated Delivery</h2>
              <p>Your order will be delivered within 5-7 business days.</p>
              {orderData.shippingInfo && (
                <div className="shipping-details">
                  <h3>Shipping Address:</h3>
                  <p>{orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}</p>
                  <p>{orderData.shippingInfo.address1}</p>
                  {orderData.shippingInfo.address2 && <p>{orderData.shippingInfo.address2}</p>}
                  <p>{orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}</p>
                </div>
              )}
            </div>
           
  

  <div className="tracking-section">

    {orderData.shippingDetails?.awbCode && (

      <Link 

        to={`/tracking/${orderData.shippingDetails.awbCode}`}

        className="tracking-button"

      >

        Track Shipment

      </Link>

    )}

  </div>

</div>



)}

</div>


            {/* <div className="delivery-info">
              <h2 className="delivery-title">Estimated Delivery</h2>
              <p>Your order will be delivered within 5-7 business days.</p>
              {orderData.shippingInfo && (
                <div className="shipping-details">
                  <h3>Shipping Address:</h3>
                  <p>{orderData.shippingInfo.firstName} {orderData.shippingInfo.lastName}</p>
                  <p>{orderData.shippingInfo.address1}</p>
                  {orderData.shippingInfo.address2 && <p>{orderData.shippingInfo.address2}</p>}
                  <p>{orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zipCode}</p>
                </div>
              )}
            </div> */}
         

        <div className="invoice-section">
          <h2 className="invoice-title">
            <span className="download-icon">↓</span>
            Invoice Options
          </h2>
          <div className="button-group">
            <button 
              // onClick={generatePdf}
              // disabled={pdfStatus === 'loading'}
              onClick={generateShiprocketInvoice}

              disabled={pdfStatus === 'loading' || !orderData?.shippingDetails?.shipmentId}
              className={`invoice-button download-button ${pdfStatus === 'loading' ? 'loading' : ''} ${pdfStatus === 'success' ? 'success' : ''}`}
            >
              {getButtonContent()}
            </button>
            
            {/* <button 
              onClick={() => window.print()}
              className="invoice-button print-button"
            >
              <span className="print-icon">⎙</span>
              <span>Print Invoice</span>
            </button> */}
               {invoiceUrl && (

              <button
                onClick={() => window.open(invoiceUrl, '_blank')}
                className="invoice-button view-button"
              >
                <span className="view-icon">👁</span>
                <span>View Invoice</span>
              </button>

)}
          </div>
        </div>

        <div className="button-group">
          <button 
            onClick={() => navigate('/orders')} 
            className="action-button primary-button"
          >
            View Order History
          </button>
          
          <button 
            onClick={() => navigate('/')} 
            className="action-button secondary-button"
          >
            Continue Shopping
          </button>

          <button>
          <Link 
  to={`/tracking/${orderData.shippingDetails?.awbCode}`} 
  style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}
  onMouseEnter={(e) => e.target.style.color = 'darkblue'}
  onMouseLeave={(e) => e.target.style.color = 'blue'}
>
  Track Shipment
</Link>
          </button>

        </div>

        <div className="support-section">
          <p>
            Need help?{' '}
            <button onClick={() => navigate('/support')} className="support-link">
              Contact Support
            </button>
          </p>
        </div>

        {/* Hidden Invoice Content for PDF Generation */}
        {/* <div id="invoice-content" style={{ display: 'none' }}>
          <Invoice
            ref={invoiceRef}
            orderDetails={orderData}
            orderNumber={orderData.orderNumber}
            orderDate={orderDate}
            onPdfGenerated={handlePdfGeneration}
          />
        </div> */}
      </div>
    </div>
  );
};

export default OrderConfirmation;