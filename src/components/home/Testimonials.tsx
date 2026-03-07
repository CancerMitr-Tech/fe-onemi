"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    return TESTIMONIALS[idx];
  });

  return (
    <SectionWrapper className="bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
          Where trust meets results.
        </h2>
        <p className="text-brand-muted mt-2 text-lg">
          Visible progress across every phase of care.
        </p>
      </div>

      <div className="relative">
        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.div
                key={`${t.name}-${start}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4"
              >
                <span className="text-4xl font-serif text-brand-orange leading-none">&ldquo;</span>
                <p className="text-sm text-brand-dark flex-1">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-amber flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-brand-dark">{t.name}</p>
                    <p className="text-xs text-brand-orange">Age {t.age}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStart(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === start ? "bg-brand-orange" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-brand-orange hover:text-brand-orange transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}