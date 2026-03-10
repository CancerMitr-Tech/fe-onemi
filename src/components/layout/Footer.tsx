import Image from "next/image";
import Link from "next/link";
import HashLink from "@/components/ui/HashLink";

const WHO_ITS_FOR = [
  "Chronic Condition Care",
  "Cancer Patients & Caregivers",
  "Preventive & Functional Health",
  "Metabolic & Lifestyle Health",
];

const TRUST_SAFETY = [
  { label: "AI Responsibility & Guardrails", href: "/terms-and-conditions#ai-enabled-tools" },
  { label: "Data Privacy & Security", href: "/privacy-policy" },
  { label: "Medical Disclaimer", href: "/#disclaimer" },
  { label: "Clinical Governance", href: "/terms-and-conditions#governing-law" },
];

const ABOUT_LINKS = [
  { label: "About OneMi", href: "/about", hash: false },
  { label: "Founders' Story", href: "/about/#story", hash: false },
  { label: "Experts", href: "/about/#experts", hash: false },
  { label: "Partners", href: "/#partners", hash: true },
];

const QUICK_LINKS = [
  { label: "My Health Recharge", href: "/programs/my-health-recharge", external: false },
  { label: "My Metabolic Detox", href: "/programs/my-metabolic-detox", external: false },
  { label: "Contact Us", href: "/contact-us", external: false },
  { label: "Book a Consultation", href: "https://wa.link/8n3ggx", external: true },
  { label: "Help & Support", href: "https://wa.link/8n3ggx", external: true },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      
      {/* 4-column nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        <div>
          <h4 className="font-semibold text-brand-dark text-sm mb-4 tracking-wide">
            Who It&apos;s For
          </h4>
          <ul className="space-y-3">
            {WHO_ITS_FOR.map((l) => (
              <li key={l}>
                <Link href="#" className="text-sm text-brand-muted hover:text-[#E85D04] transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-brand-dark text-sm mb-4 tracking-wide">
            Trust &amp; Safety
          </h4>
          <ul className="space-y-3">
            {TRUST_SAFETY.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-brand-muted hover:text-[#E85D04] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-brand-dark text-sm mb-4 tracking-wide">About</h4>
          <ul className="space-y-3">
            {ABOUT_LINKS.map((l) => (
              <li key={l.label}>
                {l.hash ? (
                  <HashLink
                    href={l.href}
                    className="text-sm text-brand-muted hover:text-[#E85D04] transition-colors"
                  >
                    {l.label}
                  </HashLink>
                ) : (
                  <Link href={l.href} className="text-sm text-brand-muted hover:text-[#E85D04] transition-colors">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-brand-dark text-sm mb-4 tracking-wide">&nbsp;</h4>
          <ul className="space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-brand-muted hover:text-[#E85D04] transition-colors"
                  {...(l.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Contact + App download */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 grid lg:grid-cols-2 gap-10 items-start">

        <div>
          <h4 className="font-semibold text-brand-dark mb-4">Contact Details</h4>
          <div className="space-y-2 text-sm text-brand-muted leading-relaxed">
            <p>
              <span className="font-semibold text-brand-dark">Address: </span>
              B-302, Dipti Classic, Suren Road, Off Sir M.V Road, Near Western Express Highway
              Metro Station, Andheri East, Mumbai 400093.
            </p>
            <p>
              <span className="font-semibold text-brand-dark">Call us: </span>
              +91 7718819089
            </p>
            <p>
              <span className="font-semibold text-brand-dark">Email: </span>
              hello@onemi.ai
            </p>
          </div>
        </div>

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
            <h4 className="font-bold text-brand-dark text-lg mb-1 leading-snug">
              Smarter Health Starts Here
            </h4>
            <p className="text-sm text-brand-muted mb-4 leading-relaxed">
              Get the OneMi app and take charge of your health.
            </p>
            <Link
              href="#"
              className="inline-block bg-[#E85D04] hover:bg-brand-orange-hover text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Download Now
            </Link>
          </div>
        </div>

      </div>

      {/* Partner Logos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center gap-6 flex-wrap">

        <a
          href="https://www.cancermitr.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/cancermitr-logo.png"
            alt="CancerMitr — From Discovery To Recovery"
            width={150}
            height={52}
            className="h-12 w-auto object-contain hover:opacity-80 transition"
          />
        </a>

        <a
          href="https://www.oncohappy.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/Untitled-design-1.png"
            alt="OnCoHappy — From Discovery To Recovery"
            width={150}
            height={52}
            className="h-12 w-auto object-contain hover:opacity-80 transition"
          />
        </a>

        <a
          href="https://onemitr.cancermitr.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/onemitr-logo.png"
            alt="oneMitr — Your Health. Your Right"
            width={120}
            height={40}
            className="h-10 w-auto object-contain hover:opacity-80 transition"
          />
        </a>

      </div>

      {/* Bottom bar */}
      <div className="bg-[#F3F4F6] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">

          <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted">
            <Link href="/privacy-policy" className="hover:text-[#E85D04] transition-colors">
              Privacy policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms-and-conditions" className="hover:text-[#E85D04] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/refund-and-cancellation-policy" className="hover:text-[#E85D04] transition-colors">
              Refund &amp; Cancellation Policy
            </Link>
          </div>

          <p className="text-xs text-brand-muted">
            &copy; {new Date().getFullYear()} OneMi. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}