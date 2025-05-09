import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CorporateOnboarding = () => {
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
          {/* Removed Back to Home button */}
          
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl text-gray-700 font-semibold">Corporate Client Onboarding</h1>
            {/* Removed Hilbert logo */}
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
                            ? 'bg-[#E5F0FF] border-2 border-[#0066FF]' 
                            : 'bg-gray-100 border-2 border-gray-300'
                      }`}>
                        {renderIcon(step.icon, isCompleted, isActive)}
                      </div>
                      <span className={`text-sm font-medium ${
                        isCompleted 
                          ? 'text-green-600' 
                          : isActive 
                            ? 'text-[#0066FF]' 
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
                <h2 className="text-xl font-semibold mb-4">Know Your Customer – Corporate Due Diligence Form</h2>
                <div className="space-y-6">
                  {/* CLIENT IDENTIFICATION DETAILS */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">CLIENT IDENTIFICATION DETAILS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-xs text-gray-500">as per the License</span></label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Legal Form</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Licensing Authority</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">If the Company is Listed, then indicate the Stock Exchange</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Incorporation/Registration</label>
                        <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country of Incorporation/Registration</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option value="">Select country</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* CLIENT IDENTIFICATION DOCUMENT DETAILS */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">CLIENT IDENTIFICATION DOCUMENT DETAILS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date of the License</label>
                        <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date of the License</label>
                        <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Identification Number</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </div>

                  {/* CONTACT DETAILS */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">CONTACT DETAILS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <input type="tel" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input type="url" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Office Landline Number <span className="text-xs text-gray-500">with Country Code</span></label>
                        <input type="tel" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Registered Office Address</label>
                        <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={3}></textarea>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Address <span className="text-xs text-gray-500">if applicable</span></label>
                        <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={3}></textarea>
                      </div>
                    </div>
                  </div>

                  {/* BUSINESS ACTIVITY / FINANCIAL INFORMATION */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">BUSINESS ACTIVITY / FINANCIAL INFORMATION</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of Business Activities <span className="text-xs text-gray-500">as per the License</span></label>
                        <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={2}></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Does the company have any direct or indirect subsidiaries? <span className="text-xs text-gray-500">If yes, then please provide details</span></label>
                        <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={2}></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Market</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Product/s</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Annual Turnover for the Current Year</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. of Employees within the Company</label>
                        <input type="number" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </div>

                  {/* NATURE AND PURPOSE OF RELATIONSHIP */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">NATURE AND PURPOSE OF RELATIONSHIP WITH HILBERT INVESTMENT SOLUTIONS LTD</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of relationship</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Please provide details of your source of funds <span className="text-xs text-gray-500">Specify</span></label>
                        <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={2}></textarea>
                      </div>
                    </div>
                  </div>

                  {/* CORPORATE SHAREHOLDING DETAILS */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">CORPORATE SHAREHOLDING DETAILS</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 mb-4">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-left">Name of the Shareholder/Owners/Partners</th>
                            <th className="py-2 px-4 border-b text-left">Shareholding Percentage %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(3)].map((_, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 border-b">
                                <input type="text" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                              <td className="py-2 px-4 border-b">
                                <input type="number" min="0" max="100" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h4 className="text-[#0066FF] font-semibold mb-2">Ultimate Beneficial Owner (UBO) Details</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 mb-4">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-left">Name of the UBO</th>
                            <th className="py-2 px-4 border-b text-left">Shareholding %</th>
                            <th className="py-2 px-4 border-b text-left">Date of Birth</th>
                            <th className="py-2 px-4 border-b text-left">Nationality</th>
                            <th className="py-2 px-4 border-b text-left">Current Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(2)].map((_, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 border-b">
                                <input type="text" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                              <td className="py-2 px-4 border-b">
                                <input type="number" min="0" max="100" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                              <td className="py-2 px-4 border-b">
                                <input type="date" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                              <td className="py-2 px-4 border-b">
                                <input type="text" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                              <td className="py-2 px-4 border-b">
                                <input type="text" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h4 className="text-[#0066FF] font-semibold mb-2">Senior Management/Authorized Person</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-left">Name</th>
                            <th className="py-2 px-4 border-b text-left">Designation</th>
                            <th className="py-2 px-4 border-b text-left">Date of Birth</th>
                            <th className="py-2 px-4 border-b text-left">Nationality</th>
                            <th className="py-2 px-4 border-b text-left">Current Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(3)].map((_, index) => (
                            <tr key={index}>
                              <td className="py-2 px-4 border-b">
                                <input type="text" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                              <td className="py-2 px-4 border-b">
                                <input type="text" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                              <td className="py-2 px-4 border-b">
                                <input type="date" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                              <td className="py-2 px-4 border-b">
                                <input type="text" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                              <td className="py-2 px-4 border-b">
                                <input type="text" className="w-full p-1 border border-gray-300 rounded-md" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* POLITICAL EXPOSED PERSON DECLARATION */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">POLITICAL EXPOSED PERSON DECLARATION</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Are shareholders, senior management and/or authorized signatory entrusted with prominent public functions in United Arab Emirates or any other Foreign country such as Heads of States or Governments, Senior Politicians, Senior Government Officials, Judicial or Military Officials, Senior Executives of State-owned Corporations, and Senior Officials of Political Parties and persons who are, or have previously been, entrusted with the management of an international organization or any prominent function within such an organization?
                    </p>
                    <div className="flex space-x-4 mb-2">
                      <div className="flex items-center">
                        <input type="radio" id="pep-yes" name="pep-declaration" value="yes" className="mr-2" />
                        <label htmlFor="pep-yes">Yes</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="pep-no" name="pep-declaration" value="no" className="mr-2" />
                        <label htmlFor="pep-no">No</label>
                      </div>
                    </div>
                  </div>

                  {/* CLIENT DECLARATION */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">CLIENT DECLARATION</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      I <span className="font-bold">(Company Name)</span>, represented by <span className="font-bold">(Authorized Representative's Full Name)</span>, hereby declares that the information provided above on behalf of the company is true, accurate, and complete to the best of our knowledge and belief. We acknowledge and understand that Hilbert Investment Solutions Ltd may process the company's personal information in accordance with the attached Privacy Notice for the purpose of providing services.
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                      We are fully aware of the consequences that may arise from providing false or misleading information and accept sole responsibility for the accuracy and authenticity of the details provided on behalf of the company.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Authorized Person's Signature</label>
                        <div className="w-full p-6 border border-gray-300 rounded-md bg-white"></div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Place</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">PRIVACY NOTICE</h3>
                    <p className="text-sm mb-4">
                      Hilbert Investment Solutions Ltd ("the Company") takes privacy seriously and respects the privacy of every client 
                      for whom we provide services ("the Services"). In order to effectively provide the Services to you, the company 
                      collects certain personal information.
                    </p>
                    <p className="text-sm mb-4">
                      Please note that the lists below are not exhaustive, and there may be other examples where we hold, collect, use, or 
                      process personal information in order to provide the Services.
                    </p>
                    
                    <h4 className="text-[#0066FF] font-bold mb-2">THE PERSONAL INFORMATION WE MAY HOLD</h4>
                    <p className="text-sm mb-3">
                      As a client (or potential client) of the Company, we may hold the following categories of personal information about 
                      you. This information may be considered sensitive due to its nature:
                    </p>
                    <ul className="list-disc ml-6 mb-4 text-sm">
                      <li className="mb-2">
                        Information you provide when you become a client, as required under Customer Due Diligence and/or Anti 
                        Money Laundering compliance practices. This may include your name, title, address, telephone number, 
                        email address, date of birth, passport information, Emirates ID number, nationality, and superficial financial 
                        information.
                      </li>
                      <li>Information provided in the course of us providing the Services.</li>
                    </ul>
                    
                    <h4 className="text-[#0066FF] font-bold mb-2">HOW WE MAY USE YOUR PERSONAL INFORMATION</h4>
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
                      <li>Setting you up as a new client in our system.</li>
                      <li>Facilitating the effective performance of the Services.</li>
                      <li>Complying with legal obligations.</li>
                      <li>Supplying statutory information.</li>
                    </ul>
                    
                    <h4 className="text-[#0066FF] font-bold mb-2">SHARING YOUR PERSONAL INFORMATION</h4>
                    <p className="text-sm mb-3">
                      We may need to share your personal information with third parties. These third parties may include:
                    </p>
                    <ul className="list-disc ml-6 mb-4 text-sm">
                      <li>Professional advisers, such as lawyers and accountants, or governmental or regulatory authorities.</li>
                      <li>Third party professionals, such as arbitrators, accountants, tax professionals, advisors, counsel, court personnel.</li>
                    </ul>
                    
                    <h4 className="text-[#0066FF] font-bold mb-2">SECURITY OF YOUR PERSONAL INFORMATION</h4>
                    <p className="text-sm mb-3">
                      We place a high priority on the security of your personal information and have implemented stringent measures to 
                      ensure its protection. Access to your information is restricted to authorized personnel with a designated legitimate need 
                      for access.
                    </p>
                    <p className="text-sm mb-3">
                      We have established efficient procedures to promptly address and mitigate any data security breaches that might occur, 
                      minimizing potential risk. Safeguarding your information is crucial to us, and we consistently calibrate our practices 
                      to maintain the security and confidentiality of your data, earning and maintaining your trust.
                    </p>
                    
                    <h4 className="text-[#0066FF] font-bold mb-2">RETENTION OF YOUR PERSONAL INFORMATION</h4>
                    <p className="text-sm mb-3">
                      We will retain pertinent records for a minimum duration of six years from the date of our last 
                      engagement with a client. However, in accordance with our legal, regulatory, or professional obligations, we may be 
                      required to retain such information for a longer period beyond the documented relationship.
                    </p>
                    
                    <h4 className="text-[#0066FF] font-bold mb-2">YOUR RIGHTS IN RELATION TO YOUR PERSONAL INFORMATION</h4>
                    <p className="text-sm mb-3">
                      Under certain circumstances, you may have rights regarding your personal information, including the right to access, 
                      correct, erase and limit the use of your personal information. If you have any questions or requests regarding your rights, please email us at 
                      <a href="mailto:Hilbert@invetsolutions.ae" className="text-[#0066FF] mx-1">Hilbert@invetsolutions.ae</a>. 
                      We will address your concerns promptly and assist you accordingly.
                    </p>
                    
                    <h4 className="text-[#0066FF] font-bold mb-2">DATA PRIVACY TEAM</h4>
                    <p className="text-sm mb-3">
                      We have appointed a Data Protection Officer (DPO) who is responsible for overseeing compliance with this Privacy 
                      Notice. If you have any inquiries or concerns regarding this Privacy Notice or the handling of your personal 
                      information, please contact us via email at <a href="mailto:Hilbert@invetsolutions.ae" className="text-[#0066FF]">Hilbert@invetsolutions.ae</a>.
                    </p>
                    <p className="text-sm">
                      Our Data Protection Officer will address your questions and provide assistance as necessary!
                    </p>
                    
                    <div className="flex items-center mt-6">
                      <input type="checkbox" id="privacy-acknowledge" className="mr-3 h-5 w-5" />
                      <label htmlFor="privacy-acknowledge" className="text-base font-medium text-[#0066FF]">I acknowledge</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeStep === 'suitability' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Suitability Assessment Questionnaire</h2>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
                  <div className="mb-4">
                    {/* <div className="flex items-center mb-3">
                      <label className="block text-md font-bold text-gray-700">Client Name</label>
                    </div> */}
                    
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
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">1. INVESTMENT OBJECTIVES</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">1.1. Which answer best describes your investment objective:</h4>
                      
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
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">Primarily capital preservation</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">Primarily income generation along with slight capital growth</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">To achieve a balance of income generation and capital growth</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">Primarily capital growth along with slight income generation</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">Primarily high capital growth</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 2. INVESTMENT STAGE AND ABILITY */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">2. INVESTMENT STAGE AND ABILITY</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">2.1. Which of the following best describes your current stage of life?</h4>
                      
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
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">Single with few financial burdens. Ready to accumulate wealth for future short term and long-term goals.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">A couple without children. Preparing for the future by establishing a home. Expecting to have or already have a high purchase rate of household and consumer items.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">Young family with a home. You have a mortgage and have also built up some equity. You need to maintain your standard of living while raising children and need to maintain only small cash balances.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">A family with school going children. You have a mortgage and have built up some savings.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">Mature family. You are in your peak earning years and your mortgage is under control. Your children have finished school or are in post-secondary education. You're ready to start thinking about your retirement goals.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">Preparing for retirement. You can now focus on your home and have few financial burdens; you want to ensure you can afford a comfortable retirement.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">Retired. You rely on your pension, investments, savings and investments to maintain your lifestyle in retirement. You may already be receiving a government pension and/or Superannuation pension.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 3. PRODUCT KNOWLEDGE AND EXPERIENCE */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">3. PRODUCT KNOWLEDGE AND EXPERIENCE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">3.1. Please indicate the level of knowledge and/or experience you have in the asset classes listed below:</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="py-2 px-4 border-b text-center">Product<br/>Type</th>
                              <th className="py-2 px-4 border-b text-left">Investment Product</th>
                              <th className="py-2 px-4 border-b text-center" colSpan={2}>Experience in the past 3<br/>years with any financial<br/>institution</th>
                              <th className="py-2 px-4 border-b text-center" colSpan={3}>Knowledge<br/>(relevant education or investment<br/>experience)</th>
                            </tr>
                            <tr className="bg-gray-100">
                              <th className="py-2 px-4 border-b"></th>
                              <th className="py-2 px-4 border-b"></th>
                              <th className="py-2 px-4 border-b text-center">Yes</th>
                              <th className="py-2 px-4 border-b text-center">No</th>
                              <th className="py-2 px-4 border-b text-center">Limited</th>
                              <th className="py-2 px-4 border-b text-center">Moderate</th>
                              <th className="py-2 px-4 border-b text-center">Good</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">1</td>
                              <td className="py-2 px-4 border-b">Deposits</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Money market instruments</td>  
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Foreign Exchange (Spot)</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">2</td>
                              <td className="py-2 px-4 border-b">Government bonds</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="gov-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="gov-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="gov-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="gov-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="gov-bonds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Plain vanilla investment grade bonds</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="plain-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="plain-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="plain-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="plain-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="plain-bonds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Investment grade bond funds / exchange traded funds</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="bond-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="bond-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="bond-funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="bond-funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="bond-funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Equities / Preferred Shares</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="equities-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="equities-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="equities-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="equities-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="equities-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">3</td>
                              <td className="py-2 px-4 border-b">Private equity/debt or venture deals</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="private-equity-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="private-equity-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="private-equity-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="private-equity-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="private-equity-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Capital or partial capital protected products, Reverse Convertibles, Notes, CLNs</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="capital-protected-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="capital-protected-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="capital-protected-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="capital-protected-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="capital-protected-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Plain vanilla options</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="vanilla-options-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="vanilla-options-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="vanilla-options-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="vanilla-options-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="vanilla-options-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Dual currency investments</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="dual-currency-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="dual-currency-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="dual-currency-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="dual-currency-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="dual-currency-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">4</td>
                              <td className="py-2 px-4 border-b">Structured Notes</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="structured-notes-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="structured-notes-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="structured-notes-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="structured-notes-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="structured-notes-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Non-investment grade bonds</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="non-investment-bonds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Bonds with special features</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="special-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="special-bonds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="special-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="special-bonds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="special-bonds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Private Equity Funds/Venture Capital Funds</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-vc-funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Hedge funds</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="hedge-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="hedge-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="hedge-funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="hedge-funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="hedge-funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">4</td>
                              <td className="py-2 px-4 border-b">Accumulators and Decumulators</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="accumulators-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="accumulators-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="accumulators-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="accumulators-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="accumulators-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Exotic options</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="exotic-options-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="exotic-options-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="exotic-options-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="exotic-options-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="exotic-options-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Forwards / Warrants / Swaps</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forwards-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forwards-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forwards-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forwards-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forwards-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Interest Rate Swaps</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="ir-swaps-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="ir-swaps-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="ir-swaps-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="ir-swaps-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="ir-swaps-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">6</td>
                              <td className="py-2 px-4 border-b">Listed on main markets or Private placements with an ISIN</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="listed-markets-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="listed-markets-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="listed-markets-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="listed-markets-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="listed-markets-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">7</td>
                              <td className="py-2 px-4 border-b">Straight line equities (all the equities that are traded at the major stock exchanges)</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="straight-equities-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="straight-equities-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="straight-equities-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="straight-equities-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="straight-equities-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">8</td>
                              <td className="py-2 px-4 border-b">Fixed income - various bonds, bond funds, leveraged deposits etc</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="fixed-income-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="fixed-income-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="fixed-income-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="fixed-income-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="fixed-income-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">9</td>
                              <td className="py-2 px-4 border-b">Funds- various funds and funds of funds that are globally traded</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">10</td>
                              <td className="py-2 px-4 border-b">ETF- all tradable ETF's</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="etf-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="etf-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="etf-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="etf-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="etf-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">11</td>
                              <td className="py-2 px-4 border-b">Discretionary- various discretionary mandates offered by banks, fund houses and assets managers</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="discretionary-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="discretionary-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="discretionary-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="discretionary-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="discretionary-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">12</td>
                              <td className="py-2 px-4 border-b">Derivatives - structured notes based on equities, indexes, forex, accumulators, and de-accumulators</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="derivatives-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="derivatives-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="derivatives-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="derivatives-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="derivatives-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">13</td>
                              <td className="py-2 px-4 border-b">Private equity funds and Hedge funds</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="pe-hedge-funds-know" className="h-5 w-5" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">14</td>
                              <td className="py-2 px-4 border-b">Alternatives like gold and other commodities</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="alternatives-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="alternatives-exp" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="alternatives-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="alternatives-know" className="h-5 w-5" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="alternatives-know" className="h-5 w-5" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 italic">The table shows your knowledge and experience with various investment products.</p>
                    </div>
                  </div>

                  {/* 4. RESPONSE TO MARKET DECLINE */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">5. RESPONSE TO MARKET DECLINE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">5.1. During market declines, I tend to sell portions of my riskier assets and invest the money in safer assets?</h4>
                      
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
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">a. Strongly Disagree</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">b. Disagree</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">c. Partially Agree</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">d. Agree</td>

                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="market-decline" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">e. Strongly Agree</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 6. RISK TOLERANCE, CAPITAL LOSS AND MARKET FLUCTUATION */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">6. RISK TOLERANCE, CAPITAL LOSS AND MARKET FLUCTUATION</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">6.1. Which of the following 5 hypothetical scenarios below best describes the level of risk you are willing to bear in regard to your investment?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '100%' }} className="py-2 px-4 border-b text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b">Target annual return</td>
                              <td className="py-2 px-4 border-b text-center">1%</td>
                              <td className="py-2 px-4 border-b text-center">2% to 3%</td>
                              <td className="py-2 px-4 border-b text-center">4% to 5%</td>
                              <td className="py-2 px-4 border-b text-center">6% to 7%</td>
                              <td className="py-2 px-4 border-b text-center">-7%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b">Range of annual returns under normal market circumstances</td>
                              <td className="py-2 px-4 border-b text-center">-5% to 7%</td>
                              <td className="py-2 px-4 border-b text-center">-7% to 15%</td>
                              <td className="py-2 px-4 border-b text-center">-15% to 25%</td>
                              <td className="py-2 px-4 border-b text-center">-27% to 38%</td>
                              <td className="py-2 px-4 border-b text-center">-40% to 50%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 7. INVESTMENT TIME HORIZON */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">7. INVESTMENT TIME HORIZON</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">7.1. Investments have varying time horizons. Some investments have fixed, potentially long-dated time horizons. Some may even have lock-in periods. What is the longest time horizon you would consider for any investment in your portfolio? Please pick the one that applies.</h4>
                      
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
                                <input type="radio" name="time-horizon" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">a. Less than 1 year</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">b. More than 1 year and up to 3 years</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">c. More than 3 years and up to 10 years</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">d. More than 10 years or we have no time commitments</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 8. VOLATILITY OF RETURNS */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">8. VOLATILITY OF RETURNS</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">8.1. Considering your time horizon (holding period) and return expectations, what degree of volatility of return do you believe you can accept:</h4>
                      
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
                                <input type="radio" name="volatility" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">a. I can accept a low degree of volatility</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="volatility" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">b. I can accept a moderate degree of volatility</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="volatility" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">c. I can accept a moderate to high degree of volatility</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="volatility" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">d. I can accept a high degree of volatility</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 9. ASSETS UNDER ADVICE */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">9. ASSETS UNDER ADVICE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">9.1. What % of the assets is under the firm's advisory, compared to total Net-Worth?</h4>
                      
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
                                <input type="radio" name="assets-advice" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">a. 0%-10%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">b. 10%-40%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">c. 40%-70%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">d. &gt;70%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 10. LIQUIDITY PREFERENCE */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">10. LIQUIDITY PREFERENCE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">10.1. What % of your asset would you expect to withdraw to meet other financial needs within the coming 1 year?</h4>
                      
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
                                <input type="radio" name="liquidity" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">a. More than 75%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquidity" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">b. Between 51% to 75%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquidity" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">c. Between 25% to 50%</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquidity" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">d. Less than 25%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 11. STABILITY OF INCOME */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">11. STABILITY OF INCOME</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">11.1. How secure is your current and future income from existing sources?</h4>
                      
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
                                <input type="radio" name="income-stability" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">a. No or insignificant risk income</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="income-stability" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">b. High volatility and fluctuation of income - Income levels are not stable</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="income-stability" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">c. Secure income with low volatility at the moment with some uncertainty for the future - Mostly stable</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="income-stability" className="h-5 w-5" />
                              </td>
                              <td className="py-2 px-4 border-b">d. Long term secured income flows from various sources - Very stable</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 12. FINANCIAL SITUATION */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">12. FINANCIAL SITUATION</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">12.1. What % of total financial assets do you want to set aside for any anticipated liabilities which is not to be used for investment.</h4>
                      
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

                  {/* 13. LEVERAGE IN INVESTMENT */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">13. LEVERAGE IN INVESTMENT</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">13.1. Do you currently use or intend to use leverage when investing?</h4>
                      
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

                  {/* 14. WHAT % OF TOTAL WEALTH ARE LIQUID BANKABLE ASSETS */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">14. WHAT % OF TOTAL WEALTH ARE LIQUID BANKABLE ASSETS?</h3>
                    
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
                  <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
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
                  
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">PROFESSIONAL CLIENT CLASSIFICATION</h3>
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
                  
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">DEEMED PROFESSIONAL CLIENT</h3>
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
                  
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">OTHER CLASSIFICATIONS</h3>
                    
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
                  <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
                    <h3 className="text-gray-700 font-bold text-lg mb-4">FOOTNOTES</h3>
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
                <h2 className="text-xl font-semibold mb-4">FATCA Declaration</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-700 mb-2">OECD CRS and U.S FATCA Self-Certification Form for Entity and Controlling Person</h3>
                      <p className="text-md text-gray-700 mb-3">
                        Tax legislation including US Foreign Account Tax Compliance Act (FATCA), OECD Common Reporting Standard (CRS) and their local laws and regulations require Hilbert Investment Solutions Ltd to share, transmit and report the information in this Form and the relevant documents and information to the local tax authority of the client, the tax authority of the place of incorporation of the relevant entity(ies) and/or to third party (for example the bank) who has similar reporting obligations under the relevant tax Regulations.
                      </p>
                      <p className="text-md text-gray-700 mb-3">
                        Hilbert Investment Solutions Ltd does not give legal and tax advice. Any queries regarding this form, the terms, about CRS and/or FATCA, please contact your tax or legal and/or other professional advisor.
                      </p>
                    </div>
                  </div>

                  {/* PART A - Entity Account Holder */}
                  <div className="bg-[#E5F0FF] p-4 rounded-md mb-6">
                    <h3 className="text-[#0066FF] font-bold text-lg mb-4">PART A - Entity Account Holder</h3>
                    <p className="mb-2 italic text-gray-700">(For joint or multiple account holders, complete a separate form for each entity account holder)</p>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <h4 className="font-semibold text-[#0066FF] mb-3">General Information</h4>
                      
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Entity Name:</label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address:</label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street, No.:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Town/City:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code/ZIP Code (if any):</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-[#0066FF] mb-3 mt-4">Mailing Address (if different from the Registered Address)</h4>
                      
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street, No.:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Town/City:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code/ZIP Code (if any):</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Place of Incorporation:</label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Business Registration No/local equivalent:</label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <h4 className="font-semibold text-[#0066FF] mb-3">Tax Residence</h4>
                      <h4 className="font-semibold text-blue-700 mb-3">Tax Residence</h4>
                      <p className="mb-2 italic text-gray-700">(If the entity has multiple countries of tax residency, please list out all the relevant information below)</p>
                      
                      <table className="w-full mb-4">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 border text-left">Country of residence for tax purposes</th>
                            <th className="py-2 px-4 border text-left">Tax Identification Number (TIN) or functional equivalent</th>
                            <th className="py-2 px-4 border text-left">If no TIN or functional equivalent is available, tick below for the reason of choosing "no TIN"</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border">
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not issue TINs to its residents.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not require the collection of TIN.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Other (please specify): <input type="text" className="w-64 p-1 border border-gray-300 rounded-md" /></p>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border">
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not issue TINs to its residents.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not require the collection of TIN.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Other (please specify): <input type="text" className="w-64 p-1 border border-gray-300 rounded-md" /></p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div className="space-y-3 mt-4">
                        <div className="flex items-start">
                          <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                          <p className="text-md">If your tax residence is not where you are incorporated/registered, please provide a certified true copy of a government issued document of at least on the country(ry) which you are a tax resident of.</p>
                        </div>
                        <div className="flex items-start">
                          <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                          <p className="text-md">If you are not a tax resident in any jurisdiction, please indicate the place of effective management: <input type="text" className="w-64 p-1 border border-gray-300 rounded-md" /></p>
                        </div>
                        <div className="flex items-start">
                          <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                          <p className="text-md">The entity is a branch, and its head office is a tax resident in the declared country of tax residence.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PART B - Declaration of US FATCA */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">PART B - Declaration of US FATCA</h3>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-1 pr-2 align-top" style={{ width: "40px" }}>
                              <span className="font-semibold">1.</span>
                            </td>
                            <td className="py-1 pr-2 align-top" style={{ width: "80px" }}>
                              <span className="font-semibold">US Person</span>
                            </td>
                            <td className="py-1">
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">The entity is a US Person pursuant to the FATCA regulation.</p>
                                </div>
                                <div className="ml-8 italic">(Please proceed directly to PART C)</div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">The entity is NOT a US Person pursuant to the FATCA Regulation</p>
                                </div>
                                <div className="ml-8 italic">(If you tick this option, proceed to 2. Below)</div>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-1 pr-2 align-top">
                              <span className="font-semibold">2.</span>
                            </td>
                            <td className="py-1 pr-2 align-top">
                              <span className="font-semibold">Classification</span>
                            </td>
                            <td className="py-1 italic">
                              (Please tick appropriate option)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div className="ml-12 mt-3 space-y-3">
                        <div className="flex items-start">
                          <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                          <div>
                            <p className="text-md">The entity is a registered Financial Institution</p>
                            <div className="mt-2 mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">The entity's Global Intermediary Identification Number (GIIN) obtained for US FATCA purpose is:</label>
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                          <p className="text-md">The entity is a Financial Institution and has not yet obtained a GIIN but intends to do so</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <h4 className="font-semibold text-blue-700 mb-3">2.1 FATCA Status</h4>
                      
                      <div className="mb-4 bg-gray-50 p-3 rounded-md">
                        <h5 className="font-semibold mb-2">Financial Institution</h5>
                        <div className="space-y-2 ml-4">
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Non- Participating FFI (including an FFI related to a Reporting IGA FFI other than a deemed-complaint FFI, participating FFI or exempt beneficial owner).</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Reporting Model 1 FFP*</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Reporting Model 2 FFI*</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Registered deemed complaint FFP*</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Trustee-documented trust**</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Sponsored investment entity**</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Non-reporting IGA FFI (other than Trustee-documented trust)</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4 bg-gray-50 p-3 rounded-md">
                        <h5 className="font-semibold mb-2">Certified deemed-complaint FFI (please specify the category by checking one box only)</h5>
                        <div className="space-y-2 ml-4">
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Non-registered Local Bank</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">FFI with only low-value accounts</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Sponsored, closely held investment vehicle**</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Limited life debt investment entity</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Investment advisors and investment managers</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Territory financial institution</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Owner-documented FFI</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Limited Branch</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4 bg-gray-50 p-3 rounded-md">
                        <h5 className="font-semibold mb-2">Exempt Beneficial Owner</h5>
                        <div className="space-y-2 ml-4">
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Exempt Beneficial Owner</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4 bg-gray-50 p-3 rounded-md">
                        <h5 className="font-semibold mb-2">Non-Financial Entity</h5>
                        <div className="space-y-2 ml-4">
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Active NFFE</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Passive NFFE (please complete PART D for Controlling Person)</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Non-financial group entity</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Excepted non-financial start-up company.</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Excepted non-financial entity in liquidation or bankruptcy.</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Section 501(c) organization (your exempted status has been confirmed by IRS or with a legal opinion to support the exemption)</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Non-profit organization</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Publicly traded NFFE or NFFE affiliate of a publicly traded corporation</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Excepted territory NFFE</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Direct reporting NFFE*</p>
                          </div>
                          <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                            <p className="text-md">Sponsored direct reporting NFFE**</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="mb-2 font-medium">*Please provide the entity's GIIN obtained for FATCA Purposes:</p>
                        <div className="grid grid-cols-8 gap-2 mb-4">
                          <input type="text" className="p-2 border border-gray-300 rounded-md" />
                          <input type="text" className="p-2 border border-gray-300 rounded-md" />
                          <input type="text" className="p-2 border border-gray-300 rounded-md" />
                          <input type="text" className="p-2 border border-gray-300 rounded-md" />
                          <input type="text" className="p-2 border border-gray-300 rounded-md" />
                          <input type="text" className="p-2 border border-gray-300 rounded-md" />
                          <input type="text" className="p-2 border border-gray-300 rounded-md" />
                          <input type="text" className="p-2 border border-gray-300 rounded-md" />
                        </div>
                        <p className="mb-2">**If the entity is a Trustee-documented trust, please provide the GIIN of the trust company.</p>
                        <p className="mb-2">If the entity is a Sponsored investment entity, please provide the sponsored entity's GIIN.</p>
                        <p className="mb-2">If the entity is a Sponsored, closely held investment vehicle or a Sponsored direct reporting NFFE, please provide the sponsoring GIIN of the sponsoring entity.</p>
                      </div>
                    </div>
                  </div>

                  {/* PART C - Declaration of CRS Classification */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">PART C - Declaration of CRS Classification</h3>
                    <p className="mb-2 italic text-gray-700">(Please complete this part by ticking the following box to provide your CRS entity type that does not necessarily coincide with your entity type under Part a: US FATCA Classification)</p>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <table className="w-full mb-4">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="w-1/4 py-2 px-4 border text-left font-medium">Classification</th>
                            <th className="w-3/4 py-2 px-4 border text-left font-medium">Description (Check appropriate option)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4 border align-top font-medium">Financial Institution</td>
                            <td className="py-2 px-4 border">
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Custodial Institution, Depository Institution or Specified Insurance Company (including a Non-reporting Financial Institution)</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Investment Entity located in a Non-Participating Jurisdiction and managed by another Financial Institution</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Financial Institution (please complete PART D for Controlling Person)</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Other Investment Entity than the above.</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4 border align-top font-medium">Non-Reporting Financial Institution</td>
                            <td className="py-2 px-4 border">
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Government entity, international organisation, or central bank</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Broad Participation Retirement Fund</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Narrow Participation Retirement Fund</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Pension Fund of a Government entity, international organization, or central bank</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Exempt Collective Investment Vehicle</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Trust whose trustee reports all required information with respect to all CRS Reportable Accounts</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Qualified Credit Card Issuer</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Other entity defined under the domestic law as low risk of being used to evade tax.</p>
                                </div>
                                <div>
                                  <span className="ml-8">(Specify the type provided in the domestic law: <input type="text" className="w-64 p-1 border border-gray-300 rounded-md" />)</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4 border align-top font-medium">Active NFE</td>
                            <td className="py-2 px-4 border">
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">NFE the stock of which is regularly traded on: <input type="text" className="w-48 p-1 border border-gray-300 rounded-md" /></p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Related entity of <input type="text" className="w-48 p-1 border border-gray-300 rounded-md" /> the stock of which is regularly traded, which is an established securities market.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">NFE is a governmental entity, an international organization, a central bank, or an entity wholly owned by one or more of foregoing entities.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Active NFE other than the above (Please Specify): <input type="text" className="w-48 p-1 border border-gray-300 rounded-md" /></p>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border align-top font-medium">Passive NFE</td>
                            <td className="py-2 px-4 border">
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Investment entity that is managed by another Financial Institution and located in a non- participating jurisdiction.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">NFE that is not an active NFE.</p>
                                </div>
                                <div>
                                  <p className="italic ml-8">(If you ticked this option, please complete the PART D for Controlling Person below)</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* PART D - Controlling Person */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">PART D - Controlling Person</h3>
                    <p className="mb-2 italic text-gray-700">(only complete this part if the entity type selected under PART C)</p>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <h4 className="font-semibold text-blue-700 mb-3">1. Controlling Person Details</h4>
                      
                      {/* Controlling Person #1 */}
                      <div className="mb-6 border border-gray-200 p-4 rounded-md">
                        <h5 className="font-semibold text-blue-700 mb-3">Controlling Person #1</h5>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mailing Address (if different from the above):</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth (dd/mm/yyyy):</label>
                              <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth (City/Town and Country):</label>
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Controlling Person #2 */}
                      <div className="mb-6 border border-gray-200 p-4 rounded-md">
                        <h5 className="font-semibold text-blue-700 mb-3">Controlling Person #2</h5>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mailing Address (if different from the above):</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth (dd/mm/yyyy):</label>
                              <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth (City/Town and Country):</label>
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Controlling Person #3 */}
                      <div className="mb-6 border border-gray-200 p-4 rounded-md">
                        <h5 className="font-semibold text-blue-700 mb-3">Controlling Person #3</h5>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mailing Address (if different from the above):</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth (dd/mm/yyyy):</label>
                              <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth (City/Town and Country):</label>
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <h4 className="font-semibold text-blue-700 mb-3">2. Tax Residence</h4>
                      <p className="mb-3">All Controlling Persons must complete this section.</p>
                      <p className="mb-3 italic">If you have multiple countries of tax residency, please list out all the relevant information below.</p>
                      
                      <table className="w-full mb-4">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 border text-left">Name of Controlling Person</th>
                            <th className="py-2 px-4 border text-left">Country of residence for tax purposes</th>
                            <th className="py-2 px-4 border text-left">TIN</th>
                            <th className="py-2 px-4 border text-left">If no TIN or is available, tick below for the reason of choosing "no TIN"</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border">
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not issue TINs to its residents</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not require the collection of TIN.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Other (please specify): <input type="text" className="w-48 p-1 border border-gray-300 rounded-md" /></p>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border">
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not issue TINs to its residents</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not require the collection of TIN.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Other (please specify): <input type="text" className="w-48 p-1 border border-gray-300 rounded-md" /></p>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border"><input type="text" className="w-full p-1 border border-gray-300 rounded-md" /></td>
                            <td className="py-2 px-4 border">
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not issue TINs to its residents</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Tax residence jurisdiction does not require the collection of TIN.</p>
                                </div>
                                <div className="flex items-start">
                                  <input type="checkbox" className="mr-2 mt-1 h-5 w-5" />
                                  <p className="text-md">Other (please specify): <input type="text" className="w-48 p-1 border border-gray-300 rounded-md" /></p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <h4 className="font-semibold text-blue-700 mb-3">Types of Controlling Person</h4>
                      <table className="w-full mb-4">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4 border font-medium" style={{ width: "20%" }}>Legal Person:</td>
                            <td className="py-2 px-4 border">
                              <div className="flex flex-wrap gap-4">
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Control by Ownership</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Control by other means</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Senior Managing Official</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4 border font-medium">Legal Arrangement - Trust:</td>
                            <td className="py-2 px-4 border">
                              <div className="flex flex-wrap gap-4">
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Settlor</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Trustee</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Protector</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Beneficiary</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Other</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4 border font-medium">Legal Arrangement - Other:</td>
                            <td className="py-2 px-4 border">
                              <div className="flex flex-wrap gap-4">
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Settlor Equivalent</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Trustee Equivalent</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Protector Equivalent</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Beneficiary Equivalent</span>
                                </div>
                                <div className="flex items-center">
                                  <input type="checkbox" className="mr-2 h-5 w-5" />
                                  <span>Other Equivalent</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* PART E - Declaration & Signature */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">PART E - Declaration & Signature</h3>
                    <p className="mb-3 italic">(to be given signed by the Entity Account Holder and ALL Controlling Person(s))</p>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <p className="mb-3 text-md">I/We certify that as the account holder (or am authorized to sign for the account holder) of all the account(s) to which this form relates.</p>
                      <p className="mb-3 text-md">I/We understand that the information I have provided is covered by the Privacy Notice and the terms and conditions governing the account holder's relationship with [Hilbert Investment Solutions Ltd], in particular how [Hilbert Investment Solutions Ltd] may use and share it.</p>
                      <p className="mb-3 text-md">I/We acknowledge that [Hilbert Investment Solutions Ltd] may share this information with the authorities of the country(ies)/jurisdiction(s) where the account(s) are held, and that those tax authorities may exchange this information between themselves as part of the intergovernmental agreements to exchange Financial Account information. If I have completed this form on behalf of the Controlling Person, I certify that I have their authority and that all relevant individuals have been made aware of the Privacy Notice, and the individual rights and information it sets out. I will notify them within 30 days of signing this form that I have provided this information to [Hilbert Investment Solutions Ltd] and that it may be passed to the tax authorities of all countries/jurisdictions where the account holder maintains accounts.</p>
                      <p className="mb-3 text-md">I declare that all statements made in this declaration are, to the best of my knowledge and belief, correct and complete.</p>
                      
                      <div className="mt-6 border border-gray-300 p-4 rounded-md mb-4">
                        <h4 className="font-semibold mb-2">The Entity Account Holder/ Controlling Person</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                            <div className="w-full h-20 p-2 border border-gray-300 rounded-md"></div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                            <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 border border-gray-300 p-4 rounded-md mb-4">
                        <h4 className="font-semibold mb-2">The Entity Account Holder/ Controlling Person</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Signature:</label>
                            <div className="w-full h-20 p-2 border border-gray-300 rounded-md"></div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                            <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                          </div>
                        </div>
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
                  <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
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
                  
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">UPLOAD DOCUMENT</h3>
                    
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
                              <option value="license">License</option>
                              <option value="certificate">Certificate of Incorporation</option>
                              <option value="directors">Register of Directors</option>
                              <option value="shareholders">Register of Shareholders</option>
                              <option value="moa">MOA/AOA</option>
                              <option value="org_chart">Org chart</option>
                              <option value="ownership_chart">Ownership chart</option>
                              <option value="financials">Audited Financials (latest 2 years) OR Company Bank statement (last 12 months) with management accounts</option>
                              <option value="ubo_id">UBO/directors/Shareholders/Authorised signatory ID docs (Passport, Visa, Emirates ID/National ID)</option>
                              <option value="ubo_address">UBO/directors/Shareholders/Authorised signatory proof of address not more than 3 months old</option>
                              <option value="tax_id">Tax Identification Number (if applicable)</option>
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
                  
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">REQUIRED DOCUMENTS</h3>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <h4 className="font-semibold text-blue-700 mb-3">For Corporates:</h4>
                      <p className="mb-2">All the incorporations documents:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>License</li>
                        <li>Certificate of Incorporation</li>
                        <li>Register of Directors</li>
                        <li>Register of Shareholders</li>
                        <li>MOA/AOA</li>
                        <li>Org chart</li>
                        <li>Ownership chart</li>
                        <li>Audited Financials' (latest 2 years) OR Company Bank statement (last 12 months) with management accounts.</li>
                        <li>UBO/directors/Shareholders/Authorised signatory ID docs (Passport, Visa, Emirates ID/National ID)</li>
                        <li>UBO/directors/Shareholders/Authorised signatory proof of address not more than 3 months old</li>
                        <li>Tax Identification Number (if applicable)</li>
                      </ul>
                      
                      <div className="mt-4 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                        <p className="font-semibold">Important Notes:</p>
                        <ul className="list-disc pl-6 mt-2">
                          <li>ID documents, address proof and income documents needs to be certified.</li>
                          <li>If structure is multi-layer, need to unfold all the layers and reach out till UBO (Ultimate Beneficiary Owner)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-gray-300 bg-white p-4 mb-4 rounded-md">
                      <h4 className="font-semibold text-blue-700 mb-3">Uploaded Documents</h4>
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
                  // Save draft logic would go here
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

export default CorporateOnboarding; 