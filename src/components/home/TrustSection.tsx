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
    <SectionWrapper className="bg-[#E5EDEE]">

      {/* ── Heading ── */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        {/* Manrope 600, 40px, 48px lh */}
        <h2
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "48px",
            color: "rgb(37,37,37)",
            margin: 0,
          }}
        >
          Trust &amp;{" "}
          <span style={{ color: "rgb(234,90,26)" }}>Safety</span>
        </h2>
        {/* Montserrat 400, 20px, 30px lh, rgb(69,69,69) */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "30px",
            color: "rgb(69,69,69)",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          Your data. Your control. Your safety.
        </p>
      </div>

      {/* ── 3×2 grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {TRUST_CARDS.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl flex flex-col items-center justify-center text-center"
            style={{ aspectRatio: "1 / 1", padding: "28px 20px" }}
          >
            {/* Icon */}
            <Image
              src={card.image}
              alt={card.label}
              width={68}
              height={68}
              className="object-contain"
            />

            {/* Divider — plain <img> tag, full width, no Next.js optimization blur */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/line3.png"
              alt=""
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                margin: "12px 0 10px",
              }}
            />

            {/* Label — Montserrat 400, 20px, 30px lh, rgb(69,69,69) */}
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "26px",
                color: "rgb(69,69,69)",
                margin: 0,
                padding: "0 0px",
              }}
            >
              {card.label}
            </p>
          </div>
        ))}
      </div>

    </SectionWrapper>
  );
}