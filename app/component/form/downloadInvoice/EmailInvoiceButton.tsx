"use client";
import React, { useState } from 'react';

const EmailInvoiceButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(true);
  };

   const handleClosePopup = () => {
    setShowPopup(false);
    setSuccessMessage(false);
  };

 
  return (
    <div className="mt-4 flex justify-center">
      <button onClick={() => setShowPopup(true)} className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all">
        Email Invoice
      </button>   
      

      {showPopup && (
        <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="popup-content bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Get the invoice on the email right now</h2>
                <button onClick={() => setShowPopup(false)} className="text-white hover:text-gray-200 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {!successMessage ? ( <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button type='submit' className='w-full mt-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all'>
                  Send Invoice
                </button>
                </div>
                </form>
            ) : (
              <div className="p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Invoice Sent!</h3>
                <p className="text-gray-600 mb-4">We&#39;ve sent the invoice to your email address.</p>
                <button onClick={handleClosePopup} className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all">
                  Close
                </button>
                </div>
            )
          }
          </div>
    </div>
      )
    }
    </div>
  );
}
export default EmailInvoiceButton;