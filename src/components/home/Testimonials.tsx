"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { TESTIMONIALS } from "@/constants/home";

const VISIBLE = 3;

export default function Testimonials() {
  const [start, setStart] = useState(0);

  const prev = () =>
    setStart((s) => (s - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setStart((s) => (s + 1) % TESTIMONIALS.length);

  const visible = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = (start + i) % TESTIMONIALS.length;
    return { ...TESTIMONIALS[idx], idx };
  });

  return (
    <SectionWrapper className="bg-white">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          Where trust meets results.
        </h2>
        <p className="mt-2" style={{ color: "rgb(101,101,101)", fontSize: "16px", lineHeight: "26px", fontWeight: 500 }}>
          Visible progress across every phase of care.
        </p>
      </div>

      {/* Arrows + Cards */}
      <div className="flex items-center gap-3">

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="shrink-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-brand-orange hover:text-brand-orange transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards grid */}
        <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.div
                key={`${t.name}-${start}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="bg-white rounded-2xl flex flex-col justify-between"
                style={{
                  minHeight: "300px",
                  border: "1px solid #E2E2E2",
                  padding: "28px 28px 24px 28px",
                }}
              >
                {/* Top: quote icon + text */}
                <div className="flex flex-col gap-5">
                  <Image
                    src="/images/quotes-orange.svg"
                    alt="quote"
                    width={30}
                    height={18}
                    className="object-contain"
                  />
                  <p style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "26px",
                    color: "rgb(101, 101, 101)",
                  }}>
                    {t.text}
                  </p>
                </div>

                {/* Bottom: avatar + name / age */}
                <div className="flex items-center gap-3 mt-8">
                  <div
                    className="rounded-full flex items-center justify-center shrink-0 font-bold"
                    style={{
                      width: "38px",
                      height: "38px",
                      backgroundColor: "#F5D97A",
                      color: "#1A1A2E",
                      fontSize: "15px",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <p style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#1A1A2E",
                  }}>
                    {t.name}{" "}
                    <span style={{ color: "#E05C1A", fontWeight: 600 }}>
                      / {t.age}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next"
          className="shrink-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-brand-orange hover:text-brand-orange transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            style={{
              borderRadius: "9999px",
              transition: "all 0.3s",
              width: i === start ? "24px" : "8px",
              height: "8px",
              backgroundColor: i === start ? "#1A1A2E" : "#D1D5DB",
            }}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}