"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const program = searchParams.get("program") ?? "your health program";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-20">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-brand-dark mb-2">Order Placed Successfully!</h1>
        <p className="text-brand-muted mb-8">
          Thank you for choosing {program}. Our team will reach out to you shortly to get you
          started.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/orders"
            className="bg-brand-orange hover:bg-brand-orange-hover text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            View My Orders
          </Link>
          <Link
            href="/"
            className="border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <OrderSuccessContent />
    </Suspense>
  );
}