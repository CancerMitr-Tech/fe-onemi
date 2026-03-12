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

        {/* Tagline */}
        <p className="text-base font-semibold text-brand-dark mb-3">
          Powered by AI. Driven by Data.
        </p>
        <p className="text-sm text-brand-muted leading-relaxed mb-10 max-w-2xl mx-auto">
          OneMi is a health management platform for clinical insights, curated
          solutions, and personalised care—built to bring clarity, continuity,
          and confidence to your health journey.
        </p>

        {/* — Disclaimer — */}
        <div className="flex items-center gap-3 mb-5 justify-center">
          <div className="flex-1 border-t border-gray-300 max-w-45" />
          <span className="text-sm font-semibold text-brand-dark tracking-wide">
            Disclaimer
          </span>
          <div className="flex-1 border-t border-gray-300 max-w-45" />
        </div>

        <p className="text-sm text-brand-muted mb-2 leading-relaxed">
          OneMi supports health understanding and care navigation. It does not
          diagnose, prescribe, or replace doctors. Always consult qualified
          healthcare professionals for medical decisions.
        </p>

        <p className="text-sm text-brand-muted pb-10">
          For complete details, please refer to our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-brand-dark hover:text-[#E85D04] transition-colors"
            style={{ textDecoration: "none" }}
          >
            Privacy Policy,
          </Link>{" "}
          <Link
            href="/terms-and-conditions"
            className="font-semibold text-brand-dark hover:text-[#E85D04] transition-colors"
            style={{ textDecoration: "none" }}
          >
            Terms &amp; Conditions
          </Link>
          , and more.
        </p>

      </div>
    </section>
  );
}