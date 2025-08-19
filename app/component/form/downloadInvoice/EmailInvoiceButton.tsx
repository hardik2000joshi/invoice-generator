"use client";
import React, { useState } from 'react';

const EmailInvoiceButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = "Your Invoice from TedTools";
    const body = `Hi ${name},\n\nPlease find your invoice attached.\n\nThanks,\nTedTools`;

    // Gmail Compose Link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // redirect user to Gmail Compose
     window.open(gmailUrl, "_blank");
    setShowPopup(false);
    /*setSuccessMessage(true);*/
  };

   /*const handleClosePopup = () => {
    setShowPopup(false);
    setSuccessMessage(false);
  };*/

 
  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={() => setShowPopup(true)}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        Email Invoice
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Enter details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
              >
                Open Gmail
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default EmailInvoiceButton;