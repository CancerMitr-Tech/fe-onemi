"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { FAQ } from "@/constants/home";

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
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
          {isOpen ? "×" : "+"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {/* Answer — Montserrat 500, 16px, 30px lh, rgba(0,0,0,0.57) */}
            <div
              className="rounded-lg px-4 py-3 mb-3"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "30px",
                color: "rgba(0, 0, 0, 0.57)",
                whiteSpace: "pre-line",
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Divider image — upar FAQ ke */}
      <div className="w-1/2 mx-auto">
        <Image
          src="/images/grey-line.svg"
          alt="divider"
          width={100}
          height={40}
          className="w-full"
        />
      </div>

      <SectionWrapper className="bg-gray-50">
        <div className="grid gap-12 items-start" style={{ gridTemplateColumns: "1fr 1.8fr" }}>

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

            {/* Subtext — Montserrat 500, 20px, 30px lh, rgb(101,101,101) */}
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "30px",
                color: "rgb(101, 101, 101)",
              }}
            >
              Learn how OneMi works, what to expect, and how we protect your
              health and data.
            </p>
          </div>

          {/* Right: accordion */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {FAQ.map((item, index) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}