import Image from "next/image";
import Link from "next/link";

const WHO_ITS_FOR = [
  "Chronic Condition Care",
  "Cancer Patients & Caregivers",
  "Preventive & Functional Health",
  "Metabolic & Lifestyle Health",
];

const TRUST_SAFETY = [
  "AI Responsibility & Guardrails",
  "Data Privacy & Security",
  "Medical Disclaimer",
  "Clinical Governance",
];

const ABOUT_LINKS = [
  { label: "About OneMi", href: "/about" },
  { label: "Founders' Story", href: "#" },
  { label: "Experts", href: "#" },
  { label: "Partners", href: "#" },
];

const QUICK_LINKS = [
  { label: "My Health Recharge", href: "/programs/my-health-recharge" },
  { label: "My Metabolic Detox", href: "/programs/my-metabolic-detox" },
  { label: "Contact Us", href: "#" },
  { label: "Book a Consultation", href: "#" },
  { label: "Help & Support", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Pre-footer: logo + powered by */}
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
        <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] mb-3">
          Powered by AI. Driven by Data.
        </h3>
        <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          OneMi is a health management platform for clinical insights, curated solutions, and
          personalised care — built to bring clarity, continuity, and confidence to your health journey.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#F8F9FA] border-y border-gray-200 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center gap-3 mb-5 justify-center">
            <div className="flex-1 border-t border-gray-300 max-w-[180px]" />
            <span className="text-sm font-semibold text-[#1A1A2E] tracking-wide">Disclaimer</span>
            <div className="flex-1 border-t border-gray-300 max-w-[180px]" />
          </div>
          <p className="text-sm text-[#6B7280] mb-2 leading-relaxed">
            OneMi supports health understanding and care navigation. It does not diagnose, prescribe,
            or replace doctors. Always consult qualified healthcare professionals for medical decisions.
          </p>
          <p className="text-sm text-[#6B7280]">
            For complete details, please refer to our{" "}
            <Link href="#" className="font-semibold text-[#1A1A2E] underline underline-offset-2">
              Privacy Policy, Terms &amp; Conditions
            </Link>
            , and more.
          </p>
        </div>
      </div>

      {/* 4-column nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold text-[#1A1A2E] text-sm mb-4 tracking-wide">
            Who It&apos;s For
          </h4>
          <ul className="space-y-3">
            {WHO_ITS_FOR.map((l) => (
              <li key={l}>
                <Link href="#" className="text-sm text-[#6B7280] hover:text-[#E85D04] transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#1A1A2E] text-sm mb-4 tracking-wide">
            Trust &amp; Safety
          </h4>
          <ul className="space-y-3">
            {TRUST_SAFETY.map((l) => (
              <li key={l}>
                <Link href="#" className="text-sm text-[#6B7280] hover:text-[#E85D04] transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#1A1A2E] text-sm mb-4 tracking-wide">About</h4>
          <ul className="space-y-3">
            {ABOUT_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-[#6B7280] hover:text-[#E85D04] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#1A1A2E] text-sm mb-4 tracking-wide">&nbsp;</h4>
          <ul className="space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-[#6B7280] hover:text-[#E85D04] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact + App download card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid lg:grid-cols-2 gap-10 items-start">
        {/* Contact details */}
        <div>
          <h4 className="font-semibold text-[#1A1A2E] mb-4">Contact Details</h4>
          <div className="space-y-2 text-sm text-[#6B7280] leading-relaxed">
            <p>
              <span className="font-semibold text-[#1A1A2E]">Address: </span>
              B-302, Dipti Classic, Suren Road, Off Sir M.V Road, Near Western Express Highway
              Metro Station, Andheri East, Mumbai 400093.
            </p>
            <p>
              <span className="font-semibold text-[#1A1A2E]">Call us: </span>
              +91 7718819089
            </p>
            <p>
              <span className="font-semibold text-[#1A1A2E]">Email: </span>
              hello@onemi.ai
            </p>
          </div>
        </div>

        {/* App download card with dotted bg */}
        <div
          className="rounded-2xl overflow-hidden flex items-center gap-6 p-6 border border-gray-100"
          style={{
            background:
              "radial-gradient(circle, #E85D0418 1px, transparent 1px) 0 0 / 18px 18px, #ffffff",
          }}
        >
          <div className="shrink-0">
            <Image
              src="/images/app-cta-phone.webp"
              alt="oneMi app"
              width={140}
              height={200}
              className="object-contain h-44 w-auto drop-shadow-md"
            />
          </div>
          <div>
            <h4 className="font-bold text-[#1A1A2E] text-lg mb-1 leading-snug">
              Smarter Health Starts Here
            </h4>
            <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
              Get the OneMi app and take charge of your health.
            </p>
            <Link
              href="#"
              className="inline-block bg-[#E85D04] hover:bg-[#C94E03] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Download Now
            </Link>
          </div>
        </div>
      </div>

      {/* Logos row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center gap-6 flex-wrap">
        <Image
          src="/images/cancermitr-logo.png"
          alt="CancerMitr — From Discovery To Recovery"
          width={150}
          height={52}
          className="h-12 w-auto object-contain"
        />
        <Image
          src="/images/onemitr-logo.png"
          alt="oneMitr — Your Health. Your Right"
          width={120}
          height={40}
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* Bottom bar */}
      <div className="bg-[#F3F4F6] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
            <Link href="#" className="hover:text-[#E85D04] transition-colors">
              Privacy policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:text-[#E85D04] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:text-[#E85D04] transition-colors">
              Refund &amp; Cancellation Policy
            </Link>
          </div>
          <p className="text-xs text-[#6B7280]">
            &copy; {new Date().getFullYear()} OneMi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
