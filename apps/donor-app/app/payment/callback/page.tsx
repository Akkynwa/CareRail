import { Suspense } from 'react';
import { redirect } from 'next/navigation';

interface PaymentCallbackPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function PaymentCallbackContent({ searchParams }: PaymentCallbackPageProps) {
  const txnRef = searchParams.txn_ref as string;
  const responseCode = searchParams.response_code as string;
  const amount = searchParams.amount as string;

  // Redirect based on payment status
  if (responseCode === '00' || responseCode === '0') {
    // Payment successful
    redirect(`/dashboard?payment=success&ref=${txnRef}&amount=${amount}`);
  } else {
    // Payment failed
    redirect(`/dashboard?payment=failed&ref=${txnRef}&code=${responseCode}`);
  }
}

export default function PaymentCallbackPage({ searchParams }: PaymentCallbackPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Processing Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your payment...
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <PaymentCallbackContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}