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
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/terms" className="text-hilbert-dark hover:text-hilbert-blue hover:underline font-medium transition-colors text-xs italic transform hover:scale-105 duration-200 cursor-pointer">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-hilbert-dark hover:text-hilbert-blue hover:underline font-medium transition-colors text-xs italic transform hover:scale-105 duration-200 cursor-pointer">
              Privacy Policy
            </Link>
            <Button className="bg-hilbert-blue hover:bg-blue-700 text-white text-sm py-1 px-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
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
        <div className="pt-1 pb-2 space-y-0.5 bg-white">
          <Link to="/terms" className="block pl-3 pr-4 py-1 text-xs font-medium text-hilbert-dark hover:bg-gray-50">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="block pl-3 pr-4 py-1 text-xs font-medium text-hilbert-dark hover:bg-gray-50">
            Privacy Policy
          </Link>
          <div className="pl-3 pr-4 py-1">
            <Button className="w-full bg-hilbert-blue hover:bg-blue-700 text-white text-sm py-1">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
