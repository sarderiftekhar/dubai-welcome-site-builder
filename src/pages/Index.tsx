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
            backgroundImage: "url('uploads/4a59f06e-96bc-4bee-a3b8-2c0cfe76ba39.png')",
            opacity: 0.2
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
              <div className="mt-36 mb-12">
                
                <h2 className="text-xl mb-6 text-gray-800 italic">Lets start by selecting your application type</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-5xl mx-auto">
                  
                  {/* Individual Card */}
                  <div 
                    className="bg-white rounded-xl p-6 shadow-md relative transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] flex-1"
                    onClick={() => {
                      setSelectedOption('individual');
                      navigate('/individual-onboarding');
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-center text-gray-900 mb-2">Individual</h3>
                    <p className="text-sm text-center text-gray-600 mb-8">Personal investment accounts for individual clients seeking wealth growth and portfolio diversification.</p>
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full cursor-pointer transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Corporate Card */}
                  <div 
                    className="bg-white rounded-xl p-6 shadow-md relative transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] flex-1"
                    onClick={() => {
                      setSelectedOption('corporate');
                      navigate('/corporate-onboarding');
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900">
                          <path d="M3 21h18"></path>
                          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
                          <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-center text-gray-900 mb-2">Corporate</h3>
                    <p className="text-sm text-center text-gray-600 mb-8">Business accounts for companies and institutions looking for strategic investment opportunities.</p>
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full cursor-pointer transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Counterparty Card */}
                  <div 
                    className="bg-white rounded-xl p-6 shadow-md relative transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] flex-1"
                    onClick={() => {
                      setSelectedOption('counterparty');
                      navigate('#');
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-900">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-center text-gray-900 mb-2">Counterparty</h3>
                    <p className="text-sm text-center text-gray-600 mb-8">Market counterparties and institutional partners requiring specialized financial solutions.</p>
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full cursor-pointer transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
          <p className="text-sm text-[#0066FF] font-thin italic mb-2">
            Hilbert Investment Solutions Ltd is regulated by the Dubai Financial Services Authority (DFSA) for the conduct of its business in and from the Dubai International Financial Centre (DIFC)
           </p>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
