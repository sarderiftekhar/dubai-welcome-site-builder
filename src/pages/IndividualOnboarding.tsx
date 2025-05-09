import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const IndividualOnboarding = () => {
  const [activeStep, setActiveStep] = useState('kyc');
  // Add state to track document uploads
  const [documentUploads, setDocumentUploads] = useState([
    { id: 1, type: '', file: null }
  ]);
  
  const steps = [
    { id: 'kyc', label: 'KYC Form', icon: 'clipboard-list' },
    { id: 'suitability', label: 'Suitability', icon: 'check-circle' },
    { id: 'classification', label: 'Client Classification', icon: 'users' },
    { id: 'fatca', label: 'FATCA', icon: 'document-text' },
    { id: 'documents', label: 'Upload Documents', icon: 'upload' }
  ];

  const renderIcon = (iconName: string, isCompleted: boolean, isActive: boolean) => {
    const iconColor = isCompleted ? 'text-green-500' : isActive ? 'text-[#0066FF]' : 'text-gray-400';
    
    switch(iconName) {
      case 'clipboard-list':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'check-circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'document-text':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'upload':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  // Add a function to handle adding more document uploads
  const addMoreDocuments = () => {
    const newUpload = {
      id: documentUploads.length + 1,
      type: '',
      file: null
    };
    setDocumentUploads([...documentUploads, newUpload]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto pt-24 pb-10 px-4 sm:px-6">
        <div className="bg-white shadow-md rounded-md p-6 max-w-5xl mx-auto border border-blue-200">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl text-gray-700 font-semibold">Individual Client Onboarding</h1>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <style>
              {`
                .step-label {
                  text-decoration: none !important;
                  border-bottom: none !important;
                }
                .step-label:hover {
                  text-decoration: none !important;
                }
              `}
            </style>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              {steps.map((step, index) => {
                const { isActive, isCompleted } = getStepState(step.id);
                const stepClasses = `flex flex-col items-center justify-center ${index < steps.length - 1 ? 'mb-4 md:mb-0' : ''}`;
                
                return (
                  <div key={step.id} className={stepClasses}>
                    <button 
                      onClick={() => setActiveStep(step.id)} 
                      className={`flex flex-col items-center focus:outline-none ${isActive ? 'pointer-events-none' : 'cursor-pointer'}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className={`rounded-full p-2 mb-2 ${
                        isCompleted 
                          ? 'bg-green-100 border-2 border-green-500' 
                          : isActive 
                            ? 'bg-[#EFF6FF] border-2 border-[#0066FF]' 
                            : 'bg-gray-100 border-2 border-gray-300'
                      }`}>
                        {renderIcon(step.icon, isCompleted, isActive)}
                      </div>
                      <span 
                        className={`text-sm font-medium no-underline step-label ${
                          isCompleted 
                            ? 'text-green-600' 
                            : isActive 
                              ? 'text-[#0066FF]' 
                              : 'text-gray-500'
                        }`}
                        style={{ textDecoration: 'none', borderBottom: 'none' }}
                      >
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
                <h2 className="text-lg font-semibold mb-4">Know Your Customer – Individual Due Diligence Form</h2>
                <div className="space-y-6">
                  {/* CLIENT IDENTIFICATION DETAILS */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">CLIENT IDENTIFICATION DETAILS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-[#0066FF] ml-1">*</span>
                          <span className="text-xs text-gray-500 ml-1">(as per the passport)</span>
                        </label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth (DOB) <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <input type="text" placeholder="dd/mm/yyyy" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Place of Birth <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nationality <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none">
                          <option value="">Select a country</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country of Residence <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none">
                          <option value="">Select a country</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <div className="flex space-x-6 mt-2">
                          <div className="flex items-center">
                            <input type="radio" id="gender-male" name="gender" value="male" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="gender-male" className="text-base">Male</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="gender-female" name="gender" value="female" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="gender-female" className="text-base">Female</label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Marital Status <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <div className="flex flex-wrap space-x-4 mt-2">
                          <div className="flex items-center">
                            <input type="radio" id="marital-single" name="marital-status" value="single" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="marital-single" className="text-base">Single</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="marital-married" name="marital-status" value="married" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="marital-married" className="text-base">Married</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="marital-widowed" name="marital-status" value="widowed" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="marital-widowed" className="text-base">Widowed</label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <input type="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Residential Address <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" rows={3}></textarea>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Home Country Address <span className="text-xs text-gray-500 ml-1">(if applicable)</span>
                        </label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" rows={3}></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telephone Number <span className="text-xs text-gray-500 ml-1">(with Country Codes)</span>
                        </label>
                        <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* CLIENT IDENTIFICATION DOCUMENT DETAILS */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">CLIENT IDENTIFICATION DOCUMENT DETAILS</h3>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ID Type <span className="text-[#0066FF] ml-1">*</span></label>
                        <div className="flex flex-wrap space-x-4 mt-2">
                          <div className="flex items-center">
                            <input type="radio" id="id-type-emirates" name="id-type" value="emirates" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="id-type-emirates" className="text-base">Emirates ID</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="id-type-passport" name="id-type" value="passport" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="id-type-passport" className="text-base">Passport</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="id-type-gcc" name="id-type" value="gcc" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="id-type-gcc" className="text-base">GCC Identity Card</label>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ID Number <span className="text-[#0066FF] ml-1">*</span></label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ID Expiry Date <span className="text-[#0066FF] ml-1">*</span></label>
                          <div className="relative">
                            <input type="text" placeholder="dd/mm/yyyy" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* NATURE AND PURPOSE OF RELATIONSHIP */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">NATURE AND PURPOSE OF RELATIONSHIP WITH HILBERT INVESTMENT SOLUTIONS LTD</h3>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of relationship <span className="text-[#0066FF] ml-1">*</span></label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Please provide details of your source of funds <span className="text-xs text-gray-500 ml-1">(Explain in detail your source of funding)</span>
                        </label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" rows={3}></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Please provide details of your source of wealth <span className="text-xs text-gray-500 ml-1">(How your wealth was acquired over the years)</span>
                        </label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" rows={3}></textarea>
                      </div>
                    </div>
                  </div>

                  {/* EMPLOYMENT DETAILS */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">EMPLOYMENT DETAILS</h3>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Occupation Type <span className="text-[#0066FF] ml-1">*</span></label>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center">
                            <input type="radio" id="occupation-salaried" name="occupation-type" value="salaried" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="occupation-salaried" className="text-base">Salaried</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="occupation-self" name="occupation-type" value="self-employed" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="occupation-self" className="text-base">Self-Employed</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="occupation-professional" name="occupation-type" value="professional" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="occupation-professional" className="text-base">Professional</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="occupation-other" name="occupation-type" value="other" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                            <label htmlFor="occupation-other" className="text-base">If Others, please specify:</label>
                            <input type="text" className="ml-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Employer Name</label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Employer Contact No.</label>
                          <input type="tel" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Employer Address</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" rows={3}></textarea>
                      </div>
                    </div>
                  </div>

                  {/* POLITICAL EXPOSED PERSON DECLARATION */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">POLITICAL EXPOSED PERSON DECLARATION</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Are you entrusted with prominent public functions in United Arab Emirates or any other foreign country such as Heads of States or Governments, Senior Politicians, Senior Government Officials, Judicial or Military Officials, Senior Executive Managers of State-owned Corporations, and Senior Officials of Political Parties and persons who are, or have previously been, entrusted with the management of an international organization or any prominent function within such an organization?
                    </p>
                    <div className="flex space-x-6 mb-4">
                      <div className="flex items-center">
                        <input type="radio" id="pep-yes" name="pep-declaration" value="yes" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                        <label htmlFor="pep-yes" className="text-base">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="pep-no" name="pep-declaration" value="no" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                        <label htmlFor="pep-no" className="text-base">No</label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        If yes, please provide an explanation about last position held and source of income/funds:
                      </label>
                      <textarea className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" rows={3}></textarea>
                    </div>
                  </div>

                  {/* CLIENT DECLARATION */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">CLIENT DECLARATION</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      I, <span className="font-bold">[Name]</span>, hereby declare that the information provided above is true, accurate, and complete to the best of my knowledge and belief. I acknowledge and understand that Hilbert Investment Solutions Ltd may process my personal information in accordance with the attached Privacy Notice for the purpose of providing me with services.
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                      I am fully aware of the consequences that may arise from providing false or misleading information and accept sole responsibility for the accuracy and authenticity of the details provided.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client Signature <span className="text-[#0066FF] ml-1">*</span></label>
                        <div className="w-full p-6 border border-gray-300 rounded-md bg-white"></div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date <span className="text-[#0066FF] ml-1">*</span></label>
                        <div className="relative">
                          <input type="text" placeholder="dd/mm/yyyy" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Place <span className="text-[#0066FF] ml-1">*</span></label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Required Documents Checklist */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">REQUIRED DOCUMENTS</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                        <p className="text-sm">Valid and Certified passport copies of the Individual Person.</p>
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                        <p className="text-sm">Copy of valid UAE residence visa and Emirates ID (front and back) for any UAE resident individuals.</p>
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                        <p className="text-sm">Utility bill, bank account statement, credit card statement or other certified document (less than 3 months old) reflecting the individual's residential address (not a Post Office Box address).</p>
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                        <p className="text-sm">For minor beneficiaries residing with parents, a declaration or letter from the parent confirming the address.</p>
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                        <p className="text-sm">Source of Wealth/Source of Income</p>
                      </div>
                    </div>

                    <div className="mt-4 ml-8">
                      <p className="font-semibold mb-2">a) Salaried Individuals:</p>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>Latest 3 months' pay slips.</li>
                        <li>3 months' bank statements showing salary deposits.</li>
                      </ul>

                      <p className="font-semibold mb-2 mt-4">b) Self-employed Partners/Investors:</p>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>Certificate of incorporation/License and MOA/AOA/Certificate of incumbency showing company ownership.</li>
                        <li>Latest audited financial statements of the company.</li>
                        <li>Latest 6 months' bank statements of the company with management accounts.</li>
                      </ul>

                      <p className="font-semibold mb-2 mt-4">c) Others:</p>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>
                          <p className="font-medium">Investment Income:</p>
                          <ul className="list-disc ml-6 space-y-2">
                            <li>Copy of investment statements.</li>
                            <li>Confirmation of funds from bank statement showing receipt of funds.</li>
                          </ul>
                        </li>
                        <li>
                          <p className="font-medium">Gift/Inheritance:</p>
                          <ul className="list-disc ml-6 space-y-2">
                            <li>Details of the gift/inheritance, including name of donor/deceased, relationship to the donor/deceased, date received, total amount received, and donor's/deceased's source of wealth.</li>
                            <li>Documentary evidence such as a solicitor/lawyer's signed letter.</li>
                          </ul>
                        </li>
                        <li>
                          <p className="font-medium">Sale of Property:</p>
                          <ul className="list-disc ml-6 space-y-2">
                            <li>Copy of the contract of sale clearly outlining property details (address, date of sale, value), and parties involved.</li>
                            <li>Copy of the title deed from the land registry.</li>
                          </ul>
                        </li>
                        <li>
                          <p className="font-medium">Regular income from owned properties rented:</p>
                          <ul className="list-disc ml-6 space-y-2">
                            <li>Property details, including evidence of property ownership (title deed).</li>
                            <li>Lease agreement and/or rental receipts.</li>
                          </ul>
                        </li>
                        <li>
                          <p className="font-medium">If Other Sources of Income:</p>
                          <ul className="list-disc ml-6 space-y-2">
                            <li>Please provide copies of the supporting documents.</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">PRIVACY NOTICE</h3>
                    <p className="text-sm mb-4">
                      Hilbert Investment Solutions Ltd ("the Company") takes privacy seriously and respects the privacy of every client 
                      for whom we provide services ("the Services"). In order to effectively provide the Services to you, the company 
                      needs to process some of your personal information.
                    </p>
                    <p className="text-sm mb-4">
                      Please note that the lists below are not exhaustive, and there may be other examples where we hold, collect, use, or 
                      share your personal information in order to provide the Services.
                    </p>
                    
                    <h4 className="text-[#0066FF] font-bold mb-3">THE PERSONAL INFORMATION WE MAY HOLD</h4>
                    <p className="text-sm mb-3">
                      As a client (or potential client) of the Company, we may hold the following categories of personal information about 
                      you (some of this information may be considered sensitive due to its nature):
                    </p>
                    <ul className="list-disc ml-6 mb-4 text-sm">
                      <li className="mb-2">
                        Information you provide when you become a client, as required under Customer Due Diligence and/or Anti 
                        Money Laundering regulations or practices. This may include your name, title, address, telephone number, 
                        email address, date of birth, passport information, Emirates ID number, nationality, and superficial financial 
                        information.
                      </li>
                      <li>Information provided in the course of us providing the Services.</li>
                    </ul>
                    
                    <h4 className="text-[#0066FF] font-bold mb-3">HOW WE MAY USE YOUR PERSONAL INFORMATION</h4>
                    <p className="text-sm mb-3">
                      It is our legitimate interest to use your personal information to ensure the provision of the Services. As a Regulated 
                      Entity, we are also bound by legal, regulatory, and ethical obligations that necessitate the processing of your 
                      personal information. For instance, we may need to retain files even after a business relationship has been 
                      terminated.
                    </p>
                    <p className="text-sm mb-3">
                      The personal information we collect about you may be used for the following purposes:
                    </p>
                    <ul className="list-disc ml-6 mb-4 text-sm">
                      <li>Setting you up as a new client in our systems.</li>
                      <li>Facilitating the effective performance of the Services.</li>
                      <li>Complying with legal or regulatory requirements.</li>
                      <li>Compiling statistics.</li>
                    </ul>
                    
                    <h4 className="text-[#0066FF] font-bold mb-3">SHARING YOUR PERSONAL INFORMATION</h4>
                    <p className="text-sm mb-3">
                      We may need to share your personal information with third parties. These third parties may include:
                    </p>
                    <ul className="list-disc ml-6 mb-4 text-sm">
                      <li>Professional advisers, such as lawyers and accountants, or governmental or regulatory authorities.</li>
                      <li>Third party professionals, such as arbitrators, accountants, tax professionals, advisors, counsel, court personnel.</li>
                    </ul>
                    
                    <div className="flex items-center mt-6">
                      <input type="checkbox" id="privacy-acknowledge" className="mr-3 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                      <label htmlFor="privacy-acknowledge" className="text-base font-medium text-[#0066FF]">I acknowledge</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Add other step content sections (suitability, classification, etc.) */}
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
            
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                className="text-[#0066FF] hover:text-[#0055DD] border-[#0066FF]"
                onClick={() => {
                  alert('Draft saved successfully!');
                }}
              >
                Save draft
              </Button>
              
              <Button 
                className="bg-[#0066FF] hover:bg-[#0055DD] text-white"
                onClick={() => {
                  const currentIndex = steps.findIndex(step => step.id === activeStep);
                  if (currentIndex < steps.length - 1) {
                    setActiveStep(steps[currentIndex + 1].id);
                  } else {
                    alert('Form submitted successfully!');
                  }
                }}
              >
                {activeStep === steps[steps.length - 1].id ? 'Submit' : 'Next'}
              </Button>
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

export default IndividualOnboarding; 