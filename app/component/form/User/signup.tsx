'use client';
import React, { useState } from 'react';

const SignupPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        console.log('Sign-up button clicked');
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleCancel = () => {
  console.log('Cancel button clicked');
};

const handleLogin = () => {
  console.log('Login button clicked');
}


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <p className="text-gray-600 mb-6">You&#39;re a few seconds away from <br /> your Invoice Simple account!</p>
                <form>
                           <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="Johnny"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
            
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Appleseed"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              />
              </div>

              <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
  <input
    type="checkbox"
    id="receiveEmails"
    className="mr-2"
  />
  <label className="text-sm text-gray-600" htmlFor="receiveEmails">
    I want to receive emails from Invoice Simple and its Affiliates about their products, services, news, events, and promotions. <a className="text-sm text-gray-600" href="#">Read our Privacy Policy.</a>
  </label>
  </div>

  <div className="flex flex-col items-center justify-center">
  <button
    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="button"
    onClick={() => handleSignUp()}
  >
    Sign Up
  </button>

  <button
    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
    type="button"
    onClick={() => handleCancel()}
  >
    Cancel
  </button>

   <p className="text-sm text-gray-600 mt-2">
    By signing up, you agree to the <a className="text-sm text-gray-600" href="#">terms of use</a> & <a className="text-sm text-gray-600" href="#">privacy policy</a>.
  </p>

  </div>
                </form>

                <p className="text-sm text-gray-600 mt-2">
  Already have an account?{' '}
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => handleLogin()}>
    Log in
  </button>
</p>
            </div>
        </div>
    );
};

export default SignupPage;