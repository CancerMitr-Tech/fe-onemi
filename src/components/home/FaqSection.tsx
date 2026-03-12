"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { FAQ } from "@/constants/home";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {/* Question — Montserrat 500, 24px, 34px lh, rgb(10,19,35) */}
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "34px",
            color: "rgb(10, 19, 35)",
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
            {/* Answer — Montserrat 500, 16px, 24px lh, rgb(107,114,128) */}
            <div
              className="bg-brand-mint rounded-lg px-4 py-3 mb-3"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                color: "rgb(107, 114, 128)",
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

export default function FaqSection() {
  return (
    <SectionWrapper className="bg-gray-50">
      <div className="grid lg:grid-cols-2 gap-12 items-start">

        {/* Left */}
        <div>
          {/* Heading — Manrope 600, 40px, 56px lh, rgb(37,37,37) */}
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "56px",
              color: "rgb(37, 37, 37)",
              marginBottom: "16px",
            }}
          >
            Frequently Asked{" "}
            <span style={{ color: "#E05C1A" }}>Questions</span>
          </h2>

          {/* Subtext — Montserrat 400, 16px, 28px lh, rgb(10,19,35) */}
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "28px",
              color: "rgb(10, 19, 35)",
            }}
          >
            Everything you need to know about oneMi and how it can transform your health management journey.
          </p>
        </div>

        {/* Right: accordion */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {FAQ.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}