// // src/services/shiprocketService.js
// const axios = require('axios');


// class ShiprocketService {
//   constructor() {
//     this.baseURL = 'https://apiv2.shiprocket.in/v1/external';
//     this.token = null;
//     this.tokenExpiry = null;
//   }

//   async getAuthToken() {
//     if (this.token && this.tokenExpiry && new Date() < this.tokenExpiry) {
//       return this.token;
//     }

//     try {
//       const response = await axios.post(`${this.baseURL}/auth/login`, {
//         email: process.env.SHIPROCKET_EMAIL,
//         password: process.env.SHIPROCKET_PASSWORD
//       });

//       this.token = response.data.token;
//       // Set token expiry to 9 days (to be safe)
//       this.tokenExpiry = new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000);
//       return this.token;
//     } catch (error) {
//       console.error('Shiprocket authentication failed:', error.response?.data || error.message);
//       throw new Error('Failed to authenticate with Shiprocket');
//     }
//   }

//   async getAxiosInstance() {
//     const token = await this.getAuthToken();
//     return axios.create({
//       baseURL: this.baseURL,
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });
//   }

//   async createShipment(orderData) {
//     try {
//       const axios = await this.getAxiosInstance();
      
//       // Format order data for Shiprocket
//       const shipmentData = {
//         order_id: orderData.orderNumber,
//         order_date: new Date().toISOString().split('T')[0],
//         pickup_location: "warehous",
//         billing_customer_name: `${orderData.shippingInfo.firstName} ${orderData.shippingInfo.lastName}`,
//         billing_last_name: orderData.shippingInfo.lastName,
//         billing_address: orderData.shippingInfo.address1,
//         billing_address_2: orderData.shippingInfo.address2,
//         billing_city: orderData.shippingInfo.city,
//         billing_pincode: orderData.shippingInfo.zipCode,
//         billing_state: orderData.shippingInfo.state,
//         billing_country: orderData.shippingInfo.country,
//         billing_email: orderData.shippingInfo.email,
//         billing_phone: orderData.shippingInfo.phone,
//         shipping_is_billing: true,
//         order_items: [{
//           name: orderData.orderDetails.product,
//           sku: 'BOOK-' + orderData.orderNumber,
//           units: orderData.orderDetails.customization.quantity,
//           selling_price: orderData.orderDetails.pricing.basePrice,
//         }],
//         payment_method: "prepaid",
//         sub_total: orderData.finalPrice,
//         length: 10,
//         breadth: 10,
//         height: 2,
//         weight: 0.5
//       };

//       // Create order in Shiprocket
//       const orderResponse = await axios.post('/orders/create/adhoc', shipmentData);
//       const { order_id, shipment_id } = orderResponse.data;

//       // Assign AWB
//       const awbResponse = await axios.post('/courier/assign/awb', {
//         shipment_id: shipment_id
//       });

//       // Generate pickup
//       await axios.post('/courier/generate/pickup', {
//         shipment_id: shipment_id
//       });

//       // Generate manifest
//       const manifestResponse = await axios.post('/manifests/generate', {
//         shipment_id: shipment_id
//       });

//       // Generate label
//       const labelResponse = await axios.post('/courier/generate/label', {
//         shipment_id: shipment_id
//       });

//       // Generate invoice
//       const invoiceResponse = await axios.post('/orders/print/invoice', {
//         ids: [order_id]
//       });

//       return {
//         shiprocketOrderId: order_id,
//         shipmentId: shipment_id,
//         awbCode: awbResponse.data.awb_code,
//         courierName: awbResponse.data.courier_name,
//         manifestUrl: manifestResponse.data.manifest_url,
//         labelUrl: labelResponse.data.label_url,
//         invoiceUrl: invoiceResponse.data.invoice_url
//       };
//     } catch (error) {
//       console.error('Shiprocket API error:', error.response?.data || error.message);
//       throw new Error('Failed to create shipment');
//     }
//   }

//   async trackShipment(awbCode) {
//     try {
//       const axios = await this.getAxiosInstance();
//       const response = await axios.get(`/courier/track/awb/${awbCode}`);
//       return response.data;
//     } catch (error) {
//       console.error('Tracking error:', error.response?.data || error.message);
//       throw new Error('Failed to track shipment');
//     }
//   }
// }

// module.exports = new ShiprocketService();