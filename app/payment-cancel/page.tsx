export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-gray-700 mb-6">
        You have cancelled the payment process. No charges were made.
      </p>
      <a
        href="/myAccount"
        className="text-blue-600 underline hover:text-blue-800 transition"
      >
        Return to Homepage
      </a>
    </div>
  );
}
