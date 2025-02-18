import React from 'react';

const Button = ({ children, type = 'button', className = '', onClick }) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;