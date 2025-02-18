import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import '../../Styles/Invoice.css';

const Invoice = ({ orderDetails, orderNumber, orderDate, onPdfGenerated }) => {
  const invoiceRef = useRef(null);
  
  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  const generatePDF = async () => {
    if (!invoiceRef.current) return;

    try {
      if (onPdfGenerated) onPdfGenerated('loading');

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${orderNumber}.pdf`);

      if (onPdfGenerated) onPdfGenerated('success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      if (onPdfGenerated) onPdfGenerated('error');
    }
  };

  return (
    <>
      <div ref={invoiceRef} className="invoice-container" id="invoice-content">
        <div className="invoice-header">
          <div>
            <h1 className="invoice-title">INVOICE</h1>
            <p className="invoice-info">Order #{orderNumber}</p>
            <p className="invoice-info">Date: {orderDate}</p>
          </div>
          <div className="invoice-company">
            <p className="company-name">Your Company Name</p>
            <p className="company-address">123 Business Street</p>
            <p className="company-address">City, State 12345</p>
            <p className="company-address">support@yourcompany.com</p>
          </div>
        </div>
        
        <div className="invoice-section">
          <h2 className="section-title">Bill To:</h2>
          <p className="section-text">{orderDetails?.shippingInfo?.firstName} {orderDetails?.shippingInfo?.lastName}</p>
          <p className="section-text">{orderDetails?.shippingInfo?.address1}</p>
          {orderDetails?.shippingInfo?.address2 && <p className="section-text">{orderDetails?.shippingInfo?.address2}</p>}
          <p className="section-text">
            {orderDetails?.shippingInfo?.city}, {orderDetails?.shippingInfo?.state} {orderDetails?.shippingInfo?.zipCode}
          </p>
        </div>

        <div className="invoice-table">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className="product-name">{orderDetails?.product || 'Custom Product'}</p>
                  <p className="product-details">Pages: {orderDetails?.customization?.pages?.selected}</p>
                </td>
                <td>{orderDetails?.customization?.quantity}</td>
                <td>${formatPrice(orderDetails?.pricing?.basePrice)}</td>
                <td>${formatPrice(orderDetails?.pricing?.totalPrice)}</td>
              </tr>
              {orderDetails?.isGift && (
                <tr>
                  <td>Gift Wrapping Service</td>
                  <td>1</td>
                  <td>$5.99</td>
                  <td>$5.99</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="invoice-total">
          <div>
            <p><span>Subtotal:</span> ${formatPrice(orderDetails?.pricing?.totalPrice)}</p>
            {orderDetails?.pricing?.discount > 0 && (
              <p><span>Discount:</span> -${formatPrice((orderDetails?.pricing?.discount / 100) * orderDetails?.pricing?.totalPrice)}</p>
            )}
            <p className="total-amount"><span>Total:</span> ${formatPrice(orderDetails?.finalPrice)}</p>
          </div>
        </div>

        <div className="invoice-footer">
          <p>Thank you for your business!</p>
          <p>For any questions, please contact support@yourcompany.com</p>
        </div>
      </div>
      <div className="hidden">
        <button onClick={generatePDF}>Generate PDF</button>
      </div>
    </>
  );
};

export default Invoice;
