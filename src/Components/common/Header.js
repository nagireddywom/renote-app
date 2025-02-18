import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Leaf, X, Menu, User } from 'lucide-react';
import './Header.css';
import LOGO from '../../assets/LOGO.jpg';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const navItems = [
//     { label: 'Home', path: '/' },
//     { label: 'Products', path: '/product/AIR' },
//     { label: 'Features', path: '/' },
//     { label: 'About', path: '/' }
//   ];

//   const accountItems = isAuthenticated ? [
//     { label: 'Profile', path: '/complete-profile' },
//     { label: 'Orders', path: '/orders' },
//     { label: 'Logout', path: '/logout' }
//   ] : [
//     { label: 'Login', path: '/login' },
//     { label: 'Register', path: '/register' }
//   ];

//   return (
//     <header className="header">
//       <nav className="nav">
//         <div className="nav-container">
//           {/* Logo */}
//           <Link to="/" className="logo-container">
//             <div className="logo-icon">
//             <img src={LOGO} alt="Company Logo" className="company-logo" />
//             </div>
//             {/* <span className="logo-text">RENOTEAI</span> */}
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="desktop-nav">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className="nav-link"
//               >
//                 {item.label}
//               </Link>
//             ))}
            
//             {/* Account Menu */}
//             <div className="account-container">
//               <button className="account-button">
//                 <User />
//                 <span>Account</span>
//               </button>
//               <div className="account-dropdown">
//                 {accountItems.map((item) => (
//                   <Link
//                     key={item.label}
//                     to={item.path}
//                     className="dropdown-link"
//                   >
//                     {item.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <button 
//               onClick={() => navigate('/checkout/shipping')}
//               className="get-started-button"
//             >
//               Get Started
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             className="mobile-menu-button"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X /> : <Menu />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
//           <div className="mobile-menu-content">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className="mobile-link"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}
            
//             <div className="mobile-divider" />
            
//             {accountItems.map((item) => (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className="mobile-link"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}

//             <button 
//               onClick={() => {
//                 navigate('/checkout/shipping');
//                 setIsMenuOpen(false);
//               }}
//               className="get-started-button"
//             >
//               Get Started
//             </button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import { useRef, useEffect } from 'react';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const accountDropdownRef = useRef(null);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/product/AIR' },
    { label: 'Features', path: '/' },
    { label: 'About', path: '/' }
  ];

  const accountItems = [
    { label: 'Profile', path: '/complete-profile' },
    { label: 'Orders', path: '/orders' },
    { label: 'Logout', path: '/logout' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo-container">
            <div className="logo-icon">
              <img src={LOGO} alt="Company Logo" className="company-logo" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Account Menu */}
            <div className="account-container" ref={accountDropdownRef}>
              <button 
                className="account-button"
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              >
                <User />
                <span>Account</span>
              </button>
              {isAccountDropdownOpen && (
                <div className="account-dropdown">
                  {accountItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="dropdown-link"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => navigate('/checkout/shipping')}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="mobile-divider" />
            
            {accountItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <button 
              onClick={() => {
                navigate('/checkout/shipping');
                setIsMenuOpen(false);
              }}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;