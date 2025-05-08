import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
            {/* Logo */}
            <img 
              src="/images/logo_hilbert_noir.png" 
              alt="Hilbert Investment Solutions" 
              className="h-10 brightness-0 invert" 
            />
            
            {/* Copyright */}
            <p className="text-sm text-gray-400 md:flex-1 text-center">
              © {new Date().getFullYear()} Hilbert Investment Solutions. All rights reserved.
            </p>
            
            {/* Contact information */}
            <p className="text-sm text-gray-400">
              Dubai, UAE | +00000 | info@hilbert-is.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
