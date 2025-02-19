// import { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import './productDetail.css';
// import Air from './assets/Air.png';
// import Classic from './assets/Classic.png';
// import mainVideo from './video/main-video.mp4';
// import secondVideo from './video/second-video.mp4';
// import nature from './assets/nature.jpeg';
// import Eco from   './assets/Eco.png';
// import Lite from   './assets/Lite.png';


// const ProductDetail = () => {
//   const { productType } = useParams();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [pages, setPages] = useState(50);

//   // Product data mapping
//   const products = {
//     air: {
//       name: 'AIR',
//       image: Air,
//       price: 29.99,
//       description: 'Ultra-lightweight notebook with premium paper quality. Perfect for everyday use with its sleek design and durable construction. Features smooth writing experience and lies flat when open.',
//       features: [
//         'Ultra-lightweight design',
//         'Premium paper quality',
//         'Smooth writing surface',
//         'Durable construction',
//         'Lies flat when open'
//       ],
//       specifications: {
//         weight: '200g',
//         dimensions: '210mm x 297mm',
//         paperWeight: '80gsm'
//       }
//     },
//     classic: {
//       name: 'CLASSIC',
//       image: Classic,
//       price: 34.99,
//       description: 'Traditional notebook with timeless design. Built with high-quality materials and attention to detail. Perfect for professionals and students alike.',
//       features: [
//         'Traditional design',
//         'High-quality materials',
//         'Professional finish',
//         'Multiple color options',
//         'Built to last'
//       ],
//       specifications: {
//         weight: '300g',
//         dimensions: '210mm x 297mm',
//         paperWeight: '100gsm'
//       }
//     },
//     lite: {
//       name: 'LITE',
//       image: Lite,
//       price: 24.99,
//       description: 'Compact and lightweight notebook for on-the-go use. Ideal for quick notes and sketches. Features recyclable materials.',
//       features: [
//         'Compact design',
//         'Lightweight',
//         'Eco-friendly materials',
//         'Perfect for travel',
//         'Quick access'
//       ],
//       specifications: {
//         weight: '150g',
//         dimensions: '148mm x 210mm',
//         paperWeight: '70gsm'
//       }
//     },
//     eco: {
//       name: 'ECO',
//       image: Eco,
//       price: 27.99,
//       description: 'Environmentally conscious notebook made from 100% recycled materials. Sustainable choice without compromising on quality.',
//       features: [
//         '100% recycled materials',
//         'Eco-friendly production',
//         'Sustainable packaging',
//         'Natural finish',
//         'Zero waste'
//       ],
//       specifications: {
//         weight: '250g',
//         dimensions: '210mm x 297mm',
//         paperWeight: '90gsm'
//       }
//     }
//   };

//   const currentProduct = products[productType.toLowerCase()];
  
//   // Get suggested products (excluding current product)
//   const suggestedProducts = Object.entries(products)
//     .filter(([key]) => key !== productType.toLowerCase())
//     .slice(0, 3)
//     .map(([key, product]) => ({ ...product, path: `/product/${key}` }));

//   const handleQuantityChange = (value) => {
//     const newQuantity = Math.max(1, Math.min(99, value));
//     setQuantity(newQuantity);
//   };

//   const handleCustomize = () => {
//     navigate(`/customize/${productType}`, {
//       state: { quantity, pages }
//     });
//   };

//   if (!currentProduct) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="product-detail-container">
//       <div className="product-main">
//         <div className="product-left">
//           <div className="product-image-container">
//             <img src={currentProduct.image} alt={currentProduct.name} className="product-image" />
//           </div>
//           <div className="product-price">
//             <h3>Starting from ${currentProduct.price}</h3>
//             <p className="price-note">* Final price may vary based on customization</p>
//           </div>
//         </div>

//         <div className="product-right">
//           <h1>{currentProduct.name}</h1>
//           <p className="product-description">{currentProduct.description}</p>

//           <div className="product-features">
//             <h2>Key Features</h2>
//             <ul>
//               {currentProduct.features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="product-specifications">
//             <h2>Specifications</h2>
//             <div className="specs-grid">
//               {Object.entries(currentProduct.specifications).map(([key, value]) => (
//                 <div key={key} className="spec-item">
//                   <span className="spec-label">{key}:</span>
//                   <span className="spec-value">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="product-controls">
//             <div className="control-group">
//               <label>Quantity:</label>
//               <div className="quantity-control">
//                 <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
//                   min="1"
//                   max="99"
//                 />
//                 <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
//               </div>
//             </div>

//             <div className="control-group">
//               <label>Pages:</label>
//               <select 
//                 value={pages}
//                 onChange={(e) => setPages(parseInt(e.target.value))}
//               >
//                 {[50, 100, 150, 200, 250].map(value => (
//                   <option key={value} value={value}>{value} pages</option>
//                 ))}
//               </select>
//             </div>

//             <button onClick={handleCustomize} className="customize-button">
//               Customize Now
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="suggested-products">
//         <h2>You May Also Like</h2>
//         <div className="suggested-products-grid">
//           {suggestedProducts.map((product, index) => (
//             <Link to={product.path} key={index} className="suggested-product">
//               <img src={product.image} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>${product.price}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


// import { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import '../Styles/productDetail.css';
// import Air from '../assets/Air.png';
// import Classic from '../assets/Classic.png';
// import mainVideo from '../video/main-video.mp4';
// import secondVideo from '../video/second-video.mp4';
// import nature from '../assets/nature.jpeg';
// import Eco from '../assets/Eco.png';
// import Lite from '../assets/Lite.png';

// const ProductDetail = () => {
//   const { productType } = useParams();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [pages, setPages] = useState(50);

//   // Product data mapping
//   const products = {
//     air: {
//       name: 'AIR',
//       image: Air,
//       price: 29.99,
//       description: 'Ultra-lightweight notebook with premium paper quality. Perfect for everyday use with its sleek design and durable construction. Features smooth writing experience and lies flat when open.',
//       features: [
//         'Ultra-lightweight design',
//         'Premium paper quality',
//         'Smooth writing surface',
//         'Durable construction',
//         'Lies flat when open'
//       ],
//       specifications: {
//         weight: '200g',
//         dimensions: '210mm x 297mm',
//         paperWeight: '80gsm'
//       }
//     },
//     classic: {
//       name: 'CLASSIC',
//       image: Classic,
//       price: 34.99,
//       description: 'Traditional notebook with timeless design. Built with high-quality materials and attention to detail. Perfect for professionals and students alike.',
//       features: [
//         'Traditional design',
//         'High-quality materials',
//         'Professional finish',
//         'Multiple color options',
//         'Built to last'
//       ],
//       specifications: {
//         weight: '300g',
//         dimensions: '210mm x 297mm',
//         paperWeight: '100gsm'
//       }
//     },
//     lite: {
//       name: 'LITE',
//       image: Lite,
//       price: 24.99,
//       description: 'Compact and lightweight notebook for on-the-go use. Ideal for quick notes and sketches. Features recyclable materials.',
//       features: [
//         'Compact design',
//         'Lightweight',
//         'Eco-friendly materials',
//         'Perfect for travel',
//         'Quick access'
//       ],
//       specifications: {
//         weight: '150g',
//         dimensions: '148mm x 210mm',
//         paperWeight: '70gsm'
//       }
//     },
//     eco: {
//       name: 'ECO',
//       image: Eco,
//       price: 27.99,
//       description: 'Environmentally conscious notebook made from 100% recycled materials. Sustainable choice without compromising on quality.',
//       features: [
//         '100% recycled materials',
//         'Eco-friendly production',
//         'Sustainable packaging',
//         'Natural finish',
//         'Zero waste'
//       ],
//       specifications: {
//         weight: '250g',
//         dimensions: '210mm x 297mm',
//         paperWeight: '90gsm'
//       }
//     }
//   };

//   const currentProduct = products[productType.toLowerCase()];
  
//   // Get suggested products (excluding current product)
//   const suggestedProducts = Object.entries(products)
//     .filter(([key]) => key !== productType.toLowerCase())
//     .slice(0, 3)
//     .map(([key, product]) => ({ ...product, path: `/product/${key}` }));

//   const handleQuantityChange = (value) => {
//     const newQuantity = Math.max(1, Math.min(99, value));
//     setQuantity(newQuantity);
//   };

//   const handleCustomize = () => {
//     navigate(`/customize/${productType}`, {
//       state: { quantity, pages }
//     });
//   };

//   // New handler for buying without customization
//   const handleBuyNow = () => {
//     const finalCost = currentProduct.price * quantity;
//     navigate('/checkout/shipping', {
//       state: {
//         product: currentProduct.name,
//         quantity,
//         pages,
//         totalCost: finalCost,
//         isCustomized: false
//       }
//     });
//   };

//   if (!currentProduct) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="product-detail-container">
//       <div className="product-main">
//         <div className="product-left">
//           <div className="product-image-container">
//             <img src={currentProduct.image} alt={currentProduct.name} className="product-image" />
//           </div>
//           <div className="product-price">
//             <h3>Starting from ${currentProduct.price}</h3>
//             <p className="price-note">* Final price may vary based on customization</p>
//           </div>
//         </div>

//         <div className="product-right">
//           <h1>{currentProduct.name}</h1>
//           <p className="product-description">{currentProduct.description}</p>

//           <div className="product-features">
//             <h2>Key Features</h2>
//             <ul>
//               {currentProduct.features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="product-specifications">
//             <h2>Specifications</h2>
//             <div className="specs-grid">
//               {Object.entries(currentProduct.specifications).map(([key, value]) => (
//                 <div key={key} className="spec-item">
//                   <span className="spec-label">{key}:</span>
//                   <span className="spec-value">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="product-controls">
//             <div className="control-group">
//               <label>Quantity:</label>
//               <div className="quantity-control">
//                 <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
//                   min="1"
//                   max="99"
//                 />
//                 <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
//               </div>
//             </div>
            
//             {/* <span className={`quantity-price ${priceState}`}>
//     ${calculatePrice().totalPrice} each
//   </span> */}
//             <div className="control-group">
//               <label>Pages:</label>
//               <select 
//                 value={pages}
//                 onChange={(e) => setPages(parseInt(e.target.value))}
//               >
//                 {[50, 100, 150, 200, 250].map(value => (
//                   <option key={value} value={value}>{value} pages</option>
//                 ))}
//               </select>
//             </div>

//             <div className="button-group">
//               <button onClick={handleCustomize} className="customize-button">
//                 Customize Now
//               </button>
//               <button onClick={handleBuyNow} className="buy-now-button">
//                 Buy Without Customization
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="suggested-products">
//         <h2>You May Also Like</h2>
//         <div className="suggested-products-grid">
//           {suggestedProducts.map((product, index) => (
 
//  <Link to={product.path} key={index} className="suggested-product">
//               <img src={product.image} alt={product.name} />
//               <h3>{product.name}</h3>
//               <p>${product.price}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;



import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ShoppingCart, Box, Star, RefreshCcw, Cloud, Smartphone } from 'lucide-react';
import {  ChevronDown, ChevronUp, Tags } from 'lucide-react';
import '../Styles/productDetail.css';
import Air from '../assets/Air.png';
import Classic from '../assets/Classic.png';
import mainVideo from '../video/main-video.mp4';
import secondVideo from '../video/second-video.mp4';
import nature from '../assets/nature.jpeg';
import Eco from '../assets/Eco.png';
import Lite from '../assets/Lite.png';
import CustomSelect from '../Components/Products/CustomSelect';

const ProductDetail = () => {
  const { productType } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [pages, setPages] = useState(50);
  const [paperType, setPaperType] = useState('Erasable');
  const [bindingType, setBindingType] = useState('spiral');
  const [pageLayout, setPageLayout] = useState('lined');
  const [priceState, setPriceState] = useState('stable');
 
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Product data mapping
  const products = {
    air: {
      name: 'AIR',
      image: Air,
      basePrice: 999,
      mrpprice: 2999,
      description: 'ReNote AI Air – AI-Powered Smart Reusable Notebook with Smart Templates & AI Assistance ReNote AI Air is a next-generation AI-powered smart reusable notebook designed for professionals, students, and creatives who want to digitize, organize, and enhance their notes with AI. Featuring 50 reusable, waterproof, and tear-resistant pages, it integrates AI handwriting recognition, smart templates, and cloud sync, making it the ultimate productivity tool.',
      features: [
        'Smart Templates: Pre-designed pages for to-do lists, meeting schedules, and minutes, integrating with popular productivity apps',
        'Versatile Page Layouts: Includes blank, lined, and dotted pages for various uses like sketching, note-taking, and bullet journaling',
        'Reusable & Sustainable: Waterproof, tear-proof paper reusable up to 100 times, erasable with a microfiber cloth and Pilot Frixion pen',
        'AI-Powered OCR: Converts handwriting to digital text with AI assistance',
        'Cloud Integration: Auto-scan and sync with Google Drive, OneDrive, and personal drives',
        'ReNote App: Provides AI summarization, smart search, and other organization tools for digitized notes on Android and iOS'
      ],
      specifications: {
        weight: '200g',
        dimensions: '210mm x 297mm',
        paperWeight: '80gsm'
      }
    },
    classic: {
      name: 'CLASSIC',
      image: Classic,
      basePrice: 999,
      mrpprice: 2999,
      description: 'ReNote AI Air – AI-Powered Smart Reusable Notebook with Smart Templates & AI Assistance ReNote AI Air is a next-generation AI-powered smart reusable notebook designed for professionals, students, and creatives who want to digitize, organize, and enhance their notes with AI. Featuring 50 reusable, waterproof, and tear-resistant pages, it integrates AI handwriting recognition, smart templates, and cloud sync, making it the ultimate productivity tool.',
      features: [
        'Smart Templates: Pre-designed pages for to-do lists, meeting schedules, and minutes, integrating with popular productivity apps',
        'Versatile Page Layouts: Includes blank, lined, and dotted pages for various uses like sketching, note-taking, and bullet journaling',
        'Reusable & Sustainable: Waterproof, tear-proof paper reusable up to 100 times, erasable with a microfiber cloth and Pilot Frixion pen',
        'AI-Powered OCR: Converts handwriting to digital text with AI assistance',
        'Cloud Integration: Auto-scan and sync with Google Drive, OneDrive, and personal drives',
        'ReNote App: Provides AI summarization, smart search, and other organization tools for digitized notes on Android and iOS'
      ],
      specifications: {
        weight: '300g',
        dimensions: '210mm x 297mm',
        paperWeight: '100gsm'
      }
    },
    lite: {
      name: 'LITE',
      image: Lite,
      basePrice:499, 
      mrpprice:999,
      description: 'ReNote AI Air – AI-Powered Smart Reusable Notebook with Smart Templates & AI Assistance ReNote AI Air is a next-generation AI-powered smart reusable notebook designed for professionals, students, and creatives who want to digitize, organize, and enhance their notes with AI. Featuring 50 reusable, waterproof, and tear-resistant pages, it integrates AI handwriting recognition, smart templates, and cloud sync, making it the ultimate productivity tool.',
      features: [
        'Smart Templates: Pre-designed pages for to-do lists, meeting schedules, and minutes, integrating with popular productivity apps',
        'Versatile Page Layouts: Includes blank, lined, and dotted pages for various uses like sketching, note-taking, and bullet journaling',
        'Reusable & Sustainable: Waterproof, tear-proof paper reusable up to 100 times, erasable with a microfiber cloth and Pilot Frixion pen',
        'AI-Powered OCR: Converts handwriting to digital text with AI assistance',
        'Cloud Integration: Auto-scan and sync with Google Drive, OneDrive, and personal drives',
        'ReNote App: Provides AI summarization, smart search, and other organization tools for digitized notes on Android and iOS'
      ],
      specifications: {
        weight: '150g',
        dimensions: '148mm x 210mm',
        paperWeight: '70gsm'
      }
    },
    eco: {
      name: 'ECO',
      image: Eco,
      basePrice: 499,
      mrpprice:999,
      description: 'ReNote AI Air – AI-Powered Smart Reusable Notebook with Smart Templates & AI Assistance ReNote AI Air is a next-generation AI-powered smart reusable notebook designed for professionals, students, and creatives who want to digitize, organize, and enhance their notes with AI. Featuring 50 reusable, waterproof, and tear-resistant pages, it integrates AI handwriting recognition, smart templates, and cloud sync, making it the ultimate productivity tool.',
      features: [
        'Smart Templates: Pre-designed pages for to-do lists, meeting schedules, and minutes, integrating with popular productivity apps',
        'Versatile Page Layouts: Includes blank, lined, and dotted pages for various uses like sketching, note-taking, and bullet journaling',
        'Reusable & Sustainable: Waterproof, tear-proof paper reusable up to 100 times, erasable with a microfiber cloth and Pilot Frixion pen',
        'AI-Powered OCR: Converts handwriting to digital text with AI assistance',
        'Cloud Integration: Auto-scan and sync with Google Drive, OneDrive, and personal drives',
        'ReNote App: Provides AI summarization, smart search, and other organization tools for digitized notes on Android and iOS'
      ],
      specifications: {
        weight: '250g',
        dimensions: '210mm x 297mm',
        paperWeight: '90gsm'
      }
    }
  };

  const PRICING = {
    basePricePerPage: 0.10,
    bindingPrices: {
      spiral: 5,
      glue: 3
    },
    paperPrices: {
      Erasable: 1.2,
      Recycled: 1
    },
    bulkDiscounts: [
      { quantity: 10, discount: 0.05 },
      { quantity: 25, discount: 0.10 },
      { quantity: 50, discount: 0.15 },
      { quantity: 100, discount: 0.20 }
    ]
  };

  const layoutOptions = [
    { value: 'lined', label: 'Lined' },
    { value: 'dot-grid', label: 'Dot Grid' },
    { value: 'blank', label: 'Blank' }
  ];

  const layoutImages = {
    lined: Lite, // Using Lite image as placeholder, replace with actual layout images
    "dot-grid": "/api/placeholder/300/300",
    blank: "/api/placeholder/300/300"
  };

  const paperTypeOptions = [
    { value: 'Erasable', label: 'Erasable' },
    { value: 'Recycled', label: 'Recycled' }
  ];

  const paperImages = {
    Erasable: "/api/placeholder/300/300",
    Recycled: "/api/placeholder/300/300"
  };

  const bindingOptions = [
    { value: 'spiral', label: 'Spiral Bound' },
    { value: 'glue', label: 'Glue Bound' }
  ];

  const bindingImages = {
    spiral: "/api/placeholder/300/300",
    glue: "/api/placeholder/300/300"
  };

  const currentProduct = products[productType.toLowerCase()];
  
  // Get suggested products (excluding current product)
  const suggestedProducts = Object.entries(products)
    .filter(([key]) => key !== productType.toLowerCase())
    .slice(0, 3)
    .map(([key, product]) => ({ ...product, path: `/product/${key}` }));

  // const calculatePrice = () => {
  //   const basePrice = pages * PRICING.basePricePerPage;
  //   const bindingPrice = PRICING.bindingPrices[bindingType];
  //   const paperMultiplier = PRICING.paperPrices[paperType];
  //   const pricePerNotebook = (basePrice + bindingPrice) * paperMultiplier;
    
  //   const applicableDiscount = PRICING.bulkDiscounts
  //     .reverse()
  //     .find(discount => quantity >= discount.quantity);
    
  //   const discountMultiplier = 1 - (applicableDiscount?.discount || 0);
  //   const totalPrice = pricePerNotebook * quantity * discountMultiplier;
    
  //   return {
  //     pricePerNotebook: pricePerNotebook.toFixed(2),
  //     totalPrice: totalPrice.toFixed(2),
  //     discount: applicableDiscount ? (applicableDiscount.discount * 100).toFixed(0) : 0
  //   };
  // };
  const calculatePrice = () => {
    // Start with the product's base price
    const productBasePrice = currentProduct.basePrice;
    
    // Calculate additional costs based on customization
    const pagesPrice = 0; // Removed pages calculation since we removed pages selector
    const bindingPrice = 0; // Removed binding price since we removed binding selection
    const paperMultiplier = 1; // Removed paper type multiplier since we removed paper type selection
    
    // Calculate price per notebook including base price and customizations
    const pricePerNotebook = (productBasePrice + pagesPrice + bindingPrice) * paperMultiplier;
    
    // Find applicable bulk discount
    const applicableDiscount = PRICING.bulkDiscounts
      .reverse()
      .find(discount => quantity >= discount.quantity);
    
    // Apply discount if available
    const discountMultiplier = 1 - (applicableDiscount?.discount || 0);
    const totalPrice = pricePerNotebook * quantity * discountMultiplier;
    
    return {
      pricePerNotebook: pricePerNotebook.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      discount: applicableDiscount ? (applicableDiscount.discount * 100).toFixed(0) : 0
    };
  };

  const priceDetails = calculatePrice();
  const savings = ((priceDetails.pricePerNotebook * quantity) - priceDetails.totalPrice).toFixed(2);

  const handleQuantityChange = (newQuantity) => {
    const oldPrice = calculatePrice().totalPrice;
    const validQuantity = Math.max(1, Math.min(99, newQuantity));
    setQuantity(validQuantity);
    
    const newPrice = calculatePrice().totalPrice;
    setPriceState(newPrice > oldPrice ? 'price-increase' : 'price-decrease');
    setTimeout(() => setPriceState(''), 500);
  };

  // const handleBuyNow = () => {
  //   const orderDetails = {
  //     product: currentProduct.name,
  //     quantity,
  //     totalCost: calculatePrice().totalPrice,
  //     isCustomized: false
  //   };
    
  //   navigate('/checkout/shipping', { state: orderDetails });
  // };
  
  const handleBuyNow = () => {
    const orderDetails = {
      product: currentProduct.name,
      quantity,
      pages,
      paperType,
      bindingType,
      pageLayout,
      totalCost: calculatePrice().totalPrice,
      isCustomized: false
    };
    
    // Store in local storage
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
    
    navigate('/checkout/shipping', { 
      state: {
        product: currentProduct.name,
        quantity,
        pages,
        totalCost: calculatePrice().totalPrice,
        isCustomized: false
      }
    });
  };


  // const handleCustomize = () => {
  //   navigate(`/customize/${productType}`, {
  //     state: {
  //       quantity,
  //       pages,
  //       paperType,
  //       bindingType,
  //       pageLayout
  //     }
  //   });
  // };

  const handleCustomize = () => {
    const orderDetails = {
      productType: productType,
      quantity,
      pages,
      paperType,
      bindingType,
      pageLayout,
      basePrice: currentProduct.basePrice,
      productName: currentProduct.name,
      productImage: currentProduct.image
    };
    
    localStorage.setItem('productDetails', JSON.stringify(orderDetails));
    navigate(`/customize/${productType}`);
  };
  
  if (!currentProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
    <div className="product-grid">
      <div className="product-left">
        <div className="product-image-container">
          <img 
            src={currentProduct.image} 
            alt={currentProduct.name}
            className="product-image"
          />
        </div>
      </div>

      <div className="product-right">
        {/* <h1 className="product-title">{currentProduct.name}</h1> */}
        
        <div className="product-price-section">
        <h1 className="product-title">{currentProduct.name}</h1>
          <div className="price-header">
            <div className="price-label">Special Price</div>
            <div className="price-row">
              <span className="selling-price">₹{currentProduct.basePrice}</span>
              <span className="mrp">₹{currentProduct.mrpprice}</span>
              <span className="discount-badge">30% off</span>
            </div>
            <div className="tax-info">Inclusive of all taxes</div>
          </div>

          <div className="quantity-section">
            <div className="quantity-controls">
              <div className="quantity-control">
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  min="1"
                  max="99"
                  className="quantity-input"
                />
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 99}
                >
                  +
                </button>
              </div>
              
              <button 
  className="price-details-toggle"
  onClick={() => setShowBreakdown(!showBreakdown)}
  aria-expanded={showBreakdown}
>
  <Tags size={18} />
  {showBreakdown ? 'Hide Price Details' : 'Show Price Details'}
  {showBreakdown ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
</button>
            </div>

            {showBreakdown && (
        <div className="price-breakdown">
          <div className="breakdown-rows">
            <div className="breakdown-row">
              <span>Price per notebook</span>
              <span>₹{priceDetails.pricePerNotebook}</span>
            </div>
            <div className="breakdown-row">
              <span>Quantity</span>
              <span>× {quantity}</span>
            </div>
            <div className="breakdown-row">
              <span>Subtotal</span>
              <span>₹{(priceDetails.pricePerNotebook * quantity).toFixed(2)}</span>
            </div>
            {priceDetails.discount > 0 && (
              <div className="breakdown-row discount">
                <span>Bulk Discount ({priceDetails.discount}%)</span>
                <span>- ₹{savings}</span>
              </div>
            )}
          </div>
          <div className="final-price-row">
            <span>Final Price</span>
            <span className={`final-price ${priceState}`}>
              ₹{priceDetails.totalPrice}
            </span>
          </div>
          
          {priceDetails.discount > 0 && (
            <div className="savings-alert">
              <AlertCircle className="savings-icon" />
              <span>You're saving ₹{savings} with bulk pricing!</span>
            </div>
          )}
        </div>
      )}
          </div>

          <div className="bulk-discounts">
            <h3>Bulk Order Savings</h3>
            <div className="discount-cards">
              {PRICING.bulkDiscounts.map((discount, index) => (
                <div key={index} className="discount-card">
                  <div className="discount-amount">{discount.discount * 100}%</div>
                  <div className="discount-quantity">{discount.quantity}+ notebooks</div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleBuyNow} className="buy-button">
              <ShoppingCart className="button-icon" />
              Buy Now
            </button>
          </div>
        </div>

        <div className="product-description">
          <h2>About This Product</h2>
          <p>{currentProduct.description}</p>
        </div>

        <div className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Box className="feature-icon" />
              <h3>Smart Templates</h3>
              <p>Pre-designed pages for various uses</p>
            </div>
            <div className="feature-card">
              <Star className="feature-icon" />
              <h3>Premium Quality</h3>
              <p>Waterproof and tear-resistant pages</p>
            </div>
            <div className="feature-card">
              <RefreshCcw className="feature-icon" />
              <h3>Reusable</h3>
              <p>Up to 100 times per page</p>
            </div>
            <div className="feature-card">
              <Cloud className="feature-icon" />
              <h3>Cloud Sync</h3>
              <p>Auto-sync with cloud storage</p>
            </div>
            <div className="feature-card">
              <Smartphone className="feature-icon" />
              <h3>Mobile App</h3>
              <p>AI-powered note organization</p>
            </div>
          </div>
        </div>

        <div className="specifications-section">
          <h2>Specifications</h2>
          <div className="specs-grid">
            {Object.entries(currentProduct.specifications).map(([key, value]) => (
              <div key={key} className="spec-card">
                <span className="spec-label">{key}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="suggested-products">
      <h2>You May Also Like</h2>
      <div className="suggested-grid">
        {suggestedProducts.map((product, index) => (
          <Link to={product.path} key={index} className="suggested-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
};

export default ProductDetail;
