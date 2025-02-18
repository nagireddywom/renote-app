// import { Link } from 'react-router-dom';
import Air from '../../assets/Air.png';
import Classic from '../../assets/Classic.png';
// import mainVideo from './video/main-video.mp4';
// import secondVideo from './video/second-video.mp4';
// import nature from '../../assets//nature.jpeg';
import Eco from   '../../assets/Eco.png';
import Lite from   '../../assets/Lite.png';




// import React from 'react';
// // import { Link } from 'react-router-dom';
// import '../../Styles/productbook.css';

// const Products = () => {
//   const products = [
//     { name: 'AIR', image: Air, path: '/product/air' },     // Changed path to /product/
//     { name: 'CLASSIC', image: Classic, path: '/product/classic' },
//     { name: 'LITE', image: Lite, path: '/product/lite' },
//     { name: 'ECO', image: Eco, path: '/product/eco' }
//   ];

//   return (
//     <div className="products-grid">
//     {products.map((product, index) => (
//       <Link 
//         key={index}
//         to={product.path} 
//         className="product-card"
//       >
//         <div className="image-container">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="product-image-2"
//           />
//           <div className="overlay"></div>
//         </div>
//         <div className="product-info">
//           <h3 className="product-name">{product.name}</h3>
//         </div>
//       </Link>
//     ))}
//   </div>
// );
// };

// export default Products;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import '../../Styles/productbook.css';

const Products = () => {
  const navigate = useNavigate();
  
  const products = [
    { name: 'AIR', image: Air, path: '/product/air' },
    { name: 'CLASSIC', image: Classic, path: '/product/classic' },
    { name: 'LITE', image: Lite, path: '/product/lite' },
    { name: 'ECO', image: Eco, path: '/product/eco' }
  ];

  const handleBuyClick = (e, path) => {
    e.preventDefault(); // Prevent the Link click event
    navigate(path);
  };

  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <Link 
          key={index}
          to={product.path} 
          className="product-card"
        >
          <div className="image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-image-2"
            />
            <div className="overlay"></div>
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <button 
              className="buy-now-button"
              onClick={(e) => handleBuyClick(e, product.path)}
            >
              <ShoppingBag className="button-icon" size={18} />
              Buy Now
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
