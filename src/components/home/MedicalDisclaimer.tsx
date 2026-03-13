"use client";

import Link from "next/link";
import Image from "next/image";

export default function MedicalDisclaimer() {
  return (
    <section id="disclaimer" className="bg-[#F8F9FA] border-y border-gray-200 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">

        {/* Logo */}
        <div className="flex justify-center mb-5 pt-10">
          <Image
            src="/images/logo-onemi.svg"
            alt="oneMi — My health in my hands"
            width={130}
            height={60}
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Tagline — Montserrat 500, 16px, 24px lh, rgb(26,26,46) */}
        <p style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "26px",
          color: "rgb(37, 37, 37)",
          marginBottom: "12px",
        }}>
          Powered by AI. Driven by Data.
        </p>

        {/* Body — Montserrat 500, 14px, 23px lh, rgb(107,114,128) */}
        <p style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
          color: "rgb(69, 69, 69)",
          marginBottom: "40px",
          maxWidth: "672px",
          margin: "0 auto 40px",
        }}>
          OneMi is a health management platform for clinical insights, curated
          solutions, and personalised care—built to bring clarity, continuity,
          and confidence to your health journey.
        </p>

        {/* Disclaimer divider */}
        <div className="flex items-center gap-3 mb-5 justify-center">
          <div className="flex-1 border-t border-gray-700 max-w-100" />
          <span style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "16px",
            color: "rgb(37, 37, 37)",
            letterSpacing: "0.05em",
          }}>
            Disclaimer
          </span>
          <div className="flex-1 border-t border-gray-700 max-w-100" />
        </div>

        {/* Disclaimer text — Montserrat 500, 14px, 23px lh, rgb(107,114,128) */}
        <p style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          color: "rgb(69, 69, 69)",
          marginBottom: "8px",
        }}>
          OneMi supports health understanding and care navigation. It does not
          diagnose, prescribe, or replace doctors. Always consult qualified
          healthcare professionals for medical decisions.
        </p>

        {/* Links — Montserrat 500, 16px, 24px lh, rgb(26,26,46) */}
        <p style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "14px",
          color: "rgb(69, 69, 69)",
          paddingBottom: "40px",
        }}>
          For complete details, please refer to our{" "}
          <Link
            href="/privacy-policy"
            style={{
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "14px",
              color: "rgb(10, 19, 35)",
              textDecoration: "none",
            }}
            className="hover:text-[#E85D04] transition-colors"
          >
            Privacy Policy,
          </Link>{" "}
          <Link
            href="/terms-and-conditions"
            style={{              
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "14px",
              color: "rgb(10, 19, 35)",
              textDecoration: "none",
            }}
            className="hover:text-[#E85D04] transition-colors"
          >
            Terms &amp; Conditions
          </Link>
          , and more.
        </p>

      </div>
    </section>
  );
}