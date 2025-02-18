


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate} from 'react-router-dom';
import './product.css';
import NotebookCustomizer from './Notebook';
 

const NotebookApp = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Products data with pre-configured settings for the customizer
  const products = [
    {
      id: 1,
      title: "Classic Notebook",
      description: "Professional notebook with premium paper quality",
      image: "/api/placeholder/400/400",
      price: 24.99,
      features: [
        "Spiral binding",
        "Premium paper",
        "Lined pages",
        "Back pocket"
      ],
      defaultConfig: {
        coverDesign: {
          logo: null,
          text: '',
          photo: null,
        },
        pageLayout: 'lined',
        paperType: 'premium',
        bindingType: 'spiral',
        addons: ['pocket']
      }
    },
    {
      id: 2,
      title: "Executive Notebook",
      description: "Luxury leather-bound notebook for professionals",
      image: "/api/placeholder/400/400",
      price: 39.99,
      features: [
        "Leather binding",
        "Gold-edged pages",
        "Dot grid layout",
        "Ribbon bookmark"
      ],
      defaultConfig: {
        coverDesign: {
          logo: null,
          text: '',
          photo: null,
        },
        pageLayout: 'dotGrid',
        paperType: 'premium',
        bindingType: 'leather',
        addons: ['bookmark']
      }
    },
    {
      id: 3,
      title: "Student Notebook",
      description: "Durable notebook perfect for everyday use",
      image: "/api/placeholder/400/400",
      price: 19.99,
      features: [
        "Hardcover binding",
        "Recycled paper",
        "Squared pages",
        "Elastic closure"
      ],
      defaultConfig: {
        coverDesign: {
          logo: null,
          text: '',
          photo: null,
        },
        pageLayout: 'squared',
        paperType: 'recycled',
        bindingType: 'hardcover',
        addons: ['elastic']
      }
    }
  ];

  // If a product is selected, show the customizer, otherwise show the showcase
//   if (selectedProduct) {
//     return (
//       <div>
//         <button 
//           className="back-button"
//           onClick={() => setSelectedProduct(null)}
//         >
//           ← Back to Products
//         </button>
//         <NotebookCustomizer 
//           initialDesign={selectedProduct.defaultConfig}
//           basePrice={selectedProduct.price}
//         />
//       </div>
//     );
//   }
const navigate = useNavigate();

if (selectedProduct) {
  return (
    <div>
      <button
        className="back-button"
        onClick={() => {
          setSelectedProduct(null); // Keep this to clear selected product
          navigate('/product'); // Redirect to your products page
        }}
      >
        ← Back to Products
      </button>
       <NotebookCustomizer
        initialDesign={selectedProduct.defaultConfig}
        basePrice={selectedProduct.price}
      />
     
    </div>
  );
}

  // Product Showcase
  return (
    <div className="product-showcase">
      <div className="products-container">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => setSelectedProduct(product)}
            role="button"
            tabIndex={0}
          >
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.title} 
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <ul className="product-features">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="product-price">
                Starting from ${product.price.toFixed(2)}
              </div>
              <button className="product-button">
                Customize Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotebookApp;