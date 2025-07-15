'use client';
import React, { useState } from 'react';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    const response = await fetch("/api/login", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({email, password}),
    });

    if (response.ok) {
        window.location.href="/myAccount";
    }
    else {
        alert("Invalid Credentials");
    }
};

  const handleCancel = () => {

    console.log('Cancel button clicked');
  }

  const handleSignUp = () => {
    console.log('Sign-up button clicked');
  }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className= "bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Log in to your account</h2>
                <p className="text-gray-600 mb-6">Welcome back, we hope you&#39;re <br /> having a great day.</p>
                <form>
                    <div className="mb-4">
                        <label className="block-text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>


                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                      id="email" 
                      type="email" 
                      placeholder= "Name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />         
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>

                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" 
                        type="password" 
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <a className="text-sm text-gray-600 hover:text-gray-900" href="#">
                            Forgot your password?
                            </a>
                            <div className="flex justify-center mb-4 space-x-4">
                            <button
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                            onClick={() => handleLogin()}
                            >
                            Login
                            </button>
                       
                        
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4" type="button" onClick={() => handleCancel()}>
                            Cancel
                            </button>
                            </div>
                            
                            <div className="flex items-center justify-center">
    <span className="text-sm text-gray-600 mr-2">Don&#39;t have an account?</span>

<a href="/signup"
className='inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
>
    Sign Up
</a>
        
        
        </div>
        </div>
                </form>
            </div>
        </div>
    );
};


export default LoginPage;




