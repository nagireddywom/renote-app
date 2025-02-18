import React from 'react';
import './styles/containerLayout.css';


const ContainerLayout = () => {
  return (
//     <div className="main-container-layout">
//       <div className="square-container">
//         <img 
//           src="https://renote.ai/static/images/Book.jpg" 
//           alt="Square container image" 
//           className="square-image"
//         />
//       </div>
//       <div className="rectangle-container">
//         {/* Content for rectangle container */}
//       </div>
//     </div>
//   );
// };

// export default ContainerLayout;

<div className="main-container-layout">
      <div className="content-wrapper">
        <div className="rectangle-container">
          <div className="content-layout">
            <div className="text-content">
              <h2 className="title">Why Choose Our Smart Reusable Notebook ?</h2>
              <div className="features">
                <div className="feature-item">
                  <span className="feature-icon">🌿</span>
                  <p>Our smart reusable notebooks address environmental impact and productivity concerns.</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💪</span>
                  <p>They are made with a special non-tearable and waterproof material.</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">♻️</span>
                  <p>The eco-friendly paper used is recycled and FSC certified.</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔄</span>
                  <p>Each sheet of paper is reusable up to 100 times.</p>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📝</span>
                  <p>Smart templates like to-do lists and meeting schedules enhance workflow and productivity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
  <div className="square-container">
    <img 
      src="https://renote.ai/static/images/Book.jpg" 
      alt="Square container image" 
      className="square-image"
    />
  </div>
</div>
</div>

)
};

export default ContainerLayout;