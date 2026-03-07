import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { PRICING_FEATURES, PRICING_PLANS } from "@/constants/home";

export default function PricingSection() {
  return (
    <SectionWrapper className="bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature list */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-brand-dark">What&apos;s included</h3>
            <ul className="space-y-3 flex-1">
              {PRICING_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-brand-dark">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col gap-3 rounded-xl border-2 p-5 ${
                  plan.badge
                    ? "border-brand-orange bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <p className="font-semibold text-brand-dark">{plan.name}</p>
                <p className="text-2xl font-bold text-brand-orange">{plan.price}</p>
                <p className="text-xs text-brand-muted">{plan.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <Button href="#" className="w-full max-w-md">
            Get free AI credits
          </Button>
          <p className="text-xs text-brand-muted italic text-center">
            Experience the platform with up to 50 AI credits at no cost.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}