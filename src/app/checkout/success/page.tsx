import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-20">
        {/* Check icon */}
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

        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Order Placed Successfully!</h1>
        <p className="text-[#6B7280] mb-8">
          Thank you for choosing My Health Recharge Program. Our team will reach out to you shortly
          to get started on your 90-day journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#E85D04] hover:bg-[#C94E03] text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Go to Home
          </Link>
          <Link
            href="/programs/my-health-recharge"
            className="border border-[#E85D04] text-[#E85D04] hover:bg-[#E85D04] hover:text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
