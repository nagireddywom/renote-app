import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import '../../Styles/CustomSelect.css';

const CustomSelect = ({ options, value, onChange, images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);

  return (
    <div className="custom-select">
      <div 
        className="selected-option"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        <ChevronDown className={`arrow ${isOpen ? 'open' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="options-list">
          {options.map((option) => (
            <div
              key={option.value}
              className={`option ${value === option.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHoveredOption(option.value)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {option.label}
              {hoveredOption === option.value && (
                <div className="option-preview">
                  <img src={images[option.value]} alt={option.label} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect ;