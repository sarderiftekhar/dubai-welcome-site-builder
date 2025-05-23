import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SignatureCanvas from '@/components/SignatureCanvas';

const IndividualOnboarding = () => {
  const [activeStep, setActiveStep] = useState('kyc');
  // Add state to track document uploads
  const [documentUploads, setDocumentUploads] = useState([
    { id: 1, type: '', file: null }
  ]);
  
  // State for signature popup
  const [isSignaturePopupOpen, setIsSignaturePopupOpen] = useState(false);
  const [signatureImage, setSignatureImage] = useState('');
  
  const steps = [
    { id: 'kyc', label: 'KYC Form', icon: 'clipboard-list' },
    { id: 'suitability', label: 'Suitability', icon: 'check-circle' },
    { id: 'classification', label: 'Client Classification', icon: 'users' },
    { id: 'fatca', label: 'FATCA', icon: 'document-text' },
    { id: 'w8ben', label: 'W8BEN-E Form', icon: 'document-text' },
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

  // Add state to store form data
  const [formData, setFormData] = useState({
    kyc: {
      personalInfo: {},
      identificationDetails: {},
      relationshipDetails: {},
      employmentDetails: {},
      pepDeclaration: {},
      clientDeclaration: {},
      privacyNotice: {}
    },
    suitability: {},
    classification: {},
    fatca: {
      accountHolder: {},
      taxResidency: {},
      citizenship: {},
      declarations: {}
    },
    w8ben: {},
    documents: []
  });

  // Save form data as JSON
  const saveFormDataAsJson = () => {
    try {
      // Include document uploads in the form data
      const completeFormData = {
        ...formData,
        documents: documentUploads.map(doc => ({
          type: doc.type,
          fileName: doc.file ? doc.file.name : null
        }))
      };
      
      // Create a blob with the JSON data
      const jsonData = JSON.stringify(completeFormData, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `individual_client_data_${new Date().toISOString().slice(0, 10)}.json`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error("Error saving form data:", error);
      return false;
    }
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
  
  // Add a handleInputChange function to update formData
  const handleInputChange = (section, subsection, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [subsection]: {
          ...prevData[section][subsection],
          [field]: value
        }
      }
    }));
  };
  
  // Handle flat structure updates (for sections without subsections)
  const handleFlatInputChange = (section, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };

  // Handle checkbox inputs
  const handleCheckboxChange = (section, subsection, field, checked) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [subsection]: {
          ...prevData[section][subsection],
          [field]: checked
        }
      }
    }));
  };
  
  // Handle saving signature
  const handleSaveSignature = (signatureData) => {
    setSignatureImage(signatureData);
    handleInputChange('fatca', 'declarations', 'signature', signatureData);
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
                        <input 
                          type="text" 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                          onChange={(e) => handleInputChange('kyc', 'personalInfo', 'fullName', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth (DOB) <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                                                  <div>
                            <input 
                              type="date" 
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                              onChange={(e) => handleInputChange('kyc', 'personalInfo', 'dob', e.target.value)}
                            />
                          </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Place of Birth <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                          onChange={(e) => handleInputChange('kyc', 'personalInfo', 'placeOfBirth', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nationality <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <select 
                          className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                          onChange={(e) => handleInputChange('kyc', 'personalInfo', 'nationality', e.target.value)}
                        >
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
                        <select 
                          className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                          onChange={(e) => handleInputChange('kyc', 'personalInfo', 'countryOfResidence', e.target.value)}
                        >
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
                            <input 
  type="radio" 
  id="gender-male" 
  name="gender" 
  value="male" 
  className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]"
  onChange={() => handleInputChange('kyc', 'personalInfo', 'gender', 'male')}
/>
<label htmlFor="gender-male" className="text-base">Male</label>
                          </div>
                          <div className="flex items-center">
                            <input 
  type="radio" 
  id="gender-female" 
  name="gender" 
  value="female" 
  className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]"
  onChange={() => handleInputChange('kyc', 'personalInfo', 'gender', 'female')}
/>
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
                            <input 
                              type="radio" 
                              id="marital-single" 
                              name="marital-status" 
                              value="single" 
                              className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" 
                              onChange={() => handleInputChange('kyc', 'personalInfo', 'maritalStatus', 'single')}
                            />
                            <label htmlFor="marital-single" className="text-base">Single</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="marital-married" 
                              name="marital-status" 
                              value="married" 
                              className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" 
                              onChange={() => handleInputChange('kyc', 'personalInfo', 'maritalStatus', 'married')}
                            />
                            <label htmlFor="marital-married" className="text-base">Married</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="marital-widowed" 
                              name="marital-status" 
                              value="widowed" 
                              className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" 
                              onChange={() => handleInputChange('kyc', 'personalInfo', 'maritalStatus', 'widowed')}
                            />
                            <label htmlFor="marital-widowed" className="text-base">Widowed</label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <input 
                          type="tel" 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                          onChange={(e) => handleInputChange('kyc', 'personalInfo', 'mobileNumber', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <input 
                          type="email" 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                          onChange={(e) => handleInputChange('kyc', 'personalInfo', 'emailAddress', e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Residential Address <span className="text-[#0066FF] ml-1">*</span>
                        </label>
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" 
                          rows={3}
                          onChange={(e) => handleInputChange('kyc', 'personalInfo', 'residentialAddress', e.target.value)}
                        ></textarea>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Home Country Address <span className="text-xs text-gray-500 ml-1">(if applicable)</span>
                        </label>
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" 
                          rows={3}
                          onChange={(e) => handleInputChange('kyc', 'personalInfo', 'homeCountryAddress', e.target.value)}
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telephone Number <span className="text-xs text-gray-500 ml-1">(with Country Codes)</span>
                        </label>
                        <input 
                          type="tel" 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                          onChange={(e) => handleInputChange('kyc', 'personalInfo', 'telephoneNumber', e.target.value)}
                        />
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
                            <input 
                              type="radio" 
                              id="id-type-emirates" 
                              name="id-type" 
                              value="emirates" 
                              className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]"
                              onChange={() => handleInputChange('kyc', 'identificationDetails', 'idType', 'emirates')}
                            />
                            <label htmlFor="id-type-emirates" className="text-base">Emirates ID</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="id-type-passport" 
                              name="id-type" 
                              value="passport" 
                              className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]"
                              onChange={() => handleInputChange('kyc', 'identificationDetails', 'idType', 'passport')}
                            />
                            <label htmlFor="id-type-passport" className="text-base">Passport</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="id-type-gcc" 
                              name="id-type" 
                              value="gcc" 
                              className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]"
                              onChange={() => handleInputChange('kyc', 'identificationDetails', 'idType', 'gcc')}
                            />
                            <label htmlFor="id-type-gcc" className="text-base">GCC Identity Card</label>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ID Number <span className="text-[#0066FF] ml-1">*</span></label>
                          <input 
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            onChange={(e) => handleInputChange('kyc', 'identificationDetails', 'idNumber', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ID Expiry Date <span className="text-[#0066FF] ml-1">*</span></label>
                          <div>
                            <input 
                              type="date" 
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                              onChange={(e) => handleInputChange('kyc', 'identificationDetails', 'idExpiryDate', e.target.value)}
                            />
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
                        <input 
                          type="text" 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                          onChange={(e) => handleInputChange('kyc', 'relationshipDetails', 'purpose', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Please provide details of your source of funds <span className="text-xs text-gray-500 ml-1">(Explain in detail your source of funding)</span>
                        </label>
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" 
                          rows={3}
                          onChange={(e) => handleInputChange('kyc', 'relationshipDetails', 'sourceOfFunds', e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Please provide details of your source of wealth <span className="text-xs text-gray-500 ml-1">(How your wealth was acquired over the years)</span>
                        </label>
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" 
                          rows={3}
                          onChange={(e) => handleInputChange('kyc', 'relationshipDetails', 'sourceOfWealth', e.target.value)}
                        ></textarea>
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
                            <input 
                              type="radio" 
                              id="occupation-salaried" 
                              name="occupation-type" 
                              value="salaried" 
                              className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]"
                              onChange={() => handleInputChange('kyc', 'employmentDetails', 'occupationType', 'salaried')}
                            />
                            <label htmlFor="occupation-salaried" className="text-base">Salaried</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="occupation-self" 
                              name="occupation-type" 
                              value="self-employed" 
                              className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]"
                              onChange={() => handleInputChange('kyc', 'employmentDetails', 'occupationType', 'self-employed')}
                            />
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
                        <div>
                            <input 
                            type="date" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            onChange={(e) => handleInputChange('kyc', 'clientDeclaration', 'date', e.target.value)}
                          />
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
            
            {activeStep === 'suitability' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Suitability Assessment Questionnaire</h2>
                
                <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                  <div className="mb-4">
                    <p className="text-md text-gray-700 mb-3">
                      The information collected in this Suitability Assessment form will be used to assist in determining the suitability of investments/strategies for you. Inaccurate or incomplete information may affect the suitability of such information or any future recommendations provided to you.
                    </p>
                    <p className="text-md text-gray-700 mb-3">
                      It is strongly recommended that you provide such information required by this Questionnaire as fully as possible and any future changes in circumstances or information contained within this Assessment should be advised as soon as possible in order to ensure the continued suitability of investment information or recommendations provided to you.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* 1. INVESTMENT OBJECTIVES */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">1. INVESTMENT OBJECTIVES</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">1.1. Which answer best describes your investment objective:</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-3 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-3 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">Primarily capital preservation</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">Primarily income generation along with slight capital growth</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">To achieve a balance of income generation and capital growth</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">Primarily capital growth along with slight income generation</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">Primarily high capital growth</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 2. INVESTMENT STAGE AND ABILITY */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">2. INVESTMENT STAGE AND ABILITY</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">2.1. Which of the following best describes your current stage of life?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-3 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-3 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">Single with few financial burdens. Ready to accumulate wealth for future short term and long-term goals.</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">A couple without children. Preparing for the future by establishing a home. Expecting to have or already have a high purchase rate of household and consumer items.</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">Young family with a home. You have a mortgage and have also built up some equity. You need to maintain your standard of living while raising children and need to maintain only small cash balances.</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">A family with school going children. You have a mortgage and have built up some savings.</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">Mature family. You are in your peak earning years and your mortgage is under control. Your children have finished school or are in post-secondary education. You're ready to start thinking about your retirement goals.</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">Preparing for retirement. You can now focus on your home and have few financial burdens; you want to ensure you can afford a comfortable retirement.</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">Retired. You rely on your pension, investments, savings and investments to maintain your lifestyle in retirement. You may already be receiving a government pension and/or Superannuation pension.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 3. PRODUCT KNOWLEDGE AND EXPERIENCE */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">3. PRODUCT KNOWLEDGE AND EXPERIENCE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">3.1. Please indicate the level of knowledge and/or experience you have in the asset classes listed below:</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="py-3 px-4 border-b text-center">Product<br/>Type</th>
                              <th className="py-3 px-4 border-b text-left">Investment Product</th>
                              <th className="py-3 px-4 border-b text-center" colSpan={2}>Experience in the past 3<br/>years with any financial<br/>institution</th>
                              <th className="py-3 px-4 border-b text-center" colSpan={3}>Knowledge<br/>(relevant education or investment<br/>experience)</th>
                            </tr>
                            <tr className="bg-gray-100">
                              <th className="py-3 px-4 border-b"></th>
                              <th className="py-3 px-4 border-b"></th>
                              <th className="py-3 px-4 border-b text-center">Yes</th>
                              <th className="py-3 px-4 border-b text-center">No</th>
                              <th className="py-3 px-4 border-b text-center">Limited</th>
                              <th className="py-3 px-4 border-b text-center">Moderate</th>
                              <th className="py-3 px-4 border-b text-center">Good</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">1</td>
                              <td className="py-3 px-4 border-b">Deposits</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="deposits-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="deposits-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="deposits-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="deposits-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="deposits-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Money market instruments</td>  
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="money-market-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="money-market-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="money-market-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="money-market-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="money-market-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Foreign Exchange (Spot)</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forex-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forex-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forex-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forex-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forex-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">2</td>
                              <td className="py-3 px-4 border-b">Government bonds</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="gov-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="gov-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="gov-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="gov-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="gov-bonds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Plain vanilla investment grade bonds</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="plain-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="plain-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="plain-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="plain-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="plain-bonds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Investment grade bond funds / exchange traded funds</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="bond-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="bond-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="bond-funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="bond-funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="bond-funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Equities / Preferred Shares</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Equities / Preferred Shares</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="equities-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">3</td>
                              <td className="py-3 px-4 border-b">Private equity/debt or venture deals</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="private-equity-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="private-equity-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="private-equity-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="private-equity-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="private-equity-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Capital or partial capital protected products, Reverse Convertibles, Notes, CLNs</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="capital-protected-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="capital-protected-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="capital-protected-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="capital-protected-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="capital-protected-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Plain vanilla options</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="vanilla-options-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="vanilla-options-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="vanilla-options-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="vanilla-options-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="vanilla-options-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Dual currency investments</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="dual-currency-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="dual-currency-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="dual-currency-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="dual-currency-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="dual-currency-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">4</td>
                              <td className="py-3 px-4 border-b">Structured Notes</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="structured-notes-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="structured-notes-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="structured-notes-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="structured-notes-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="structured-notes-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Non-investment grade bonds</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Bonds with special features</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="special-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="special-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="special-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="special-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="special-bonds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Private Equity Funds/Venture Capital Funds</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Hedge funds</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="hedge-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="hedge-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="hedge-funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="hedge-funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="hedge-funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">4</td>
                              <td className="py-3 px-4 border-b">Accumulators and Decumulators</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="accumulators-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="accumulators-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="accumulators-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="accumulators-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="accumulators-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Exotic options</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="exotic-options-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="exotic-options-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="exotic-options-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="exotic-options-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="exotic-options-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Forwards / Warrants / Swaps</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forwards-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forwards-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forwards-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forwards-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="forwards-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center"></td>
                              <td className="py-3 px-4 border-b">Interest Rate Swaps</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="ir-swaps-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="ir-swaps-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="ir-swaps-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="ir-swaps-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="ir-swaps-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">6</td>
                              <td className="py-3 px-4 border-b">Listed on main markets or Private placements with an ISIN</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="listed-markets-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="listed-markets-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="listed-markets-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="listed-markets-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="listed-markets-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">7</td>
                              <td className="py-3 px-4 border-b">Straight line equities (all the equities that are traded at the major stock exchanges)</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="straight-equities-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="straight-equities-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="straight-equities-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="straight-equities-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="straight-equities-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">8</td>
                              <td className="py-3 px-4 border-b">Fixed income - various bonds, bond funds, leveraged deposits etc</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="fixed-income-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="fixed-income-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="fixed-income-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="fixed-income-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="fixed-income-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">9</td>
                              <td className="py-3 px-4 border-b">Funds- various funds and funds of funds that are globally traded</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">10</td>
                              <td className="py-3 px-4 border-b">ETF- all tradable ETF's</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="etf-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="etf-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="etf-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="etf-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="etf-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">11</td>
                              <td className="py-3 px-4 border-b">Discretionary- various discretionary mandates offered by banks, fund houses and assets managers</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="discretionary-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="discretionary-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="discretionary-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="discretionary-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="discretionary-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">12</td>
                              <td className="py-3 px-4 border-b">Derivatives - structured notes based on equities, indexes, forex, accumulators, and de-accumulators</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="derivatives-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="derivatives-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="derivatives-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="derivatives-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="derivatives-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">13</td>
                              <td className="py-3 px-4 border-b">Private equity funds and Hedge funds</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">14</td>
                              <td className="py-3 px-4 border-b">Alternatives like gold and other commodities</td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="alternatives-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="alternatives-exp" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="alternatives-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="alternatives-know" className="h-5 w-5" /></td>
                              <td className="py-3 px-4 border-b text-center"><input type="radio" name="alternatives-know" className="h-5 w-5" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 italic">The table shows your knowledge and experience with various investment products.</p>
                    </div>
                  </div>

                  {/* 4. RESPONSE TO MARKET DECLINE */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">4. RESPONSE TO MARKET DECLINE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">4.1. During market declines, I tend to sell portions of my riskier assets and invest the money in safer assets?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-3 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-3 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">a. Strongly Disagree</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">b. Disagree</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">c. Partially Agree</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">d. Agree</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">e. Strongly Agree</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 5. RISK TOLERANCE, CAPITAL LOSS AND MARKET FLUCTUATION */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">5. RISK TOLERANCE, CAPITAL LOSS AND MARKET FLUCTUATION</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">5.1. Which of the following 5 hypothetical scenarios below best describes the level of risk you are willing to bear in regard to your investment?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 w-full">
                          <thead>
                            <tr className="bg-gray-100 w-full">
                              <th colSpan={6} className="py-3 px-4 border-b text-left w-full">Description</th>
                            </tr>
                            <tr>
                              <th className="py-3 px-4 border-b w-2/6"></th>
                              <th className="py-3 px-4 border-b text-center w-1/6">Scenario 1</th>
                              <th className="py-3 px-4 border-b text-center w-1/6">Scenario 2</th>
                              <th className="py-3 px-4 border-b text-center w-1/6">Scenario 3</th>
                              <th className="py-3 px-4 border-b text-center w-1/6">Scenario 4</th>
                              <th className="py-3 px-4 border-b text-center w-1/6">Scenario 5</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b"></td>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="risk-scenario" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="risk-scenario" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="risk-scenario" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="risk-scenario" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="risk-scenario" className="h-5 w-5" />
                              </td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">Target annual return</td>
                              <td className="py-3 px-4 border-b text-center">1%</td>
                              <td className="py-3 px-4 border-b text-center">2% to 3%</td>
                              <td className="py-3 px-4 border-b text-center">4% to 5%</td>
                              <td className="py-3 px-4 border-b text-center">6% to 7%</td>
                              <td className="py-3 px-4 border-b text-center">-7%</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">Range of annual returns under normal market circumstances</td>
                              <td className="py-3 px-4 border-b text-center">-5% to 7%</td>
                              <td className="py-3 px-4 border-b text-center">-7% to 15%</td>
                              <td className="py-3 px-4 border-b text-center">-15% to 25%</td>
                              <td className="py-3 px-4 border-b text-center">-27% to 38%</td>
                              <td className="py-3 px-4 border-b text-center">-40% to 50%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 6. INVESTMENT TIME HORIZON */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">6. INVESTMENT TIME HORIZON</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">6.1. Investments have varying time horizons. Some investments have fixed, potentially long-dated time horizons. Some may even have lock-in periods. What is the longest time horizon you would consider for any investment in your portfolio? Please pick the one that applies.</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-3 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-3 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">a. Less than 1 year</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">b. 1 year to 3 years</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">c. More than 3 years and up to 10 years</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">d. More than 10 years or I have no time commitments</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 7. VOLATILITY OF RETURNS */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">7. VOLATILITY OF RETURNS</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">7.1. Considering your time horizon (holding period) and return expectations, what degree of volatility of return do you believe you can accept:</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-3 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-3 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="volatility" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">a. I can accept a low degree of volatility</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="volatility" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">b. I can accept a moderate degree of volatility</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="volatility" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">c. I can accept a moderate to high degree of volatility</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="volatility" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">d. I can accept a high degree of volatility</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 8. ASSETS UNDER ADVICE */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">8. ASSETS UNDER ADVICE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">8.1. What % of your assets is under the firm's advisory, compared to total Net-Worth?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-3 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-3 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">a. 0%-10%</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">b. 10%-40%</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">c. 40%-70%</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">d. &gt;70%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 9. LIQUIDITY PREFERENCE */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">9. LIQUIDITY PREFERENCE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">9.1. What % of your asset would you expect to withdraw to meet other financial needs within the coming 1 year?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-3 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-3 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="liquidity" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">a. More than 75%</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="liquidity" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">b. Between 51% to 75%</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="liquidity" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">c. Between 25% to 50%</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="liquidity" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">d. Less than 25%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 10. STABILITY OF INCOME */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">10. STABILITY OF INCOME</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">10.1. How secure is your current and future income from existing sources?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-3 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-3 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="income-stability" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">a. No or insignificant risk income</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="income-stability" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">b. High volatility and fluctuation of income - Income levels are not stable</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="income-stability" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">c. Secure income with low volatility at the moment with some uncertainty for the future - Mostly stable</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b text-center">
                                <input type="radio" name="income-stability" className="h-5 w-5" />
                              </td>
                              <td className="py-3 px-4 border-b">d. Long term secured income flows from various sources - Very stable</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 11. FINANCIAL SITUATION */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">11. FINANCIAL SITUATION</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">11.1. What % of total financial assets do you want to set aside for any anticipated liabilities which is not to be used for investment.</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-2 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-2 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="financial-situation" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">a. More than 75%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="financial-situation" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">b. Between 51% to 75%</td>
                              
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="financial-situation" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">c. Between 25% to 50%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="financial-situation" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">d. Less than 25%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 12. LEVERAGE IN INVESTMENT */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">12. LEVERAGE IN INVESTMENT</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">12.1. Do you currently use or intend to use leverage when investing?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-2 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-2 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="leverage" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">a. No</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="leverage" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">b. Yes</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 13. WHAT % OF TOTAL WEALTH ARE LIQUID BANKABLE ASSETS */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">13. WHAT % OF TOTAL WEALTH ARE LIQUID BANKABLE ASSETS?</h3>
                    
                    <div className="mb-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-2 px-4 border-b"></th>
                              <th style={{ width: '100%' }} className="py-2 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquid-assets" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">a. &lt;15%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquid-assets" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">b. 15%-50%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquid-assets" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">c. &gt;50%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeStep === 'classification' && (
              <div>
                <div className="space-y-6">
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <div className="mb-4">
                      <p className="text-md text-gray-700 mb-3">
                        Hilbert Investment Solutions Ltd Capital Limited ("Hilbert Investment Solutions Ltd") provides Financial Services 
                        to only Professional Clients (which includes 'assessed,' and 'deemed' Professional Clients, as set out in the 
                        Dubai Financial Services Authority ("DFSA") Rulebook.
                      </p>
                      <p className="text-md text-gray-700 mb-3">
                        You have the right to be classified as a Retail Client, which entails a higher level of protection under the DFSA 
                        Rules. However, if you are classified as a Retail Client, Hilbert Investment Solutions Ltd will not be able to offer 
                        you financial services.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">PROFESSIONAL CLIENT CLASSIFICATION</h3>
                    <p className="mb-2 italic text-gray-700">I. In order to ascertain whether you are a "Professional Client", please tick all box(es) below, as applicable to you:</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#0066FF] mt-4 mb-2">Assessed Professional Client <span className="text-xs italic">(Please choose the description which fits you.)</span></h4>
                      
                    </div>
                    
                    {/* Convert to 3-column table */}
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-1 pr-2 align-top" style={{ width: "30px" }}>
                              <span className="font-semibold">A</span>
                            </td>
                            <td className="py-1 pr-2 align-top" style={{ width: "40px" }}>
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md">An Individual who:</p>
                              <p className="text-md">has at least USD 1,000,000 in net assets<sup>1</sup> and provided Hilbert Investment Solutions Ltd Capital with sufficient proof thereof;</p>
                              <p className="font-semibold">AND</p>
                              <p className="font-semibold">Either:</p>
                              <div className="ml-4">
                                <ol className="list-decimal">
                                  <li>is or has been in the previous 12 months an employee in a relevant professional position of an Authorized Person, a Recognized Body, a Remote Body, or a Regulated Financial Institution; or</li>
                                  <li>has sufficient financial experience and understanding of relevant financial markets, products or transactions and any associated risks.</li>
                                </ol>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-1 pr-2 align-top">
                              <span className="font-semibold">B</span>
                            </td>
                            <td className="py-1 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md">An Undertaking, trust, or foundation, which is set up solely for the purpose of facilitating the management of an investment portfolio of an individual that:</p>
                              <p className="text-md">has at least USD 1,000,000 in net assets<sup>1</sup> and provided Hilbert Investment Solutions Ltd Capital with sufficient proof thereof;</p>
                              <p className="font-semibold">AND</p>
                              <p className="text-md">has sufficient financial experience and understanding of relevant financial markets, products or transactions and any associated risks.</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-1 pr-2 align-top">
                              <span className="font-semibold">C1</span>
                            </td>
                            <td className="py-1 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md">An Undertaking<sup>2</sup> that:</p>
                              <p className="text-md">has own funds<sup>4</sup> or called up capital<sup>5</sup> of at least USD 1,000,000 and has provided Hilbert Investment Solutions Ltd Capital with sufficient proof thereof;</p>
                              <p className="font-semibold">AND</p>
                              <p className="text-md">has sufficient financial experience and understanding of relevant financial markets, products or transactions and any associated risks.</p>
                              <p className="font-semibold">OR</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-1 pr-2 align-top">
                              <span className="font-semibold">C2</span>
                            </td>
                            <td className="py-1 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md">An Undertaking who has a controller<sup>3</sup>, a Holding Company, a Subsidiary, or a Joint venture partner that:</p>
                              <p className="font-semibold">Either:</p>
                              <p className="text-md">1. has own funds<sup>4</sup> or called-up capital<sup>5</sup> of at least USD 1,000,000 and has provided Hilbert Investment Solutions Ltd Capital with sufficient proof thereof;</p>
                              <p className="font-semibold">OR</p>
                              <p className="text-md">2. has at least USD 1,000,000 in net assets<sup>1</sup> and has provided Hilbert Investment Solutions Ltd with sufficient proof thereof.</p>
                              <p className="font-semibold">AND</p>
                              <p className="text-md">has sufficient financial experience and understanding of relevant financial markets, products or transactions and any associated risks.</p>
                              <p className="font-semibold">OR</p>
                              <p className="text-md">An Undertaking who has a controller<sup>3</sup>, or Holding Company, a Subsidiary or Joint venture partner who is a Deemed Professional Client, (as listed below).</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">DEEMED PROFESSIONAL CLIENT</h3>
                    <p className="mb-2 italic">An undertaking that satisfies any of the following:</p>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top" style={{ width: "40px" }}>
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md"> A properly constituted government, government agency, central bank or other national monetary authority of any country or jurisdiction</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md"> Public authority or state investment authority</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md"> Authorized Firm, a regulated financial institution, or the management company of a regulated pension fund</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md"> Collective Investment Fund / regulated pension fund i.e., an arrangement which amounts to a fund under rule 11 of the DIFC Collective Investment Law 2010 and which is established and operated under the rules made under that Law or a regulated pension fund.</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md"> Supranational organization whose members are countries, central banks, or national monetary authorities</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md"> Body corporate<sup>2</sup> whose shares are listed or admitted to trading on any regulated exchange of an IOSCO country</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md"> Authorized Market Institution, regulated exchange or regulated clearing house</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1">
                              <p className="text-md"> An Institutional Investor whose main activity is to invest in financial instruments, including an entity dedicated to the securitization of assets or other financial transactions</p>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-2">
                              A Large Undertaking: A person is a 'Large Undertaking' if it met, as at the date of its most recent financial statements, at least two of the following requirements:
                              <ul className="ml-6 list-disc mt-2">
                                <li>It has a balance sheet total<sup>6</sup> of at least $20 million;</li>
                                <li>It has an annual turnover of at least $40 million; or</li>
                                <li>It has its own funds<sup>4</sup> or called-up capital<sup>5</sup> of at least $2 million</li>
                              </ul>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-2">
                              <p className="text-md"> A trustee of a trust which has, or had during the previous 12 months, assets of at least USD 10 million;</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-2">
                              <p className="text-md"> The holder of a license under the DIFC Single Family Office Regulations with respect to its activities carried on exclusively for the purposes of, and only in so far as it is, carrying out its duties as a Single-Family Office.</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">OTHER CLASSIFICATIONS</h3>
                    
                    {/* Convert to 3-column table */}
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-1 pr-2 align-top" style={{ width: "40px" }}>
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1 pr-2 align-top" style={{ width: "30px" }}>
                              <span className="font-semibold">2</span>
                            </td>
                            <td className="py-1">
                              <p className="text-md"><span className="font-semibold">Retail Clients:</span> An Authorized Firm must classify as a Retail Client any Person who is not classified as a Professional Client or a Market Counterparty.</p>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1 pr-2 align-top">
                              <input type="checkbox" className="h-5 w-5" />
                            </td>
                            <td className="py-1 pr-2 align-top">
                              <span className="font-semibold">3</span>
                            </td>
                            <td className="py-1">
                              <p className="text-md"><span className="font-semibold">Market Counterparty</span></p>
                              <p className="text-md">Market Counterparty is potential client meeting the definition of a 'deemed' Professional Client or is an assessed Professional Client which is wholly owned by a Holding Company that is a 'deemed' Professional Client and who has been given a prior written notification of the classification as a Market Counterparty and that potential client has not requested to be classified otherwise within the period specified in the notice.</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Footnotes */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">FOOTNOTES</h3>
                    <div className="text-xs text-gray-600">
                      <p><sup>1</sup> Assets which exclude the value of the primary residence of the person and may include any assets held directly or indirectly by that person.</p>
                      <p><sup>2</sup> Body corporate or body unincorporated, including a legal person, company, partnership, unincorporated association, government or state.</p>
                      <p><sup>3</sup> 'controller' is an individual who:</p>
                      <ul className="list-none ml-4">
                        <li>a) Holds 10% or more of the shares in either the undertaking or a holding company of the undertaking;</li>
                        <li>b) Is able to appoint or remove a majority of the board members of the undertaking;</li>
                        <li>c) Controls a majority of the voting rights of the undertaking (or that of a holding company of the undertaking).</li>
                      </ul>
                      <p><sup>4</sup> Own funds means cash and investments.</p>
                      <p><sup>5</sup> Called-up capital means all the amounts paid-up on allotted shares, less any amounts owing on allotted shares.</p>
                      <p><sup>6</sup> Balance sheet total means the aggregate of the amounts shown as assets in the balance sheet before deducting both current and long-term liabilities.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeStep === 'fatca' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">OECD CRS and U.S. FATCA Self-Certification Form</h2>
                <div className="space-y-6">
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">OECD CRS and U.S. FATCA Self-Certification Form - for Individual</h3>
                    
                    <div className="bg-blue-50 p-4 border border-blue-100 rounded-md mb-4">
                      <p className="text-sm text-blue-800">
                        If you are <span className="font-bold">not</span> an individual or sole proprietorship, then you should not use this form and instead use the self-certification form for entities.
                      </p>
                    </div>
                    
                    <h4 className="font-semibold mb-3">Why am I completing this form?</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      We are required by the OECD Common Reporting Standard ("<span className="font-semibold">CRS</span>") regulations to collect and report certain information about an Account Holder's tax residence. Each jurisdiction has its own rules for defining tax residence.
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-3">
                      For the purposes of the U.S. Foreign Account Tax Compliance Act ("<span className="font-semibold">FATCA</span>"), we are required to determine whether our Account Holders are U.S. Persons.
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-3">
                      For more information on tax residence, please consult your tax advisor. Our staff are unable to assist in the completion of this form. Please refer to the definitions in Appendix A.
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-3">
                      If the Account Holder's tax residence is located outside the country where the financial account is held, we may be legally obliged to pass on the information in this form and other financial information with respect to your financial accounts to the national tax authorities or regulators or the Internal Revenue Service ("<span className="font-semibold">IRS</span>") and they may further exchange this information with competent authorities and tax regulators of other jurisdiction(s) or jurisdictions pursuant to intergovernmental agreements to exchange financial account information.
                    </p>
                    
                    <h4 className="font-semibold mt-4 mb-3">Does this form expire?</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      This form will remain valid unless there is a change in circumstances relating to the Account Holder's tax status or other mandatory fields included on this form. You must notify us of a change in circumstances, within a maximum period of 30 days from the date of such change, that makes the information in this self-certification incorrect or incomplete and provide an updated self-certification form.
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-3">
                      We may request that you submit additional documentation that supports the OECD CRS and U.S. FATCA declarations made in this self-certification form.
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-4 italic font-medium">
                      We therefore request you to complete all Parts of this self-certification form as they are all mandatory and sign the form below in PART 4.
                    </p>
                  </div>
                  
                  {/* PART 1: Identification of Account Holder */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">PART 1: Identification of Account Holder (in BLOCK CAPITALS)</h3>
                    
                    <div className="mb-4">
                      <div className="flex space-x-4 mb-4">
                        <div className="flex items-center">
                          <input type="radio" id="title-mr" name="title" value="mr" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                          <label htmlFor="title-mr" className="text-base">Mr.</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="title-mrs" name="title" value="mrs" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                          <label htmlFor="title-mrs" className="text-base">Mrs.</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="title-ms" name="title" value="ms" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                          <label htmlFor="title-ms" className="text-base">Ms.</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="title-miss" name="title" value="miss" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                          <label htmlFor="title-miss" className="text-base">Miss</label>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Family Name/Surname:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Middle Name:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth:
                          </label>
                          <input 
    type="date" 
    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
    onChange={(e) => handleInputChange('kyc', 'clientDeclaration', 'date', e.target.value)}
  />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Place of Birth:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                      </div>
                      
                      <h4 className="font-semibold mt-6 mb-3">Current Residential Address</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            House/Apartment, Number, Street:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Town/City:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal/Zip Code:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                      </div>
                      
                      <h4 className="font-semibold mt-6 mb-3">Mailing Address <span className="text-xs text-gray-500 font-normal">(Please complete only if different from Residential Address)</span></h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            House/Apartment, Number, Street:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Town/City:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal/Zip Code:
                          </label>
                          <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* PART 2: Jurisdiction of Residency for Tax Purposes */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">PART 2: Jurisdiction of Residency for Tax Purposes (CRS) (in BLOCK CAPITALS)</h3>
                    
                    <p className="mb-3 text-sm">
                      Please complete the following table indicating (i) where the Account Holder is tax resident and (ii) the Account Holder's TIN for each country/Reportable Jurisdiction indicated.
                    </p>
                    
                    <div className="bg-green-50 p-4 border border-green-100 rounded-md mb-4">
                      <p className="text-sm text-green-800">
                        If the Account Holder is a tax resident in more than three countries/jurisdictions, please use a separate sheet. If a TIN is unavailable, please provide the appropriate reason A, B or C:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-sm text-green-800">
                        <li><span className="font-semibold">Reason A</span> - The country where the Account Holder is liable to pay tax does not issue TINs to its residents.</li>
                        <li><span className="font-semibold">Reason B</span> - The Account Holder is otherwise unable to obtain a TIN or equivalent number (Please explain why you are unable to obtain a TIN in the below table if you have selected this reason).</li>
                        <li><span className="font-semibold">Reason C</span> - No TIN is required. (Note: Only select this reason if the domestic law of the relevant jurisdiction does not require the collection of the TIN issued by such jurisdiction).</li>
                      </ul>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 mb-4">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 border text-center">No</th>
                            <th className="py-2 px-4 border text-left">Country/Jurisdiction of tax residence (no abbreviations)</th>
                            <th className="py-2 px-4 border text-left">TIN (Taxpayer Identification Number e.g. Social Security Number)</th>
                            <th className="py-2 px-4 border text-left">If no TIN is available, please enter Reason A, B or C</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-4 border text-center">1</td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-2 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-2 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border">
                              <select className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select a reason</option>
                                <option value="A">Reason A</option>
                                <option value="B">Reason B</option>
                                <option value="C">Reason C</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border text-center">2</td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-2 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-2 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border">
                              <select className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select a reason</option>
                                <option value="A">Reason A</option>
                                <option value="B">Reason B</option>
                                <option value="C">Reason C</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border text-center">3</td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-2 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-2 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border">
                              <select className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select a reason</option>
                                <option value="A">Reason A</option>
                                <option value="B">Reason B</option>
                                <option value="C">Reason C</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Please explain in the following boxes why the Account Holder is unable to obtain a TIN if you selected Reason B above:</h4>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" 
                        rows={4}
                      ></textarea>
                    </div>
                    
                    <div className="mb-6">
                      <p className="mb-2 font-semibold">
                        I declare I am ONLY a Tax Resident in the jurisdiction(s) listed above in Table A, even if (Hilbert Investment Solutions Ltd) has collected and holds addresses in other jurisdictions that are not listed above:
                      </p>
                      <div className="flex space-x-6 mb-4">
                        <div className="flex items-center">
                          <input type="radio" id="only-tax-yes" name="only-tax" value="yes" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                          <label htmlFor="only-tax-yes" className="text-base">Yes</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="only-tax-no" name="only-tax" value="no" className="mr-2 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" />
                          <label htmlFor="only-tax-no" className="text-base">No</label>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-2">If you have ticked no, please provide a reason for this in the following box:</p>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" 
                        rows={3}
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* PART 3: Jurisdiction of Citizenship */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">PART 3: Jurisdiction of Citizenship (U.S. FATCA) (in Block Capitals)</h3>
                    
                    <div className="mb-6">
                      <div className="flex items-start mb-4">
                        <input 
                          type="checkbox" 
                          id="us-person-yes" 
                          className="mr-2 mt-1 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" 
                        />
                        <label htmlFor="us-person-yes" className="text-base">
                          I am a U.S. Person for tax purposes and my U.S. Taxpayer Identification Number (e.g., <i>TIN, social security number</i>) is:
                        </label>
                      </div>
                      
                      <div className="flex gap-2 mb-6 ml-8">
                        <input type="text" className="w-10 h-10 p-2 border border-gray-300 rounded-md text-center" maxLength={1} />
                        <input type="text" className="w-10 h-10 p-2 border border-gray-300 rounded-md text-center" maxLength={1} />
                        <input type="text" className="w-10 h-10 p-2 border border-gray-300 rounded-md text-center" maxLength={1} />
                        <span className="text-2xl self-center">-</span>
                        <input type="text" className="w-10 h-10 p-2 border border-gray-300 rounded-md text-center" maxLength={1} />
                        <input type="text" className="w-10 h-10 p-2 border border-gray-300 rounded-md text-center" maxLength={1} />
                        <span className="text-2xl self-center">-</span>
                        <input type="text" className="w-10 h-10 p-2 border border-gray-300 rounded-md text-center" maxLength={1} />
                        <input type="text" className="w-10 h-10 p-2 border border-gray-300 rounded-md text-center" maxLength={1} />
                        <input type="text" className="w-10 h-10 p-2 border border-gray-300 rounded-md text-center" maxLength={1} />
                        <input type="text" className="w-10 h-10 p-2 border border-gray-300 rounded-md text-center" maxLength={1} />
                      </div>
                      
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="us-person-no" 
                          className="mr-2 mt-1 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" 
                        />
                        <label htmlFor="us-person-no" className="text-base">
                          I am <span className="font-bold">not</span> a U.S. Person for tax purposes.
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* PART 4: Declarations and Signature */}
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">PART 4: Declarations and Signature</h3>
                    
                    <p className="text-sm text-gray-700 mb-4">
                      I understand that the information supplied by me is covered by the full provisions of the terms and conditions governing the Account Holder's relationship with Hilbert Investment Solutions Ltd setting out how Hilbert Investment Solutions Ltd may use and share the information supplied by me.
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-4">
                      I acknowledge that the information contained in this form and information regarding the Account Holder and any Reportable Account(s) may be provided to the tax authorities of the country/jurisdiction in which this account(s) is/are maintained and exchanged with tax authorities of another country/jurisdiction or countries/jurisdictions in which the Account Holder may be tax resident pursuant to intergovernmental agreements to exchange financial account information.
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-6">
                      I certify that I am the Account Holder (or am authorized to sign for the Account Holder) of all the account(s) to which this form relates.
                    </p>
                    
                    <div className="mb-6">
                      <p className="font-bold">I declare that all statements made in this declaration are, to the best of my knowledge and belief, correct and complete.</p>
                      
                      <p className="mt-4 mb-2">
                        I undertake to advise Hilbert Investment Solutions Ltd within 30 days of any change in circumstances which affects the tax residency status of the individual identified in Part 1 of this form or causes the information contained herein to become incorrect or incomplete, and to provide Hilbert Investment Solutions Ltd with a suitably updated self-certification and Declaration within 30 days of such change in circumstances.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Signature <span className="text-[#0066FF] ml-1">*</span></label>
                        {signatureImage ? (
                          <div className="relative w-full p-6 border border-gray-300 rounded-md bg-white">
                            <img 
                              src={signatureImage} 
                              alt="Signature" 
                              className="max-h-24 mx-auto" 
                            />
                            <button 
                              onClick={() => setIsSignaturePopupOpen(true)}
                              className="absolute top-2 right-2 text-xs text-blue-600 hover:text-blue-800"
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setIsSignaturePopupOpen(true)}
                            className="w-full p-6 border border-dashed border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              <span>Click to sign</span>
                            </div>
                          </button>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Print name <span className="text-[#0066FF] ml-1">*</span></label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date <span className="text-[#0066FF] ml-1">*</span></label>
                        <div>
                            <input 
                            type="date" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            onChange={(e) => handleInputChange('kyc', 'clientDeclaration', 'date', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Note:</span> If you are not the Account Holder please indicate the capacity in which you are signing the form. If signing under a power of attorney please also attach a certified copy of the power of attorney.
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Capacity <span className="text-xs text-gray-500">(if applicable)</span>:</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeStep === 'w8ben' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">W8BEN-E Form</h2>
                <div className="space-y-6">
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting</h3>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 mb-3">
                        Form W-8BEN-E is used by foreign entities to certify their foreign status for U.S. tax purposes. This form is required by U.S. tax regulations to establish that you are not a U.S. person and to claim treaty benefits (if applicable).
                      </p>
                      
                      <p className="text-sm text-gray-700 mb-6">
                        Please download the form below, complete all relevant sections, and upload the signed document.
                      </p>
                      
                      <div className="bg-blue-50 p-4 border border-blue-100 rounded-md mb-6">
                        <p className="text-sm text-blue-800 font-semibold mb-2">Important Instructions:</p>
                        <ul className="list-disc list-inside text-sm text-blue-800">
                          <li>The form must be filled out completely and accurately</li>
                          <li>All required fields must be completed</li>
                          <li>The form must be signed and dated</li>
                          <li>Upload the completed form using the upload section below</li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-center mb-6">
                        <a 
                          href="/uploads/W-8BEN-E.pdf" 
                          download
                          className="flex items-center justify-center bg-[#0066FF] hover:bg-[#0055DD] text-white py-3 px-6 rounded-md transition duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download W-8BEN-E Form
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">Upload Completed W-8BEN-E Form</h3>
                    
                    <div className="mb-6">
                      <p className="text-sm text-gray-700 mb-4">
                        After completing and signing the W-8BEN-E form, please upload it here. The document must be in PDF format.
                      </p>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        
                        <p className="text-sm text-gray-600 mb-2">Drag and drop your file here, or</p>
                        
                        <label htmlFor="w8ben-upload" className="cursor-pointer bg-white hover:bg-gray-50 text-[#0066FF] border border-[#0066FF] rounded-md py-2 px-4 text-sm font-medium">
                          Browse files
                          <input 
                            id="w8ben-upload" 
                            type="file" 
                            accept=".pdf" 
                            className="hidden" 
                            onChange={(e) => {
                              // Handle file upload logic here
                              console.log(e.target.files);
                            }}
                          />
                        </label>
                        
                        <p className="text-xs text-gray-500 mt-2">Accepted file types: PDF only (Max: 5MB)</p>
                      </div>
                    </div>
                    
                    <div className="hidden">
                      {/* This section will show once a file is uploaded */}
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <p className="text-green-800 font-medium">File uploaded successfully!</p>
                          <p className="text-sm text-green-700">W-8BEN-E.pdf (1.2 MB)</p>
                          <button className="text-sm text-red-600 hover:text-red-800 mt-1 focus:outline-none">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">Declaration</h3>
                    
                    <div className="mb-4">
                      <div className="flex items-start mb-4">
                        <input 
                          type="checkbox" 
                          id="w8ben-declaration" 
                          className="mr-2 mt-1 h-5 w-5 text-[#0066FF] focus:ring-[#0066FF]" 
                        />
                        <label htmlFor="w8ben-declaration" className="text-sm text-gray-700">
                          I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that:
                          <ul className="list-disc list-inside mt-2 ml-4">
                            <li>I am the individual that is the beneficial owner (or am authorized to sign for the individual that is the beneficial owner) of all the income to which this form relates</li>
                            <li>The beneficial owner is not a U.S. person</li>
                            <li>The income to which this form relates is not effectively connected with the conduct of a trade or business in the United States</li>
                            <li>I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the income of which I am the beneficial owner or any withholding agent that can disburse or make payments of the income of which I am the beneficial owner</li>
                          </ul>
                        </label>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-[#0066FF] ml-1">*</span></label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date <span className="text-[#0066FF] ml-1">*</span></label>
                        <div>
                            <input 
                            type="date" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            onChange={(e) => handleInputChange('kyc', 'clientDeclaration', 'date', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeStep === 'documents' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Document Upload</h2>
                <div className="space-y-6">
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <div className="mb-4">
                      <p className="text-md text-gray-700 mb-3">
                        Please upload the required documents to complete your application. Only one file can be uploaded at a time.
                      </p>
                      <p className="text-md text-gray-700 mb-3">
                        Acceptable file formats: <span className="font-semibold">PDF, JPEG, PNG</span>
                      </p>
                      <p className="text-md text-gray-700 mb-3">
                        Maximum file size: <span className="font-semibold">10MB</span> per upload
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">UPLOAD DOCUMENT</h3>
                    
                    {documentUploads.map((upload, index) => (
                      <div key={upload.id} className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                            <select 
                              className="w-full p-2 border border-gray-300 rounded-md"
                              value={upload.type}
                              onChange={(e) => {
                                const newUploads = [...documentUploads];
                                newUploads[index].type = e.target.value;
                                setDocumentUploads(newUploads);
                              }}
                            >
                              <option value="">Select document type</option>
                              <option value="passport">Passport</option>
                              <option value="visa">Visa</option>
                              <option value="emirates_id">Emirates ID/National ID</option>
                              <option value="proof_address">Proof of Address (not more than 3 months old)</option>
                              <option value="utility_bill">Utility Bill</option>
                              <option value="bank_statement">Bank Statement</option>
                              <option value="payslip">Latest 3 months' Pay Slips</option>
                              <option value="source_funds">Source of Funds Documentation</option>
                              <option value="source_wealth">Source of Wealth Documentation</option>
                              <option value="tax_id">Tax Identification Number (if applicable)</option>
                              <option value="w8ben">Completed W-8BEN-E Form</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                            <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
                              <div className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="mt-1 text-sm text-gray-600">Drag and drop your file here, or click to browse</p>
                                <p className="mt-1 text-xs text-gray-500">PDF, JPEG, or PNG up to 10MB</p>
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept=".pdf,.jpeg,.jpg,.png"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const newUploads = [...documentUploads];
                                      newUploads[index].file = e.target.files[0];
                                      setDocumentUploads(newUploads);
                                    }
                                  }}
                                />
                                <button 
                                  className="mt-3 px-4 py-2 bg-[#0066FF] text-white text-sm rounded-md hover:bg-[#0055DD]"
                                  onClick={() => {
                                    // Trigger the hidden file input
                                    const fileInput = document.querySelectorAll('input[type="file"]')[index] as HTMLInputElement;
                                    fileInput.click();
                                  }}
                                >
                                  Browse Files
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {index === documentUploads.length - 1 && (
                            <div className="flex justify-end space-x-3">
                              <button 
                                className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-200"
                                onClick={addMoreDocuments}
                              >
                                Add More
                              </button>
                              <button className="px-4 py-2 bg-[#0066FF] text-white text-sm rounded-md hover:bg-[#0055DD]">
                                Upload Document
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-[#F8FAFC] p-6 rounded-md mb-6 border border-gray-100 shadow-sm">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-6">REQUIRED DOCUMENTS</h3>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <h4 className="font-semibold text-[#0066FF] mb-3">For Individuals:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Valid and Certified passport copies</li>
                        <li>Copy of valid UAE residence visa and Emirates ID (front and back) for UAE residents</li>
                        <li>Utility bill, bank account statement, credit card statement or other certified document (less than 3 months old) reflecting your residential address</li>
                        <li>Proof of Source of Wealth/Source of Income</li>
                        <li>For salaried individuals - Latest 3 months' pay slips and 3 months' bank statements showing salary deposits</li>
                        <li>For self-employed individuals - Business ownership documentation, financial statements, and bank statements</li>
                        <li>For income from investments - Investment statements or confirmation of funds</li>
                        <li>For income from property - Property ownership documents and rental agreements</li>
                        <li>Completed W-8BEN-E Form (if applicable)</li>
                      </ul>
                      
                      <div className="mt-4 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                        <p className="font-semibold">Important Notes:</p>
                        <ul className="list-disc pl-6 mt-2">
                          <li>ID documents, address proof and income documents need to be certified.</li>
                          <li>All documents must be in English or accompanied by a certified translation.</li>
                          <li>Electronic copies of documents must be clear and legible.</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <h4 className="font-semibold text-[#0066FF] mb-3">Uploaded Documents</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Uploaded</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {/* Example row - this will be replaced with real data */}
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No documents uploaded yet</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                            </tr>
                          </tbody>
                        </table>
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
            
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                className="text-[#0066FF] hover:text-[#0055DD] border-[#0066FF]"
                onClick={() => {
                  const saved = saveFormDataAsJson();
                  if (saved) {
                    alert('Draft saved successfully as JSON file!');
                  }
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
                    const saved = saveFormDataAsJson();
                    if (saved) {
                      alert('Form submitted successfully! Client data has been saved as a JSON file.');
                    } else {
                      alert('There was an error saving the client data. Please try again.');
                    }
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
      
      {/* Signature Canvas Popup */}
      <SignatureCanvas
        isOpen={isSignaturePopupOpen}
        onClose={() => setIsSignaturePopupOpen(false)}
        onSave={handleSaveSignature}
      />
                  </div>
  );
};

export default IndividualOnboarding; 