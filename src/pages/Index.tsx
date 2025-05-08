import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main content with background */}
      <div className="flex-grow relative">
        {/* Background Image - Full Screen */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('/public/lovable-uploads/4a59f06e-96bc-4bee-a3b8-2c0cfe76ba39.png')",
            opacity: 0.3
          }}
        ></div>
        
        {/* Content on top of background */}
        <div className="relative z-10 flex items-center justify-center h-full pt-20">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-normal mb-4 tracking-tight text-gray-900">
                Welcome to
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight text-gray-900">
                Hilbert Investment Solutions 
              </h1>
              <div className="flex justify-center">
                <img src="/images/dubai.png" alt="Dubai" className="w-1/6 h-1/6" />
              </div>
              
              {/* Client Type Selection */}
              <div className="mt-12 mb-12">
                <h2 className="text-xl font-bold font-italic mb-6 text-gray-800">Select Client Type</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-xl mx-auto">
                  <div 
                    className={`border-2 rounded-lg p-5 cursor-pointer transition-all duration-200 flex-1 shadow-md hover:shadow-lg hover:translate-y-[-5px]
                      ${selectedOption === 'individual' 
                        ? 'border-hilbert-blue bg-blue-700 transform scale-105 border-[3px]' 
                        : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'}`}
                    style={{ borderWidth: selectedOption === 'individual' ? '3px' : '2px' }}
                    onClick={() => {
                      setSelectedOption('individual');
                      navigate('/client-classification?type=individual');
                    }}
                  >
                    <div className="flex justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={selectedOption === 'individual' ? 'text-white' : 'text-gray-500'}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h3 className={`text-lg font-medium text-center ${selectedOption === 'individual' ? 'text-white' : 'text-gray-700'}`}>Individual</h3>
                    <p className={`text-xs mt-1 text-center ${selectedOption === 'individual' ? 'text-blue-100' : 'text-gray-500'}`}>Personal investment accounts for individual clients</p>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-lg p-5 cursor-pointer transition-all duration-200 flex-1 shadow-md hover:shadow-lg hover:translate-y-[-5px]
                      ${selectedOption === 'corporate' 
                        ? 'border-hilbert-blue bg-blue-800 transform scale-105 border-[3px]' 
                        : 'border-blue-300 bg-white hover:border-blue-300 hover:bg-blue-50'}`}
                    style={{ borderWidth: selectedOption === 'corporate' ? '3px' : '2px' }}
                    onClick={() => {
                      setSelectedOption('corporate');
                      navigate('/corporate-onboarding');
                    }}
                  >
                    <div className="flex justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={selectedOption === 'corporate' ? 'text-white' : 'text-gray-500'}>
                        <path d="M3 21h18"></path>
                        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
                        <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
                      </svg>
                    </div>
                    <h3 className={`text-lg font-medium text-center ${selectedOption === 'corporate' ? 'text-white' : 'text-gray-700'}`}>Corporate</h3>
                    <p className={`text-xs mt-1 text-center ${selectedOption === 'corporate' ? 'text-blue-100' : 'text-gray-500'}`}>Business accounts for companies and institutions</p>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-lg p-5 cursor-pointer transition-all duration-200 flex-1 shadow-md hover:shadow-lg hover:translate-y-[-5px]
                      ${selectedOption === 'counterparty' 
                        ? 'border-hilbert-blue bg-blue-500 transform scale-105 border-[3px]' 
                        : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'}`}
                    style={{ borderWidth: selectedOption === 'counterparty' ? '3px' : '2px' }}
                    onClick={() => {
                      setSelectedOption('counterparty');
                      navigate('/client-classification?type=counterparty');
                    }}
                  >
                    <div className="flex justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={selectedOption === 'counterparty' ? 'text-white' : 'text-gray-500'}>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h3 className={`text-lg font-medium text-center ${selectedOption === 'counterparty' ? 'text-white' : 'text-gray-700'}`}>Counterparty</h3>
                    <p className={`text-xs mt-1 text-center ${selectedOption === 'counterparty' ? 'text-blue-100' : 'text-gray-500'}`}>Market counterparties and institutional partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
          <p className="text-sm text-gray-600 font-thin italic mb-2">
            Hilbert Investment Solutions Ltd is regulated by the Dubai Financial Services Authority (DFSA) for the conduct of its business in and from the Dubai International Financial Centre (DIFC)
           </p>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
