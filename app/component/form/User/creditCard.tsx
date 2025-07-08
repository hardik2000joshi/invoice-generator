"use client";

import React, {useState} from 'react';

const CreditCard = () => {
    const [amount, setAmount] = useState<number>(0);
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount (Number(e.target.value));
    }


    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const handlePayment = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setPaymentStatus('');
        setPaymentError('');

        try {
            if(!cardNumber || !expiryDate || !cvv || !cardHolder || !amount){
                setPaymentError('Please fill in all the fields');
                setPaymentStatus('');
                return;
            }

            if (!cardNumber || cardNumber.length != 16 || isNaN(Number(cardNumber))) {
                setPaymentError('Invalid card number');
                setPaymentStatus('');
            }

            if (!expiryDate) {
                setPaymentError('Expiry date is required');
                setPaymentStatus('');
                return;
            }
            const [year, month] = expiryDate.split('-');

            if (!year || !month || isNaN(Number(year)) || isNaN(Number(month))) {
                setPaymentError('Invalid expiry date format');
                setPaymentStatus('');
                return;
}

            const formattedExpiryDate = `${month}/${year.slice(2)}`;

            if (!cvv || cvv.length!=3 || isNaN(Number(cvv))) {
                setPaymentError('Invalid cvv');
                setPaymentStatus('');
                return;
            }

            if (!amount || amount<=0 || isNaN(amount)) {
                setPaymentError('Please enter a valid amount');
                setPaymentStatus('');
                return;
            }

            const redirectUrl= 'http://localhost:3000';

            const success_redirect = `${redirectUrl}/payment-success`;
            const failure_redirect = `${redirectUrl}/payment-failure`;

            const response = await fetch('/api/paysecure', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify ({
                    amount,
                    success_redirect,
                    failure_redirect,
                }),
            });

            console.log(response);
            const data = await response.json();
            console.log('Response from server:', data);

                if(data.checkout_url) {
                    window.location.href = data.checkout_url;
                }
                else {
                    setPaymentError(data.message || 'Unable to initiate checkout.');
                    setPaymentStatus('');
                }
            }
        catch (err) {
              console.error('Failed to parse postResponse JSON or process result:', err);
              setPaymentError('Unexpected error while processing payment.');
              setPaymentStatus('');
        }

    };
    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold'>Credit Card Payment</h2>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md w-96'>
        <form onSubmit={handlePayment}>
            <div className='mb-4'>
                <label className='block-text-gray-700 text-sm font-bold mb-2' htmlFor="card holder">Card Holder</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" value={cardHolder} onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
                setCardHolder(e.target.value)} />
            </div>

            <div className='mb-4'>
            <label className='block-text-gray-700 text-sm font-bold mb-2' htmlFor="card number">Card Number</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" value={cardNumber} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                setCardNumber(e.target.value)} />
                </div>

                <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="expiry date">
                    ExpiryDate
                    </label>

                    <input
    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    type="month"
    value={expiryDate}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
        setExpiryDate(e.target.value)}
         />
         <p> Expiry Date: {expiryDate ? `${expiryDate.split('-')[1]}/${expiryDate.split('-')[0].slice(2)}` : ''} </p>
                </div>

                <div className='mb-6'>
                <label className='block-text-gray-700 text-sm font-bold mb-2' htmlFor="cvv">CVV</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" value={cvv} onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
                    setCvv(e.target.value)
                } 
                />
                </div>

                 <div className='mb-6'>
                    <label className='block-text=-gray-700 text-sm font-bold mb-2' htmlFor="amount">Amount :</label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" value={amount} onChange={handleAmountChange} placeholder='Enter amount'/>
                </div>

                <div className='flex flex-col items-center justify-center'>
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type='submit' >Pay Now</button>
                {paymentStatus && (
                    <div style={{color:'green'}}>
                        {paymentStatus}
                    </div>
                )}

                {paymentError && (
                    <div style={{color:'red'}}>
                        {paymentError}
                        </div>
                        )} 
                </div>

        </form>
        </div>
        </div>
    )
}

export default CreditCard;