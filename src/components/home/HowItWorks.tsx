"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HOW_IT_WORKS } from "@/constants/home";

const CARD_H = 520;
const SCROLL_PER_STEP = 600;
const TOTAL = HOW_IT_WORKS.length;
const CONTAINER_H = SCROLL_PER_STEP * TOTAL + CARD_H;

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top + 80;
      if (scrolled < 0) return;
      const idx = Math.min(TOTAL - 1, Math.floor(scrolled / SCROLL_PER_STEP));
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#F8F9FA]">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E]">
          How It <span className="text-[#E85D04]">Works</span>
        </h2>
      </div>

      {/* Scroll runway */}
      <div ref={containerRef} style={{ height: CONTAINER_H }} className="relative">

        {/* Sticky viewport */}
        <div className="sticky" style={{ top: 80 }}>
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

            {/* Card stack — overflow-hidden clips offscreen cards */}
            <div className="relative overflow-hidden" style={{ height: CARD_H }}>
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 bg-[#F8F9FA]"
                  animate={{ y: i <= active ? "0%" : "105%" }}
                  initial={false}
                  transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  style={{ zIndex: i + 1 }}
                >
                  <div className="grid lg:grid-cols-2 h-full gap-0">
                    {/* Image — always left, with rounded corners */}
                    <div className="relative h-56 lg:h-full rounded-2xl overflow-hidden">
                      <Image
                        src={step.image}
                        alt={`${step.title} ${step.highlight}`}
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
                          {step.title}{" "}
                          <span className="text-[#E85D04]">{step.highlight}</span>
                        </h3>
                        <p className="text-sm text-[#6B7280] mb-5">{step.subtitle}</p>
                        <ul className="space-y-3">
                          {step.items.slice(0, 4).map((item) => (
                            <li key={item} className="flex items-center gap-3">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E85D04] flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="text-sm text-[#1A1A2E]">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-[#6B7280] mt-6">{step.tagline}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Step dots */}
            <div className="flex justify-center gap-2 mt-6">
              {HOW_IT_WORKS.map((_, i) => (
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

      <div className="pb-20" />
    </div>
  );
}
