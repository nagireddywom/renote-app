import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import './styles/collectionheader.css';

const CollectionHeader = () => {
  return (
    <div className="collection-container">
      <div className="collection-line">
        <div className="line-left"></div>
        <div className="sparkle-icon left">
          <Sparkles size={20} />
        </div>
        <div className="title-container">
          <BookOpen className="book-icon" size={24} />
          <h2 className="collection-title">Our Premium Collection</h2>
        </div>
        <div className="sparkle-icon right">
          <Sparkles size={20} />
        </div>
        <div className="line-right"></div>
      </div>
      <p className="collection-subtitle">Discover our innovative range of smart notebooks</p>
    </div>
  );
};

export default CollectionHeader;