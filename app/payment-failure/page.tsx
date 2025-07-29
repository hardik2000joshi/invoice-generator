'use client';
import Link from "next/link";

export default function PaymentFailure() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center">
        <div className="flex justify-center mb-6">
          <svg
          xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M4.293 6.293a1 1 0 011.414 0L12 12.586l6.293-6.293a1 1 0 111.414 1.414L13.414 14l6.293 6.293a1 1 0 01-1.414 1.414L12 15.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 14 4.293 7.707a1 1 0 010-1.414z"
            />
            </svg>
        </div>

      <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Failed!</h1>
      <p className="text-gray-700 mt-4">
        <strong>Sorry, something went wrong.</strong>
        </p>

        <p className="text-gray-500 mb-6">
          Don&apos;t worry your money is safe! If money was <br />
          debited from your account, it will be refunded <br />
          automatically within 5-7 working days.
        </p>

        <div className="flex flex-col gap-3">
          <Link href='/myAccount'
          className="bg-gray-600 hover:bg--gray-700 text-white px-6 py-2 rounded-md text-sm font-medium">
          My Account
          </Link>

          <Link
          href ='/checkout'
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium">
            Retry Payment
          </Link>
        </div>
    </div>
    </div>
  );
}