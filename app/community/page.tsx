'use client';

import React from 'react';

export default function CommmunityPage() {
    return (
        <main className='max-w-4xl mx-auto px-6 py-12'>
            <section className='text-center mb-12'>
                
                    <h1 className='text-4xl font-extrabold text-gray-900 mb-6'>
                        Community & Collaboration
                    </h1>
                    <p className='text-lg text-gray-700 mb-10'>
                        Share your experiences, get help from others, and grow together with the invoice generator community.
                    </p>
            </section>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>

                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Community Forum
                    </h2>
                    <p className='text-gray-600'>
                        Join our community forum to ask questions, join discussion forums, and share tips with other users.
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Feature Requests
                    </h2>
                    <p className='text-gray-600'>
                        Have an idea for improvement? Submit your feature request and vote on others.
                    </p>

                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Bug Reporting
                    </h2>
                    <p className='text-gray-600'>
                        Help us improve by reporting any issues or unexpected behavior.
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Share Your Work
                    </h2>
                    <p className='text-gray-600'>
                        Show off how you use our invoice generator in your business or freelancing.
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Tips and Best Practises
                    </h2>
                    <p className='text-gray-600'>
                        Discover proven tips from experienced users on optimizing your invoicing workflow.
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                         Partner Showcase
                    </h2>
                    <p className='text-gray-600'>
                        Explore how businesses are integrating our invoice generator into their systems.
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Community Events
                    </h2>

                    <p className='text-gray-600'>
                         Join live Q&As, webinars, and workshops with our team and community experts.
                    </p>
                </div>

                <div className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                        Local Meetups
                    </h2>
                    <p className='text-gray-600'>
                         Connect with other users near you to exchange ideas and collaborate in person.
                    </p>
                </div>
                
            </section>
        </main>
    )
}