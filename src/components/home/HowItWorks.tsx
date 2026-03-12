"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HOW_IT_WORKS } from "@/constants/home";

const CARD_H = 580;
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
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          How It <span className="text-brand-orange">Works</span>
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
                      <div className="hidden lg:block w-px bg-brand-orange mx-8 self-stretch shrink-0" />
                      <div className="flex flex-col justify-center py-8 px-4 lg:px-6 lg:pr-12 w-full">
                        <p className="text-sm font-semibold text-brand-orange mb-2 tracking-wide">{step.step}</p>
                        <h3 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3 leading-tight">
                          {step.title}{" "}
                          <span className="text-brand-orange">{step.highlight}</span>
                        </h3>
                        <p className="text-sm text-brand-muted mb-5">{step.subtitle}</p>
                        <ul className="space-y-3">
                          {step.items.map((item) => (
                            <li key={item} className="flex items-center gap-3">
                              <Image src="/images/tick.png" width={20} height={20} alt="" className="shrink-0" />
                              <span className="text-sm text-brand-dark">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Programs panel — only shown on steps that have programs (Step 3) */}
                        {step.programs && step.programs.length > 0 ? (
                          <div className="mt-5 pt-4">
                            <Image
                              src="/images/grey-line.svg"
                              alt=""
                              width={380}
                              height={1}
                              className="w-full mb-4"
                            />
                            <p className="text-sm text-brand-muted text-center mb-4">{step.tagline}</p>
                            <div className="grid grid-cols-2 divide-x divide-gray-200 gap-0">
                              {step.programs.map((prog) => (
                                <div key={prog.href} className="flex flex-col items-center text-center px-4 gap-2">
                                  <p className="text-sm font-semibold text-brand-dark leading-tight">{prog.title}</p>
                                  <p className="text-xs text-brand-muted">{prog.subtitle}</p>
                                  <Link
                                    href={prog.href}
                                    className="mt-1 w-full inline-block bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold text-center py-2 px-4 rounded-lg transition-colors duration-200"
                                  >
                                    Read more
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-brand-muted mt-6">{step.tagline}</p>
                        )}
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