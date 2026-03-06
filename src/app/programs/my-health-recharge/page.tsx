"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

// ─── Data ────────────────────────────────────────────────────────────────────

const rotatingConditions = [
  "Chronic Conditions?",
  "Autoimmune Disorders?",
  "Type 2 Diabetes?",
  "Hypertension?",
  "Cancer?",
];

const marqueeItems = [
  "Improves energy, sleep & focus",
  "Reduces inflammation & pain",
  "Reduces treatment side effects",
  "Better quality of life",
  "Improves overall health scores",
];

const conditions = [
  "Cancer", "Autoimmunite Disorders", "Type 2 Diabetes", "Hypertension", "PCOD",
  "Endometriosis", "Fatty Liver", "Ulcerative Colitis", "Arthritis", "Barrett's Esophagus",
  "Irritable Bowel Syndrome", "High Cholesterol", "Cortisol overload", "Thyroid", "Anemia",
  "Menopause symptoms", "Mood Disorders", "Recurrent Infections", "Skin ailments", "Headaches",
  "Low immunity", "Muscle/joint pain", "Heavy Metal Toxicity", "Body stiffness", "Others",
];

const pillars = [
  { label: "Mind & Vitality",          top: "18%", left: "3%"  },
  { label: "Lifestyle Balance",        top: "8%",  left: "72%" },
  { label: "Nutrition & Repair",       top: "40%", left: "48%" },
  { label: "Organ & Cellular Support", top: "55%", left: "38%" },
  { label: "Resistance & Mobility",    top: "60%", left: "74%" },
  { label: "Anti-Inflammation",        top: "78%", left: "24%" },
];

// ─── Sticky Steps data (mirrors HowItWorks shape) ────────────────────────────

const mhrSteps = [
  {
    step: "Step 1:",
    title: "Health ",
    highlight: "Assessment",
    subtitle: "Our data engine analyses your history, symptoms, physiological, and biological patterns",
    items: [
      "Assess with our care experts if this program is for you",
      "Book your Program & 100+ Biomarkers",
      "Share Medical History & Reports",
    ],
    image: "/images/mhr/step1.webp",
  },
  {
    step: "Step 2:",
    title: "Personalised Consult with ",
    highlight: "our medical expert",
    subtitle: "A customised, clinically-aligned protocol, optimised weekly, for you",
    items: [
      "Therapeutic Nutrition",
      "Gut & Microbiome Balance",
      "Intensive Supplementation",
      "Fitness & Mobility",
      "Yoga & Breathing",
      "Sleep Optimisation",
      "Organ Rejuvenation",
    ],
    image: "/images/mhr/step2.webp",
  },
  {
    step: "Step 3:",
    title: "Progress ",
    highlight: "Report",
    subtitle: "We re-evaluate your metrics to understand improvements and next steps.",
    items: [
      "Overall health scores",
      "Organ function & symptomatic health",
      "Energy, sleep, pain & focus",
      "Inflammation & infection markers",
      "Immune Health",
      "Hormone Health",
      "Quality of life",
    ],
    image: "/images/mhr/step3.webp",
  },
];

const pricingChecklist = [
  "Comprehensive Health Analysis",
  "OPD consults every week till end of program",
  "Personalized Recharge Protocol modified every month",
  "12 Weekly Health Assessments",
  "Handholding at every step",
  "Progress Report on completion",
  "Post Program Tips",
  "Upto 40% savings on biomarkers",
  "Up to 20% savings on Health Supplements",
  "EMI options",
];

const dataCards = [
  { title: "Program Benefits", img: "/images/mhr/graph-1.png" },
  { title: "Metabolic and Energy Regulation", img: "/images/mhr/graph-2.png" },
  { title: "Qualitative Functional Health", img: "/images/mhr/graph-3.png" },
];

const stories = [
  {
    quote: "The program gave me my life back.",
    text: "After my cancer diagnosis I felt lost. The My Health Recharge program gave me a structured, personalised path that addressed not just my treatment but my entire lifestyle. My energy returned and my markers improved dramatically.",
    journey: "90-Day Health Recharge Journey",
    name: "Satish Chugh",
    age: "60M",
    diagnosis: "Squamous cell carcinoma of the vallecula",
    img: "/images/mhr/story1.png",
  },
  {
    quote: "I finally feel in control of my health.",
    text: "The weekly consults and personalised protocol made all the difference. I could see measurable improvements month on month, and I had expert support at every step of the way.",
    journey: "90-Day Health Recharge Journey",
    name: "Program Participant",
    age: "52F",
    diagnosis: "Hypertension & Thyroid",
    img: "/images/mhr/story2.png",
  },
];

const research = [
  { title: "Metabolic reprogramming, sensing, and cancer therapy", img: "/images/mhr/research1.png" },
  { title: "Integrated care programmes for adults with chronic conditions: a meta-review - PMC", img: "/images/mhr/research2.png" },
  { title: "Multidisciplinary Cancer Rehab Improves Patient Wellbeing — Review", img: "/images/mhr/research3.png" },
];

const blogs = [
  { title: "Why I Recommend My Health Recharge Program: Mr Rajendra Mehta – OneMi", img: "/images/mhr/blog1.png" },
  { title: "21 vs 90 Days: Know About OneMi's My Metabolic Detox and My Health Recharge Programs?", img: "/images/mhr/blog2.png" },
  { title: "Gut Detox, Organ Detox, Thought Detox—What's the Difference?", img: "/images/mhr/blog3.png" },
];

const faqs = [
  {
    q: "Who can benefit from My Health Recharge?",
    a: "My Health Recharge is designed for individuals dealing with chronic conditions, autoimmune disorders, metabolic issues, cancer, or any persistent health concerns that haven't responded adequately to conventional treatment alone.",
  },
  {
    q: "Is My Health Recharge personalised or the same for everyone?",
    a: "The program is fully personalised. Based on your initial health assessment, biomarker reports, medical history, and ongoing weekly check-ins, your protocol is customised and modified every month to match your evolving health needs.",
  },
  {
    q: "What is included in the program?",
    a: "The program includes a comprehensive health analysis, weekly OPD consults, a personalised recharge protocol, 12 weekly health assessments, handholding at every step, a final progress report, and post-program tips.",
  },
  {
    q: "How is progress tracked?",
    a: "Progress is tracked through 12 weekly health assessments covering overall health scores, organ function, symptomatic health, energy, sleep, pain, focus, inflammation markers, immune health, hormone health, and quality of life.",
  },
  {
    q: "What happens after the 90-day program?",
    a: "At the end of the 90-day program, you receive a comprehensive progress report outlining your improvements and next steps. You'll also receive post-program guidance to help you sustain your results.",
  },
];

// ─── Shared orange circle check ──────────────────────────────────────────────

function OrangeCheck() {
  return (
    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E85D04] flex items-center justify-center">
      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

// ─── Marquee ─────────────────────────────────────────────────────────────────

function MarqueeRow({ direction = "left" }: { direction?: "left" | "right" }) {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden py-2">
      <style>{`
        @keyframes marquee-left  { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes marquee-right { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
        .marquee-left  { animation: marquee-left  28s linear infinite; }
        .marquee-right { animation: marquee-right 28s linear infinite; }
      `}</style>
      <div className={`flex gap-6 whitespace-nowrap ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-sm font-medium text-brand-dark">
            <span className="text-brand-orange">✳</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ item ────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-medium text-[#1A1A2E] text-sm">{q}</span>
        <span className="text-[#E85D04] text-xl font-light flex-shrink-0">{open ? "×" : "+"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-[#6B7280] bg-[#E8F5F3] rounded-lg px-4 py-3 mb-3">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sticky Steps — exact same pattern as HowItWorks ─────────────────────────

const CARD_H = 520;
const SCROLL_PER_STEP = 600;
const TOTAL_STEPS = mhrSteps.length;
const CONTAINER_H = SCROLL_PER_STEP * TOTAL_STEPS + CARD_H;

function StickySteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top + 80;
      if (scrolled < 0) return;
      setActive(Math.min(TOTAL_STEPS - 1, Math.floor(scrolled / SCROLL_PER_STEP)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E]">
          Kickstart your <span className="text-[#E85D04]">Health Recharge Journey</span>
        </h2>
        <p className="mt-3 text-[#6B7280]">
          A step-by-step approach to rebuild your health at the cellular level.
        </p>
      </div>

      <div ref={containerRef} style={{ height: CONTAINER_H }} className="relative">
        <div className="sticky" style={{ top: 80 }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="relative overflow-hidden" style={{ height: CARD_H }}>
              {mhrSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 bg-white"
                  animate={{ y: i <= active ? "0%" : "105%" }}
                  initial={false}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  style={{ zIndex: i + 1 }}
                >
                  <div className="grid lg:grid-cols-2 h-full gap-0">
                    {/* Image — always left */}
                    <div className="relative h-56 lg:h-full rounded-2xl overflow-hidden">
                      <Image
                        src={step.image}
                        alt={`${step.title}${step.highlight}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    {/* Content — always right */}
                    <div className="flex">
                      <div className="hidden lg:block w-px bg-[#E85D04] mx-8 self-stretch flex-shrink-0" />
                      <div className="flex flex-col justify-center py-8 px-4 lg:px-6 lg:pr-12">
                        <p className="text-sm font-semibold text-[#E85D04] mb-2 tracking-wide">{step.step}</p>
                        <h3 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-3 leading-tight">
                          {step.title}<span className="text-[#E85D04]">{step.highlight}</span>
                        </h3>
                        <p className="text-sm text-[#6B7280] mb-5">{step.subtitle}</p>
                        <ul className="space-y-3">
                          {step.items.map((item) => (
                            <li key={item} className="flex items-center gap-3">
                              <OrangeCheck />
                              <span className="text-sm text-[#1A1A2E]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Step progress dots */}
            <div className="flex justify-center gap-2 mt-6 pb-4">
              {mhrSteps.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 24 : 6,
                    backgroundColor: i === active ? "#E85D04" : "#D1D5DB",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pb-16" />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MyHealthRechargePage() {
  const [conditionIdx, setConditionIdx] = useState(0);
  const [conditionVisible, setConditionVisible] = useState(true);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setConditionVisible(false);
      setTimeout(() => {
        setConditionIdx((i) => (i + 1) % rotatingConditions.length);
        setConditionVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">

      {/* ── 1. HERO ── */}
      <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-0">
        <section className="relative rounded-3xl overflow-hidden min-h-[500px] sm:min-h-[560px] lg:min-h-[620px]">
          <Image
            src="/images/mhr/mhr-banner.webp"
            alt="My Health Recharge"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 95vw"
            className="object-cover object-center"
          />
          {/* Subtle left overlay so text stays readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.45) 35%, rgba(255,255,255,0.1) 58%, transparent 78%)",
            }}
          />
          {/* Text — bottom-left, matching production layout */}
          <div className="relative z-10 flex items-end min-h-[500px] sm:min-h-[560px] lg:min-h-[620px]">
            <div className="px-8 sm:px-10 lg:px-14 pb-14 flex flex-col gap-4 max-w-[520px]">
              {/* Rotating yellow condition box */}
              <div
                className="inline-flex self-start px-5 py-3 rounded font-bold text-xl text-[#1A1A2E]"
                style={{
                  backgroundColor: "#F5C842",
                  opacity: conditionVisible ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  minWidth: 180,
                }}
              >
                {rotatingConditions[conditionIdx]}
              </div>
              <p className="text-base text-[#3D3D3D] font-medium">Address the root cause</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1A2E] leading-tight">
                My Health Recharge
              </h1>
              <p className="text-lg text-[#3D3D3D]">Restore your Health in 90 Days</p>
              <div>
                <Button href="#enquire">Enquire Now</Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── 2. MARQUEE ── */}
      <div className="py-6 bg-[#F9FAFB] border-y border-gray-100">
        <MarqueeRow direction="left" />
        <MarqueeRow direction="right" />
      </div>

      {/* ── 3. PROBLEM SECTION ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: image + dot decorations */}
          <div className="relative">
            <div
              className="absolute -top-4 right-6 w-28 h-28 opacity-40 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #E85D04 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 opacity-40 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #E85D04 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
            <Image
              src="/images/mhr/problem-woman.png"
              alt="Woman concerned about health"
              width={560}
              height={500}
              className="rounded-2xl object-cover w-full relative z-10"
            />
          </div>

          {/* Right: text — exact production copy */}
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] leading-tight">
              Are your Health conditions or symptoms worsening{" "}
              <span className="text-[#E85D04]">as you age?</span>
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              Health does not fail overnight. Long before disease appears, dysfunction begins at the cellular level.
            </p>
            {/* Orange divider */}
            <hr className="border-[#E85D04] border-t-2" />
            <div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-1">Restore your Health in 90 days</h3>
              <p className="text-sm text-[#6B7280]">Initiate | Maintain | Sustain</p>
            </div>
            <p className="text-[#3D3D3D] leading-relaxed">
              My Health Recharge is a restorative health management program designed for metabolic health, cancer care and chronic lifestyle diseases.
            </p>
            <Button href="#program-details" className="w-full justify-center">
              View Program Details
            </Button>
          </div>
        </div>
      </section>

      {/* ── 4. CONDITIONS GRID ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-4">
            Are you struggling with chronic conditions or symptoms that don&apos;t seem to go away?
          </h2>
          <hr className="border-[#E85D04] border-t-2 mb-10 mx-auto max-w-2xl" />
          <div className="flex flex-wrap gap-3 justify-center">
            {conditions.map((c) => (
              <span
                key={c}
                className="px-5 py-2 rounded-full border border-gray-300 bg-white text-[#1A1A2E] text-sm font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TREAT THE CAUSE ── */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* CSS dot-grid background — matches production */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #d1d5db 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
            opacity: 0.7,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Left-aligned heading + subtitle — matches production */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-4">
            Treat the cause.{" "}
            <span className="text-[#E85D04]">Not just the symptoms.</span>
          </h2>
          <p className="text-[#6B7280] text-lg mb-12">
            When leaves get yellow, you don&apos;t paint them green, you look at the soil.
          </p>

          {/* Desktop: scattered absolute pills with red dot */}
          <div className="relative hidden lg:block" style={{ height: 380 }}>
            {pillars.map((p) => (
              <div
                key={p.label}
                className="absolute inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-md border border-gray-200 font-semibold text-[#1A1A2E] text-sm whitespace-nowrap"
                style={{ top: p.top, left: p.left }}
              >
                <span className="w-3 h-3 rounded-full bg-[#E85D04] flex-shrink-0" />
                {p.label}
              </div>
            ))}
          </div>

          {/* Mobile: flex wrap with red dot */}
          <div className="flex flex-wrap gap-3 lg:hidden">
            {pillars.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-md border border-gray-200 font-semibold text-[#1A1A2E] text-sm"
              >
                <span className="w-3 h-3 rounded-full bg-[#E85D04] flex-shrink-0" />
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. JOURNEY STEPS — sticky scroll, same as HowItWorks ── */}
      <StickySteps />

      {/* ── 7. PRICING CARD ── */}
      <section id="program-details" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto border border-gray-200 rounded-2xl bg-white p-8 sm:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] leading-tight">
              Make your health goals.
            </h2>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E85D04] leading-tight">
              Commit to the program.
            </h2>
            <p className="mt-3 text-[#6B7280]">
              From first assessment to final report, every step is covered for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left: checklist with orange circle icons */}
            <ul className="flex flex-col gap-4">
              {pricingChecklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#1A1A2E] text-sm">
                  <OrangeCheck />
                  {item}
                </li>
              ))}
            </ul>

            {/* Right: Program Details box */}
            <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              {/* "Program Details" with flanking lines */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm font-bold text-[#1A1A2E] whitespace-nowrap">Program Details</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>
              {/* Mode + Duration tabs */}
              <div className="grid grid-cols-2 border border-gray-200 rounded-lg overflow-hidden text-sm font-medium text-center">
                <div className="py-3 border-r border-gray-200 text-[#1A1A2E]">Mode : At Home</div>
                <div className="py-3 text-[#1A1A2E]">Duration : 90 Days</div>
              </div>
              {/* Price */}
              <div className="bg-[#F9FAFB] rounded-lg py-4 text-center">
                <span className="text-3xl font-bold text-[#1A1A2E]">₹ 25,000</span>
              </div>
              <p className="text-center text-sm text-[#3D3D3D] font-medium leading-snug">
                Limited Seats. &apos;By Invite Only.&apos;<br />Use the invite code to qualify
              </p>
              <div className="border-t border-dashed border-gray-300" />
              <Button href="#enquire" className="w-full justify-center">
                Restore your health in 90 days
              </Button>
              <p className="text-center text-xs text-[#6B7280] italic">
                Tests &amp; Products charged separately. Taxes as applicable
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-[#3D3D3D] italic mt-8">
            Avail discounts and offers. Become a{" "}
            <a href="/membership" className="text-[#E85D04] font-semibold not-italic underline">
              OneMi Member
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── 8. DATA-BACKED TRANSFORMATION ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-2 text-center">
            Data-Backed <span className="text-[#E85D04]">Transformation</span>
          </h2>
          <p className="text-[#6B7280] text-center mb-10">
            Measured through clinical parameters, symptom scoring, and performance indicators
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCards.map((card) => (
              <div key={card.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-[#1A1A2E] mb-4">{card.title}</h3>
                <Image src={card.img} alt={card.title} width={400} height={260} className="w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. SUCCESS STORIES ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-2 text-center">
            Success <span className="text-[#E85D04]">Stories</span>
          </h2>
          <p className="text-[#6B7280] text-center mb-6">Real people, real results</p>
          <div className="flex justify-center gap-2 mb-6">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStory(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeStory ? "bg-[#E85D04]" : "bg-gray-300"}`}
                aria-label={`Story ${i + 1}`}
              />
            ))}
          </div>
          {stories.map((story, i) =>
            i !== activeStory ? null : (
              <div key={i} className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex flex-col gap-4">
                  <p className="text-2xl font-bold text-[#1A1A2E] italic">&ldquo;{story.quote}&rdquo;</p>
                  <p className="text-[#6B7280] leading-relaxed">{story.text}</p>
                  <span className="inline-block text-xs font-semibold text-[#E85D04] bg-orange-50 px-3 py-1 rounded-full self-start">
                    {story.journey}
                  </span>
                  <div>
                    <p className="font-bold text-[#1A1A2E]">{story.name}</p>
                    <p className="text-sm text-[#6B7280]">{story.age} · {story.diagnosis}</p>
                  </div>
                </div>
                <Image src={story.img} alt={story.name} width={520} height={400} className="rounded-2xl object-cover w-full" />
              </div>
            )
          )}
        </div>
      </section>

      {/* ── 10. CLINICAL RESEARCH INSIGHTS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-2 text-center">
            Clinical Research <span className="text-[#E85D04]">Insights</span>
          </h2>
          <p className="text-[#6B7280] text-center mb-10">
            Our protocols are grounded in peer-reviewed clinical evidence
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {research.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-48">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-[#1A1A2E] leading-snug">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. BLOGS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-2 text-center">
            From the <span className="text-[#E85D04]">Blog</span>
          </h2>
          <p className="text-[#6B7280] text-center mb-10">Expert insights and patient stories</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-48">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-[#1A1A2E] leading-snug">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FAQ ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
              Frequently Asked <span className="text-[#E85D04]">Questions</span>
            </h2>
            <p className="text-[#6B7280]">
              Everything you need to know about the My Health Recharge program and your 90-day journey.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {faqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
