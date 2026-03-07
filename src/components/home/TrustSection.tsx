import SectionWrapper from "@/components/ui/SectionWrapper";
import { TRUST_CARDS } from "@/constants/home";

export default function TrustSection() {
  return (
    <SectionWrapper className="bg-brand-mint">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          Trust &amp; <span className="text-brand-orange">Safety</span>
        </h2>
        <p className="text-brand-muted mt-2 text-lg">
          Your data. Your control. Your safety.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {TRUST_CARDS.map((card) => (
          <div
            key={card}
            className="bg-white rounded-xl p-6 flex flex-col gap-3 shadow-sm"
          >
            {/* Amber badge icon */}
            <div className="w-10 h-10 rounded-lg bg-brand-amber flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="h-0.5 bg-brand-orange w-8" />
            <p className="font-semibold text-sm text-brand-dark">{card}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}