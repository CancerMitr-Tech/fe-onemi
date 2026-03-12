import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";

const TRUST_CARDS = [
  { label: "Privacy-first architecture", image: "/images/trsut1.svg" },
  { label: "Secure encryption",          image: "/images/trust2.svg" },
  { label: "Controlled access",          image: "/images/trust3.svg" },
  { label: "AI guardrails",              image: "/images/trust4.svg" },
  { label: "Human escalation",           image: "/images/trust5.svg" },
  { label: "Clinical governance",        image: "/images/trust6.svg" },
];

export default function TrustSection() {
  return (
    <SectionWrapper className="bg-brand-mint">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          Trust &amp; <span className="text-brand-orange">Safety</span>
        </h2>
        <p className="text-brand-muted mt-2 text-base">
          Your data. Your control. Your safety.
        </p>
      </div>

      {/* 3×2 grid — square cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {TRUST_CARDS.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl flex flex-col items-center justify-center text-center shadow-sm"
            style={{ aspectRatio: "1 / 1", padding: "28px 20px" }}
          >
            {/* SVG icon — no bg circle, SVG has its own amber badge shape */}
            <Image
              src={card.image}
              alt={card.label}
              width={68}
              height={68}
              className="object-contain"
            />

            {/* Orange divider — exact same as production */}
            <div
              style={{
                width: "38px",
                height: "2px",
                backgroundColor: "#E05C1A",
                borderRadius: "2px",
                margin: "14px auto 12px",
              }}
            />

            {/* Label */}
            <p className="text-sm text-brand-muted font-normal leading-snug px-2">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}