// import React, { useState } from 'react';
// import './custom.css';

// const NotebookCustomizer = () => {
//   const [design, setDesign] = useState({
//     coverDesign: {
//       logo: null,
//       text: '',
//       qrCode: null,
//     },
//     pageLayout: 'lined',
//     paperType: 'standard',
//     bindingType: 'spiral',
//     addons: [],
//   });

//   const [activeTab, setActiveTab] = useState('cover');
//   const [price, setPrice] = useState(19.99);
//   const [cart, setCart] = useState([]);

//   const paperTypes = [
//     { id: 'standard', name: 'Standard', price: 0 },
//     { id: 'erasable', name: 'Erasable', price: 5 },
//     { id: 'recycled', name: 'Recycled', price: 3 },
//   ];

//   const pageLayouts = [
//     { id: 'lined', name: 'Lined' },
//     { id: 'dotGrid', name: 'Dot Grid' },
//     { id: 'blank', name: 'Blank' },
//   ];

//   const bindingTypes = [
//     { id: 'spiral', name: 'Spiral Bound' },
//     { id: 'glue', name: 'Glue Bound' },
//   ];

//   const addons = [
//     { id: 'pen', name: 'Premium Pen', price: 4.99 },
//     { id: 'eraser', name: 'Eraser', price: 1.99 },
//     { id: 'giftPack', name: 'Gift Pack', price: 9.99 },
//   ];

//   const handleLogoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setDesign({
//         ...design,
//         coverDesign: { ...design.coverDesign, logo: URL.createObjectURL(file) }
//       });
//     }
//   };

//   const addToCart = () => {
//     setCart([...cart, { ...design, price }]);
//   };

//   return (
//     <div className="notebook-customizer">
//       <div className="card">
//         <div className="card-header">
//           <h2>Custom Notebook Designer</h2>
//         </div>
//         <div className="card-content">
//           <div className="tabs">
//             <button
//               className={`tab-button ${activeTab === 'cover' ? 'active' : ''}`}
//               onClick={() => setActiveTab('cover')}
//             >
//               Cover Design
//             </button>
//             <button
//               className={`tab-button ${activeTab === 'pages' ? 'active' : ''}`}
//               onClick={() => setActiveTab('pages')}
//             >
//               Page Layout
//             </button>
//             <button
//               className={`tab-button ${activeTab === 'paper' ? 'active' : ''}`}
//               onClick={() => setActiveTab('paper')}
//             >
//               Paper Type
//             </button>
//             <button
//               className={`tab-button ${activeTab === 'binding' ? 'active' : ''}`}
//               onClick={() => setActiveTab('binding')}
//             >
//               Binding
//             </button>
//             <button
//               className={`tab-button ${activeTab === 'addons' ? 'active' : ''}`}
//               onClick={() => setActiveTab('addons')}
//             >
//               Add-ons
//             </button>
//           </div>

//           <div className="tab-content">
//             {activeTab === 'cover' && (
//               <div className="tab-pane">
//                 <div className="form-group">
//                   <label>Cover Text</label>
//                   <input
//                     type="text"
//                     value={design.coverDesign.text}
//                     onChange={(e) => setDesign({
//                       ...design,
//                       coverDesign: { ...design.coverDesign, text: e.target.value }
//                     })}
//                     placeholder="Enter cover text"
//                     className="input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Upload Logo</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleLogoUpload}
//                     className="file-input"
//                   />
//                 </div>
//               </div>
//             )}

//             {activeTab === 'pages' && (
//               <div className="tab-pane">
//                 <select
//                   value={design.pageLayout}
//                   onChange={(e) => setDesign({ ...design, pageLayout: e.target.value })}
//                   className="select"
//                 >
//                   {pageLayouts.map((layout) => (
//                     <option key={layout.id} value={layout.id}>
//                       {layout.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             {activeTab === 'paper' && (
//               <div className="tab-pane">
//                 <select
//                   value={design.paperType}
//                   onChange={(e) => setDesign({ ...design, paperType: e.target.value })}
//                   className="select"
//                 >
//                   {paperTypes.map((paper) => (
//                     <option key={paper.id} value={paper.id}>
//                       {paper.name} (+${paper.price})
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             {activeTab === 'binding' && (
//               <div className="tab-pane">
//                 <select
//                   value={design.bindingType}
//                   onChange={(e) => setDesign({ ...design, bindingType: e.target.value })}
//                   className="select"
//                 >
//                   {bindingTypes.map((binding) => (
//                     <option key={binding.id} value={binding.id}>
//                       {binding.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             {activeTab === 'addons' && (
//               <div className="tab-pane">
//                 <div className="addons-list">
//                   {addons.map((addon) => (
//                     <div key={addon.id} className="addon-item">
//                       <div className="addon-info">
//                         <h3>{addon.name}</h3>
//                         <p>${addon.price}</p>
//                       </div>
//                       <button
//                         className={`button ${design.addons.includes(addon.id) ? 'secondary' : ''}`}
//                         onClick={() => {
//                           const newAddons = design.addons.includes(addon.id)
//                             ? design.addons.filter(id => id !== addon.id)
//                             : [...design.addons, addon.id];
//                           setDesign({ ...design, addons: newAddons });
//                         }}
//                       >
//                         {design.addons.includes(addon.id) ? 'Remove' : 'Add'}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="footer">
//             <div className="total">
//               Total: ${price}
//             </div>
//             <div className="actions">
//               <button className="button" onClick={() => {}}>
//                 Save Design
//               </button>
//               <button className="button primary" onClick={addToCart}>
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotebookCustomizer;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./Pages/Homepage"; 
import NotebookApp from "./product";
import NotebookCustomizer from "./Notebook";
import Products from "./Components/Products/productbook";
import Customize from "./Pages/customize";
import ShippingPage from "./Pages/ShippingPage";
import ProductDetail from "./Pages/productDetail";
import { AuthProvider } from './Context/AuthContext';
import LoginPage from './Pages/Auth/LoginPage';
import ForgotPasswordPage from './Pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from './Pages/Auth/ResetPasswordPage';
import CompleteProfilePage from './Pages/Profilepage';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import RegisterForm from './Components/Auth/Registration';
import OrderConfirmation from './Pages/OrderConformation';
import TrackingPage from './Pages/orderTrankingPage';
import PrivacyPage from './Pages/Privacy page';
import TermsPage from './Pages/TermsPage';
// Import CSS
import './Styles/variables.css';
import './Styles/auth.css';
import './Styles/layout.css';
import Header from './Components/common/Header';
// Customization page

function App() {
  return (

  
    <Router>
    <Header />
    <div className="main-content">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/product/:productType" element={<ProductDetail />} />
                <Route path="/customize/:productType" element={<Customize />} />
                <Route path="/register" element={<RegisterForm/>} />
                <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                <Route path="/tracking/:awbNumber" element={<TrackingPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />     
                {/* <Route path="/checkout/shipping"      element={<ShippingPage/>} />
                <Route path="/complete-profile" element={<CompleteProfilePage />} />
                <Route path="/" element={<Navigate to="/login" replace />} /> */}

                  {/* Protected Routes */}
          <Route
            path="/checkout/shipping"
            element={
              <ProtectedRoute>
                <ShippingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complete-profile"
            element={
              <ProtectedRoute>
                <CompleteProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </div>
        </Router>
        
  );
}


export default App;

