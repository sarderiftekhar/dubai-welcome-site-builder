import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-4">
          <div className="flex flex-col items-center justify-center w-full gap-4 text-center">
            <p className="text-md text-white mb-1">
              Hilbert Investment Solutions Ltd (DIFC Branch)
            </p>
            <p className="text-sm text-white mb-1">
              Address: N406, Level 4, Emirates Financial Towers, DIFC, Dubai, UAE Phone: +971 4 255 6098 – Email: contact@hilbert-is.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
