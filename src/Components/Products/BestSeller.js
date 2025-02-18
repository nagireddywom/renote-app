import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './styles/bestseller.css';
import Air from '../../assets/Air.png';
import Classic from '../../assets/Classic.png';
// import mainVideo from './video/main-video.mp4';
// import secondVideo from './video/second-video.mp4';
// import nature from '../../assets//nature.jpeg';
import Eco from   '../../assets/Eco.png';
import Lite from   '../../assets/Lite.png';

const BestSellers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bestSellers = [
    {
      id: 1,
      name: 'ReNote AIR',
      image: Air,
      rating: 4.8,
      reviews: 1250,
      price: '₹999',
      tag: 'Most Popular',
      path: '/product/air'
    },
    {
      id: 2,
      name: 'ReNote CLASSIC',
      image: Classic,
      rating: 4.7,
      reviews: 980,
      price: '₹999',
      tag: 'Best Value',
      path: '/product/classic'
    },
    {
      id: 3,
      name: 'ReNote LITE',
      image: Lite,
      rating: 4.6,
      reviews: 750,
      price: '₹499',
      tag: 'Budget Pick',
      path: '/product/lite'
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bestSellers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bestSellers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bestSellers.length) % bestSellers.length);
  };

  return (
    <div className="bestsellers-container">
      <div className="bestsellers-header">
        <Award className="header-icon" />
        <h2>Best Sellers</h2>
      </div>

      <div className="bestsellers-slider">
        <button className="slider-button prev" onClick={prevSlide}>
          <ChevronLeft />
        </button>

        <div className="slides-container">
          {bestSellers.map((product, index) => (
            <Link
              to={product.path}
              key={product.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - currentSlide) * 100}%)`,
                opacity: index === currentSlide ? 1 : 0
              }}
            >
              <div className="product-tag">{product.tag}</div>
              <div className="product-image-wrapper">
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <div className="rating">
                  <Star className="star-icon" />
                  <span>{product.rating}</span>
                  <div className="reviews">
                    <Users className="users-icon" />
                    <span>{product.reviews} reviews</span>
                  </div>
                </div>
                {/* <div className="price">{product.price}</div> */}
              </div>
            </Link>
          ))}
        </div>

        <button className="slider-button next" onClick={nextSlide}>
          <ChevronRight />
        </button>

        <div className="slide-dots">
          {bestSellers.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;