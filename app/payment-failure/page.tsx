'use client';

export default function PaymentFailure() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-4">Something went wrong. Please try again.</p>
    </div>
  );
}