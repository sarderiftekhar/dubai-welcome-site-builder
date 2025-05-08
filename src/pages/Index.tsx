
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center overflow-hidden pt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
          <div className="animate-fade-in">
            <img 
              src="/public/lovable-uploads/2fab491a-3fc7-4f12-9727-31796472405a.png"
              alt="Hilbert Investment Solutions"
              className="h-24 md:h-32 mx-auto mb-8"
            />
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-hilbert-dark">
              Welcome to Hilbert Investment Solutions
              <span className="block text-hilbert-blue">Dubai</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-700">
              Premier financial advisory and investment management services tailored to your unique needs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-hilbert-blue hover:bg-blue-700 text-white text-lg px-8 py-6">
                Our Services
              </Button>
              <Button className="bg-transparent border-2 border-hilbert-blue text-hilbert-blue hover:bg-hilbert-blue hover:text-white text-lg px-8 py-6">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <section className="bg-hilbert-dark py-16 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Financial Future?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Schedule a consultation with one of our expert financial advisors today.
          </p>
          <Button className="bg-hilbert-blue hover:bg-blue-700 text-white text-lg px-8 py-6">
            Get Started Now
          </Button>
        </div>
      </section>
      
      {/* Background Image at Bottom */}
      <div className="relative w-full h-64 md:h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/public/lovable-uploads/4a59f06e-96bc-4bee-a3b8-2c0cfe76ba39.png')",
            opacity: 0.3
          }}
        ></div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
