import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CorporateOnboarding = () => {
  const [activeStep, setActiveStep] = useState('kyc');
  
  const steps = [
    { id: 'kyc', label: 'KYC Form', icon: 'clipboard-list' },
    { id: 'suitability', label: 'Suitability', icon: 'check-circle' },
    { id: 'classification', label: 'Client Classification', icon: 'users' },
    { id: 'fatca', label: 'FATCA', icon: 'document-text' },
    { id: 'documents', label: 'Upload Documents', icon: 'upload' }
  ];

  const renderIcon = (iconName: string, isCompleted: boolean, isActive: boolean) => {
    const iconColor = isCompleted ? 'text-green-500' : isActive ? 'text-blue-600' : 'text-gray-400';
    
    switch(iconName) {
      case 'clipboard-list':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'check-circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'document-text':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'upload':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStepState = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    const activeIndex = steps.findIndex(step => step.id === activeStep);
    
    return {
      isActive: stepId === activeStep,
      isCompleted: stepIndex < activeIndex
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto pt-24 pb-10 px-4 sm:px-6">
        <div className="bg-white shadow-md rounded-md p-6 max-w-5xl mx-auto">
          <div className="mb-4">
            <Link to="/">
              <Button 
                variant="outline" 
                className="flex items-center text-gray-600 hover:text-gray-900 border-gray-300 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-2xl text-gray-700 font-semibold">Corporate Client Onboarding</h1>
            <img 
              src="/lovable-uploads/2fab491a-3fc7-4f12-9727-31796472405a.png" 
              alt="Hilbert Investment Solutions" 
              className="h-12" 
            />
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              {steps.map((step, index) => {
                const { isActive, isCompleted } = getStepState(step.id);
                const stepClasses = `flex flex-col items-center justify-center ${index < steps.length - 1 ? 'mb-4 md:mb-0' : ''}`;
                
                return (
                  <div key={step.id} className={stepClasses}>
                    <button 
                      onClick={() => setActiveStep(step.id)} 
                      className={`flex flex-col items-center focus:outline-none ${isActive ? 'pointer-events-none' : 'cursor-pointer'}`}
                    >
                      <div className={`rounded-full p-2 mb-2 ${
                        isCompleted 
                          ? 'bg-green-100 border-2 border-green-500' 
                          : isActive 
                            ? 'bg-blue-100 border-2 border-blue-600' 
                            : 'bg-gray-100 border-2 border-gray-300'
                      }`}>
                        {renderIcon(step.icon, isCompleted, isActive)}
                      </div>
                      <span className={`text-sm font-medium ${
                        isCompleted 
                          ? 'text-green-600' 
                          : isActive 
                            ? 'text-blue-600' 
                            : 'text-gray-500'
                      }`}>
                        {step.label}
                      </span>
                    </button>
                    
                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block w-20 h-0.5 mx-2 bg-gray-300 self-center"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Step Content */}
          <div className="mb-6 p-6 border border-gray-200 rounded-md">
            {activeStep === 'kyc' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">KYC Form</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country of Incorporation</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Select country</option>
                      <option>United Arab Emirates</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={3}></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Select business type</option>
                      <option>Corporation</option>
                      <option>Limited Liability Company</option>
                      <option>Partnership</option>
                      <option>Trust</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {activeStep === 'suitability' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Suitability Assessment</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Experience (Years)</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Select experience</option>
                      <option>Less than 1 year</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>More than 10 years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Select risk tolerance</option>
                      <option>Conservative</option>
                      <option>Moderate</option>
                      <option>Aggressive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Objectives</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Select investment objective</option>
                      <option>Capital Preservation</option>
                      <option>Income Generation</option>
                      <option>Growth</option>
                      <option>Speculation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Horizon</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Select investment horizon</option>
                      <option>Less than 1 year</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>More than 10 years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {activeStep === 'classification' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Client Classification</h2>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <p className="mb-2 text-sm text-gray-600">According to DFSA regulations, please select the appropriate classification for your entity:</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input type="radio" id="professional-assessed" name="classification" className="mt-1" />
                      <div>
                        <label htmlFor="professional-assessed" className="font-medium text-gray-700">Assessed Professional Client</label>
                        <p className="text-sm text-gray-500">Has net assets of at least USD 1,000,000 and meets other qualifying criteria</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <input type="radio" id="professional-deemed" name="classification" className="mt-1" />
                      <div>
                        <label htmlFor="professional-deemed" className="font-medium text-gray-700">Deemed Professional Client</label>
                        <p className="text-sm text-gray-500">Includes regulated entities, large undertakings, and supranational organizations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <input type="radio" id="market-counterparty" name="classification" className="mt-1" />
                      <div>
                        <label htmlFor="market-counterparty" className="font-medium text-gray-700">Market Counterparty</label>
                        <p className="text-sm text-gray-500">Professional Client that meets additional requirements</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 italic">Note: Hilbert Investment Solutions Ltd only provides services to Professional Clients and Market Counterparties.</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeStep === 'fatca' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">FATCA Declaration</h2>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <p className="mb-2 text-sm text-gray-600">Under the Foreign Account Tax Compliance Act (FATCA), we are required to identify entities that are US Persons for tax purposes.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">FATCA Classification</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>Select FATCA status</option>
                        <option>Foreign Financial Institution (FFI)</option>
                        <option>Non-Financial Foreign Entity (NFFE)</option>
                        <option>US Entity</option>
                        <option>Exempt entity</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Global Intermediary Identification Number (GIIN), if applicable</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. ABCDEF.12345.LE.123" />
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <input type="checkbox" id="fatca-confirm" className="mt-1" />
                      <div>
                        <label htmlFor="fatca-confirm" className="font-medium text-gray-700">Confirmation</label>
                        <p className="text-sm text-gray-500">I confirm that the information provided above is true and accurate. I understand that Hilbert Investment Solutions Ltd may need to report certain information to tax authorities.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeStep === 'documents' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Document Upload</h2>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <p className="mb-2 text-sm text-gray-600">Please upload the following required documents to complete your application:</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certificate of Incorporation</label>
                      <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md">
                        <div className="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">Drag and drop or click to upload</p>
                          <p className="mt-1 text-xs text-gray-500">PDF, JPG, or PNG up to 10MB</p>
                          <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">Browse Files</button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Memorandum and Articles of Association</label>
                      <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md">
                        <div className="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">Drag and drop or click to upload</p>
                          <p className="mt-1 text-xs text-gray-500">PDF, JPG, or PNG up to 10MB</p>
                          <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">Browse Files</button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">List of Directors and Authorized Signatories</label>
                      <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md">
                        <div className="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">Drag and drop or click to upload</p>
                          <p className="mt-1 text-xs text-gray-500">PDF, JPG, or PNG up to 10MB</p>
                          <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">Browse Files</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              className="text-gray-600 hover:text-gray-900 border-gray-300"
              onClick={() => {
                const currentIndex = steps.findIndex(step => step.id === activeStep);
                if (currentIndex > 0) {
                  setActiveStep(steps[currentIndex - 1].id);
                }
              }}
              disabled={activeStep === steps[0].id}
            >
              Previous
            </Button>
            
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                const currentIndex = steps.findIndex(step => step.id === activeStep);
                if (currentIndex < steps.length - 1) {
                  setActiveStep(steps[currentIndex + 1].id);
                } else {
                  // Submit form logic would go here
                  alert('Form submitted successfully!');
                }
              }}
            >
              {activeStep === steps[steps.length - 1].id ? 'Submit' : 'Next'}
            </Button>
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

export default CorporateOnboarding; 