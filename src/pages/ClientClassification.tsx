import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ClientClassification = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto pt-24 pb-10 px-4 sm:px-6">
        <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto">
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
            <h1 className="text-2xl text-gray-700 font-semibold">Client Classification Form</h1>
            <img 
              src="/uploads/2fab491a-3fc7-4f12-9727-31796472405a.png" 
              alt="Hilbert Investment Solutions" 
              className="h-12" 
            />
          </div>
          
          <div className="mb-6 text-sm">
            <p className="mb-4">
              Hilbert Investment Solutions Ltd Capital Limited ("Hilbert Investment Solutions Ltd") provides Financial Services 
              to only Professional Clients (which includes 'assessed,' and 'deemed' Professional Clients, as set out in the 
              Dubai Financial Services Authority ("DFSA") Rulebook.
            </p>
            <p className="mb-4">
              You have the right to be classified as a Retail Client, which entails a higher level of protection under the DFSA 
              Rules. However, if you are classified as a Retail Client, Hilbert Investment Solutions Ltd will not be able to offer 
              you financial services.
            </p>
          </div>
          
          <div className="mb-6">
            <div className="font-semibold mb-2">Client Name:</div>
          </div>
          
          <div className="mb-6">
            <p className="mb-2 italic">I. In order to ascertain whether you are a "Professional Client", please tick all box(es) below, as applicable to you:</p>
            
            <div className="mb-4">
              <h3 className="font-semibold">Assessed Professional Client</h3>
              <p className="text-xs italic">(Please choose the description which fits you.)</p>
            </div>
            
            {/* Section A */}
            <div className="border border-gray-300 p-4 mb-4">
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <span className="font-semibold">A.</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    <div>
                      <p>An Individual who:</p>
                      <p>has at least USD 1,000,000 in net assets<sup>1</sup> and provided Hilbert Investment Solutions Ltd Capital with sufficient proof thereof;</p>
                      <p className="font-semibold">AND</p>
                      <p className="font-semibold">Either:</p>
                      <div className="ml-4">
                        <ol className="list-decimal">
                          <li>is or has been in the previous 12 months an employee in a relevant professional position of an Authorized Person, a Recognized Body, a Remote Body, or a Regulated Financial Institution; or</li>
                          <li>has sufficient financial experience and understanding of relevant financial markets, products or transactions and any associated risks.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section B */}
            <div className="border border-gray-300 p-4 mb-4">
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <span className="font-semibold">B.</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    <div>
                      <p>An Undertaking, trust, or foundation, which is set up solely for the purpose of facilitating the management of an investment portfolio of an individual that:</p>
                      <p>has at least USD 1,000,000 in net assets<sup>1</sup> and provided Hilbert Investment Solutions Ltd Capital with sufficient proof thereof;</p>
                      <p className="font-semibold">AND</p>
                      <p>has sufficient financial experience and understanding of relevant financial markets, products or transactions and any associated risks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section C1 */}
            <div className="border border-gray-300 p-4 mb-4">
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <span className="font-semibold">C1.</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    <div>
                      <p>An Undertaking<sup>2</sup> that:</p>
                      <p>has own funds<sup>4</sup> or called up capital<sup>5</sup> of at least USD 1,000,000 and has provided Hilbert Investment Solutions Ltd Capital with sufficient proof thereof;</p>
                      <p className="font-semibold">AND</p>
                      <p>has sufficient financial experience and understanding of relevant financial markets, products or transactions and any associated risks.</p>
                      <p className="font-semibold">OR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section C2 */}
            <div className="border border-gray-300 p-4 mb-4">
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <span className="font-semibold">C2.</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    <div>
                      <p>An Undertaking who has a controller<sup>3</sup>, a Holding Company, a Subsidiary, or a Joint venture partner that:</p>
                      <p className="font-semibold">Either:</p>
                      <p>1. has own funds<sup>4</sup> or called-up capital<sup>5</sup> of at least USD 1,000,000 and has provided Hilbert Investment Solutions Ltd Capital with sufficient proof thereof;</p>
                      <p className="font-semibold">OR</p>
                      <p>2. has at least USD 1,000,000 in net assets<sup>1</sup> and has provided Hilbert Investment Solutions Ltd with sufficient proof thereof.</p>
                      <p className="font-semibold">AND</p>
                      <p>has sufficient financial experience and understanding of relevant financial markets, products or transactions and any associated risks.</p>
                      <p className="font-semibold">OR</p>
                      <p>An Undertaking who has a controller<sup>3</sup>, or Holding Company, a Subsidiary or Joint venture partner who is a Deemed Professional Client, (as listed below).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Deemed Professional Client */}
            <div className="mb-4">
              <h3 className="font-semibold">OR</h3>
              <div className="mt-2">
                <h3 className="font-semibold">Deemed Professional Client</h3>
                <p>An undertaking that satisfies any of the following:</p>
              </div>
            </div>
            
            <div className="border border-gray-300 p-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>A properly constituted government, government agency, central bank or other national monetary authority of any country or jurisdiction</span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>Public authority or state investment authority</span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>Authorized Firm, a regulated financial institution, or the management company of a regulated pension fund</span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>Collective Investment Fund / regulated pension fund i.e., an arrangement which amounts to a fund under rule 11 of the DIFC Collective Investment Law 2010 and which is established and operated under the rules made under that Law or a regulated pension fund.</span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>Supranational organization whose members are countries, central banks, or national monetary authorities</span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>Body corporate<sup>2</sup> whose shares are listed or admitted to trading on any regulated exchange of an IOSCO country</span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>Authorized Market Institution, regulated exchange or regulated clearing house</span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>An Institutional Investor whose main activity is to invest in financial instruments, including an entity dedicated to the securitization of assets or other financial transactions</span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>A Large Undertaking: A person is a 'Large Undertaking' if it met, as at the date of its most recent financial statements, at least two of the following requirements:
                    <ul className="ml-6 list-disc">
                      <li>It has a balance sheet total<sup>6</sup> of at least $20 million;</li>
                      <li>It has an annual turnover of at least $40 million; or</li>
                      <li>It has its own funds<sup>4</sup> or called-up capital<sup>5</sup> of at least $2 million</li>
                    </ul>
                  </span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>A trustee of a trust which has, or had during the previous 12 months, assets of at least USD 10 million;</span>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mr-2 mt-1" />
                  <span>The holder of a license under the DIFC Single Family Office Regulations with respect to its activities carried on exclusively for the purposes of, and only in so far as it is, carrying out its duties as a Single-Family Office.</span>
                </div>
              </div>
            </div>
            
            {/* Retail Client */}
            <div className="mb-4 border border-gray-300 p-4">
              <div className="flex items-start">
                <input type="checkbox" id="retailClient" className="mr-2 mt-1" />
                <div>
                  <label htmlFor="retailClient" className="font-semibold">2. □ Retail Clients:</label>
                  <span> An Authorized Firm must classify as a Retail Client any Person who is not classified as a Professional Client or a Market Counterparty.</span>
                </div>
              </div>
            </div>
            
            {/* Market Counterparty */}
            <div className="mb-6 border border-gray-300 p-4">
              <div className="flex items-start">
                <input type="checkbox" id="marketCounterparty" className="mr-2 mt-1" />
                <div>
                  <label htmlFor="marketCounterparty" className="font-semibold">3. □ Market Counterparty</label>
                  <p>Market Counterparty is potential client meeting the definition of a 'deemed' Professional Client or is an assessed Professional Client which is wholly owned by a Holding Company that is a 'deemed' Professional Client and who has been given a prior written notification of the classification as a Market Counterparty and that potential client has not requested to be classified otherwise within the period specified in the notice.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Confirmations section */}
          <div className="mb-6">
            <p className="font-semibold mb-2">By signing below, you hereby confirm the following:</p>
            <ol className="list-none space-y-2">
              <li className="flex items-start">
                <span className="mr-2">(a)</span>
                <span>You acknowledge that Hilbert Investment Solutions Ltd Capital Limited is relying on your responses and confirmations provided in this Form for the purpose of determining whether you meet the classification criteria of a Professional Client.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(b)</span>
                <span>Based on your responses and satisfaction of the Professional Client requirements stated above, Hilbert Investment Solutions Ltd Capital Limited shall treat you as a Professional Client. However, if you fall under any of the following client types, now or in the future, the Company reserves the direction to classify you as one of the following:</span>
                <ul className="ml-6 list-disc">
                  <li>Collective Investment Fund or regulated pension fund.</li>
                  <li>Authorized Firm or regulated financial institution.</li>
                  <li>Government, government agency, central bank, or national monetary authority.</li>
                  <li>Supranational organization.</li>
                  <li>Authorized market institution, regulated exchange, or clearing house.</li>
                  <li>Body Corporate with shares listed or admitted to trading on any regulated exchange of an IOSCO member country.</li>
                  <li>Large Undertaking as defined above.</li>
                  <li>Partnership or unincorporated association with net assets of at least USD 10 million.</li>
                  <li>Holder of a DIFC Single Family Office license.</li>
                  <li>An "assessed" Professional Client wholly owned by a Holding Company that is a Larger Undertaking, or a body corporate with shares listed or admitted to trading on any regulated exchange of an IOSCO member country.</li>
                </ul>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(c)</span>
                <span>You understand and accept that, as a Professional Client, you will not benefit from the compensation rights and protections provided to retail clients. If you wish to be classified as a retail client, you must notify the Company in writing within 14 days of receiving the notification letter.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(d)</span>
                <span>You have provided the responses and confirmations in this form voluntarily, without any influence from Hilbert Investment Solutions Ltd Capital Limited or its representatives.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(e)</span>
                <span>The responses and confirmations you have provided are accurate, correct, true, and complete as of the date of this declaration. If there are any changes to your responses, you agree to promptly inform the Company in writing and provide any requested information or documents.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(f)</span>
                <span>You acknowledge that if any response or confirmation provided in this form is inaccurate, untrue, or incomplete, there may be adverse consequences to the provision of financial services to you.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(g)</span>
                <span>You authorize Hilbert Investment Solutions Ltd Capital Limited to contact any source of information, person, or entity to verify the accuracy and completeness of the responses and confirmations provided in this form.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(h)</span>
                <span>You are acting as a principal, either on your own behalf or as an authorized person for and on behalf of another person or entity. In all interactions with Hilbert Investment Solutions Ltd Capital Limited regarding the provision of financial services, you will act as a principal only.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(i)</span>
                <span>You consent to being treated as a professional client under the relevant laws and regulations of the Dubai International Financial Centre (DIFC).</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(j)</span>
                <span>You acknowledge and accept that this declaration is binding on you. If you are a duly authorized representative of the account holder, you have informed the account holder and ensured their full awareness and acceptance of these terms.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">(k)</span>
                <span>You are aware that this form, along with the client agreement, are legally binding documents. In case of any doubts, you have either sought independent legal, tax, or other advice or taken a decision that such advice is not required. This decision has been made independently without any influence from Hilbert Investment Solutions Ltd Capital Limited or its representatives.</span>
              </li>
            </ol>
            
            <p className="mt-4">
              The Company's client agreement will govern the relationship between us and will become effective upon your signature on this form. By signing this form, you confirm that you have read and fully understood the client agreement and the conditions under which Hilbert Investment Solutions Ltd Capital Limited will provide its services to you. Continuing to conduct business with the Company implies your agreement to the terms set forth in the client agreement.
            </p>
          </div>
          
          {/* Signature section */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-300 p-4">
                <div className="font-semibold mb-2">CLIENT SIGNATURES</div>
                <div className="mb-2">
                  <div className="text-sm">Name:</div>
                  <input type="text" className="w-full border border-gray-300 rounded p-1" />
                </div>
                <div className="mb-2">
                  <div className="text-sm">Title:</div>
                  <input type="text" className="w-full border border-gray-300 rounded p-1" />
                </div>
                <div className="mb-2">
                  <div className="text-sm">Date:</div>
                  <input type="date" className="w-full border border-gray-300 rounded p-1" />
                </div>
                <div className="mb-2">
                  <div className="text-sm">Signature:</div>
                  <div className="w-full border border-gray-300 rounded p-1 h-16 bg-gray-50"></div>
                </div>
              </div>
              <div className="border border-gray-300 p-4">
                <div className="font-semibold mb-2">RELATIONSHIP MANAGER SIGNATURES</div>
                <div className="mb-2">
                  <div className="text-sm">Name:</div>
                  <input type="text" className="w-full border border-gray-300 rounded p-1" />
                </div>
                <div className="mb-2">
                  <div className="text-sm">Title:</div>
                  <input type="text" className="w-full border border-gray-300 rounded p-1" />
                </div>
                <div className="mb-2">
                  <div className="text-sm">Date:</div>
                  <input type="date" className="w-full border border-gray-300 rounded p-1" />
                </div>
                <div className="mb-2">
                  <div className="text-sm">Signature:</div>
                  <div className="w-full border border-gray-300 rounded p-1 h-16 bg-gray-50"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footnotes */}
          <div className="text-xs text-gray-600">
            <div className="border-t border-gray-300 pt-2">
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
              <div className="text-right text-xs text-gray-500 mt-2">
                Page 1 of 4
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Link to="/">
              <Button 
                variant="outline" 
                className="flex items-center text-gray-600 hover:text-gray-900 border-gray-300 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back
              </Button>
            </Link>
            
            <button type="submit" className="bg-hilbert-blue text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Submit Form
            </button>
          </div>
          
          <div className="text-right text-xs text-gray-500 mt-4">
            Page 4 of 4
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientClassification; 