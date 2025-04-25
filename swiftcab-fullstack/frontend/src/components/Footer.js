import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-dark to-primary/90 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-white/30 after:rounded-full">
              <span className="flex items-center">
                <i className="fas fa-taxi mr-2"></i> SwiftCab
              </span>
            </h3>
            <p className="mb-6 opacity-80 leading-relaxed">
              Your reliable cab service for quick and comfortable transportation. Available 24/7 for all your travel needs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-white/30 after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity flex items-center hover:translate-x-1 transition-transform duration-300">
                  <i className="fas fa-chevron-right mr-2 text-sm"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/book" className="opacity-80 hover:opacity-100 transition-opacity flex items-center hover:translate-x-1 transition-transform duration-300">
                  <i className="fas fa-chevron-right mr-2 text-sm"></i> Book a Cab
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="opacity-80 hover:opacity-100 transition-opacity flex items-center hover:translate-x-1 transition-transform duration-300">
                  <i className="fas fa-chevron-right mr-2 text-sm"></i> My Bookings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-white/30 after:rounded-full">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1.5 mr-3 text-white/70"></i>
                <span className="opacity-80">Bharati Vidyapeeth, Paschim Vihar, Delhi</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1.5 mr-3 text-white/70"></i>
                <span className="opacity-80">(+91) 9811505046</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1.5 mr-3 text-white/70"></i>
                <span className="opacity-80">support@swiftcab.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1.5 mr-3 text-white/70"></i>
                <span className="opacity-80">24/7 Customer Support</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="opacity-70">&copy; {currentYear} SwiftCab. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6 text-sm opacity-70">
            <a href="#" className="hover:text-white hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-white hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-white hover:underline">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 