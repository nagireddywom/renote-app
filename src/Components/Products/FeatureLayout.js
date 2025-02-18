import React from 'react';
import { 
  Layers, 
  Camera, 
  Bot, 
  FileText, 
  Brain,
  Cloud,
  Lock
} from 'lucide-react';
import './styles/FeatureLayout.css';
import image1 from '../../assets/image1.jpg';


const FeatureLayout = () => {
  const features = [
    {
      icon: <Layers className="renote-icon" />,
      title: "Smart Templates",
      description: "Enhance productivity with ready-to-use templates for every task"
    },
    {
      icon: <Camera className="renote-icon" />,
      title: "Instant Capture",
      description: "Auto captures your notes in an instant for seamless digitization in the App"
    },
    {
      icon: <Bot className="renote-icon" />,
      title: "AI Chatbot",
      description: "Your smart assistant to summarize, analyze, and elevate your notetaking effortlessly!"
    },
    {
      icon: <FileText className="renote-icon" />,
      title: "OCR Technology",
      description: "Effortlessly converts your handwritten notes into digital text with exceptional accuracy!"
    },
    {
      icon: <Brain className="renote-icon" />,
      title: "Smart Organization",
      description: "AI-powered organization keeps your notes structured and easily accessible"
    },
    {
      icon: <Cloud className="renote-icon" />,
      title: "Cloud Sync",
      description: "Seamlessly sync your notes across all devices with secure cloud storage"
    }
  ];

  return (
    <div className="renote-app-layout">
      <div className="renote-main-wrapper">
        {/* Preview Section */}
        <div className="renote-preview-section">
          <div className="renote-image-container">
            {image1 ? (
              <img
                src={image1}
                alt="ReNoteAI App Preview"
                className="renote-app-preview"
              />
            ) : (
              <div className="renote-placeholder">
                <span>Image placeholder</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="renote-content-section">
          <div className="renote-content-container">
            <h2 className="renote-app-title">
              Introducing ReNoteAI App
            </h2>
            
            <div className="renote-app-description">
              <p>
                Your ultimate smart note-taking app for enhanced productivity. Experience 
                AI Chatbot assistance, Smart Templates, and seamless handwritten-to-digital 
                conversion in one powerful workspace.
              </p>
              <p>
                Effortlessly capture, organize, and access your notes with advanced scanning 
                and secure multi-cloud support. Unlock convenience and control over your 
                note-taking experience today!
              </p>
            </div>

            <div className="renote-features-section">
              <h3 className="renote-section-title">
                Key Features
              </h3>
              <div className="renote-features-grid">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="renote-feature-card"
                  >
                    <div className="renote-icon-wrapper">
                      {feature.icon}
                    </div>
                    <div className="renote-feature-content">
                      <h4 className="renote-feature-title">{feature.title}</h4>
                      <p className="renote-feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Section */}
              <div className="renote-security-section">
                <div className="renote-security-wrapper">
                  <div className="renote-security-icon">
                    <Lock className="renote-icon" />
                  </div>
                  <div className="renote-feature-content">
                    <h4 className="renote-feature-title">Enterprise-Grade Security</h4>
                    <p className="renote-feature-description">
                      Your notes are protected with end-to-end encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureLayout;