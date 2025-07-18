'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();
  
    useEffect(() => {
    fetch('/api/paysecure/confirm', { method: 'POST', credentials: 'include' })
      .finally(() => {
        setTimeout(() => {
          router.push('/myAccount');
        }, 2000);
      });
  }, [router]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Thank you, your payment was processed.</p>
      <p className="mt-2 text-gray-500 text-sm">Redirecting to your account...</p>
    </div>
  );
}
