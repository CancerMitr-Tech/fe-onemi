"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { TESTIMONIALS } from "@/constants/home";

const VISIBLE = 3;

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Max index where 3 cards are still fully visible
  const maxIndex = TESTIMONIALS.length - VISIBLE;

  const prev = () =>
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  const next = () =>
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  // Auto scroll — reset to 0 when reaching last group
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <SectionWrapper className="bg-white">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "55px",
            color: "rgb(37,37,37)",
            margin: 0,
          }}
        >
          Where trust meets results.
        </h2>

        <p
          className="mt-2"
          style={{
            color: "rgb(69,69,69)",
            fontSize: "20px",
            lineHeight: "30px",
            fontWeight: 400,
          }}
        >
          Visible progress across every phase of care.
        </p>
      </div>

      {/* Slider */}
      <div className="flex items-center gap-3">

        {/* Left */}
        <button
          onClick={prev}
          className="shrink-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-brand-orange hover:text-brand-orange"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Track */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${index * 33.333}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="shrink-0 w-1/3 px-2">
                <div
                  className="bg-white rounded-2xl flex flex-col justify-between h-full"
                  style={{
                    minHeight: "380px",
                    border: "1px solid #6B7280",
                    padding: "18px 18px 14px 18px",
                  }}
                >
                  {/* quote + text */}
                  <div className="flex flex-col gap-5">
                    <Image
                      src="/images/quotes-orange.svg"
                      alt="quote"
                      width={30}
                      height={18}
                    />

                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "26px",
                        color: "rgb(101,101,101)",
                      }}
                    >
                      {t.text}
                    </p>
                  </div>

                  {/* avatar */}
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

                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#1A1A2E",
                      }}
                    >
                      {t.name}
                      <span style={{ color: "#E05C1A", fontWeight: 600 }}>
                        {" "} / {t.age}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <button
          onClick={next}
          className="shrink-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-brand-orange hover:text-brand-orange"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* Dots — one per slide position */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              borderRadius: "9999px",
              width: i === index ? "24px" : "8px",
              height: "8px",
              backgroundColor: i === index ? "#1A1A2E" : "#D1D5DB",
              transition: "all 0.3s",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>

    </SectionWrapper>
  );
}