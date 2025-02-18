// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './Customize.css';

// const Customize = () => {
//     const { productType } = useParams();
//     const [customization, setCustomization] = useState({
//         coverDesign: { text: '', logo: '', image: '', qrCode: '' },
//         pageLayout: 'lined',
//         paperType: 'Erasable',
//         bindingType: 'spiral',
//         accessories: [],
//     });

//     const handleChange = (field, value) => {
//         setCustomization((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     const handleAccessoryChange = (accessory) => {
//         setCustomization((prev) => {
//             const updatedAccessories = prev.accessories.includes(accessory)
//                 ? prev.accessories.filter((item) => item !== accessory)
//                 : [...prev.accessories, accessory];
//             return { ...prev, accessories: updatedAccessories };
//         });
//     };

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setCustomization((prev) => ({
//                     ...prev,
//                     coverDesign: { ...prev.coverDesign, image: reader.result },
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleOrder = () => {
//         alert(`Order placed for a customized ${productType} notebook!`);
//     };

//     return (
//         <div className="customize-container">
//             <h1>Customize Your {productType} Notebook</h1>

//             <div className="customize-options">
//                 <label>Cover Text:</label>
//                 <input 
//                     type="text" 
//                     value={customization.coverDesign.text} 
//                     onChange={(e) => handleChange('coverDesign', { ...customization.coverDesign, text: e.target.value })} 
//                 />

//                 <label>Upload Cover Image:</label>
//                 <input type="file" accept="image/*" onChange={handleImageUpload} />

//                 {customization.coverDesign.image && (
//                     <div className="image-preview">
//                         <img src={customization.coverDesign.image} alt="Cover Preview" width="100" />
//                     </div>
//                 )}

//                 <label>Page Layout:</label>
//                 <select value={customization.pageLayout} onChange={(e) => handleChange('pageLayout', e.target.value)}>
//                     <option value="lined">Lined</option>
//                     <option value="dot-grid">Dot Grid</option>
//                     <option value="blank">Blank</option>
//                 </select>

//                 <label>Paper Type:</label>
//                 <select value={customization.paperType} onChange={(e) => handleChange('paperType', e.target.value)}>
//                     <option value="Erasable">Erasable</option>
//                     <option value="Recycled">Recycled</option>
//                 </select>

//                 <label>Binding Type:</label>
//                 <select value={customization.bindingType} onChange={(e) => handleChange('bindingType', e.target.value)}>
//                     <option value="spiral">Spiral Bound</option>
//                     <option value="glue">Glue Bound</option>
//                 </select>

//                 <label>Accessories:</label>
//                 <div>
//                     {['Pens', 'Erasers', 'Gift Pack'].map((item) => (
//                         <div key={item}>
//                             <input
//                                 type="checkbox"
//                                 checked={customization.accessories.includes(item)}
//                                 onChange={() => handleAccessoryChange(item)}
//                             />
//                             {item}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="preview">
//                 <h2>Preview</h2>
//                 <p>Cover Text: {customization.coverDesign.text}</p>
//                 {customization.coverDesign.image && <img src={customization.coverDesign.image} alt="Cover" width="100" />}
//                 <p>Page Layout: {customization.pageLayout}</p>
//                 <p>Paper Type: {customization.paperType}</p>
//                 <p>Binding Type: {customization.bindingType}</p>
//                 <p>Accessories: {customization.accessories.join(', ') || 'None'}</p>
//             </div>

//             <button onClick={handleOrder}>Order Now</button>
//         </div>
//     );
// };

// export default Customize;


// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './Customize.css';
// import Air from './assets/Air.png';
// import Classic from './assets/Classic.png';
// import mainVideo from './video/main-video.mp4';
// import secondVideo from './video/second-video.mp4';
// import nature from './assets/nature.jpeg';
// import Eco from   './assets/Eco.png';
// import Lite from   './assets/Lite.png';

// const productImages = {
//     air: Air,
//     classic: Classic,
//     lite: Lite,
//     eco: Eco,
// };

// const Customize = () => {
//     const { productType } = useParams();
//     const [customization, setCustomization] = useState({
//         coverDesign: { text: '', logo: '', image: '', qrCode: '' },
//         pageLayout: 'lined',
//         paperType: 'Erasable',
//         bindingType: 'spiral',
//         accessories: [],
//     });

//     const handleChange = (field, value, subField = null) => {
//         setCustomization((prev) => ({
//             ...prev,
//             [field]: subField ? { ...prev[field], [subField]: value } : value,
//         }));
//     };
    

//     const handleAccessoryChange = (accessory) => {
//         setCustomization((prev) => {
//             const updatedAccessories = prev.accessories.includes(accessory)
//                 ? prev.accessories.filter((item) => item !== accessory)
//                 : [...prev.accessories, accessory];
//             return { ...prev, accessories: updatedAccessories };
//         });
//     };

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setCustomization((prev) => ({
//                     ...prev,
//                     coverDesign: { ...prev.coverDesign, image: reader.result },
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleOrder = () => {
//         alert(`Order placed for a customized ${productType} notebook!`);
//     };

//     return (
//         <div className="customize-container">
//             <h1>Customize Your {productType} Notebook</h1>
//             {productImages[productType] && (
//                 <div className="product-image">
//                     <img src={productImages[productType]} alt={`${productType} Notebook`} className="preview-image" />
//                 </div>
//             )}
            
//             <div className="customize-options">
//                 <label>Cover Text:</label>
//                 <div className="input-group">
//                     {customization.coverDesign.image && (
//                         <img src={customization.coverDesign.image} alt="Cover Preview" className="preview-image" />
//                     )}
               
//                     <input 
//     type="text" 
//     value={customization.coverDesign.text} 
//     onChange={(e) => handleChange('coverDesign', e.target.value, 'text')} 
// />

//                 </div>

//                 <label>Upload Cover Image:</label>
//                 <input type="file" accept="image/*" onChange={handleImageUpload} />

//                 <label>Page Layout:</label>
//                 <div className="input-group">
//                     {customization.coverDesign.image && (
//                         <img src={customization.coverDesign.image} alt="Page Layout Preview" className="preview-image" />
//                     )}
//                     <select value={customization.pageLayout} onChange={(e) => handleChange('pageLayout', e.target.value)}>
//                         <option value="lined">Lined</option>
//                         <option value="dot-grid">Dot Grid</option>
//                         <option value="blank">Blank</option>
//                     </select>
//                 </div>

//                 <label>Paper Type:</label>
//                 <div className="input-group">
//                     <select value={customization.paperType} onChange={(e) => handleChange('paperType', e.target.value)}>
//                         <option value="Erasable">Erasable</option>
//                         <option value="Recycled">Recycled</option>
//                     </select>
//                 </div>

//                 <label>Binding Type:</label>
//                 <div className="input-group">
//                     <select value={customization.bindingType} onChange={(e) => handleChange('bindingType', e.target.value)}>
//                         <option value="spiral">Spiral Bound</option>
//                         <option value="glue">Glue Bound</option>
//                     </select>
//                 </div>

//                 <label>Accessories:</label>
//                 <div className="input-group">
//                     {['Pens', 'Erasers', 'Gift Pack'].map((item) => (
//                         <div key={item}>
//                             <input
//                                 type="checkbox"
//                                 checked={customization.accessories.includes(item)}
//                                 onChange={() => handleAccessoryChange(item)}
//                             />
//                             {item}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="preview">
//                 <h2>Preview</h2>
//                 <p>Cover Text: {customization.coverDesign.text}</p>
//                 {customization.coverDesign.image && <img src={customization.coverDesign.image} alt="Cover" className="preview-image" />}
//                 <p>Page Layout: {customization.pageLayout}</p>
//                 <p>Paper Type: {customization.paperType}</p>
//                 <p>Binding Type: {customization.bindingType}</p>
//                 <p>Accessories: {customization.accessories.join(', ') || 'None'}</p>
//             </div>

//             <button onClick={handleOrder}>Order Now</button>
//         </div>
//     );
// };

// export default Customize;

// TEST-3
import { useState,useRef,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import CustomSelect from '../Components/Products/CustomSelect';
import QRCode  from 'qrcode';
import '../Styles/Customize.css';
import Lite from '../assets/Lite.png';

const NotebookCustomizer = () => {
    const navigate = useNavigate();
  const { productType } = useParams();
  const imageRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
 
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
 
  const previewRef = useRef(null);
 

  const [showFavicon, setShowFavicon] = useState(true);
  const [acceptCustomization, setAcceptCustomization] = useState(false);
const [showError, setShowError] = useState(false);
   // Price configuration

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
  const [customization, setCustomization] = useState({
    coverDesign: { 
      text: '', 
      logo: '', 
      image: '', 
      qrCode: '',
      qrCodeUrl: '',

      qrCodePosition: 'bottom-right',
  
      qrCodeSize: 'medium',
      qrCodeBackground: '#FFFFFF',
  
      websiteIcon: '',
      font: 'font-serif',
      textColor: '#FFFFFF',
      textPosition: 'center-center',
      imageShape: 'rectangle', // new

      imageSize: 'medium' // new
    },
    pageLayout: 'lined',
    paperType: 'Erasable',
    bindingType: 'spiral',
    accessories: [],
    pages: {
      min: 50,
      selected: 50
    },
    quantity: 1
  });


  const NOTEBOOK_DIMENSIONS = {

    width: 400,

    height: 560  // Using 1.4 ratio which is common for notebooks
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCoverDesign('image', reader.result);
        // Reset position when new image is uploaded
        setImagePosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  // Mouse event handlers for dragging
  const handleMouseDown = (e) => {
    if (imageRef.current) {
      e.preventDefault(); // Prevent image drag default behavior
      const rect = imageRef.current.getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && previewRef.current && imageRef.current) {
      const previewRect = previewRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();

      // Calculate new position
      let newX = e.clientX - previewRect.left - dragOffset.x;
      let newY = e.clientY - previewRect.top - dragOffset.y;

      // Add bounds checking
      const maxX = previewRect.width - imageRect.width;
      const maxY = previewRect.height - imageRect.height;

      // Constrain movement within preview bounds
      newX = Math.min(Math.max(0, newX), maxX);
      newY = Math.min(Math.max(0, newY), maxY);

      setImagePosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Clean up event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);


  


  const PAGE_LIMITS = {
    min: 50,
    max: 500,
    step: 50
  };

  const QUANTITY_LIMITS = {
    min: 1,
    max: 999
  };

  const fonts = [
    { name: 'Serif', value: 'font-serif' },
    { name: 'Sans Serif', value: 'font-sans' },
    { name: 'Monospace', value: 'font-mono' },
    { name: 'Cursive', value: 'font-serif italic' },
    { name: 'Bold Sans', value: 'font-sans font-bold' }
  ];

  const positions = [
    { name: 'Top Left', value: 'top-left' },
    { name: 'Top Center', value: 'top-center' },
    { name: 'Top Right', value: 'top-right' },
    { name: 'Center Left', value: 'center-left' },
    { name: 'Center', value: 'center-center' },
    { name: 'Center Right', value: 'center-right' },
    { name: 'Bottom Left', value: 'bottom-left' },
    { name: 'Bottom Center', value: 'bottom-center' },
    { name: 'Bottom Right', value: 'bottom-right' }
  ];
  const IMAGE_SHAPES = [

    { name: 'Rectangle', value: 'rectangle' },

    { name: 'Circle', value: 'circle' },

    { name: 'Square', value: 'square' },

    { name: 'Oval', value: 'oval' }

  ];



  const IMAGE_SIZES = [

    { name: 'Small (25%)', value: 'small' },

    { name: 'Medium (50%)', value: 'medium' },

    { name: 'Large (75%)', value: 'large' },

    { name: 'Full Cover', value: 'full' }

  ]
  // Generate options for page numbers
  const pageOptions = [];
  for (let i = PAGE_LIMITS.min; i <= PAGE_LIMITS.max; i += PAGE_LIMITS.step) {
    pageOptions.push(i);
  }

  const layoutOptions = [
    { value: 'lined', label: 'Lined' },
    { value: 'dot-grid', label: 'Dot Grid' },
    { value: 'blank', label: 'Blank' }
  ];

  const layoutImages = {
    lined: Lite,
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

  const [hoveredOption, setHoveredOption] = useState(null);

  const handleChange = (field, value) => {
    setCustomization((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const QR_POSITIONS = [
    { name: 'Top Left', value: 'top-left', label: 'Top Left' },
    { name: 'Top Right', value: 'top-right', label: 'Top Right' },
    { name: 'Bottom Left', value: 'bottom-left', label: 'Bottom Left' },
    { name: 'Bottom Right', value: 'bottom-right', label: 'Bottom Right' },
    { name: 'Center', value: 'center', label: 'Center' }
  ];
  const QR_SIZES = [
    { name: 'Small', value: 'small', label: 'Small' },
    { name: 'Medium', value: 'medium', label: 'Medium' },
    { name: 'Large', value: 'large', label: 'Large' }
  ];
  
  // Update the getQRCodePosition function to handle percentage-based positioning
  const getQRCodePosition = (position) => {
    const positions = {
      'top-left': { top: '5%', left: '5%' },
      'top-right': { top: '5%', right: '5%' },
      'bottom-left': { bottom: '5%', left: '5%' },
      'bottom-right': { bottom: '5%', right: '5%' },
      'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    };
    return positions[position] || positions['bottom-right'];
  };
  
  // Update the getQRCodeSize function to use percentages
  const getQRCodeSize = (size) => {
    const sizes = {
      'small': { width: '15%', height: 'auto' },
      'medium': { width: '25%', height: 'auto' },
      'large': { width: '35%', height: 'auto' }
    };
    return sizes[size] || sizes['medium'];
  };


const [urlError, setUrlError] = useState('');

// Function to validate URL
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};


// Function to extract favicon from a URL
const extractFavicon = async (url) => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    return faviconUrl;
  } catch (error) {
    console.error('Error extracting favicon:', error);
    return null;
  }
};

// Function to generate QR code
const generateQRCode = async (url) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

// Add to your existing component
const handleQRCodeUrlChange = async (e) => {
  const url = e.target.value;
  updateCoverDesign('qrCodeUrl', url);

  // Clear previous QR code and error if URL is empty
  if (!url) {
    setUrlError('');
    updateCoverDesign('qrCode', '');
    updateCoverDesign('websiteIcon', '');
    return;
  }

  // Validate URL
  if (!isValidUrl(url)) {
    setUrlError('Please enter a valid URL (e.g., https://www.example.com)');
    updateCoverDesign('qrCode', '');
    updateCoverDesign('websiteIcon', '');
    return;
  }

  // Clear error if URL is valid
  setUrlError('');

  try {
    // Generate QR code
    const qrCodeDataUrl = await generateQRCode(url);
    if (qrCodeDataUrl) {
      updateCoverDesign('qrCode', qrCodeDataUrl);
    }

    // Extract website icon
    const faviconUrl = await extractFavicon(url);
    if (faviconUrl) {
      updateCoverDesign('websiteIcon', faviconUrl);
    }
  } catch (error) {
    console.error('Error updating QR code:', error);
    setUrlError('Error generating QR code. Please try again.');
  }
};



// Rest of the existing constants (fonts, positions, PAGE_LIMITS, etc.)

// ... (keep existing code)



const calculatePrice = () => {

  // Base price calculation

  const basePrice = customization.pages.selected * PRICING.basePricePerPage;

  

  // Add binding price

  const bindingPrice = PRICING.bindingPrices[customization.bindingType];

  

  // Paper type multiplier

  const paperMultiplier = PRICING.paperPrices[customization.paperType];

  

  // Calculate subtotal per notebook

  const pricePerNotebook = (basePrice + bindingPrice) * paperMultiplier;

  

  // Calculate bulk discount

  const applicableDiscount = PRICING.bulkDiscounts

    .reverse()

    .find(discount => customization.quantity >= discount.quantity);

  

  const discountMultiplier = 1 - (applicableDiscount?.discount || 0);

  

  // Calculate total price

  const totalPrice = pricePerNotebook * customization.quantity * discountMultiplier;

  

  return {

    pricePerNotebook: pricePerNotebook.toFixed(2),

    totalPrice: totalPrice.toFixed(2),

    discount: applicableDiscount ? (applicableDiscount.discount * 100).toFixed(0) : 0

  };

};


const handleImageShapeChange = (shape) => {

    updateCoverDesign('imageShape', shape);

  };



  const handleImageSizeChange = (size) => {

    updateCoverDesign('imageSize', size);

  };


  const prices = calculatePrice();

  const updateCoverDesign = (field, value) => {
    setCustomization(prev => ({
      ...prev,
      coverDesign: {
        ...prev.coverDesign,
        [field]: value
      }
    }));
  };


  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       updateCoverDesign('image', reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  
  const handlePageChange = (value) => {
    const pages = parseInt(value);
    if (!isNaN(pages) && pages >= PAGE_LIMITS.min && pages <= PAGE_LIMITS.max) {
      handleChange('pages', { ...customization.pages, selected: pages });
    }
  };


  const [priceState, setPriceState] = useState('stable');
  const [lastPrice, setLastPrice] = useState(null);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
  //   if (!isNaN(value)) {
  //     if (value < QUANTITY_LIMITS.min) {
  //       handleChange('quantity', QUANTITY_LIMITS.min);
  //     } else if (value > QUANTITY_LIMITS.max) {
  //       handleChange('quantity', QUANTITY_LIMITS.max);
  //     } else {
  //       handleChange('quantity', value);
  //     }
  //   }
  // };
  if (!isNaN(value)) {
    // Get current price before quantity change
    const oldPrice = calculatePrice().totalPrice;
    
    // Update quantity
    if (value < QUANTITY_LIMITS.min) {
      handleChange('quantity', QUANTITY_LIMITS.min);
    } else if (value > QUANTITY_LIMITS.max) {
      handleChange('quantity', QUANTITY_LIMITS.max);
    } else {
      handleChange('quantity', value);
    }

    // Calculate new price after quantity change
    const newPrice = calculatePrice().totalPrice;

    // Compare prices and set state
    if (lastPrice !== null) {
      if (newPrice > oldPrice) {
        setPriceState('increase');
      } else if (newPrice < oldPrice) {
        setPriceState('decrease');
      }
      
      // Reset to stable after animation
      setTimeout(() => {
        setPriceState('stable');
      }, 500);
    }
    
    setLastPrice(newPrice);
  }
};

const handleIncrement = () => {
  const newQuantity = customization.quantity + 1;
  if (newQuantity <= QUANTITY_LIMITS.max) {
    const oldPrice = calculatePrice().totalPrice;
    handleChange('quantity', newQuantity);
    const newPrice = calculatePrice().totalPrice;
    
    setPriceState('increase');
    setTimeout(() => setPriceState('stable'), 500);
    setLastPrice(newPrice);
  }
};

const handleDecrement = () => {
  const newQuantity = customization.quantity - 1;
  if (newQuantity >= QUANTITY_LIMITS.min) {
    const oldPrice = calculatePrice().totalPrice;
    handleChange('quantity', newQuantity);
    const newPrice = calculatePrice().totalPrice;
    
    setPriceState('decrease');
    setTimeout(() => setPriceState('stable'), 500);
    setLastPrice(newPrice);
  }
};

  const getImageStyle = () => {

    const { imageShape, imageSize } = customization.coverDesign;
    const sizeMap = {
      small: '25%',
      medium: '50%',
      large: '75%',
      full: '100%'
    }

    const shapeStyles = {
        rectangle: { borderRadius: '0' },
  
        circle: { borderRadius: '50%' },
  
        square: { borderRadius: '0', aspectRatio: '1' },
  
        oval: { borderRadius: '50%', aspectRatio: '1.5' }
  
      };
      return {

        width: sizeMap[imageSize],
  
        ...shapeStyles[imageShape]
  
      }
}



//   const handleOrder = () => {
//     alert(`Order placed for ${customization.quantity} customized ${productType} notebook(s) with ${customization.pages.selected} pages each!`);
//   };
const handleOrder = () => {
  if (!acceptCustomization) {
    setShowError(true);
    document.querySelector('.acceptance-checkbox')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
    return;
  }

  const previewElement = document.querySelector('.notebook-preview');
  let previewImage = null;

  // Use html2canvas to capture the preview (you'll need to install this package)
  if (previewElement) {
    html2canvas(previewElement).then(canvas => {
      previewImage = canvas.toDataURL('image/png');


  const prices = calculatePrice();
  const orderDetails = {
    customization,
    pricing: {
      pricePerNotebook: Number(prices.pricePerNotebook),
      totalPrice: Number(prices.totalPrice),
      discount: Number(prices.discount),
      basePrice: Number(customization.pages.selected * PRICING.basePricePerPage),
      bindingPrice: Number(PRICING.bindingPrices[customization.bindingType]),
      paperMultiplier: Number(PRICING.paperPrices[customization.paperType])
    },
    product: productType,
    isCustomized: true,
    accepted: true
  };

 

    // Save order details to localStorage or state management

    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));

    // Navigate to shipping/gift card page

    navigate('/checkout/shipping');
})

  };
}

  return (
    <div className="customizer-container">
      <h1>Customize Your {productType} Notebook</h1>

      <div className="customizer-grid">
        <div className="options-panel">
          {/* Existing cover design options */}
          <div className="input-group">
            <label>Cover Text:</label>
            <input
              type="text"
              value={customization.coverDesign.text}
              onChange={(e) => updateCoverDesign('text', e.target.value)}
              placeholder="Enter your cover text"
            />
          </div>

          <div className="input-group">
            <label>Font Style:</label>
            <select 
              value={customization.coverDesign.font}
              onChange={(e) => updateCoverDesign('font', e.target.value)}
            >
              {fonts.map((font) => (
                <option key={font.value} value={font.value}>{font.name}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Text Color:</label>
            <input
              type="color"
              value={customization.coverDesign.textColor}
              onChange={(e) => updateCoverDesign('textColor', e.target.value)}
              className="color-picker"
            />
          </div>

          <div className="input-group">
            <label>Text Position:</label>
            <select
              value={customization.coverDesign.textPosition}
              onChange={(e) => updateCoverDesign('textPosition', e.target.value)}
            >
              {positions.map((pos) => (
                <option key={pos.value} value={pos.value}>{pos.name}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Upload Cover Image:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>
          
          {customization.coverDesign.image && (

<>

  <div className="input-group">

    <label>Image Shape:</label>

    <div className="shape-options">

      {IMAGE_SHAPES.map(shape => (

        <button

          key={shape.value}

          className={`shape-btn ${customization.coverDesign.imageShape === shape.value ? 'active' : ''}`}

          onClick={() => updateCoverDesign('imageShape', shape.value)}

        >

          {shape.name}

        </button>

      ))}

    </div>

  </div>
  <div className="input-group">

<label>Image Size:</label>

<div className="size-options">

  {IMAGE_SIZES.map(size => (

    <button

      key={size.value}

      className={`size-btn ${customization.coverDesign.imageSize === size.value ? 'active' : ''}`}

      onClick={() => updateCoverDesign('imageSize', size.value)}

    >

      {size.name}

    </button>

  ))}

</div>

</div>

</>

)}


<div className="input-group">
  <label>Website URL for QR Code:</label>
  <input
    type="url"
    value={customization.coverDesign.qrCodeUrl}
    onChange={handleQRCodeUrlChange}
    placeholder="Enter website URL (e.g., https://www.example.com)"
    className={`url-input ${urlError ? 'error' : ''}`}
  />
  {urlError && <span className="error-message">{urlError}</span>}
</div>

{/* {customization.coverDesign.qrCode && (
  <> */}
    <div className="input-group">
            <label>QR Code Position:</label>
            <select
              value={customization.coverDesign.qrCodePosition}
              onChange={(e) => updateCoverDesign('qrCodePosition', e.target.value)}
            >
              {QR_POSITIONS.map((pos) => (
                <option key={pos.value} value={pos.value}>
                  {pos.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>QR Code Size:</label>
            <select
              value={customization.coverDesign.qrCodeSize}
              onChange={(e) => updateCoverDesign('qrCodeSize', e.target.value)}
            >
              {QR_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>
  {/* </>
)} */}
<div className="input-group">
          <label>QR Code Background Color:</label>
          <input
            type="color"
            value={customization.coverDesign.qrCodeBackground}
            onChange={(e) => updateCoverDesign('qrCodeBackground', e.target.value)}
            className="color-picker"
          />
        </div>

        <div className="input-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showFavicon}
              onChange={(e) => setShowFavicon(e.target.checked)}
            />
            Show Website Icon with QR Code
          </label>
        </div>



          {/* New page count and quantity controls */}
          <div className="input-group">
            <label>Number of Pages:</label>
            <select
              value={customization.pages.selected}
              onChange={(e) => handlePageChange(e.target.value)}
              className="page-select"
            >
              {pageOptions.map((pageCount) => (
                <option key={pageCount} value={pageCount}>
                  {pageCount} pages
                </option>
              ))}
            </select>
            <span className="help-text">
              {PAGE_LIMITS.min} to {PAGE_LIMITS.max} pages, in steps of {PAGE_LIMITS.step}
            </span>
          </div>

          {/* <div className="input-group">
            <label>Quantity:</label>
            <div className="quantity-control">
              <button 
                onClick={() => handleQuantityChange({ target: { value: customization.quantity - 1 }})}
                disabled={customization.quantity <= QUANTITY_LIMITS.min}
                className="quantity-button"
              >
                -
              </button>
              <input
                type="number"
                min={QUANTITY_LIMITS.min}
                max={QUANTITY_LIMITS.max}
                value={customization.quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
              <button 
                onClick={() => handleQuantityChange({ target: { value: customization.quantity + 1 }})}
                disabled={customization.quantity >= QUANTITY_LIMITS.max}
                className="quantity-button"
              >
                +
              </button>
              <span className={`quantity-price ${priceState}`}>
  ${calculatePrice().totalPrice} each
</span>
            </div>
          </div> */}

<div className="quantity-control">
<label>Quantity:</label>
  <button 
    onClick={handleDecrement}
    disabled={customization.quantity <= QUANTITY_LIMITS.min}
    className="quantity-button"
  >
    -
  </button>
  <input
    type="number"
    min={QUANTITY_LIMITS.min}
    max={QUANTITY_LIMITS.max}
    value={customization.quantity}
    onChange={handleQuantityChange}
    className="quantity-input"
  />
  <button 
    onClick={handleIncrement}
    disabled={customization.quantity >= QUANTITY_LIMITS.max}
    className="quantity-button"
  >
    +
  </button>
  <span className={`quantity-price ${priceState}`}>
    ${calculatePrice().totalPrice} each
  </span>
</div>

          {/* Existing notebook options */}
          {/* <div className="input-group">
            <label>Page Layout:</label>
            <select 
              value={customization.pageLayout} 
              onChange={(e) => handleChange('pageLayout', e.target.value)}
            >
              <option value="lined">Lined</option>
              <option value="dot-grid">Dot Grid</option>
              <option value="blank">Blank</option>
            </select>
          </div>

          <div className="input-group">
            <label>Paper Type:</label>
            <select 
              value={customization.paperType}
              onChange={(e) => handleChange('paperType', e.target.value)}
            >
              <option value="Erasable">Erasable</option>
              <option value="Recycled">Recycled</option>
            </select>
          </div>

          <div className="input-group">
            <label>Binding Type:</label>
            <select 
              value={customization.bindingType}
              onChange={(e) => handleChange('bindingType', e.target.value)}
            >
              <option value="spiral">Spiral Bound</option>
              <option value="glue">Glue Bound</option>
            </select>
          </div> */}
        <div className="input-group">
      <label>Page Layout:</label>
      <CustomSelect
        options={layoutOptions}
        value={customization.pageLayout}
        onChange={(value) => handleChange('pageLayout', value)}
        images={layoutImages}
      />
    </div>

    <div className="input-group">
      <label>Paper Type:</label>
      <CustomSelect
        options={paperTypeOptions}
        value={customization.paperType}
        onChange={(value) => handleChange('paperType', value)}
        images={paperImages}
      />
    </div>

    <div className="input-group">
      <label>Binding Type:</label>
      <CustomSelect
        options={bindingOptions}
        value={customization.bindingType}
        onChange={(value) => handleChange('bindingType', value)}
        images={bindingImages}
      />
    </div>
       
        </div>

        <div className="preview-panel">
          <h2>Preview</h2>
          <div 
            className="notebook-preview"
            style={{
            width: `${NOTEBOOK_DIMENSIONS.width}px`,
            height: `${NOTEBOOK_DIMENSIONS.height}px`,
            position: 'relative',
            border: '1px solid #ccc',
            overflow: 'hidden'
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {customization.coverDesign.image && (
            <img 
              ref={imageRef}
              src={customization.coverDesign.image}
              alt="Cover"
              className="cover-image"
              style={{
                position: 'absolute',
                left: `${imagePosition.x}px`,
                top: `${imagePosition.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
            />
          )}
          
          {customization.coverDesign.qrCode && (
  <div 
    className="qr-code-container"
    style={{
      position: 'absolute',
      ...getQRCodePosition(customization.coverDesign.qrCodePosition),
      backgroundColor: customization.coverDesign.qrCodeBackground,
      padding: '10px',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    }}
  >
    {showFavicon && customization.coverDesign.websiteIcon && (
      <img
        src={customization.coverDesign.websiteIcon}
        alt="Website Icon"
        className="website-icon"
        style={{
          width: '24px',
          height: '24px',
          marginBottom: '5px'
        }}
      />
    )}
    <img
      src={customization.coverDesign.qrCode}
      alt="QR Code"
      className="qr-code"
      style={{
        ...getQRCodeSize(customization.coverDesign.qrCodeSize),
        maxWidth: '100%',
        objectFit: 'contain'
      }}
    />
  </div>
)}
          </div>


        
          
          {/* Price calculation display */}
{/* 
          <div className="price-summary">

            <h3>Price Summary</h3>

            <div className="price-details">

              <p>Price per notebook: ${prices.pricePerNotebook}</p>

              <p>Quantity: {customization.quantity}</p>

              {prices.discount > 0 && (

                <p className="discount">Bulk Discount: {prices.discount}% off</p>

              )}

              <p className="total-price">Total Price: ${prices.totalPrice}</p>

            </div>

            <div className="bulk-discount-info">

              <h4>Available Bulk Discounts:</h4>

              <ul>

                {PRICING.bulkDiscounts.map(discount => (

                  <li key={discount.quantity}>

                    {discount.quantity}+ notebooks: {(discount.discount * 100)}% off

                  </li>

                ))}

              </ul>

            </div>
</div>
          <div className="selected-options">
            <h3>Selected Options</h3>
            <p>Font: {fonts.find(f => f.value === customization.coverDesign.font)?.name}</p>
            <p>Position: {positions.find(p => p.value === customization.coverDesign.textPosition)?.name}</p>
            <p>Pages: {customization.pages.selected}</p>
            <p>Quantity: {customization.quantity}</p>
            <p>Layout: {customization.pageLayout}</p>
            <p>Paper: {customization.paperType}</p>
            <p>Binding: {customization.bindingType}</p>
          </div> */}
        </div>
      </div>


      <div className="acceptance-checkbox">
  <label className={`checkbox-label ${showError ? 'error' : ''}`}>
    <input
      type="checkbox"
      checked={acceptCustomization}
      onChange={(e) => {
        setAcceptCustomization(e.target.checked);
        if (e.target.checked) {
          setShowError(false);
        }
      }}
    />
    <span>I confirm that all customization options are correct and final</span>
  </label>
  {showError && (
    <div className="error-message">
      Please confirm your customization choices before proceeding
    </div>
  )}
</div>


      <button onClick={handleOrder} className="order-button">

Order Now - ${calculatePrice().totalPrice}
</button>
    </div>
  );
};

export default NotebookCustomizer;