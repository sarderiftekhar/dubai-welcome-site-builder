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
                <h2 className="text-xl font-semibold mb-4">Know Your Customer – Corporate Due Diligence Form</h2>
                <div className="space-y-6">
                  {/* CLIENT IDENTIFICATION DETAILS */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">CLIENT IDENTIFICATION DETAILS</h3>
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
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">CLIENT IDENTIFICATION DOCUMENT DETAILS</h3>
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
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">CONTACT DETAILS</h3>
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
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">BUSINESS ACTIVITY / FINANCIAL INFORMATION</h3>
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
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">NATURE AND PURPOSE OF RELATIONSHIP WITH HILBERT INVESTMENT SOLUTIONS LTD</h3>
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
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">CORPORATE SHAREHOLDING DETAILS</h3>
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

                    <h4 className="text-blue-800 font-semibold mb-2">Ultimate Beneficial Owner (UBO) Details</h4>
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

                    <h4 className="text-blue-800 font-semibold mb-2">Senior Management/Authorized Person</h4>
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
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">POLITICAL EXPOSED PERSON DECLARATION</h3>
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
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">CLIENT DECLARATION</h3>
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
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">PRIVACY NOTICE</h3>
                    <p className="text-sm mb-4">
                      Hilbert Investment Solutions Ltd ("the Company") takes privacy seriously and respects the privacy of every client 
                      for whom we provide services ("the Services"). In order to effectively provide the Services to you, the company 
                      collects certain personal information.
                    </p>
                    <p className="text-sm mb-4">
                      Please note that the lists below are not exhaustive, and there may be other examples where we hold, collect, use, or 
                      process personal information in order to provide the Services.
                    </p>
                    
                    <h4 className="text-blue-700 font-bold mb-2">THE PERSONAL INFORMATION WE MAY HOLD</h4>
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
                    
                    <h4 className="text-blue-700 font-bold mb-2">HOW WE MAY USE YOUR PERSONAL INFORMATION</h4>
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
                    
                    <h4 className="text-blue-700 font-bold mb-2">SHARING YOUR PERSONAL INFORMATION</h4>
                    <p className="text-sm mb-3">
                      We may need to share your personal information with third parties. These third parties may include:
                    </p>
                    <ul className="list-disc ml-6 mb-4 text-sm">
                      <li>Professional advisers, such as lawyers and accountants, or governmental or regulatory authorities.</li>
                      <li>Third party professionals, such as arbitrators, accountants, tax professionals, advisors, counsel, court personnel.</li>
                    </ul>
                    
                    <h4 className="text-blue-700 font-bold mb-2">SECURITY OF YOUR PERSONAL INFORMATION</h4>
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
                    
                    <h4 className="text-blue-700 font-bold mb-2">RETENTION OF YOUR PERSONAL INFORMATION</h4>
                    <p className="text-sm mb-3">
                      We will retain pertinent records for a minimum duration of six years from the date of our last 
                      engagement with a client. However, in accordance with our legal, regulatory, or professional obligations, we may be 
                      required to retain such information for a longer period beyond the documented relationship.
                    </p>
                    
                    <h4 className="text-blue-700 font-bold mb-2">YOUR RIGHTS IN RELATION TO YOUR PERSONAL INFORMATION</h4>
                    <p className="text-sm mb-3">
                      Under certain circumstances, you may have rights regarding your personal information, including the right to access, 
                      correct, erase and limit the use of your personal information. If you have any questions or requests regarding your rights, please email us at 
                      <a href="mailto:Hilbert@invetsolutions.ae" className="text-blue-600 mx-1">Hilbert@invetsolutions.ae</a>. 
                      We will address your concerns promptly and assist you accordingly.
                    </p>
                    
                    <h4 className="text-blue-700 font-bold mb-2">DATA PRIVACY TEAM</h4>
                    <p className="text-sm mb-3">
                      We have appointed a Data Protection Officer (DPO) who is responsible for overseeing compliance with this Privacy 
                      Notice. If you have any inquiries or concerns regarding this Privacy Notice or the handling of your personal 
                      information, please contact us via email at <a href="mailto:Hilbert@invetsolutions.ae" className="text-blue-600">Hilbert@invetsolutions.ae</a>.
                    </p>
                    <p className="text-sm">
                      Our Data Protection Officer will address your questions and provide assistance as necessary!
                    </p>
                    
                    <div className="flex items-center mt-6">
                      <input type="checkbox" id="privacy-acknowledge" className="mr-3 h-5 w-5" />
                      <label htmlFor="privacy-acknowledge" className="text-base font-medium text-blue-700">I acknowledge</label>
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
                    <div className="flex items-center mb-3">
                      <label className="block text-sm font-bold text-gray-700">Client Name</label>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">
                      The information collected in this Suitability Assessment form will be used to assist in determining the suitability of investments/strategies for you. Inaccurate or incomplete information may affect the suitability of such information or any future recommendations provided to you.
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      It is strongly recommended that you provide such information required by this Questionnaire as fully as possible and any future changes in circumstances or information contained within this Assessment should be advised as soon as possible in order to ensure the continued suitability of investment information or recommendations provided to you.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* 1. INVESTMENT OBJECTIVES */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">1. INVESTMENT OBJECTIVES</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">1.1. Which answer best describes your investment objective:</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-2 px-4 border-b"></th>
                              <th style={{ width: '75%' }} className="py-2 px-4 border-b text-left">Description</th>
                              <th style={{ width: '15%' }} className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" />
                              </td>
                              <td className="py-2 px-4 border-b">Primarily capital preservation</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" />
                              </td>
                              <td className="py-2 px-4 border-b">Primarily income generation along with slight capital growth</td>
                              <td className="py-2 px-4 border-b text-center">2</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" />
                              </td>
                              <td className="py-2 px-4 border-b">To achieve a balance of income generation and capital growth</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" />
                              </td>
                              <td className="py-2 px-4 border-b">Primarily capital growth along with slight income generation</td>
                              <td className="py-2 px-4 border-b text-center">4</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-objective" />
                              </td>
                              <td className="py-2 px-4 border-b">Primarily high capital growth</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 2. INVESTMENT STAGE AND ABILITY */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">2. INVESTMENT STAGE AND ABILITY</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">2.1. Which of the following best describes your current stage of life?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-2 px-4 border-b"></th>
                              <th style={{ width: '75%' }} className="py-2 px-4 border-b text-left">Description</th>
                              <th style={{ width: '15%' }} className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" />
                              </td>
                              <td className="py-2 px-4 border-b">Single with few financial burdens. Ready to accumulate wealth for future short term and long-term goals.</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" />
                              </td>
                              <td className="py-2 px-4 border-b">A couple without children. Preparing for the future by establishing a home. Expecting to have or already have a high purchase rate of household and consumer items.</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" />
                              </td>
                              <td className="py-2 px-4 border-b">Young family with a home. You have a mortgage and have also built up some equity. You need to maintain your standard of living while raising children and need to maintain only small cash balances.</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" />
                              </td>
                              <td className="py-2 px-4 border-b">A family with school going children. You have a mortgage and have built up some savings.</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" />
                              </td>
                              <td className="py-2 px-4 border-b">Mature family. You are in your peak earning years and your mortgage is under control. Your children have finished school or are in post-secondary education. You're ready to start thinking about your retirement goals.</td>
                              <td className="py-2 px-4 border-b text-center">4</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" />
                              </td>
                              <td className="py-2 px-4 border-b">Preparing for retirement. You can now focus on your home and have few financial burdens; you want to ensure you can afford a comfortable retirement.</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="investment-stage" />
                              </td>
                              <td className="py-2 px-4 border-b">Retired. You rely on your pension, investments, savings and investments to maintain your lifestyle in retirement. You may already be receiving a government pension and/or Superannuation pension.</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 3. PRODUCT KNOWLEDGE AND EXPERIENCE */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">3. PRODUCT KNOWLEDGE AND EXPERIENCE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">3.1. Please indicate the level of knowledge and/or experience you have in the asset classes listed below:</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-2 px-4 border-b"></th>
                              <th style={{ width: '75%' }} className="py-2 px-4 border-b text-left">Description</th>
                              <th style={{ width: '15%' }} className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="deposits-exp" />
                              </td>
                              <td className="py-2 px-4 border-b">Deposits</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-exp" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-exp" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-know" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-know" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="deposits-know" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b">Money market instruments</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-exp" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-exp" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-know" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-know" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="money-market-know" /></td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center"></td>
                              <td className="py-2 px-4 border-b">Foreign Exchange (Spot)</td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-exp" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-exp" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-know" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-know" /></td>
                              <td className="py-2 px-4 border-b text-center"><input type="radio" name="forex-know" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 italic">Note: Table is truncated for display purposes. The complete product range as shown in the image would be included here.</p>
                    </div>
                  </div>

                  {/* 4. RESPONSE TO MARKET DECLINE */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">5. RESPONSE TO MARKET DECLINE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">5.1. During market declines, I tend to sell portions of my riskier assets and invest the money in safer assets?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-2 px-4 border-b"></th>
                              <th style={{ width: '75%' }} className="py-2 px-4 border-b text-left">Description</th>
                              <th style={{ width: '15%' }} className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="market-decline" />
                              </td>
                              <td className="py-2 px-4 border-b">a. Strongly Disagree</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="market-decline" />
                              </td>
                              <td className="py-2 px-4 border-b">b. Disagree</td>
                              <td className="py-2 px-4 border-b text-center">4</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="market-decline" />
                              </td>
                              <td className="py-2 px-4 border-b">c. Partially Agree</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="market-decline" />
                              </td>
                              <td className="py-2 px-4 border-b">d. Agree</td>
                              <td className="py-2 px-4 border-b text-center">2</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="market-decline" />
                              </td>
                              <td className="py-2 px-4 border-b">e. Strongly Agree</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 6. RISK TOLERANCE, CAPITAL LOSS AND MARKET FLUCTUATION */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">6. RISK TOLERANCE, CAPITAL LOSS AND MARKET FLUCTUATION</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">6.1. Which of the following 5 hypothetical scenarios below best describes the level of risk you are willing to bear in regard to your investment?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-2 px-4 border-b"></th>
                              <th style={{ width: '75%' }} className="py-2 px-4 border-b text-left">Description</th>
                              <th style={{ width: '15%' }} className="py-2 px-4 border-b text-center">Score</th>
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
                            <tr>
                              <td className="py-2 px-4 border-b">Score</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                              <td className="py-2 px-4 border-b text-center">2</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                              <td className="py-2 px-4 border-b text-center">4</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 7. INVESTMENT TIME HORIZON */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">7. INVESTMENT TIME HORIZON</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">7.1. Investments have varying time horizons. Some investments have fixed, potentially long-dated time horizons. Some may even have lock-in periods. What is the longest time horizon you would consider for any investment in your portfolio? Please pick the one that applies.</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th style={{ width: '10%' }} className="py-2 px-4 border-b"></th>
                              <th style={{ width: '75%' }} className="py-2 px-4 border-b text-left">Description</th>
                              <th style={{ width: '15%' }} className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" />
                              </td>
                              <td className="py-2 px-4 border-b">a. Less than 1 year</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" />
                              </td>
                              <td className="py-2 px-4 border-b">b. More than 1 year and up to 3 years</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" />
                              </td>
                              <td className="py-2 px-4 border-b">c. More than 3 years and up to 10 years</td>
                              <td className="py-2 px-4 border-b text-center">4</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="time-horizon" />
                              </td>
                              <td className="py-2 px-4 border-b">d. More than 10 years or we have no time commitments</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 8. VOLATILITY OF RETURNS */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">8. VOLATILITY OF RETURNS</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">8.1. Considering your time horizon (holding period) and return expectations, what degree of volatility of return do you believe you can accept:</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th width="10%" className="py-2 px-4 border-b"></th>
                              <th width="75%" className="py-2 px-4 border-b text-left">Description</th>
                              <th width="15%" className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="volatility" />
                              </td>
                              <td className="py-2 px-4 border-b">a. I can accept a low degree of volatility</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="volatility" />
                              </td>
                              <td className="py-2 px-4 border-b">b. I can accept a moderate degree of volatility</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="volatility" />
                              </td>
                              <td className="py-2 px-4 border-b">c. I can accept a moderate to high degree of volatility</td>
                              <td className="py-2 px-4 border-b text-center">4</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="volatility" />
                              </td>
                              <td className="py-2 px-4 border-b">d. I can accept a high degree of volatility</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 9. ASSETS UNDER ADVICE */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">9. ASSETS UNDER ADVICE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">9.1. What % of the assets is under the firm's advisory, compared to total Net-Worth?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th width="10%" className="py-2 px-4 border-b"></th>
                              <th width="75%" className="py-2 px-4 border-b text-left">Description</th>
                              <th width="15%" className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" />
                              </td>
                              <td className="py-2 px-4 border-b">a. 0%-10%</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" />
                              </td>
                              <td className="py-2 px-4 border-b">b. 10%-40%</td>
                              <td className="py-2 px-4 border-b text-center">4</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" />
                              </td>
                              <td className="py-2 px-4 border-b">c. 40%-70%</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="assets-advice" />
                              </td>
                              <td className="py-2 px-4 border-b">d. &gt;70%</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 10. LIQUIDITY PREFERENCE */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">10. LIQUIDITY PREFERENCE</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">10.1. What % of your asset would you expect to withdraw to meet other financial needs within the coming 1 year?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th width="10%" className="py-2 px-4 border-b"></th>
                              <th width="75%" className="py-2 px-4 border-b text-left">Description</th>
                              <th width="15%" className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquidity" />
                              </td>
                              <td className="py-2 px-4 border-b">a. More than 75%</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquidity" />
                              </td>
                              <td className="py-2 px-4 border-b">b. Between 51% to 75%</td>
                              <td className="py-2 px-4 border-b text-center">2</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquidity" />
                              </td>
                              <td className="py-2 px-4 border-b">c. Between 25% to 50%</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquidity" />
                              </td>
                              <td className="py-2 px-4 border-b">d. Less than 25%</td>
                              <td className="py-2 px-4 border-b text-center">4</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 11. STABILITY OF INCOME */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">11. STABILITY OF INCOME</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">11.1. How secure is your current and future income from existing sources?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th width="10%" className="py-2 px-4 border-b"></th>
                              <th width="75%" className="py-2 px-4 border-b text-left">Description</th>
                              <th width="15%" className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="income-stability" />
                              </td>
                              <td className="py-2 px-4 border-b">a. No or insignificant risk income</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="income-stability" />
                              </td>
                              <td className="py-2 px-4 border-b">b. High volatility and fluctuation of income - Income levels are not stable</td>
                              <td className="py-2 px-4 border-b text-center">2</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="income-stability" />
                              </td>
                              <td className="py-2 px-4 border-b">c. Secure income with low volatility at the moment with some uncertainty for the future - Mostly stable</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="income-stability" />
                              </td>
                              <td className="py-2 px-4 border-b">d. Long term secured income flows from various sources - Very stable</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 12. FINANCIAL SITUATION */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">12. FINANCIAL SITUATION</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">12.1. What % of total financial assets do you want to set aside for any anticipated liabilities which is not to be used for investment.</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th width="10%" className="py-2 px-4 border-b"></th>
                              <th width="75%" className="py-2 px-4 border-b text-left">Description</th>
                              <th width="15%" className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="financial-situation" />
                              </td>
                              <td className="py-2 px-4 border-b">a. More than 75%</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="financial-situation" />
                              </td>
                              <td className="py-2 px-4 border-b">b. Between 51% to 75%</td>
                              <td className="py-2 px-4 border-b text-center">2</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="financial-situation" />
                              </td>
                              <td className="py-2 px-4 border-b">c. Between 25% to 50%</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="financial-situation" />
                              </td>
                              <td className="py-2 px-4 border-b">d. Less than 25%</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 13. LEVERAGE IN INVESTMENT */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">13. LEVERAGE IN INVESTMENT</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-red-600">13.1. Do you currently use or intend to use leverage when investing?</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th width="10%" className="py-2 px-4 border-b"></th>
                              <th width="75%" className="py-2 px-4 border-b text-left">Description</th>
                              <th width="15%" className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="leverage" />
                              </td>
                              <td className="py-2 px-4 border-b">a. No</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="leverage" />
                              </td>
                              <td className="py-2 px-4 border-b">b. Yes</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* 14. WHAT % OF TOTAL WEALTH ARE LIQUID BANKABLE ASSETS */}
                  <div className="bg-blue-50 p-4 rounded-md mb-6">
                    <h3 className="text-blue-800 font-bold text-lg mb-4">14. WHAT % OF TOTAL WEALTH ARE LIQUID BANKABLE ASSETS?</h3>
                    
                    <div className="mb-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th width="10%" className="py-2 px-4 border-b"></th>
                              <th width="75%" className="py-2 px-4 border-b text-left">Description</th>
                              <th width="15%" className="py-2 px-4 border-b text-center">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquid-assets" />
                              </td>
                              <td className="py-2 px-4 border-b">a. &lt;15%</td>
                              <td className="py-2 px-4 border-b text-center">1</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquid-assets" />
                              </td>
                              <td className="py-2 px-4 border-b">b. 15%-50%</td>
                              <td className="py-2 px-4 border-b text-center">3</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border-b text-center">
                                <input type="radio" name="liquid-assets" />
                              </td>
                              <td className="py-2 px-4 border-b">c. &gt;50%</td>
                              <td className="py-2 px-4 border-b text-center">5</td>
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