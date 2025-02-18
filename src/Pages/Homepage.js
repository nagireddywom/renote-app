import React, { useState,useEffect,useRef } from 'react';
import { BookOpen, Menu, X, Leaf, Cloud, ArrowRight, ChevronDown, Github, Twitter, Linkedin } from 'lucide-react';
import NotebookApp from '../product';
import ScrollingContainers from '../Components/Products/scrollbar';
import DiscountPopup from '../Components/Products/popup';
import Products from '../Components/Products/productbook';
import Footer from '../Components/common/Footer';
import VideoLayout from '../Components/Products/ChatbotContainer';

import '../Styles/Homepage.css'; 
// import "./popup.css";
import Air from '../assets/Air.png';
import Classic from '../assets/Classic.png';
import mainVideo from '../video/main-video.mp4';
import secondVideo from '../video/second-video.mp4';
import chatbot from '../video/chatbot.mp4';
import nature from '../assets/nature.jpeg';
import Eco from   '../assets/Eco.png';
import Lite from   '../assets/Lite.png';
import image1 from '../assets/image1.jpg';
import ContainerLayout from '../Components/Products/containerLayout';
import FeatureLayout from '../Components/Products/FeatureLayout';
import HeroSection from '../Components/Products/HeroSection';
import BestSellers from '../Components/Products/BestSeller';
import CollectionHeader from '../Components/Products/CollectionHeader';
// import book from   '../assets/b';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { type: "video", src: "https://videos.pexels.com/video-files/3252065/3252065-sd_640_360_25fps.mp4" }, // Replace with your video source
    { type: "video", src: "https://videos.pexels.com/video-files/4017224/4017224-sd_640_360_30fps.mp4" },       // Replace with your image sources
    { type: "video", src: "https://videos.pexels.com/video-files/30353174/13012978_360_640_30fps.mp4" },
];

useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
}, []);

const currentContent = slides[currentSlide];

const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        // No need to manually resize; CSS handles it!
      }
    };

    window.addEventListener('resize', handleResize); // Add resize listener
    handleResize(); // Initial resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up on unmount
    };
  }, []);

  const handleDownload = () => {
    // 1. Create a download link
    const link = document.createElement('a');
    link.href = 'path/to/your/file.pdf'; // Replace with the actual path to your file
    link.download = 'filename.pdf'; // Replace with the desired filename
    link.style.display = 'none'; // Hide the link

    // 2. Append the link to the DOM
    document.body.appendChild(link);

    // 3. Trigger the download
    link.click();

    // 4. Remove the link from the DOM
    document.body.removeChild(link);
  };

 

  return (
    <div className="main-container"> {/* Main container for full viewport height */}
     <div>
      <DiscountPopup />
    </div>

    <main className="main-content"> {/* Added main-content class */}
      {/* <div className="full-screen-container"> */}
      <div className="video-container">
      <video  ref={videoRef} className="responsive-video" autoPlay muted loop disablePictureInPicture>
        <source src={secondVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    



        
      {/* <header className="fixed-header">
      {/* ... (Your header code remains unchanged) ... */}
      
        

        //     {/* Desktop Navigation */}
        {/* //     <div className="nav-links">
        //       {['Home', 'Products', 'Features', 'About'].map((item) => ( */}
        {/* //         <a key={item} href="#" className="nav-item">
        //           {item}
        //         </a>
        //       ))}
        //       <button className="get-started-button">
        //         Get Started
        //       </button>
        //     </div> */}

        {/* //     Mobile Menu Button */}
        {/* //     <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        //       {isMenuOpen ? <X className="icon-x" /> : <Menu className="icon-menu" />}
        //     </button>
        //   </div>
        // </nav>  */}

    //     {/* Mobile Menu */}
    {/* //     {isMenuOpen && ( */}
          {/* <div className="mobile-menu">
           <div className="mobile-menu-content">
             {['Home', 'Products', 'Features', 'About'].map((item) => ( 
    //             <a key={item} href="#" className="mobile-menu-item">
    //               {item}
    //             </a>
    //           ))}
    //           <button className="get-started-button-mobile">
    //             Get Started
    //           </button>
    //         </div>
    //       </div>
    //     )}
    
    // </header> */}
        {/* <div className="inner-container-f1">
          {currentContent.type === "video" ? (
            <video
              src={currentContent.src}
              autoPlay
              muted
              loop
              playsInline
              className="slide-content"
            />
          ) : (
            <img src={currentContent.src} alt="slide" className="slide-content" />
          )}
        </div> */}
      </div>


      <div>
      <BestSellers />
      </div>
      <CollectionHeader />
      <div>
            <Products/>
           </div>
    
      
          <div>
            <HeroSection />
          </div>
              
            {/* </div>
          </div>
        </section> */}
       {/* <div className='gradient-below-container'>
       </div>  */}

       <div>
        <FeatureLayout/>
       </div>
        {/* <div className="two-container-layout">
        <div className="left-container">
        <img src={image1} alt="Description of your image"  /> {/* Add image */}
      {/* </div>

      <div className="right-container">
        <div className='right-container-top'>        
        <h2 className="text-lg font-semibold mb-2">Introducing ReNoteAI App</h2>
        <p>Introducing ReNoteAI App
        Your ultimate smart note-taking app for enhanced productivity. Experience AI Chatbot assistance, Smart Templates, and seamless handwritten-to-digital conversion in one powerful workspace. Effortlessly capture, organize, and access your notes with advanced scanning and secure multi-cloud support. Unlock convenience and control over your note-taking experience today!</p>
        <p>Here's some more example text.  You can break it up into paragraphs as needed.</p>
        <ul>
          <li>Smart Templates: Enhance productivity with ready-to-use templates for every task</li>
          <li>Auto captures your notes in an instant for seamless digitization in the App</li>
          <li>AI Chatbot: Your smart assistant to summarize, analyze, and elevate your notetaking effortlessly!</li>
          <li>OCR effortlessly converts your handwritten notes into digital text with exceptional accuracy!</li>
        </ul></div>

      </div> */}
    {/* </div>  */}
    {/* <div className='two-container-layout-2'>  */}
      
      {/* <div className='small-container'>
     <h2>why use</h2>
      </div> */}
        {/* <div className='right-container-2 '>
          <h2>Why Choose Our Smart Reusable Notebook ?</h2>
            <div className='small-container'>
    
     <p>
      <ul>
        <li>Our smart reusable notebooks address environmental impact and productivity concerns.</li>
        <li>They are made with a special non-tearable and waterproof material.</li>
        <li>The eco-friendly paper used is recycled and FSC certified.</li>
        <li>Each sheet of paper is reusable up to 100 times.</li>
        <li>Smart templates like to-do lists and meeting schedules enhance workflow and productivity.</li>
      </ul>
     </p>
      </div>
   
      <div className='right-container-top-2'>
      {/* <img src={nature} alt="Description of your image"  /> */}
   
      {/* </div>

</div></div> */} 

       <div>
        <ContainerLayout/>
       </div>
         

         <div>
          <VideoLayout/>
         </div>
        
        {/* <div className='main-container-layout'>
        <div className='container'>
        <div class="video-container-12">
        <video  ref={videoRef} className="responsive-video" autoPlay muted loop disablePictureInPicture>
        <source src={chatbot} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
</div>
         </div>  */}
      {/* <div className='inner-container'>
        <h2 style={{ fontFamily: 'sans-serif', fontSize: '2em' }} >Click on Download to Install our App</h2>
        Content of the inner container
         <button onClick={handleDownload} className="download-button">Download</button>
      </div> 
    */}
   
    {/* <div className='third-container'>
   
    // </div> */}
     {/* <img src={Air} alt="Description of your image"  /> */}
        {/* </div> */}
     
    {/* <div>
           <NotebookApp />
           </div> */}
           {/* <div><br></br></div>
           <div className='books-blog-container'>
           <div>
            <h2>AIR</h2>
           <img src={Air} alt="Description of your image"  />
           </div>
           <div>
            <h2>CLASSIC</h2>
           <img src={Classic} alt="Description of your image"  />
           </div>
           <div>
            <h2>LITE</h2>
           <img src={Lite} alt="Description of your image"  />
           </div>
           <div>
            <h2>ECO</h2>
           <img src={Eco} alt="Description of your image"  />
           </div>
           </div> */}
          
        {/* Features Section */}
        <section className="features-section">
          <div className="features-content">
            <div className="features-header">
              <h2 className="features-title">Features that Matter</h2>
              <p className="features-description">
                Experience the perfect blend of traditional writing and modern technology
              </p>
            </div>
            
            <div className="features-grid">
              {[
                {
                  icon: <Leaf className="icon-leaf" />,
                  title: 'Eco-Friendly',
                  description: 'Reusable pages that save trees while maintaining the natural feel of paper'
                },
                {
                  icon: <Cloud className="icon-cloud" />,
                  title: 'AI-Enhanced',
                  description: 'Smart features that organize and analyze your notes automatically'
                },
                {
                  icon: <BookOpen className="icon-book" />,
                  title: 'Infinite Pages',
                  description: 'Write, wipe, and rewrite thousands of times on the same page'
                }
              ].map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div>
        <h2 className="features-title">Our Achievements speak for itself</h2>
          <ScrollingContainers/>
        </div>
        {/* Footer */}
        {/* <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <BookOpen className="icon-book" />
                <span className="logo-text">RenoteAI</span>
              </div>
              <p className="footer-description">
                Merging sustainability with smart technology for better note-taking.
              </p>
              <div className="footer-socials">
                {[Github, Twitter, Linkedin].map((Icon, index) => (
                  <a key={index} href="#" className="footer-social-link">
                    <Icon className="icon-social" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            {/* {['Product', 'Company', 'Resources'].map((title) => (
              <div key={title} className="footer-links">
                <h3 className="footer-links-title">{title}</h3>
                <ul className="footer-links-list">
                  {['Features', 'Pricing', 'About', 'Contact'].map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 RenoteAI. All rights reserved.</p>
          </div>
        </footer> */} 
        <div>
      <Footer/>
        </div>
      </main>
    </div>
  );
};

export default HomePage;


//task 2
