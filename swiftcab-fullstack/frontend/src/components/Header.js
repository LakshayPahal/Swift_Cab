import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when navigating
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Close menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location]);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 py-4'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center" onClick={closeMenu}>
          <i className="fas fa-taxi mr-2"></i> SwiftCab
        </Link>
        
        <div className="lg:hidden">
          <button 
            onClick={toggleMenu}
            className="text-dark hover:text-primary focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
        
        <ul className={`lg:flex lg:items-center lg:space-x-8 transition-all duration-300 ${isMenuOpen ? 
          'absolute top-16 left-0 right-0 bg-white shadow-lg flex flex-col p-6 space-y-4 z-50 border-t' : 
          'hidden lg:flex'}`}
        >
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary font-medium flex items-center" 
                  : "text-dark hover:text-primary font-medium flex items-center transition-colors"
              }
              onClick={closeMenu}
            >
              <i className="fas fa-home mr-2"></i> Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/book" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary font-medium flex items-center" 
                  : "text-dark hover:text-primary font-medium flex items-center transition-colors"
              }
              onClick={closeMenu}
            >
              <i className="fas fa-taxi mr-2"></i> Book a Cab
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/bookings" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary font-medium flex items-center" 
                  : "text-dark hover:text-primary font-medium flex items-center transition-colors"
              }
              onClick={closeMenu}
            >
              <i className="fas fa-list mr-2"></i> My Bookings
            </NavLink>
          </li>
        </ul>
        
        <Link 
          to="/book" 
          className="hidden lg:flex items-center btn btn-primary px-5"
          onClick={closeMenu}
        >
          <i className="fas fa-taxi mr-2"></i> Book Now
        </Link>
      </nav>
    </header>
  );
};

export default Header; 