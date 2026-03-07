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
        <span className="font-medium text-brand-dark text-sm">{q}</span>
        <span className="text-brand-orange text-xl font-light shrink-0">
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
            <div className="pb-4 text-sm text-brand-muted bg-brand-mint rounded-lg px-4 py-3 mb-3">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            Frequently Asked{" "}
            <span className="text-brand-orange">Questions</span>
          </h2>
          <p className="text-brand-muted">
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
