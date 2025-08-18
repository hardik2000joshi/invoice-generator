'use client';

import React, {useState, useEffect } from 'react';
import { useData } from '../hooks/useData';

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

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    }); 

    const [status, setStatus] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const response = await fetch("/api/contactUs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                    body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (response.ok) {
            setStatus("Message sent successfully");
            setFormData({fullName: "", email: "", subject: "", message: ""})
        }
        else {
            setStatus("Error:" +data.error);
        }
        }

        catch (error) {
            setStatus("Failed to sent message");
        }
    };

    return (
        <main className='max-w-3xl mx-auto px-4 py-8'>
            <h1 className='text-4xl font-bold mb-8 text-center text-gray-800'>Contact Us</h1>

            <form className='space-y-6' onSubmit = {handleSubmit}>
                <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                    <input 
                    type="text" 
                    name="fullName" 
                    placeholder='Full Name' 
                    value={formData.fullName}
                    onChange={handleChange}
                    className='flex-1 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />

                    <input 
                    type="email" 
                    name='email' 
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange} 
                    className='flex-1 p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                </div>
                <div>
                    <input 
                    type="text" 
                    name='subject' 
                    placeholder='subject'
                    value={formData.subject}
                    onChange={handleChange} 
                    className='w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                </div>
                <div>
                    <textarea 
                    name='message' 
                    placeholder='Your Message'
                    value={formData.message}
                    onChange={handleChange} 
                    className='w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400' rows={7}>
                        </textarea>
                </div>

                <p className='text-sm text-gray-600 text-center mt-6'>Do you prefer live chat? Use the support icon at bottom-right corner to message us instantly.</p>

                <div>
                    <button type='submit' className='w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition'>
                        Send Message
                    </button>
                </div>
            </form>

            {status && <p className='text-center mt-4'>{status}</p>}
        </main>
    );
}