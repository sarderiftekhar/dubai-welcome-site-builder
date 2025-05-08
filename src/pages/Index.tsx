import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
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
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
                <Button className="bg-hilbert-blue hover:bg-blue-700 text-white text-lg px-10 py-7 transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:animate-pulse">
                  Lets start
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
