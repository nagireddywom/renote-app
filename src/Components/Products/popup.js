import React, { useState, useEffect } from "react";
import "../../Styles/popup.css";
 // Add an image inside src folder

const DiscountPopup = () => {
  const [showPopup, setShowPopup] = useState(true); // Initially visible

  return (
    showPopup && (
      <div className="popup-overlay">
        <div className="popup">
          <img src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRpc2NvdW50fGVufDB8fDB8fHww" alt="Discount Offer" className="popup-image" />
          <h2>🎉 Special Discount! 🎉</h2>
          <p>Get 20% off on your next purchase!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      </div>
    )
  );
};

export default DiscountPopup;
