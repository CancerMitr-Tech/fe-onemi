"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const mdpMarqueeItems = [
  "Reduces metabolic stress",
  "Improves gut health",
  "Restores energy levels",
  "Balances hormones naturallyy",
  "Improves sleep quality",
  "Eliminates toxin buildup",
  "Boosts cellular energy",
];

const symptoms = [
  "Chronic Fatigue", "Mood swings", "Belly Fat", "Acidity",
  "Hormonal Imbalances", "Acne skin rashes", "Anxiety", "Sugar cravings",
  "Diarrhea", "Constipation", "Body Pain", "Burnout",
  "Weight Gain", "Poor sleep", "Muscle cramps", "Prone to cold & flu",
  "Too much socializing", "Bad breath", "Sensitive to smell", "No exercise",
  "Junk eater", "Overthinker", "Mental drain", "Late night hunger",
  "Irregular daily routine",
];

// ── Cleanse at the core — same floating-pill animation as MHR ──────────────
const pillarsA = [
  { label: "Alkaline Balance",          top: "8%",  left: "4%"  },
  { label: "Sleep Optimisation",        top: "30%", left: "60%" },
  { label: "Hydration & Oxygenation",   top: "52%", left: "2%"  },
  { label: "Colon Cleansing",           top: "68%", left: "42%" },
  { label: "Nutrient Replenishment",    top: "80%", left: "70%" },
];
const dotsA = [
  { top: "20%", left: "42%" },
  { top: "44%", left: "76%" },
  { top: "60%", left: "28%" },
  { top: "78%", left: "5%"  },
];
const pillarsB = [
  { label: "Toxin Cleanse",                top: "12%", left: "68%" },
  { label: "Elimination Diet",             top: "35%", left: "8%"  },
  { label: "Lymphatic Exercises",          top: "50%", left: "65%" },
  { label: "Metabolic Stability",          top: "70%", left: "18%" },
  { label: "Mindfulness & Self Reflection", top: "82%", left: "50%" },
];
const dotsB = [
  { top: "25%", left: "28%" },
  { top: "45%", left: "40%" },
  { top: "62%", left: "82%" },
  { top: "75%", left: "55%" },
];
const allPillars = [...pillarsA, ...pillarsB];

// ── Steps ──────────────────────────────────────────────────────────────────
const mdpSteps = [
  {
    step: "Step 1:",
    title: "Quick ",
    highlight: "Assessment",
    subtitle: "Our data engine analyses your health trends",
    items: [
      "Book your program",
      "Share your medical history, reports, concerns",
      "Set your health goals",
    ],
    image: "/images/mhr/step1.webp",
  },
  {
    step: "Step 2:",
    title: "Expert ",
    highlight: "Consult",
    subtitle: "A customised, clinically-aligned protocol, optimised weekly, for you",
    items: [
      "Gut Detox", "Lifestyle Detox", "Organ Detox", "Metal Detox",
      "Parasite Detox", "Thought Detox", "Digital Detox", "Habit Detox",
    ],
    image: "/images/mhr/step2.webp",
  },
  {
    step: "Step 3:",
    title: "Progress ",
    highlight: "Report",
    subtitle: "Data-backed clinical assessment post completion",
    items: [
      "Assess your adherence",
      "Track your progress",
      "Rank on our leaderboard",
      "Share your health story",
    ],
    image: "/images/mhr/step3.webp",
  },
];

const pricingChecklist = [
  "Comprehensive Health Analysis",
  "3 OPD consults with our expert (once a week)",
  "Fun task based Personalized Detox Protocol to reset metabolic health",
  "Daily Challenge Tracker",
  "Weekly health check ins",
  "Handholding at every step",
  "Progress Report on completion",
  "Post Program Tips",
  "Up to 20% savings on Health Supplements",
  "EMI options",
];

const dataMetrics = [
  { label: "Overall health",                   pct: 85  },
  { label: "Metabolic balance",                pct: 79  },
  { label: "Gut health",                       pct: 93  },
  { label: "Better sleep",                     pct: 85  },
  { label: "Emotional health",                 pct: 85  },
  { label: "Energy levels and mental clarity", pct: 85  },
  { label: "Weight management",                pct: 75  },
  { label: "Daily functioning",                pct: 100 },
];

const stories = [
  {
    name: "Ritu Ahluwalia",
    initial: "R",
    conditions: "Chronic fatigue, acidity, bloating, poor sleep",
    quote: "I didn\u2019t realise how stressed my body was until I started feeling lighter within the first two weeks. My acidity almost disappeared and my energy stayed stable throughout the day. I\u2019m sleeping better and waking up fresh \u2014 something I hadn\u2019t felt in years.",
  },
  {
    name: "Ankit Shinde",
    initial: "A",
    conditions: "Sugar cravings, belly fat, brain fog, irregular routine",
    quote: "The program helped me break my sugar dependency without feeling deprived. My focus improved drastically at work, and my late-night cravings reduced. It felt like my system was finally working in sync again.",
  },
  {
    name: "Anita Shah",
    initial: "M",
    conditions: "Pre-diabetes, Fatty Liver, Chronic Fatigue",
    quote: "My reports were \u2018normal,\u2019 but I felt tired and foggy. My Health Recharge helped me understand what was really happening. Within weeks, my energy improved, bloating reduced, sleep deepened, and my markers moved in the right direction. I didn\u2019t just feel better \u2014 I knew why.",
  },
];

const research = [
  { title: "Metabolic detoxification, nutrition, and cancer risk reduction: where is the evidence?", img: "/images/mhr/research1.png" },
  { title: "The gut microbiome as a therapeutic target in metabolic disease", img: "/images/mhr/research2.png" },
  { title: "Sleep, circadian rhythms and metabolic health: translating the evidence", img: "/images/mhr/research3.png" },
];

const faqs = [
  {
    q: "Who can benefit from My Metabolic Detox?",
    a: "This program is ideal for individuals experiencing lifestyle- and metabolism-related symptoms such as: Chronic fatigue, mood swings, belly fat, acidity, bloating, hormonal imbalance, acne or skin rashes, anxiety, sugar cravings, diarrhoea or constipation, body pain, burnout, weight gain, poor sleep, muscle cramps, frequent cold and flu, bad breath, sensitivity to smells, lack of exercise, junk food habits, overthinking, mental exhaustion, late-night hunger, irregular daily routines, and high social or work stress.",
  },
  {
    q: "Is My Metabolic Detox personalised or the same for everyone?",
    a: "My Metabolic Detox is fully personalised. Your medical history, current symptoms, lifestyle patterns, and available reports are carefully reviewed, and your detox protocol is adjusted weekly by our clinical team to match your body\u2019s response and progress.",
  },
  {
    q: "Who designs and oversees My Metabolic Detox?",
    a: "My Metabolic Detox is led by the OneMi clinical team, specialising in functional medicine, clinical nutrition, and systems-based care.",
  },
  {
    q: "Do I need to stop my current medications or treatments to join My Metabolic Detox?",
    a: "No. My Metabolic Detox does not replace your ongoing medical care. It is designed to work alongside your existing treatments and focuses on improving metabolic balance, digestion, detox pathways, and energy levels.",
  },
  {
    q: "Is My Metabolic Detox an at-home program?",
    a: "Yes. The entire 21-day program is designed to be followed at home with guided daily tasks, expert support, and digital tracking of your progress.",
  },
  {
    q: "What happens after the 21-day detox ends? Can I extend the program?",
    a: "Yes. After completing the program, you receive a detailed, data-backed progress report. Based on your outcomes, you may choose to repeat the detox, extend support, or transition to My Health Recharge.",
  },
  {
    q: "What if My Metabolic Detox doesn\u2019t work?",
    a: "My Metabolic Detox is carefully curated by our clinical experts. If you follow the protocol diligently and do not see the expected results, we will review and adjust the program to better support your health journey.",
  },
];

// ─── Shared components ────────────────────────────────────────────────────────

function OrangeCheck() {
  return (
    <span className="shrink-0 mt-0.5">
      <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  );
}

function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <style>{`
        @keyframes mdp-ml { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes mdp-mr { from{transform:translateX(-33.333%)} to{transform:translateX(0)} }
        .mdp-ml{animation:mdp-ml 28s linear infinite}
        .mdp-mr{animation:mdp-mr 28s linear infinite}
      `}</style>
      <div className={`flex gap-6 whitespace-nowrap ${direction === "left" ? "mdp-ml" : "mdp-mr"}`}>
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-sm font-medium text-brand-dark">
            <span className="text-brand-orange">✳</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0 px-6">
      <button
        className="w-full flex justify-between items-start py-5 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-brand-dark text-sm leading-snug">{q}</span>
        <span className="text-brand-orange text-xl font-light shrink-0 leading-none mt-0.5">{open ? "×" : "+"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-brand-muted leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sticky Steps (same as MHR How It Works) ─────────────────────────────────

const CARD_H = 520;
const SCROLL_PER_STEP = 600;
const TOTAL_STEPS = mdpSteps.length;
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
          Kickstart your <span className="text-brand-orange">Detox Journey</span>
        </h2>
        <p className="mt-3 text-brand-muted">The process can be simplified. Outcomes, however, need effort.</p>
      </div>
      <div ref={containerRef} style={{ height: CONTAINER_H }} className="relative">
        <div className="sticky" style={{ top: 80 }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="relative overflow-hidden" style={{ height: CARD_H }}>
              {mdpSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 bg-white"
                  animate={{ y: i <= active ? "0%" : "105%" }}
                  initial={false}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  style={{ zIndex: i + 1 }}
                >
                  <div className="grid lg:grid-cols-2 h-full gap-0">
                    <div className="relative h-56 lg:h-full rounded-2xl overflow-hidden">
                      <Image
                        src={step.image}
                        alt={`${step.title}${step.highlight}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
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
                            <li key={item} className="flex items-start gap-3">
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
            <div className="flex justify-center gap-2 mt-6 pb-4">
              {mdpSteps.map((_, i) => (
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

// ─── Page ─────────────────────────────────────────────────────────────────────

const heroPhrases = ["Feeling Tired Often?", "Upset Stomach?", "Low on Energy?"];

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  link: string;
  img: string;
};

export default function MyMetabolicDetoxPage() {
  const [pillGroup, setPillGroup] = useState<"A" | "B">("A");
  const [heroIdx, setHeroIdx] = useState(0);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setPillGroup((g) => (g === "A" ? "B" : "A")), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroPhrases.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_API ?? "https://onemi.ai/wp-json/wp/v2"}/posts?categories=11&_embed&per_page=3`)
      .then((res) => res.json())
      .then((data) => {
        const parsed: BlogPost[] = data.map((post: any) => ({
          id: post.id,
          title: post.title.rendered.replace(/&#8211;.*$/, "").replace(/&amp;/g, "&").replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').trim(),
          slug: post.slug,
          link: post.link,
          img: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        }));
        setBlogs(parsed);
      })
      .catch(() => {
        setBlogs([
          { id: 1, title: "21 vs 90 Days: Know About OneMi's My Metabolic Detox and My Health Recharge Programs?", slug: "", link: "#", img: "/images/mhr/blog2.png" },
          { id: 2, title: "Gut Detox, Organ Detox, Thought Detox—What's the Difference?", slug: "", link: "#", img: "/images/mhr/blog3.png" },
          { id: 3, title: "Why a 21-Day Detox? The Science Behind Resetting Your Metabolism", slug: "", link: "#", img: "/images/mhr/blog1.png" },
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
            src="/images/mdp/mdp-banner.webp"
            alt="My Metabolic Detox"
            fill
            className="object-cover object-[55%_15%]"
            priority
            sizes="(max-width: 640px) 100vw, 95vw"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.1) 48%, transparent 65%)",
            }}
          />
          <div className="absolute bottom-10 left-8 sm:left-10 flex flex-col gap-3 max-w-xs">
            <div
              key={heroIdx}
              className="inline-block px-4 py-2 rounded-lg font-bold text-brand-dark text-base sm:text-lg"
              style={{ backgroundColor: "#F5C842", width: "fit-content" }}
            >
              {heroPhrases[heroIdx]}
            </div>
            <p className="text-sm sm:text-base text-brand-dark font-medium">Address the root cause</p>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark leading-tight">
                My Metabolic Detox
              </h1>
              <p className="mt-1 text-sm sm:text-base text-[#3D3D3D]">
                Reset your system in 21 days
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
        <MarqueeRow items={mdpMarqueeItems} direction="left" />
        <MarqueeRow items={[...mdpMarqueeItems].reverse()} direction="right" />
      </div>

      {/* ── 3. PROBLEM SECTION ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div
              className="absolute -top-4 right-6 w-28 h-28 opacity-40 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, #E85D04 1.5px, transparent 1.5px)", backgroundSize: "12px 12px" }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 opacity-40 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, #E85D04 1.5px, transparent 1.5px)", backgroundSize: "12px 12px" }}
            />
            <Image
              src="/images/mdp/mdpww.webp"
              alt="Your body has been signaling"
              width={560}
              height={500}
              className="rounded-2xl object-cover w-full relative z-10"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
              Your body has been signaling.{" "}
              <span className="text-brand-orange">Are you listening?</span>
            </h2>
            <p className="text-brand-muted leading-relaxed">
              Metabolic dysfunction doesn&apos;t happen overnight. It builds up silently through years
              of stress, poor nutrition, disturbed sleep, and toxic overload.
            </p>
            <hr className="border-brand-orange border-t-2" />
            <div>
              <h3 className="text-xl font-bold text-brand-dark mb-1">Reset your System in 21 days</h3>
              <p className="text-sm text-brand-muted">Personalised | Data-backed | Clinically guided</p>
            </div>
            <p className="text-[#3D3D3D] leading-relaxed">
              My Metabolic Detox is a 21-day clinically guided reset program designed to reduce
              metabolic stress, improve detox capacity, and restore energy — without starving the
              body or shocking the system.
            </p>
            <Button href="#program-details" className="w-full justify-center">
              View Program Details
            </Button>
          </div>
        </div>
      </section>

      {/* ── 4. SYMPTOMS GRID ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-4">
            Do you feel like your body needs a cleanse, a reboot?
          </h2>
          <hr className="border-brand-orange border-t-2 mb-10 mx-auto max-w-2xl" />
          <div className="flex flex-wrap gap-3 justify-center">
            {symptoms.map((s) => (
              <span key={s} className="px-5 py-2 rounded-full border border-gray-300 bg-white text-brand-dark text-sm font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CLEANSE AT THE CORE ── */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: "#F8F9FA" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #c8cdd4 2px, transparent 2px)",
            backgroundSize: "32px 32px",
            opacity: 0.7,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Cleanse at the <span className="text-brand-orange">core</span>
          </h2>
          <p className="text-brand-muted text-base sm:text-lg mb-12 max-w-2xl mx-auto">
            If too many apps are running in the background, the battery of the phone drains fast.
          </p>

          {/* Desktop: two alternating floating groups */}
          <div className="relative hidden lg:block" style={{ height: 420 }}>
            {pillarsA.map((p) => (
              <div
                key={p.label}
                className="absolute inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-sm border-2 border-gray-200 font-semibold text-brand-dark text-sm whitespace-nowrap"
                style={{
                  top: p.top, left: p.left,
                  opacity: pillGroup === "A" ? 1 : 0.06,
                  filter: pillGroup === "A" ? "blur(0px)" : "blur(2px)",
                  transition: "opacity 0.9s ease, filter 0.9s ease",
                }}
              >
                <span className="w-3 h-3 rounded-full bg-brand-orange shrink-0" />
                {p.label}
              </div>
            ))}
            {dotsA.map((d, i) => (
              <span
                key={`da-${i}`}
                className="absolute"
                style={{
                  top: d.top, left: d.left,
                  opacity: pillGroup === "A" ? 1 : 0,
                  transition: "opacity 0.9s ease",
                }}
              >
                <span className="flex w-6 h-6 items-center justify-center rounded-full border-2 border-brand-orange">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                </span>
              </span>
            ))}
            {pillarsB.map((p) => (
              <div
                key={p.label}
                className="absolute inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-sm border-2 border-gray-200 font-semibold text-brand-dark text-sm whitespace-nowrap"
                style={{
                  top: p.top, left: p.left,
                  opacity: pillGroup === "B" ? 1 : 0.06,
                  filter: pillGroup === "B" ? "blur(0px)" : "blur(2px)",
                  transition: "opacity 0.9s ease, filter 0.9s ease",
                }}
              >
                <span className="w-3 h-3 rounded-full bg-brand-orange shrink-0" />
                {p.label}
              </div>
            ))}
            {dotsB.map((d, i) => (
              <span
                key={`db-${i}`}
                className="absolute"
                style={{
                  top: d.top, left: d.left,
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

          {/* Mobile: show all pills in wrap layout */}
          <div className="flex flex-wrap gap-3 lg:hidden justify-center">
            {allPillars.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-sm border-2 border-gray-200 font-semibold text-brand-dark text-sm"
              >
                <span className="w-3 h-3 rounded-full bg-brand-orange shrink-0" />
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. STICKY STEPS ── */}
      <StickySteps />

      {/* ── 7. PRICING CARD ── */}
      <section id="program-details" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto border border-gray-200 rounded-2xl bg-white p-8 sm:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
              Make your detox goals.
            </h2>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-orange leading-tight">
              Commit to the program.
            </h2>
            <p className="mt-3 text-brand-muted">
              From first assessment to final report, every step is covered for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <ul className="flex flex-col gap-4">
              {pricingChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-brand-dark text-sm">
                  <OrangeCheck />
                  {item}
                </li>
              ))}
            </ul>

            <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm font-bold text-brand-dark whitespace-nowrap">Program Details</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>
              <div className="grid grid-cols-2 border border-gray-200 rounded-lg overflow-hidden text-sm font-medium text-center">
                <div className="py-3 border-r border-gray-200 text-brand-dark">Mode : At Home</div>
                <div className="py-3 text-brand-dark">Duration : 21 Days</div>
              </div>
              <div className="bg-[#F3F4F6] rounded-lg py-4 text-center">
                <span className="text-3xl font-bold text-brand-dark">&#8377; 5,000</span>
              </div>
              <p className="text-center text-sm text-[#3D3D3D] font-medium leading-snug">
                Limited Seats. &apos;By Invite Only.&apos;<br />Use the invite code to qualify
              </p>
              <div className="border-t border-dashed border-gray-300" />
              <Button href="/cart?product=detox" className="w-full justify-center">
                Reset your System in 21 days
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">
            Data-Backed <span className="text-brand-orange">Transformation</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">
            Measured through clinical parameters, symptom scoring, and performance indicators
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1 — Program Benefits bar chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-brand-dark text-center mb-4">Program Benefits</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Overall vitality & productivity", pct: 60 },
                  { label: "Sleep quality & morning freshness", pct: 79 },
                  { label: "Sustained daily energy", pct: 80 },
                  { label: "Focus & stress resilience", pct: 65 },
                  { label: "Physical stamina", pct: 60 },
                  { label: "Metabolic & digestive health", pct: 60 },
                  { label: "Health habit consistency", pct: 75 },
                  { label: "Overall quality of life", pct: 95 },
                ].map((m) => (
                  <div key={m.label} className="relative h-8" style={{ borderRadius: 6 }}>
                    <div className="absolute inset-0" style={{ backgroundColor: "#E8EDF2", borderRadius: 6 }} />
                    <div
                      className="absolute top-0 left-0 bottom-0 flex items-center pl-2"
                      style={{ width: `${m.pct}%`, backgroundColor: "#F5C842", borderRadius: 6 }}
                    >
                      <span className="text-xs font-semibold text-brand-dark whitespace-nowrap truncate">{m.label}</span>
                    </div>
                    <div
                      className="absolute flex items-center justify-center bg-white"
                      style={{
                        left: `${m.pct}%`, top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 38, height: 24, borderRadius: 6, zIndex: 10,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                      }}
                    >
                      <span className="text-xs font-bold text-brand-dark">{m.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 — Health Improvement table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
              <h3 className="text-sm font-semibold text-brand-dark text-center mb-4">Health Improvement</h3>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-2 text-brand-muted font-medium">Health parameters</th>
                      <th className="text-center pb-2 text-brand-muted font-medium">Pre-Program</th>
                      <th className="text-center pb-2 text-brand-muted font-medium">Post-Program</th>
                      <th className="text-center pb-2 text-brand-muted font-medium">% Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { param: "Energy Level", dot: "#F5C842", pre: "8/10", post: "8/10", change: "▲3%" },
                      { param: "Digestion",    dot: "#E85D04", pre: "4/10", post: "8/10", change: "▲16%" },
                      { param: "Emotional",    dot: "#D1D5DB", pre: "4/10", post: "8/10", change: "▲9%" },
                      { param: "Sleep",        dot: "#1A1A2E", pre: "4/10", post: "8/10", change: "▲9%" },
                    ].map((row) => (
                      <tr key={row.param} className="border-b border-gray-100 last:border-0">
                        <td className="py-2.5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: row.dot }} />
                          {row.param}
                        </td>
                        <td className="py-2.5 text-center text-brand-dark">{row.pre}</td>
                        <td className="py-2.5 text-center text-brand-dark">{row.post}</td>
                        <td className="py-2.5 text-center text-green-600 font-semibold">{row.change}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-brand-muted text-center mt-4 italic">Small steps, strong progress.</p>
            </div>

            {/* Card 3 — Overall Outcomes grouped bar chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-brand-dark text-center mb-2">Overall Outcomes</h3>
              <div className="flex justify-center gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: "#D1D5DB" }} />
                  Pre-Program
                </span>
                <span className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: "#F5C842" }} />
                  Post-Program
                </span>
              </div>
              <div className="flex items-end justify-around gap-2 h-40 px-2">
                {[
                  { label: "Energy\nLevels",        pre: 65, post: 90 },
                  { label: "Digestive\nTolerance",  pre: 50, post: 88 },
                  { label: "Emotional\nWellbeing",  pre: 60, post: 85 },
                ].map((g) => (
                  <div key={g.label} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex items-end gap-1 w-full justify-center" style={{ height: 120 }}>
                      <div
                        className="flex-1 rounded-t-md max-w-7"
                        style={{ height: `${g.pre}%`, backgroundColor: "#D1D5DB" }}
                      />
                      <div
                        className="flex-1 rounded-t-md max-w-7"
                        style={{ height: `${g.post}%`, backgroundColor: "#F5C842" }}
                      />
                    </div>
                    <p className="text-xs text-brand-muted text-center leading-tight whitespace-pre-line">{g.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 9. SUCCESS STORIES ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">
            Success <span className="text-brand-orange">Stories</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">Stories of courage, care, and lasting change.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
                <div className="mb-4">
                  <span className="text-brand-orange" style={{ fontSize: 32, lineHeight: 1, fontFamily: "Georgia, serif" }}>&#8220;&#8220;</span>
                </div>
                <p className="text-[#3D3D3D] text-sm leading-relaxed flex-1">{story.quote}</p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-brand-dark"
                    style={{ backgroundColor: "#F5C842" }}
                  >
                    {story.initial}
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark text-sm">{story.name}</p>
                    <p className="text-xs text-brand-muted">{story.conditions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CLINICAL RESEARCH INSIGHTS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">
            Clinical Research <span className="text-brand-orange">Insights</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">Built on medical research and real-world evidence.</p>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2 text-center">
            From the <span className="text-brand-orange">Blog</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">Expert insights and health stories</p>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F0F2F5" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark leading-tight">
                Frequently Asked
              </h2>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-orange leading-tight mb-4">
                Questions
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                Know how the program works, what&apos;s included, and how we support your care.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {faqs.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}