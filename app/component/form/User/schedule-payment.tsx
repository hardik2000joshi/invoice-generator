'use client';
import { setFips } from 'crypto';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const SchedulePayment = () => {
    const [requests, setRequests] = useState(5000);
    const [baseCost, setBaseCost] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);

    useEffect(() => {
        let cost = 0;
        let discountAmount = 0;
        let finalAmount = 0;
        if (requests <= 5000) {
            cost = 50;
            discountAmount = cost * 0.10; // 10%= 10/100 = 0.10 
            // disAmt = 50 * .10 = 5%
        }

        else if (requests <= 10000) {
            cost = 100;
            discountAmount = 10;
        }

        else if (requests <= 15000){
            cost = 150;
            discountAmount = 15;
        }
        
        else if (requests <= 20000) { 
            cost = 200;
            discountAmount = 20;
        }

        else if (requests <= 25000) {
            cost = 250;
            discountAmount = 25;
        }

        else if (requests <= 30000) {
            cost = 300;
            discountAmount = 30;
        }

        else if (requests <= 35000) {
            cost = 350;
            discountAmount = 35;
        }

        else if (requests <= 40000) {
            cost = 400;
            discountAmount = 40;
        }

        else if (requests <= 45000) {
            cost = 450;
            discountAmount = 45;
        }

        else if (requests <= 50000) {
            cost = 500;
            discountAmount = 50;
        }

        finalAmount = cost - discountAmount;
        
        setDiscount(discountAmount);
        setFinalAmount(finalAmount);
        setBaseCost(cost);
    }, [requests]);

    return (
        <div className='min-h-screen'>
            <header className='bg-white shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='flex justify-between items-center'>
        <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        <h1 className='ml-2 text-2xl font-bold text-gray-900'> API Subscription </h1>

        </div>
        </div>
        </div>
        </header>

        <section className='py-12 sm:py-16'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center'>
                    <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
                        Simple, Transparent API Pricing
                    </h2>
                    <p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto'>
                        Pay only for what you use. $10 per 1,000 requests with 10% bonus on <br /> every 5,000 requests. 
                    </p>
                </div>
            </div>
        </section>
        <section className='py-12 bg-white'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-6'>Calculate Your Cost</h3>
                    <div className='mb-8'>
                        <label className='block-text-sm font-medium text-gray-700 mb-1' htmlFor="requests">
                            Monthly API Requests
                        </label>
                        <input id="requests" className='calculator-slider w-full h-2 bg-blue-700 rounded-lg appearance-none cursor-pointer' type="range" min="1000" max="50000" step="1000" value={requests} 
                        onChange={(e) => setRequests(Number(e.target.value))}
                        />
                        <div className='flex justify-between mt-2 text-sm text-gray-600'>
                            <span>1,000</span>
                            <span>25,000</span>
                            <span>50,000</span>
                        </div>
                        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{requests.toLocaleString()}requests</p>
                                    <p className="text-sm text-gray-500">per month</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-blue-600">${finalAmount.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">estimated cost</p>
                                </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Base cost (5,000 requests @ $10/1,000)</span>
                                    <span className="font-medium">${baseCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-2">
                                    <span className="text-gray-600">Discount</span>
                                    <span className="font-medium text-green-600">${discount.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className='mt-6 flex justify-center'>
                                <Link href={`/checkout?amount=${finalAmount}&baseAmount=${baseCost}&discountAmount=${discount}`}>
                                <button className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'>
                                    Subscribe Now
                                </button>
                                </Link>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </section>
        </div>
    );
};


export default SchedulePayment;
