'use client';

import React from 'react';

export default function LearnPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            <section className='text-center mb-12'>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                Learn & Master Invoicing
            </h1>
            <p className="text-lg text-gray-700 mb-10">Here you’ll find tutorials, how-to guides, and FAQs about using our invoice generator effectively.</p>
            </section>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                       Getting Started
                    </h2>
                    <p className='text-gray-600'>
                        A quick guide to create your first invoice and understand the basics.
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8  hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Customize Your Invoice
                    </h2>
                    <p className='text-gray-800'>
                        Learn how to add your logo, change currencies, and personalize your invoices.
                    </p>
                </div>

                <div className='bg-white-shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Download & Share
                    </h2>
                    <p className='text-gray-800'>
                        Instructions on downloading as PDF or sending invoices directly to clients.
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Frequently Asked Questions
                    </h2>
                    <p className='text-gray-800'>
                        Find answers to common questions about our invoice generator
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Troubleshooting
                    </h2>
                    <p className='text-gray-800'>
                        If you encounter any issues, check our troubleshooting guide for solutions.
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Additional Resources
                    </h2>
                    <p className='text-gray-800'>
                        Explore our blog for tips on invoicing best practises, financial management, and more.
                    </p>
                </div>
            </section>
            
        </main>
    )
}