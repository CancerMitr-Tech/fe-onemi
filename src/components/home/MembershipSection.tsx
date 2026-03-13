import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { MEMBERSHIP, MEMBERSHIP_FEATURES } from "@/constants/home";

export default function MembershipSection() {
  return (
    <SectionWrapper id="membership" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-12 items-start">

        {/* ── Left: copy ── */}
        <div className="flex flex-col lg:sticky lg:top-24" style={{ gap: "12px" }}>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "36px",
              fontWeight: 600,
              lineHeight: "54px",
              color: "rgb(37,37,37)",
              margin: 0,
            }}
          >
            {MEMBERSHIP.heading}
          </h2>

          {/* Subheading — orange */}
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "36px",
              fontWeight: 600,
              lineHeight: "54px",
              color: "rgb(234,90,26)",
              margin: 0,
            }}
          >
            {MEMBERSHIP.subheading}
          </p>

          {/* Body */}
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "30px",
              color: "rgb(69,69,69)",
              margin: 0,
            }}
          >
            {MEMBERSHIP.body}
          </p>

          {/* CTA */}
          <div className="mt-2">
            <Link
              href="/#onemipro"
              className="inline-block bg-brand-orange hover:bg-brand-orange-hover text-white px-6 py-3 rounded-lg transition-colors duration-200"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {MEMBERSHIP.cta}
            </Link>
          </div>
        </div>

        {/* ── Right: 2×3 grid of feature cards ── */}
        <div className="grid grid-cols-2 gap-4">
          {MEMBERSHIP_FEATURES.map((feature) => (
            <div key={feature.title} className="flex flex-col" style={{ gap: "8px" }}>

              {/* Image */}
              <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4 / 3" }}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Card title */}
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "30px",
                  color: "rgb(69,69,69)",
                  margin: 0,
                }}
              >
                {feature.title}
              </h3>

              {/* Card caption */}
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  color: "rgb(37,37,37)",
                  margin: 0,
                }}
              >
                {feature.caption}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}