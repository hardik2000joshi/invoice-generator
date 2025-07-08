"use client";

import { CreditCard } from 'lucide-react';
import Link from 'next/link';
import React, {useState} from 'react';
const PaymentPage = () => {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const handlePaymentMethodsSelect = (method: string) => {
        setPaymentMethod(method);
    }

    
   return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
    <div className='flex justify-center items-center mb-4'>
        <h2 className="text-2xl font-bold">Payment Gateway</h2>
        </div> 
        <div className='bg-white p-4 rounded-lg shadow-md w-96'>
            <h2 className='text-2xl font-bold mb-4'>Select Payment Method</h2>
            <ul>
                <li>
                    <Link href='/Debit-Card'>
                    <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold font-size: 100px py-2 px-4 rounded focus:outline-none focus:shadow-outline' 
                    onClick={() => handlePaymentMethodsSelect('debitCard')} >
                        Debit Card
                    </button>
                    </Link>
                </li>
                <br />

                <li>
                    <Link href='/credit-card'>
                    <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    onClick={() => handlePaymentMethodsSelect('creditCard')} > 
                        Credit Card
                    </button>
                    </Link>
                </li>
                <br />

                <li>
                    <Link href='/UPI'>
                    <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    onClick={() => handlePaymentMethodsSelect('upi')} >
                        UPI
                    </button>
                    </Link>
                </li>
                <br />

                <li>
                    <Link href='/Net Banking'>
                    <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    onClick={() => handlePaymentMethodsSelect('netBanking')} >
                        Net Banking
                    </button>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
   )
} 

export default PaymentPage;