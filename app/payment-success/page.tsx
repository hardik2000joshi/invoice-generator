'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const [message, setMessage] = useState('checking payment status...');
  const router = useRouter();
  
    useEffect(() => {
       const confirmPayment = async () => {
      try {
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/api/paysecure/confirm`, {
          method: 'POST',
          credentials: 'include',
        });
        const result = await response.json();

        if (response.ok) {
          setMessage('Payment status updated. Redirecting to My Account...');
        } else {
          setMessage(result.error || 'Payment confirmation failed.');
        }
      } catch (error) {
        setMessage('Error confirming payment. Please check later.');
      } finally {
        setTimeout(() => {
          router.push('/myAccount');
        }, 7000); // Redirect after 7 seconds
      }
    };

    confirmPayment();
  }, [router]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">{message}</p>
      <p className="mt-2 text-gray-500 text-sm">Redirecting to your account...</p>
    </div>
  );
}
