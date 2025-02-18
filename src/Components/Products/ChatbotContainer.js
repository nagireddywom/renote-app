// import React from 'react';
// import './styles/chatbot.css';
// // import chatbot from '../video/chatbot.mp4';
// import chatbot from '../../video/chatbot.mp4';

// const VideoLayout = () => {
//     return (
//       <div className="chatbot-container">
//         <div className="video-section-chatbot">
//           <video  
//           autoPlay
//            muted
//            loop
//           playsInline
//           disablePictureInPicture
//         className="video-player-chat">
//             <source src={chatbot} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
        
//         <div className="content-section">
//           <h2>Content Title</h2>
//           <p>
//             Your content goes here. 
//           </p>
//           {/* Add more content as needed */}
//         </div>
//       </div>
//     );
//   };

//   export default VideoLayout;


import React from 'react';
import { Brain, FileText, FolderSearch, Sparkles, BookOpen, Zap } from 'lucide-react';
import './styles/chatbot.css';
import chatbot from '../../video/chatbot.mp4';

const VideoLayout = () => {
  const features = [
    {
      icon: <Brain className="feature-icon" />,
      title: "Smart AI Assistant",
      description: "Your intelligent companion for summarizing and analyzing notes effortlessly"
    },
    {
      icon: <FileText className="feature-icon" />,
      title: "OCR Technology",
      description: "Convert handwritten notes to digital text with exceptional accuracy"
    },
    {
      icon: <FolderSearch className="feature-icon" />,
      title: "Smart Organization",
      description: "AI-powered system keeps your notes structured and easily accessible"
    }
  ];

  return (
    <div className="chatbot-container">
      <div className="video-section-chatbot">
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="video-player-chat"
        >
          <source src={chatbot} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="content-section">
        <div className="header-section">
          <Sparkles className="header-icon" />
          <h2>AI-Powered Note Assistant</h2>
          <p className="header-subtitle">
            Elevate your note-taking experience with intelligent features
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="icon-wrapper">
                {feature.icon}
                <div className="icon-bg"></div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="highlight-section">
          <div className="highlight-item">
            <BookOpen className="highlight-icon" />
            <span>Smart Analysis</span>
          </div>
          <div className="divider"></div>
          <div className="highlight-item">
            <Zap className="highlight-icon" />
            <span>Instant Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLayout;