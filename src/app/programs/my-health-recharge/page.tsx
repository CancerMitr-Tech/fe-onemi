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

const pillarsA = [
  { label: "Mitochondrial Optimization", top: "12%", left: "72%" },
  { label: "Organ & Cellular Support",   top: "32%", left: "38%" },
  { label: "Pain Management",            top: "53%", left: "7%"  },
  { label: "Resistance & Mobility",      top: "55%", left: "72%" },
  { label: "Anti-Inflammation",          top: "72%", left: "24%" },
];

const dotsA = [
  { top: "27%", left: "14%" },
  { top: "42%", left: "67%" },
  { top: "50%", left: "42%" },
  { top: "72%", left: "4%"  },
  { top: "72%", left: "67%" },
];

const pillarsB = [
  { label: "Lifestyle Balance",     top: "24%", left: "70%" },
  { label: "Mind & Vitality",       top: "40%", left: "2%"  },
  { label: "Nutrition & Repair",    top: "47%", left: "48%" },
  { label: "Immunity & Gut Health", top: "65%", left: "16%" },
  { label: "Stress Recovery",       top: "68%", left: "79%" },
];

const dotsB = [
  { top: "38%", left: "37%" },
  { top: "65%", left: "4%"  },
  { top: "65%", left: "83%" },
  { top: "78%", left: "58%" },
];

const allPillars = [...pillarsA, ...pillarsB];

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
  { img: "/images/Testimonial-Card-2-scaled.webp", alt: "Chandresh Mehta – Urothelial carcinoma" },
  { img: "/images/Testimonial-Card-scaled.webp",   alt: "Rajendra Mehta – Prostate cancer" },
  { img: "/images/Testimonial-Card-1-scaled.webp", alt: "Satish Chugh – Squamous cell carcinoma" },
];

const research = [
  { title: "Metabolic reprogramming, sensing, and cancer therapy", img: "/images/mhr/research1.png" },
  { title: "Integrated care programmes for adults with chronic conditions: a meta-review - PMC", img: "/images/mhr/research2.png" },
  { title: "Multidisciplinary Cancer Rehab Improves Patient Wellbeing — Review", img: "/images/mhr/research3.png" },
];

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  link: string;
  img: string;
};

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
    <span className="shrink-0">
      <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <span className="font-medium text-brand-dark text-sm">{q}</span>
        <span className="text-brand-orange text-xl font-light shrink-0">{open ? "×" : "+"}</span>
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
            <div className="pb-4 text-sm text-brand-muted bg-brand-mint rounded-lg px-4 py-3 mb-3">{a}</div>
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
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          Kickstart your <span className="text-brand-orange">Health Recharge Journey</span>
        </h2>
        <p className="mt-3 text-brand-muted">
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
                      <div className="hidden lg:block w-px bg-brand-orange mx-8 self-stretch shrink-0" />
                      <div className="flex flex-col justify-center py-8 px-4 lg:px-6 lg:pr-12">
                        <p className="text-sm font-semibold text-brand-orange mb-2 tracking-wide">{step.step}</p>
                        <h3 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3 leading-tight">
                          {step.title}<span className="text-brand-orange">{step.highlight}</span>
                        </h3>
                        <p className="text-sm text-brand-muted mb-5">{step.subtitle}</p>
                        <ul className="space-y-3">
                          {step.items.map((item) => (
                            <li key={item} className="flex items-center gap-3">
                              <OrangeCheck />
                              <span className="text-sm text-brand-dark">{item}</span>
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
  const [pillGroup, setPillGroup] = useState<"A" | "B">("A");
  const storyTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

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

  useEffect(() => {
    const t = setInterval(() => setPillGroup((g) => (g === "A" ? "B" : "A")), 3500);
    return () => clearInterval(t);
  }, []);

  // Auto-scroll stories every 2s
  useEffect(() => {
    storyTimerRef.current = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % stories.length);
    }, 2000);
    return () => { if (storyTimerRef.current) clearInterval(storyTimerRef.current); };
  }, []);

  function goToStory(idx: number) {
    setActiveStory(idx);
    if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    storyTimerRef.current = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % stories.length);
    }, 2000);
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_API ?? "https://onemi.ai/wp-json/wp/v2"}/posts?categories=10&_embed&per_page=3`)
      .then((res) => res.json())
      .then((data) => {
        const parsed: BlogPost[] = data.map((post: any) => ({
          id: post.id,
          title: post.title.rendered
            .replace(/&#8211;.*$/, "")
            .replace(/&amp;/g, "&")
            .replace(/&#8217;/g, "'")
            .replace(/&#8220;/g, '"')
            .replace(/&#8221;/g, '"')
            .trim(),
          slug: post.slug,
          link: post.link,
          img: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        }));
        setBlogs(parsed);
      })
      .catch(() => {
        setBlogs([
          { id: 1, title: "Why I Recommend My Health Recharge Program: Mr Rajendra Mehta", slug: "", link: "#", img: "/images/mhr/blog1.png" },
          { id: 2, title: "21 vs 90 Days: Know About OneMi's My Metabolic Detox and My Health Recharge Programs?", slug: "", link: "#", img: "/images/mhr/blog2.png" },
          { id: 3, title: "Gut Detox, Organ Detox, Thought Detox—What's the Difference?", slug: "", link: "#", img: "/images/mhr/blog3.png" },
        ]);
      })
      .finally(() => setBlogsLoading(false));
  }, []);

  return (
    <div className="bg-white">

      {/* ── 1. HERO ── */}
      <div className="px-6 sm:px-10 lg:px-14 pt-4 pb-4">
        <section
          className="relative rounded-2xl overflow-hidden"
          style={{ height: 714 }}
        >
          <Image
            src="/images/mhr/mhr-banner.webp"
            alt="My Health Recharge"
            fill
            className="object-cover object-[55%_15%]"
            priority
            sizes="(max-width: 640px) 100vw, 95vw"
          />
          {/* Gradient — left side for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.1) 48%, transparent 65%)",
            }}
          />
          {/* Text — bottom-left */}
          <div className="absolute bottom-10 left-8 sm:left-10 flex flex-col gap-3 max-w-xs">
            <div
              key={conditionIdx}
              className="inline-block px-4 py-2 rounded-lg font-bold text-brand-dark text-base sm:text-lg"
              style={{
                backgroundColor: "#F5C842",
                width: "fit-content",
                opacity: conditionVisible ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            >
              {rotatingConditions[conditionIdx]}
            </div>
            <p className="text-sm sm:text-base text-brand-dark font-medium">Address the root cause</p>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark leading-tight">
                My Health Recharge
              </h1>
              <p className="mt-1 text-sm sm:text-base text-[#3D3D3D]">
                Restore your Health in 90 Days
              </p>
            </div>
            <div className="mt-1">
              <Button href="#program-details">Enquire Now</Button>
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
              src="/images/mhr/Frame-427319559.png"
              alt="Woman concerned about health"
              width={560}
              height={500}
              className="rounded-2xl object-cover w-full relative z-10"
            />
          </div>

          {/* Right: text — exact production copy */}
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
              Are your Health conditions or symptoms worsening{" "}
              <span className="text-brand-orange">as you age?</span>
            </h2>
            <p className="text-brand-muted leading-relaxed">
              Health does not fail overnight. Long before disease appears, dysfunction begins at the cellular level.
            </p>
            {/* Orange divider */}
            <hr className="border-brand-orange border-t-2" />
            <div>
              <h3 className="text-xl font-bold text-brand-dark mb-1">Restore your Health in 90 days</h3>
              <p className="text-sm text-brand-muted">Initiate | Maintain | Sustain</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-4">
            Are you struggling with chronic conditions or symptoms that don&apos;t seem to go away?
          </h2>
          <hr className="border-brand-orange border-t-2 mb-10 mx-auto max-w-2xl" />
          <div className="flex flex-wrap gap-3 justify-center">
            {conditions.map((c) => (
              <span
                key={c}
                className="px-5 py-2 rounded-full border border-gray-300 bg-white text-brand-dark text-sm font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TREAT THE CAUSE ── */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* dot-grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #d1d5db 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
            opacity: 0.7,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Treat the cause.{" "}
            <span className="text-brand-orange">Not just the symptoms.</span>
          </h2>
          <p className="text-brand-muted text-lg mb-12">
            When leaves get yellow, you don&apos;t paint them green, you look at the soil.
          </p>

          {/* Desktop: two alternating groups */}
          <div className="relative hidden lg:block" style={{ height: 420 }}>

            {/* ── Group A pills ── */}
            {pillarsA.map((p) => (
              <div
                key={p.label}
                className="absolute inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-md border border-gray-200 font-semibold text-brand-dark text-sm whitespace-nowrap"
                style={{
                  top: p.top,
                  left: p.left,
                  opacity: pillGroup === "A" ? 1 : 0.06,
                  filter: pillGroup === "A" ? "blur(0px)" : "blur(2px)",
                  transition: "opacity 0.9s ease, filter 0.9s ease",
                }}
              >
                <span className="w-3 h-3 rounded-full bg-brand-orange shrink-0" />
                {p.label}
              </div>
            ))}

            {/* ── Group A dots ── */}
            {dotsA.map((d, i) => (
              <span
                key={`da-${i}`}
                className="absolute"
                style={{
                  top: d.top,
                  left: d.left,
                  opacity: pillGroup === "A" ? 1 : 0,
                  transition: "opacity 0.9s ease",
                }}
              >
                <span className="flex w-6 h-6 items-center justify-center rounded-full border-2 border-brand-orange">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                </span>
              </span>
            ))}

            {/* ── Group B pills ── */}
            {pillarsB.map((p) => (
              <div
                key={p.label}
                className="absolute inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-md border border-gray-200 font-semibold text-brand-dark text-sm whitespace-nowrap"
                style={{
                  top: p.top,
                  left: p.left,
                  opacity: pillGroup === "B" ? 1 : 0.06,
                  filter: pillGroup === "B" ? "blur(0px)" : "blur(2px)",
                  transition: "opacity 0.9s ease, filter 0.9s ease",
                }}
              >
                <span className="w-3 h-3 rounded-full bg-brand-orange shrink-0" />
                {p.label}
              </div>
            ))}

            {/* ── Group B dots ── */}
            {dotsB.map((d, i) => (
              <span
                key={`db-${i}`}
                className="absolute"
                style={{
                  top: d.top,
                  left: d.left,
                  opacity: pillGroup === "B" ? 1 : 0,
                  transition: "opacity 0.9s ease",
                }}
              >
                <span className="flex w-6 h-6 items-center justify-center rounded-full border-2 border-brand-orange">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                </span>
              </span>
            ))}
          </div>

          {/* Mobile: show all pills */}
          <div className="flex flex-wrap gap-3 lg:hidden justify-center">
            {allPillars.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-md border border-gray-200 font-semibold text-brand-dark text-sm"
              >
                <span className="w-3 h-3 rounded-full bg-brand-orange shrink-0" />
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
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
              Make your health goals.
            </h2>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-orange leading-tight">
              Commit to the program.
            </h2>
            <p className="mt-3 text-brand-muted">
              From first assessment to final report, every step is covered for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left: checklist with orange circle icons */}
            <ul className="flex flex-col gap-4">
              {pricingChecklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-brand-dark text-sm">
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
                <span className="text-sm font-bold text-brand-dark whitespace-nowrap">Program Details</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>
              {/* Mode + Duration tabs */}
              <div className="grid grid-cols-2 border border-gray-200 rounded-lg overflow-hidden text-sm font-medium text-center">
                <div className="py-3 border-r border-gray-200 text-brand-dark">Mode : At Home</div>
                <div className="py-3 text-brand-dark">Duration : 90 Days</div>
              </div>
              {/* Price */}
              <div className="bg-[#F9FAFB] rounded-lg py-4 text-center">
                <span className="text-3xl font-bold text-brand-dark">₹ 25,000</span>
              </div>
              <p className="text-center text-sm text-[#3D3D3D] font-medium leading-snug">
                Limited Seats. &apos;By Invite Only.&apos;<br />Use the invite code to qualify
              </p>
              <div className="border-t border-dashed border-gray-300" />
              <Button href="/cart?product=mhr" className="w-full justify-center">
                Restore your health in 90 days
              </Button>
              <p className="text-center text-xs text-brand-muted italic">
                Tests &amp; Products charged separately. Taxes as applicable
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-[#3D3D3D] italic mt-8">
            Avail discounts and offers. Become a{" "}
            <a href="/membership" className="text-brand-orange font-semibold not-italic underline">
              OneMi Member
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── 8. DATA-BACKED TRANSFORMATION ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">
            Data-Backed <span className="text-brand-orange">Transformation</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">
            Measured through clinical parameters, symptom scoring, and performance indicators
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCards.map((card) => (
              <div key={card.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-semibold text-brand-dark mb-4">{card.title}</h3>
                <Image src={card.img} alt={card.title} width={400} height={260} className="w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. SUCCESS STORIES ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">
            Success <span className="text-brand-orange">Stories</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">Stories of courage, care, and lasting change.</p>

          {/* Carousel */}
          <div className="relative flex items-center gap-3">
            {/* Left arrow */}
            <button
              onClick={() => goToStory((activeStory - 1 + stories.length) % stories.length)}
              className="shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:border-brand-orange transition-colors shadow-sm"
              aria-label="Previous story"
            >
              <svg className="w-4 h-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Card */}
            <div className="flex-1">
              {stories.map((story, i) =>
                i !== activeStory ? null : (
                  <Image
                    key={i}
                    src={story.img}
                    alt={story.alt}
                    width={1200}
                    height={600}
                    className="w-full h-auto"
                    priority={i === 0}
                  />
                )
              )}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => goToStory((activeStory + 1) % stories.length)}
              className="shrink-0 w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:border-brand-orange transition-colors shadow-sm"
              aria-label="Next story"
            >
              <svg className="w-4 h-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStory(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeStory ? "bg-brand-orange" : "bg-gray-300"}`}
                aria-label={`Story ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CLINICAL RESEARCH INSIGHTS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">
            Clinical Research <span className="text-brand-orange">Insights</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">
            Our protocols are grounded in peer-reviewed clinical evidence
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {research.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-48">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-brand-dark leading-snug">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. BLOGS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">
            From the <span className="text-brand-orange">Blog</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">Expert insights and patient stories</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsLoading
              ? [1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-5 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-4/5" />
                    </div>
                  </div>
                ))
              : blogs.map((item) => (
                  <a
                    key={item.id}
                    href={item.slug ? `/blog/${item.slug}` : item.link}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group block"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {item.img ? (
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-sm font-semibold text-brand-dark leading-snug group-hover:text-brand-orange transition-colors">
                        {item.title}
                      </p>
                    </div>
                  </a>
                ))}
          </div>
        </div>
      </section>

      {/* ── 12. FAQ ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
              Frequently Asked <span className="text-brand-orange">Questions</span>
            </h2>
            <p className="text-brand-muted">
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