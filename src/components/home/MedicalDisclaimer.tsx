"use client";

import Link from "next/link";
import Image from "next/image";

export default function MedicalDisclaimer() {
  return (
    <section id="disclaimer" className="bg-[#F8F9FA] border-y border-gray-200 py-8 px-4 sm:px-6">
        
      <div className="max-w-3xl mx-auto text-center">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
                <div className="flex justify-center mb-5">
                  <Image
                    src="/images/logo-onemi.svg"
                    alt="oneMi — My health in my hands"
                    width={130}
                    height={60}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              </div>
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

        <p className="text-sm text-brand-muted">
          For complete details, please refer to our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-brand-dark underline underline-offset-2 hover:text-[#E85D04] transition-colors"
          >
            Privacy Policy, Terms &amp; Conditions
          </Link>
          , and more.
        </p>
      </div>
    </section>
  );
}