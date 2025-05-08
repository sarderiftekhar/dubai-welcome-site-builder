
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/public/lovable-uploads/4a59f06e-96bc-4bee-a3b8-2c0cfe76ba39.png')",
            opacity: 0.3
          }}
        ></div>
        
        {/* Content */}
        <div className="z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
        
        {/* Down arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-hilbert-blue"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hilbert-dark">Our Investment Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial services designed to help you achieve your financial goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-hilbert-blue rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-hilbert-dark">Wealth Management</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive wealth management services customized to your unique financial situation and goals.
              </p>
              <a href="/services/wealth-management" className="text-hilbert-blue hover:underline font-medium">Learn More →</a>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-hilbert-blue rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-hilbert-dark">Investment Advisory</h3>
              <p className="text-gray-600 mb-4">
                Expert investment advice and portfolio management to maximize returns while managing risk.
              </p>
              <a href="/services/investment-advisory" className="text-hilbert-blue hover:underline font-medium">Learn More →</a>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-hilbert-blue rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-hilbert-dark">Financial Planning</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive financial planning to secure your future and achieve your long-term goals.
              </p>
              <a href="/services/financial-planning" className="text-hilbert-blue hover:underline font-medium">Learn More →</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-hilbert-dark py-16 text-white">
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
      
      <Footer />
    </div>
  );
};

export default Index;
