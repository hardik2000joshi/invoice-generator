'use client';

import React, { useEffect } from 'react';

export default function ContactUsPage() {
    useEffect(() => {
         if (!document.getElementById('ze-snippet')) {
        const script = document.createElement('script');
        script.id = "ze-snippet";
        script.src = 'https://static.zdassets.com/ekr/snippet.js?key=162ab1a3-486f-4ab2-9b79-bb39916c05f3';
        script.async = true;

        document.body.appendChild(script);
         }
    }, []);

    return (
        <main className='max-w-3xl mx-auto px-4 py-8'>
            <h1 className='text-4xl font-bold mb-8 text-center text-gray-800'>Contact Us</h1>

            <form className='space-y-6'>
                <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                    <input type="text" placeholder='Full Name' className='flex-1 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                    <input type="email" placeholder='Email' className='flex-1 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                </div>
                <div>
                    <input type="text" placeholder='subject' className='w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                </div>
                <div>
                    <textarea placeholder='Your Message' className='w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400' rows={7}>
                        </textarea>
                </div>

                <p className='text-sm text-gray-600 text-center mt-6'>Do you prefer live chat? Use the support icon at bottom-right corner to message us instantly.</p>

                <div>
                    <button type='submit' className='w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition'>
                        Send Message
                    </button>
                </div>
            </form>
        </main>
    );
}