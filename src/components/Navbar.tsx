import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white bg-opacity-95 shadow-sm fixed w-full z-50" style={{ zIndex: 9999 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="/" 
              style={{ 
                cursor: 'pointer',
                display: 'block',
                position: 'relative',
                zIndex: 9999
              }}
              title="Go to Home Page"
            >
              <img 
                src="/uploads/2fab491a-3fc7-4f12-9727-31796472405a.png" 
                alt="Hilbert Investment Solutions - Home" 
                className="h-12" 
                style={{ transition: 'opacity 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              />
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6" style={{ position: 'relative', zIndex: 9999 }}>
            <a 
              href="/terms" 
              style={{ 
                cursor: 'pointer',
                color: '#333',
                fontSize: '0.75rem',
                fontWeight: 500,
                transition: 'color 0.2s',
                position: 'relative',
                zIndex: 9999
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#3b82f6';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Terms & Conditions
            </a>
            <a 
              href="/privacy" 
              style={{ 
                cursor: 'pointer',
                color: '#333',
                fontSize: '0.75rem',
                fontWeight: 500,
                transition: 'color 0.2s',
                position: 'relative',
                zIndex: 9999
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#3b82f6';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Privacy Policy
            </a>
            <Button 
              onClick={() => window.location.href = '/login'}
              style={{ 
                cursor: 'pointer',
                backgroundColor: '#1e40af',
                color: 'white',
                fontSize: '0.875rem',
                padding: '0.25rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '0.375rem',
                transition: 'all 0.2s',
                position: 'relative',
                zIndex: 9999
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1e3a8a';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#1e40af';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              style={{ 
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                color: '#9ca3af',
                transition: 'all 0.2s',
                position: 'relative',
                zIndex: 9999
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
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
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`} style={{ position: 'relative', zIndex: 9999 }}>
        <div className="pt-1 pb-2 space-y-0.5 bg-white">
          <a 
            href="/terms" 
            style={{ 
              cursor: 'pointer',
              display: 'block',
              paddingLeft: '0.75rem',
              paddingRight: '1rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#333',
              transition: 'all 0.2s',
              position: 'relative',
              zIndex: 9999
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#333';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Terms & Conditions
          </a>
          <a 
            href="/privacy" 
            style={{ 
              cursor: 'pointer',
              display: 'block',
              paddingLeft: '0.75rem',
              paddingRight: '1rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#333',
              transition: 'all 0.2s',
              position: 'relative',
              zIndex: 9999
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#333';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Privacy Policy
          </a>
          <div className="pl-3 pr-4 py-1">
            <Button 
              onClick={() => window.location.href = '/login'}
              style={{ 
                cursor: 'pointer',
                width: '100%',
                backgroundColor: '#1e40af',
                color: 'white',
                fontSize: '0.875rem',
                padding: '0.25rem 0',
                transition: 'background-color 0.2s',
                position: 'relative',
                zIndex: 9999
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1e3a8a';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#1e40af';
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
