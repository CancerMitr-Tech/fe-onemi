"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import EnquireModal from "@/components/EnquireModal";
import { MMM_FORM_CONFIG } from "@/lib/formConfigs";

// ─── Data ─────────────────────────────────────────────────────────────────────

const mmmMarqueeItems = [
  "Supports mood stability and resilience",
  "Address chronic stress",
  "Improves clarity, focus and emotional balance",
  "Helps manage anxiety and fear patterns",
  "Supports mood stability",
  "Helps process grief, burnout and emotional fatigue",
  "Builds healthier thought and response patterns",
  "Restores emotional energy and calm",
  "Improves sleep and mental recovery",
];

const symptoms = [
  "Stress",
  "Burnout",
  "Anxiety",
  "Fear",
  "Depression",
  "Sadness",
  "Anger",
  "Frustration",
  "Grief",
  "Caregiver Burnout",
  "Loss",
  "Emotional",
  "Exhaustion",
  "Overthinking",
  "Mental Fatigue",
  "Stress",
  "Low Motivation",
  "Sleep Disturbance",
  "Emotional Overload",
];

// ── Clear the Inner Cache — floating pill animation ──────────────────────────
const pillarsA = [
  { label: "Behavioural Adjustments", top: "8%", left: "60%" },
  { label: "Guided Reflection", top: "32%", left: "37%" },
  { label: "Thought Reframing", top: "50%", left: "2%" },
  { label: "Self-Compassion", top: "62%", left: "62%" },
  { label: "Mind Resilience", top: "78%", left: "28%" },
];
const dotsA = [
  { top: "18%", left: "15%" },
  { top: "42%", left: "72%" },
  { top: "58%", left: "42%" },
  { top: "72%", left: "5%" },
];
const pillarsB = [
  { label: "Emotional Regulation", top: "10%", left: "58%" },
  { label: "Stress Processing", top: "35%", left: "4%" },
  { label: "Trigger Identification", top: "48%", left: "42%" },
  { label: "Cognitive Reset", top: "65%", left: "64%" },
  { label: "Emotional Awareness", top: "80%", left: "6%" },
];
const dotsB = [
  { top: "22%", left: "38%" },
  { top: "43%", left: "20%" },
  { top: "55%", left: "82%" },
  { top: "70%", left: "52%" },
];
const allPillars = [...pillarsA, ...pillarsB];

// ── Steps ──────────────────────────────────────────────────────────────────
const mmmSteps = [
  {
    step: "Step 1:",
    title: "Quick ",
    highlight: "Assessment",
    subtitle: "Identifies emotional patterns, triggers, concerns.",
    items: [
      "Book your Program",
      "Share your concerns",
      "Set your goals",
    ],
    image: "/images/mhr/step1.webp",
  },
  {
    step: "Step 2:",
    title: "Expert ",
    highlight: "Consult",
    subtitle: "One-on-one sessions with a mental health expert.",
    items: [
      "Anxiety & Fear",
      "Burnout",
      "Depression",
      "Sadness & Grief",
      "Anger & Frustration",
      "Caregiver Burnout",
      "Emotional Fatigue",
      "Behavioural Reset",
      "Mind Resilience",
    ],
    image: "/images/mhr/step2.webp",
  },
  {
    step: "Step 3:",
    title: "Homework & ",
    highlight: "Follow-ups",
    subtitle: "Exercises & practical tools for lasting change.",
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
  "6 sessions a month, 50 min per session",
  "Flexible allocation between family members",
  "Comprehensive Emotional Health Assessment",
  "Personal goal setting",
  "One-on-one expert sessions",
  "Structured follow-up framework",
  "Personalised exercises and reflection tools",
  "Weekly sessions",
  "Guided emotional restructuring",
  "Post Program Guidance",
  "Long-term emotional maintenance strategies",
];

const stories = [
  {
    name: "Neha Sharma",
    initial: "N",
    conditions: "Caregiver burnout, anxiety, poor sleep",
    quote:
      "I didn't realise how mentally exhausted I was until the sessions helped me slow down and understand my triggers. I sleep better now and feel calmer in situations that earlier overwhelmed me.",
  },
  {
    name: "Rahul Verma",
    initial: "R",
    conditions: "Work stress, emotional eating, anger",
    quote:
      "The program helped me recognise patterns I never noticed before. I respond differently now instead of reacting. My relationships and work both improved.",
  },
  {
    name: "Mehul Desai",
    initial: "M",
    conditions: "Burnout, anxiety, irritability",
    quote:
      "I learned how to pause and manage my stress instead of carrying it through the day. I feel more balanced now, and both my work and family life have improved.",
  },
];

const research = [
  {
    title: "Tackling mental health challenges in the corporate sphere",
    img: "/images/mhr/research1.png",
  },
  {
    title: "Integrated roadmap to mental health wellness at workplace",
    img: "/images/mhr/research2.png",
  },
  {
    title: "Sleep, burnout, mental health - JSMD",
    img: "/images/mhr/research3.png",
  },
];

const faqs = [
  {
    q: "Who can benefit from My Mind Matters?",
    a: "This program is suitable for individuals experiencing anxiety, chronic stress, emotional fatigue, burnout, grief, mood instability, or mental exhaustion due to personal or professional pressures.",
  },
  {
    q: "Is the program personalised?",
    a: "Yes. My Mind Matters is fully personalised. Your emotional history, current symptoms, lifestyle patterns, and concerns are carefully reviewed, and your sessions are tailored by our clinical experts to match your specific needs.",
  },
  {
    q: "Who conducts the sessions?",
    a: "My Mind Matters sessions are led by qualified mental health professionals from the OneMi clinical team, specialising in emotional health, behavioural therapy, and systems-based care.",
  },
  {
    q: "Is this therapy or counselling?",
    a: "My Mind Matters is a structured, clinically guided emotional health program. It is not a substitute for psychiatric treatment but is designed to complement existing care and address root emotional causes.",
  },
  {
    q: "Can this be done from home?",
    a: "Yes. The entire program is designed to be followed at home with guided sessions, expert support, and digital tracking of your progress.",
  },
  {
    q: "What happens after completion?",
    a: "After completing the program, you receive a detailed progress report. Based on your outcomes, you may choose to continue support or transition to another OneMi program suited to your next phase.",
  },
  {
    q: "What if My Mind Matters isn't right for me?",
    a: "My Mind Matters is carefully curated by our clinical experts. If you follow the protocol diligently and do not see the expected results, we will review and adjust the program to better support your emotional health journey.",
  },
];

// ─── Shared components ────────────────────────────────────────────────────────

function OrangeCheck() {
  return <Image src="/images/tick.png" width={20} height={20} alt="" className="shrink-0 mt-0.5" />;
}

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: string[];
  direction?: "left" | "right";
}) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <style>{`
        @keyframes mmm-ml { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes mmm-mr { from{transform:translateX(-33.333%)} to{transform:translateX(0)} }
        .mmm-ml{animation:mmm-ml 28s linear infinite}
        .mmm-mr{animation:mmm-mr 28s linear infinite}
      `}</style>
      <div
        className={`flex gap-6 whitespace-nowrap ${direction === "left" ? "mmm-ml" : "mmm-mr"
          }`}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sm font-medium text-brand-dark"
          >
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
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "30px",
            color: "rgb(69, 69, 69)",
          }}
        >
          {q}
        </span>
        <span className="text-brand-orange text-2xl font-light shrink-0">
          {open ? "×" : "+"}
        </span>
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
            <div
              className="bg-brand-mint rounded-lg px-4 py-3 mb-3"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "26px",
                color: "rgb(69, 69, 69)",
              }}
            >
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sticky Steps ─────────────────────────────────────────────────────────────

const CARD_H = 520;
const SCROLL_PER_STEP = 600;
const TOTAL_STEPS = mmmSteps.length;
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
      setActive(
        Math.min(TOTAL_STEPS - 1, Math.floor(scrolled / SCROLL_PER_STEP))
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          Kickstart your{" "}
          <span className="text-brand-orange">Emotional Health Journey</span>
        </h2>
        <p className="mt-3 text-brand-muted">
          The process can be simplified. Outcomes, however, need effort.
        </p>
      </div>
      <div ref={containerRef} style={{ height: CONTAINER_H }} className="relative">
        <div className="sticky" style={{ top: 80 }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
            <div
              className="relative overflow-hidden"
              style={{ height: CARD_H }}
            >
              {mmmSteps.map((step, i) => (
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
                        <p className="text-sm font-semibold text-brand-orange mb-2 tracking-wide">
                          {step.step}
                        </p>
                        <h3 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3 leading-tight">
                          {step.title}
                          <span className="text-brand-orange">
                            {step.highlight}
                          </span>
                        </h3>
                        <p className="text-sm text-brand-muted mb-5">
                          {step.subtitle}
                        </p>
                        <ul className="space-y-3">
                          {step.items.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <OrangeCheck />
                              <span className="text-sm text-brand-dark">
                                {item}
                              </span>
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
              {mmmSteps.map((_, i) => (
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

const heroPhrases = ["Anxious?", "Stressed Out?", "Emotionally Drained?"];

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  link: string;
  img: string;
};

export default function MyMindMattersPage() {
  const [pillGroup, setPillGroup] = useState<"A" | "B">("A");
  const [heroIdx, setHeroIdx] = useState(0);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(
      () => setPillGroup((g) => (g === "A" ? "B" : "A")),
      3500
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setHeroIdx((i) => (i + 1) % heroPhrases.length),
      2800
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_WP_API ?? "https://onemi.ai/wp-json/wp/v2"}/posts?categories=1&_embed&per_page=3`
    )
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
          img:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
        }));
        setBlogs(parsed);
      })
      .catch(() => {
        setBlogs([
          {
            id: 1,
            title:
              "The Benefits of Structured Mental Health Education Programs – OneMi",
            slug: "",
            link: "#",
            img: "/images/mhr/blog1.png",
          },
          {
            id: 2,
            title:
              "Practical Coping Strategies for Anxiety and Overthinking – OneMi",
            slug: "",
            link: "#",
            img: "/images/mhr/blog2.png",
          },
          {
            id: 3,
            title:
              "Why Can't I Switch Off My Mind at Night? Science-Backed Solutions to Find Peaceful Sleep",
            slug: "",
            link: "#",
            img: "/images/mhr/blog3.png",
          },
        ]);
      })
      .finally(() => setBlogsLoading(false));
  }, []);

  return (
    <div className="bg-white">

      <EnquireModal open={modalOpen} onClose={() => setModalOpen(false)} formConfig={MMM_FORM_CONFIG} />

      {/* ── 1. HERO ── */}
      <div className="px-6 sm:px-10 lg:px-14 pt-4 pb-4">
        <section
          className="relative rounded-2xl overflow-hidden"
          style={{ height: 714 }}
        >
          <Image
            src="/images/mmm/MMM_Banner.webp"
            alt="My Mind Matters"
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
            <p className="text-sm sm:text-base text-brand-dark font-medium">
              Reduce emotional overload
            </p>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark leading-tight">
                My Mind Matters
              </h1>
              <p className="mt-1 text-sm sm:text-base text-[#3D3D3D]">
                Reignite your mental strength in 6 sessions
              </p>
            </div>
            {/* ✅ FIX: removed href so click always opens modal */}
            <div className="mt-1">
              <Button onClick={() => setModalOpen(true)}>Enquire Now</Button>
            </div>
          </div>
        </section>
      </div>

      {/* ── 2. MARQUEE ── */}
      <div className="py-6 bg-[#F9FAFB] border-y border-gray-100">
        <MarqueeRow items={mmmMarqueeItems} direction="left" />
        <MarqueeRow items={[...mmmMarqueeItems].reverse()} direction="right" />
      </div>

      {/* ── 3. PROBLEM SECTION ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div
              className="absolute -top-4 right-6 w-28 h-28 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #E85D04 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #E85D04 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
            <Image
              src="/images/mmm/MMM-img.webp"
              alt="Your mind wants to talk"
              width={560}
              height={500}
              className="rounded-2xl object-cover w-full relative z-10"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
              Your mind wants to talk{" "}
              <span className="text-brand-orange">Do you listen?</span>
            </h2>
            <p className="text-brand-muted leading-relaxed">
              Tendency to doomscroll at 2 am, thinking too much about results,
              stress eating — not normal signals.
              <br />
              They are your mind&apos;s signals asking for attention and
              resolution.
            </p>
            <hr className="border-brand-orange border-t-2" />
            <div>
              <h3 className="text-xl font-bold text-brand-dark mb-1">
                Reignite your mental strength in 6 sessions
              </h3>
              <p className="text-sm text-brand-muted">
                Personalised | Clinically guided | Root-cause focused
              </p>
            </div>
            <p className="text-[#3D3D3D] leading-relaxed">
              My Mind Matters is designed to help you slow down, understand your
              emotional triggers, and rebuild mental resilience in a structured
              and guided way.
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
            Is your mind on overdrive?
          </h2>
          <hr className="border-brand-orange border-t-2 mb-10 mx-auto max-w-2xl" />
          <div className="flex flex-wrap gap-3 justify-center">
            {symptoms.map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="px-5 py-2 rounded-full border border-gray-300 bg-white text-brand-dark text-sm font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CLEAR THE INNER CACHE ── */}
      <section
        className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #c8cdd4 2px, transparent 2px)",
            backgroundSize: "32px 32px",
            opacity: 0.7,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Clear the <span className="text-brand-orange">Inner Cache</span>
          </h2>
          <p className="text-brand-muted text-base sm:text-lg mb-12 max-w-2xl mx-auto">
            Just like a device slows down with overload, your mind needs space
            to breathe and reboot.
          </p>

          {/* Desktop: two alternating floating groups */}
          <div className="relative hidden lg:block" style={{ height: 420 }}>
            {pillarsA.map((p) => (
              <div
                key={p.label}
                className="absolute inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-sm border-2 border-gray-200 font-semibold text-brand-dark text-sm whitespace-nowrap"
                style={{
                  top: p.top,
                  left: p.left,
                  opacity: pillGroup === "A" ? 1 : 0.06,
                  filter:
                    pillGroup === "A" ? "blur(0px)" : "blur(2px)",
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
            {pillarsB.map((p) => (
              <div
                key={p.label}
                className="absolute inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full shadow-sm border-2 border-gray-200 font-semibold text-brand-dark text-sm whitespace-nowrap"
                style={{
                  top: p.top,
                  left: p.left,
                  opacity: pillGroup === "B" ? 1 : 0.06,
                  filter:
                    pillGroup === "B" ? "blur(0px)" : "blur(2px)",
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
      <section
        id="program-details"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]"
      >
        <div className="max-w-5xl mx-auto border border-gray-200 rounded-2xl bg-white p-8 sm:p-12">
          <div className="text-center mb-10">
            <h2
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "40px",
                lineHeight: "52px",
                color: "rgb(37, 37, 37)",
              }}
            >
              Make your list of triggers.
            </h2>
            <h2
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "40px",
                lineHeight: "52px",
                color: "#E85D04",
              }}
            >
              Address the root cause.
            </h2>
            <p
              className="mt-3"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "30px",
                color: "rgb(69, 69, 69)",
              }}
            >
              From first assessment to final report, every step is covered for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <ul className="flex flex-col gap-4">
              {pricingChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <OrangeCheck />
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 500,
                      fontSize: "20px",
                      lineHeight: "30px",
                      color: "rgb(69, 69, 69)",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "26px",
                    color: "rgb(69, 69, 69)",
                    whiteSpace: "nowrap",
                  }}
                >Program Details</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>
              <div className="grid grid-cols-2 border border-gray-200 rounded-lg overflow-hidden text-center">
                <div
                  className="py-3 border-r border-gray-200"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "26px", color: "rgb(69, 69, 69)" }}
                >Mode : At Home</div>
                <div
                  className="py-3"
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "26px", color: "rgb(69, 69, 69)" }}
                >Duration : 6 Sessions</div>
              </div>
              <div className="bg-[#F3F4F6] rounded-lg py-4 text-center">
                <span
                  style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "32px", lineHeight: "40px", color: "rgb(37, 37, 37)" }}
                >&#8377; 9,000</span>
              </div>
              <p
                className="text-center"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "26px", color: "rgb(69, 69, 69)" }}
              >
                Limited Seats. &apos;By Invite Only.&apos;<br />Use the invite code to qualify
              </p>
              <div className="border-t border-dashed border-gray-300" />
              <Button href="/cart?product=mind" className="w-full justify-center">
                Reignite your mental strength
              </Button>
              <p
                className="text-center italic"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "22px", color: "rgb(107, 114, 128)" }}
              >
                Eligible Tests &amp; Products charged separately. Taxes as applicable
              </p>
            </div>
          </div>

          <p
            className="text-center italic mt-8"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "26px", color: "rgb(69, 69, 69)" }}
          >
            Avail discounts and offers. Become a{" "}
            <a href="/#onemipro" className="text-brand-orange font-semibold not-italic underline">
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
            Data-Backed{" "}
            <span className="text-brand-orange">Transformation</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">
            Measured through clinical parameters, symptom scoring, and
            performance indicators
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1 — Program Benefits bar chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-brand-dark text-center mb-4">
                Program Benefits
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Improved emotional stability", pct: 82 },
                  { label: "Reduced anxiety and stress levels", pct: 76 },
                  { label: "Improved sleep quality", pct: 71 },
                  { label: "Better focus and mental clarity", pct: 79 },
                  { label: "Improved emotional resilience", pct: 85 },
                  { label: "Better overall quality of life", pct: 92 },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="relative h-8"
                    style={{ borderRadius: 6 }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: "#E8EDF2", borderRadius: 6 }}
                    />
                    <div
                      className="absolute top-0 left-0 bottom-0 flex items-center pl-2"
                      style={{
                        width: `${m.pct}%`,
                        backgroundColor: "#F5C842",
                        borderRadius: 6,
                      }}
                    >
                      <span className="text-xs font-semibold text-brand-dark whitespace-nowrap truncate">
                        {m.label}
                      </span>
                    </div>
                    <div
                      className="absolute flex items-center justify-center bg-white"
                      style={{
                        left: `${m.pct}%`,
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 38,
                        height: 24,
                        borderRadius: 6,
                        zIndex: 10,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                      }}
                    >
                      <span className="text-xs font-bold text-brand-dark">
                        {m.pct}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 — Caregiver Emotional Wellbeing Overview bar chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
              <h3 className="text-sm font-semibold text-brand-dark text-center mb-4">
                Caregiver Emotional Wellbeing Overview
              </h3>
              <div className="flex gap-2 flex-1">
                <div className="flex flex-col justify-between text-xs text-brand-muted pr-1 py-1" style={{ height: 160 }}>
                  {[10, 8, 6, 4, 2, 0].map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </div>
                <div className="flex items-end justify-around gap-2 flex-1" style={{ height: 160 }}>
                  {[
                    { label: "Stress &\nBurnout", val: 8 },
                    { label: "Negative\nThoughts", val: 7 },
                    { label: "Financial\nStrain", val: 5 },
                    { label: "Anger", val: 6 },
                  ].map((g) => (
                    <div
                      key={g.label}
                      className="flex flex-col items-center gap-1 flex-1"
                    >
                      <div
                        className="w-full rounded-t-md max-w-10"
                        style={{
                          height: `${(g.val / 10) * 140}px`,
                          backgroundColor: "#F5C842",
                        }}
                      />
                      <p className="text-xs text-brand-muted text-center leading-tight whitespace-pre-line">
                        {g.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 — Brain, Behavior & Life Balance donut chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-brand-dark text-center mb-4">
                Brain, Behavior &amp; Life Balance
              </h3>
              <svg viewBox="0 0 120 120" className="w-32 h-32 mb-4">
                {[
                  { color: "#E85D04", offset: 0, dash: 30 },
                  { color: "#1A1A2E", offset: 30, dash: 25 },
                  { color: "#D1D5DB", offset: 55, dash: 20 },
                  { color: "#F5C842", offset: 75, dash: 25 },
                ].map((seg) => (
                  <circle
                    key={seg.color}
                    cx="60"
                    cy="60"
                    r="40"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="20"
                    strokeDasharray={`${seg.dash} ${100 - seg.dash}`}
                    strokeDashoffset={`${-seg.offset}`}
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dasharray 0.5s" }}
                  />
                ))}
                <circle cx="60" cy="60" r="28" fill="white" />
              </svg>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-brand-muted">
                {[
                  { color: "#E85D04", label: "Emotional Stability" },
                  { color: "#1A1A2E", label: "Cognitive Function" },
                  { color: "#D1D5DB", label: "Physiological Regulation" },
                  { color: "#F5C842", label: "Social & Behavioural functioning" },
                ].map((l) => (
                  <span key={l.label} className="flex items-start gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: l.color }}
                    />
                    {l.label}
                  </span>
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
          <p className="text-brand-muted text-center mb-10">
            Health progress, one story at a time.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.name}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col"
              >
                <div className="mb-4">
                  <span
                    className="text-brand-orange"
                    style={{
                      fontSize: 32,
                      lineHeight: 1,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    &#8220;&#8220;
                  </span>
                </div>
                <p className="text-[#3D3D3D] text-sm leading-relaxed flex-1">
                  {story.quote}
                </p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-brand-dark"
                    style={{ backgroundColor: "#F5C842" }}
                  >
                    {story.initial}
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark text-sm">
                      {story.name}
                    </p>
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
            Clinical Research{" "}
            <span className="text-brand-orange">Insights</span>
          </h2>
          <p className="text-brand-muted text-center mb-10">
            Built on medical research and real-world evidence.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {research.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="relative h-48">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-brand-dark leading-snug">
                    {item.title}
                  </p>
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
            Blogs
          </h2>
          <p className="text-brand-muted text-center mb-10">
            Built on medical research and real-world evidence.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsLoading
              ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
                >
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
                        <span className="text-gray-400 text-sm">
                          No image
                        </span>
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
            <h2
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "40px",
                lineHeight: "52px",
                color: "rgb(37, 37, 37)",
                marginBottom: "16px",
              }}
            >
              Frequently Asked{" "}
              <span style={{ color: "#E05C1A" }}>Questions</span>
            </h2>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "30px",
                color: "rgb(69, 69, 69)",
              }}
            >
              Everything you need to know about the My Mind Matters program and your wellness journey.
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