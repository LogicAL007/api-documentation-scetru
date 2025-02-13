import React, { useState, useEffect } from 'react';
import { Search, Book, Key, FileCode, AlertCircle, FileText, ChevronRight, Code, CheckCircle, XCircle, Lock, RefreshCw, ShieldAlert, Menu, X } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeResponse, setActiveResponse] = useState('basic');
  const [activeLoanResponse, setActiveLoanResponse] = useState('approved');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target as Node) && window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterSections = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const isLinkVisible = (text: string) => {
    return text.toLowerCase().includes(searchTerm);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-4xl font-bold">Scetru API Documentation</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <nav
          id="sidebar"
          className={`
            fixed left-0 top-[112px] bottom-0 w-72 bg-gradient-to-b from-emerald-700 to-emerald-800 
            text-white overflow-y-auto transition-transform duration-300 ease-in-out z-50
            md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:sticky md:top-0 md:h-[calc(100vh-112px)]
          `}
        >
          <div className="p-6">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-4 py-2 pl-10 rounded-lg bg-emerald-800/50 text-white placeholder-emerald-300 border border-emerald-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => filterSections(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
            </div>

            {/* Sidebar Navigation */}
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wider mb-2">
                  PROACTIVE MARKETING
                </div>
                <div className="space-y-1">
                  {[
                    { id: 'getting-started', text: 'Getting Started', icon: <Book className="h-4 w-4" /> },
                    { id: 'authentication', text: 'Authentication', icon: <Key className="h-4 w-4" /> },
                    { id: 'get-customer', text: 'Loan-Attribute', icon: <FileCode className="h-4 w-4" /> },
                    { id: 'error-codes', text: 'Error Codes', icon: <AlertCircle className="h-4 w-4" /> }
                  ].map(({ id, text, icon }) => (
                    isLinkVisible(text) && (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                          activeSection === id
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'text-emerald-100 hover:bg-emerald-600/30'
                        }`}
                      >
                        {icon}
                        <span className="ml-2">{text}</span>
                        {activeSection === id && <ChevronRight className="h-4 w-4 ml-auto" />}
                      </a>
                    )
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-emerald-200 uppercase tracking-wider mb-2">
                  LOAN RECOMMENDATION
                </div>
                <div className="space-y-1">
                  {[
                    { id: 'getting-started-l', text: 'Getting Started', icon: <Book className="h-4 w-4" /> },
                    { id: 'authentication-l', text: 'Authentication', icon: <Key className="h-4 w-4" /> },
                    { id: 'get-loan', text: 'Loan-Attribute', icon: <FileCode className="h-4 w-4" /> },
                    { id: 'error-codes-l', text: 'Error Codes', icon: <AlertCircle className="h-4 w-4" /> }
                  ].map(({ id, text, icon }) => (
                    isLinkVisible(text) && (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                          activeSection === id
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'text-emerald-100 hover:bg-emerald-600/30'
                        }`}
                      >
                        {icon}
                        <span className="ml-2">{text}</span>
                        {activeSection === id && <ChevronRight className="h-4 w-4 ml-auto" />}
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <section id="getting-started" className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Book className="h-8 w-8 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">Getting Started</h2>
              </div>
              <div className="prose prose-emerald max-w-none">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The <strong className="text-emerald-700">Proactive Marketing API</strong> is a powerful tool designed to help businesses improve targeted marketing efforts by leveraging customer data specific to loan products.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This API enables seamless integration with the <strong className="text-emerald-700">Scetru App</strong> or other external systems, allowing clients to:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Specify loan types and define filtering criteria such as income level, age range, credit score, and employment status.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Retrieve a curated list of customers from their database who meet the specified loan criteria.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Leverage the API's validation engine to further qualify customers, ensuring only eligible candidates are identified for the loan.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-4">Quick Start Guide</h3>
                  <div className="space-y-4">
                    {[
                      "Sign up for an API key through the Scetru Developer Portal",
                      "Review the authentication requirements and obtain your JWT token",
                      "Explore the API endpoints and their specific requirements",
                      "Test the API using our provided examples",
                      "Integrate the API into your application"
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-emerald-900">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="authentication" className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Key className="h-8 w-8 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">Authentication</h2>
              </div>
              <div className="prose prose-emerald max-w-none">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The API uses <strong className="text-emerald-700">JWT (JSON Web Token)</strong> for authentication. Here's what you need to know:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Token Requirement",
                        description: "Every request must include a valid JWT token in the header",
                        icon: <Key className="h-5 w-5 text-emerald-500" />
                      },
                      {
                        title: "Token Generation",
                        description: "Obtain tokens through the authentication endpoint",
                        icon: <Code className="h-5 w-5 text-emerald-500" />
                      },
                      {
                        title: "Expiration",
                        description: "Tokens expire after 1 hour and must be renewed",
                        icon: <AlertCircle className="h-5 w-5 text-emerald-500" />
                      },
                      {
                        title: "Security",
                        description: "Never expose tokens in public repositories",
                        icon: <XCircle className="h-5 w-5 text-emerald-500" />
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {item.icon}
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                    <Code className="h-5 w-5 text-emerald-400" />
                    <span className="text-gray-200 text-sm">Authorization Header Example</span>
                  </div>
                  <pre className="p-4 text-emerald-400 overflow-x-auto">
                    <code>Authorization: Bearer YOUR_JWT_TOKEN</code>
                  </pre>
                </div>
              </div>
            </section>

            <section id="get-customer" className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <FileCode className="h-8 w-8 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">Loan-Attribute Endpoint</h2>
              </div>
              <div className="prose prose-emerald max-w-none">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The <code className="text-emerald-700">/loan-attributes</code> endpoint retrieves customers matching specific loan criteria and uploads to our ml service for loan validation.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Request Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-emerald-50">
                          <th className="px-4 py-2 text-left">Parameter</th>
                          <th className="px-4 py-2 text-left">Type</th>
                          <th className="px-4 py-2 text-left">Required</th>
                          <th className="px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["age_min", "integer", "Yes", "Minimum age of customers"],
                          ["age_max", "integer", "Yes", "Maximum age of customers"],
                          ["minAmount", "integer", "Yes", "Minimum income/loan threshold"],
                          ["credit_score_min", "integer", "Yes", "Minimum credit score"],
                          ["employment_status", "string", "Yes", "Customer employment status"]
                        ].map((row, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2">{row[0]}</td>
                            <td className="px-4 py-2">{row[1]}</td>
                            <td className="px-4 py-2">{row[2]}</td>
                            <td className="px-4 py-2">{row[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Example</h3>
                    <div className="bg-gray-900 rounded-xl overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                        <Code className="h-5 w-5 text-emerald-400" />
                        <span className="text-gray-200 text-sm">Request Example</span>
                      </div>
                      <pre className="p-4 text-emerald-400 overflow-x-auto">
                        <code>{`POST /api/v1/loan-attributes HTTP/1.1
Host: webappurl.com
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
    "loanName": "CarLoan",
    "employment_status": "Employed",
    "sex": "Male",
    "minAmount": 10000,
    "maxAmount": 50000,
    "age_min": 19,
    "age_max": 40,
    "income": 10000,
    "credit_score_min": 6
}`}</code>
                      </pre>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Response Details</h3>
                  <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                      <Code className="h-5 w-5 text-emerald-400" />
                      <span className="text-gray-200 text-sm">
                        {activeResponse === 'basic' ? 'Success Response' : 'Error Response'}
                      </span>
                    </div>
                    <pre className="p-4 text-emerald-400 overflow-x-auto">
                      {activeResponse === 'basic' ? (
                        <code>{JSON.stringify({
                          "loan description": {
                            "age_max": 40,
                            "age_min": 19,
                            "credit_score_min": 6,
                            "employment_status": "Employed",
                            "income": 10000,
                            "loanName": "CarLoan",
                            "maxAmount": "50000",
                            "minAmount": "10000",
                            "sex": "Male"
                          },
                          "Response": "Success, customer list under review"
                        }, null, 2)}</code>
                      ) : (
                        <code>{JSON.stringify({
                          "error": {
                            "code": 400,
                            "message": "Invalid request parameters"
                          }
                        }, null, 2)}</code>
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section id="getting-started-l" className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Book className="h-8 w-8 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">Getting Started - Loan Recommendation</h2>
              </div>
              <div className="prose prose-emerald max-w-none">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The <strong className="text-emerald-700">Loan Recommendation API</strong> helps financial institutions make data-driven decisions about loan applications by providing intelligent recommendations based on customer data.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Submit loan applications with customer details and receive instant recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Get approved loan amounts and customized repayment terms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Access detailed decline reasons for rejected applications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="authentication-l" className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="h-8 w-8 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">Authentication - Loan Recommendation</h2>
              </div>
              <div className="prose prose-emerald max-w-none">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The Loan Recommendation API uses <strong>JWT (JSON Web Token)</strong> for authentication. Here are the key authentication requirements:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Key className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>JWT Token Required:</strong> All API requests must include a valid JWT token in the header</span>
                    </li>
                    <li className="flex items-start">
                      <RefreshCw className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Token Expiration:</strong> Tokens expire after 1 hour and must be renewed</span>
                    </li>
                    <li className="flex items-start">
                      <ShieldAlert className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>Security Note:</strong> Never expose tokens in public repositories or share with unauthorized users</span>
                    </li>
                  </ul>

                  <div className="bg-gray-900 rounded-xl overflow-hidden mt-6">
                    <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                      <Code className="h-5 w-5 text-emerald-400" />
                      <span className="text-gray-200 text-sm">Authorization Header Example</span>
                    </div>
                    <pre className="p-4 text-emerald-400 overflow-x-auto">
                      <code>Authorization: Bearer YOUR_JWT_TOKEN</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section id="get-loan" className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <FileCode className="h-8 w-8 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">Loan-Recommendation Endpoint</h2>
              </div>
              <div className="prose prose-emerald max-w-none">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The <code className="text-emerald-700">/loan-request</code> endpoint processes loan applications and returns recommendations.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Request Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-emerald-50">
                          <th className="px-4 py-2 text-left">Field</th>
                          <th className="px-4 py-2 text-left">Type</th>
                          <th className="px-4 py-2 text-left">Required</th>
                          <th className="px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["application_id", "string", "Yes", "Unique identifier for the loan application"],
                          ["bvn", "string", "Yes", "Customer's Bank Verification Number"],
                          ["dob", "string", "Yes", "Date of birth (DD-MM-YYYY)"],
                          ["amount", "integer", "Yes", "Requested loan amount"],
                          ["tenure", "string", "Yes", "Loan tenure period"],
                          ["repayment_structure", "string", "Yes", "Repayment frequency"]
                        ].map((row, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2">{row[0]}</td>
                            <td className="px-4 py-2">{row[1]}</td>
                            <td className="px-4 py-2">{row[2]}</td>
                            <td className="px-4 py-2">{row[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Request</h3>
                    <div className="bg-gray-900 rounded-xl overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                        <Code className="h-5 w-5 text-emerald-400" />
                        <span className="text-gray-200 text-sm">Request Example</span>
                      </div>
                      <pre className="p-4 text-emerald-400 overflow-x-auto">
                        <code>{`POST /api/v1/loan-request HTTP/1.1
Host: scetru.com
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
    "application_id": "2478816438",
    "bvn": "79686848137",
    "dob": "04-04-2008",
    "amount": 869000,
    "tenure": "2 years",
    "repayment_structure": "weekly"
}`}</code>
                      </pre>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Example Responses</h3>
                  <p className="text-gray-600 mb-4">Depending on the loan evaluation, the API returns one of the following responses:</p>
                  
                  <div className="flex space-x-4 mb-4">
                    <button
                      onClick={() => setActiveLoanResponse('approved')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeLoanResponse === 'approved'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Approved Loan
                    </button>
                    <button
                      onClick={() => setActiveLoanResponse('declined')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeLoanResponse === 'declined'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Declined Loan
                    </button>
                  </div>

                  <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                      <Code className="h-5 w-5 text-emerald-400" />
                      <span className="text-gray-200 text-sm">
                        {activeLoanResponse === 'approved' ? 'Approved Response' : 'Declined Response'}
                      </span>
                    </div>
                    <pre className="p-4 text-emerald-400 overflow-x-auto">
                      <code>{
                        activeLoanResponse === 'approved' 
                          ? `{
    "internalId": "sce-10ffb09f-869d-4bbc-9ded-f5737e139b33",
    "applicationId": "2478816438",
    "bvn": "79686848137",
    "amountRequested": 869000,
    "loanTenure": "2 year",
    "loanRepaymentStructure": "weekly",
    "createdDate": "2024-02-07 08:56:00",
    "amountApproved": 1013523.538,
    "updatedDate": "2024-02-07 09:01:00",
    "loanMessage": "APPROVED",
    "declineReason": null,
    "dob": "04-04-2008"
}`
                          : `{
    "internalId": "sce-10593eb1-f5f8-4051-a968-e98e317c1449",
    "applicationId": "7699366766",
    "bvn": "90861990982",
    "amountRequested": 390000,
    "loanTenure": "4 year",
    "loanRepaymentStructure": "biweekly",
    "createdDate": "2024-02-19 23:51:00",
    "amountApproved": 0.0,
    "updatedDate": "2024-02-19 23:56:00",
    "loanMessage": "DECLINED",
    "declineReason": "Loan declined due to low transaction or incomplete records",
    "dob": "06-11-2001"
}`
                      }</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section id="error-codes-l" className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="h-8 w-8 text-emerald-600" />
                <h2 className="text-3xl font-bold text-gray-900">Error Codes - Loan Recommendation</h2>
              </div>
              <div className="prose prose-emerald max-w-none">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The following error codes may be returned by the Loan Recommendation API:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-emerald-50">
                          <th className="px-4 py-2 text-left">Code</th>
                          <th className="px-4 py-2 text-left">Description</th>
                          <th className="px-4 py-2 text-left">Resolution</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["400", "Bad Request", "Check if all required parameters are provided and valid"],
                          ["401", "Unauthorized", "Verify your JWT token is valid and not expired"],
                          ["403", "Forbidden", "Ensure your account has permission to access this endpoint"],
                          ["404", "Not Found", "The requested resource could not be found"],
                          ["422", "Unprocessable Entity", "The loan application data is invalid or incomplete"],
                          ["500", "Internal Server Error", "Contact support if the issue persists"]
                        ].map((row, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2">{row[0]}</td>
                            <td className="px-4 py-2">{row[1]}</td>
                            <td className="px-4 py-2">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <footer className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white py-6 text-center">
        <p>SCETRU API Documentation - Scetru © 2025</p>
      </footer>
    </div>
  );
}

export default App;