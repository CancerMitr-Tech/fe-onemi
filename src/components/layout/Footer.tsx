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
  { label: "AI Responsibility & Guardrails", href: "/terms-and-conditions/#ai-enabled-tools" },
  { label: "Data Privacy & Security", href: "/privacy-policy" },
  { label: "Medical Disclaimer", href: "/#disclaimer" },
  { label: "Clinical Governance", href: "/terms-and-conditions/#governing-law" },
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
  { label: "My Mind Matters", href: "/programs/my-mind-matters", external: false },
  { label: "Contact Us", href: "/contact-us", external: false },
  { label: "Book a Consultation", href: "https://wa.link/8n3ggx", external: true },
];

const headingStyle = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "16px",
  color: "rgb(37, 37, 37)",
};

const linkStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "18px",
  color: "rgb(69, 69, 69)",
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#E5EDEE" }}>

      {/* 4-column nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        <div>
          <h4 style={headingStyle} className="mb-4">Who It&apos;s For</h4>
          <ul className="space-y-3">
            {WHO_ITS_FOR.map((l) => (
              <li key={l}>
                <span style={linkStyle}>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={headingStyle} className="mb-4">Trust &amp; Safety</h4>
          <ul className="space-y-3">
            {TRUST_SAFETY.map((l) => (
              <li key={l.label}>
                <Link href={l.href} style={linkStyle} className="hover:text-[#E85D04] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={headingStyle} className="mb-4">About</h4>
          <ul className="space-y-3">
            {ABOUT_LINKS.map((l) => (
              <li key={l.label}>
                {l.hash ? (
                  <HashLink href={l.href} style={linkStyle} className="hover:text-[#E85D04] transition-colors">
                    {l.label}
                  </HashLink>
                ) : (
                  <Link href={l.href} style={linkStyle} className="hover:text-[#E85D04] transition-colors">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul className="space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  style={linkStyle}
                  className="hover:text-[#E85D04] transition-colors"
                  {...(l.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Contact + App download — side by side */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="border-t border-gray-300 pt-10" />
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 items-start">

          {/* Left: Contact Details */}
          <div>
            <h4 style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "18px",
              color: "rgb(69, 69, 69)",
              marginBottom: "16px",
            }}>
              Contact Details
            </h4>
            <div className="space-y-2">
              <p style={linkStyle}>
                <span style={{ fontWeight: 700 }}>Address: </span>
                B-302, Dipti Classic, Suren Road, Off Sir M.V Road, Near Western Express Highway
                Metro Station, Andheri East, Mumbai 400093.
              </p>
              <p style={linkStyle}>
                <span style={{ fontWeight: 700 }}>Call us: </span>
                +91 7718819089
              </p>
              <p style={linkStyle}>
                <span style={{ fontWeight: 700 }}>Email: </span>
                hello@onemi.ai
              </p>
            </div>
          </div>

          {/* Right: Smarter Health Starts Here card */}
          <div
            className="rounded-2xl overflow-visible flex items-center gap-8 px-8 pt-8 border border-gray-200 relative"
            style={{
              backgroundImage: "url('/images/footer-bg-white.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "220px",
            }}
          >
            {/* Phone image — overflows bottom */}
            <div className="shrink-0 relative z-10 self-end">
              <Image
                src="/images/app-cta-phone.webp"
                alt="oneMi app"
                width={220}
                height={300}
                className="object-contain w-auto drop-shadow-md"
                style={{ height: "260px", marginBottom: "-2px" }}
              />
            </div>

            {/* Text content */}
            <div className="pb-8">
              <h4 style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "28px",
                color: "rgb(37, 37, 37)",
                marginBottom: "8px",
              }}>
                Smarter Health Starts Here
              </h4>
              <p style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "rgb(37, 37, 37)",
                marginBottom: "16px",
              }}>
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
      </div>

      {/* Partner Logos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex items-center gap-6 flex-wrap">
        <a href="https://www.cancermitr.com/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/cancermitr-logo.png" alt="CancerMitr" width={150} height={52} className="h-12 w-auto object-contain hover:opacity-80 transition" />
        </a>
        <a href="https://www.oncohappy.com/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/Untitled-design-1.png" alt="OnCoHappy" width={150} height={52} className="h-12 w-auto object-contain hover:opacity-80 transition" />
        </a>
        <a href="https://onemitr.cancermitr.com/" target="_blank" rel="noopener noreferrer">
          <Image src="/images/onemitr-logo.png" alt="oneMitr" width={120} height={40} className="h-10 w-auto object-contain hover:opacity-80 transition" />
        </a>
      </div>

      {/* Bottom bar — thoda dark */}
      <div style={{ backgroundColor: "#C8D8DA" }} className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">

          <div className="flex flex-wrap items-center gap-3">
            {/* Bottom links — Montserrat 400, 16px, 28px lh, rgb(10,19,35) */}
            {[
              { label: "Privacy policy", href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms-and-conditions" },
              { label: "Refund & Cancellation Policy", href: "/refund-and-cancellation-policy" },
            ].map((l, i, arr) => (
              <span key={l.label} className="flex items-center gap-3">
                <Link
                  href={l.href}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "28px",
                    color: "rgb(10, 19, 35)",
                    textDecoration: "none",
                  }}
                  className="hover:text-[#E85D04] transition-colors"
                >
                  {l.label}
                </Link>
                {i < arr.length - 1 && <span style={{ color: "rgb(10,19,35)" }}>|</span>}
              </span>
            ))}
          </div>

          {/* Copyright — Montserrat 600, 14px, 28px lh, rgb(37,37,37) */}
          <p style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "28px",
            color: "rgb(37, 37, 37)",
          }}>
            &copy; {new Date().getFullYear()} OneMi. All rights reserved.
          </p>

        </div>
      </div>

    </footer>
  );
}