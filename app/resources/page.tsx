'use client';

import React from 'react';

export default function ResourcesPage() {

    return (
        <main className='max-w-4xl mx-auto px-6 py-12'>
            <section className='text-center mb-12'>
                <h1 className='text-4xl font-extrabold text-gray-900 mb-6'>
                     Business & Invoicing Resources
                </h1>
                <p className='text-lg text-gray-700 mb-10'>
                    Discover tools, templates, and expert advice to manage your business efficiently.
                </p>
            </section>


      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
          {
            title: 'Invoice Templates',
            description:
              'Download customizable invoice templates for different industries and use cases.',
          },
          {
            title: 'Tax & Compliance Guides',
            description:
              'Understand tax requirements and how to stay compliant with regulations.',
          },
          {
            title: 'Freelancer Toolkit',
            description:
              'Essential tools and tips for freelancers to manage clients and finances.',
          },
          {
            title: 'Expense Tracking',
            description:
              'Recommended apps and techniques to keep track of business expenses.',
          },
          {
            title: 'Payment Methods Explained',
            description:
              'Learn about various online payment methods, pros and cons, and how to use them.',
          },
          {
            title: 'Time Management Tips',
            description:
              'Stay productive and organized with expert time management strategies.',
          },
        ].map ((item, index) => (
            <div
            key={index}
            className='bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition-shadow'
            >
                <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                    {item.title}
                </h2>
                <p className='text-gray-600'>
                    {item.description}
                </p>
            </div>
        ))}
        </section>
        </main>
    )
}