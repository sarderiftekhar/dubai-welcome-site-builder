
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white bg-opacity-95 shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/public/lovable-uploads/2fab491a-3fc7-4f12-9727-31796472405a.png" 
                alt="Hilbert Investment Solutions" 
                className="h-12" 
              />
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-hilbert-dark hover:text-hilbert-blue font-medium transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-hilbert-dark hover:text-hilbert-blue font-medium transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-hilbert-dark hover:text-hilbert-blue font-medium transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-hilbert-dark hover:text-hilbert-blue font-medium transition-colors">
              Contact
            </Link>
            <Button className="bg-hilbert-blue hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1 bg-white">
          <Link to="/" className="block pl-3 pr-4 py-2 text-base font-medium text-hilbert-dark hover:bg-gray-50">
            Home
          </Link>
          <Link to="/services" className="block pl-3 pr-4 py-2 text-base font-medium text-hilbert-dark hover:bg-gray-50">
            Services
          </Link>
          <Link to="/about" className="block pl-3 pr-4 py-2 text-base font-medium text-hilbert-dark hover:bg-gray-50">
            About Us
          </Link>
          <Link to="/contact" className="block pl-3 pr-4 py-2 text-base font-medium text-hilbert-dark hover:bg-gray-50">
            Contact
          </Link>
          <div className="pl-3 pr-4 py-2">
            <Button className="w-full bg-hilbert-blue hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
