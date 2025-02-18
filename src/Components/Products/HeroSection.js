import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import './styles/herosection.css';

const HeroSection = ({ image }) => {
  return (
    <section className="hero-section">
      <div className="gradient-background" />
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Smart Notes,
            <span className="highlighted-text">Natural Choice</span>
          </h1>
          
          <p className="hero-description">
            Explore with ReNoteAI the perfect blend of Handwritten Style and 
            Digital Convenience to simplify your life. Transform your note-taking 
            experience with AI-powered features.
          </p>

          <div className="cta-buttons">
            <button className="cta-start-writing">
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="cta-watch-demo">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      
        <div className="hero-image">
          <div className="gradient-circle" />
          <div className="image-container-f2">
            {image ? (
              <img 
                src={image} 
                alt="ReNoteAI Preview" 
                className="image-place-holder1"
              />
            ) : (
              <div className="image-placeholder">
                <span>Image placeholder</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;