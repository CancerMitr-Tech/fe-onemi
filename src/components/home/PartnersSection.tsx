"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { PARTNERS_ROW_1, PARTNERS_ROW_2 } from "@/constants/home";

const row1 = [...PARTNERS_ROW_1, ...PARTNERS_ROW_1];
const row2 = [...PARTNERS_ROW_2, ...PARTNERS_ROW_2];

function PartnerRow({
  items,
  direction = 1,
}: {
  items: string[];
  direction?: number;
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-0"
        animate={
          direction > 0 ? { x: ["0%", "-50%"] } : { x: ["-50%", "0%"] }
        }
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((name, i) => (
          <span
            key={i}
            className="inline-flex items-center text-sm font-medium text-brand-dark"
          >
            {name}
            <span className="mx-4 text-brand-orange text-lg">✱</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <SectionWrapper
      id="partners"
      // scroll-mt-20 = 80px offset for fixed navbar (adjust if navbar height differs)
      className="bg-white border-t border-gray-100 overflow-hidden scroll-mt-20"
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight">
          Our Trusted Partners,
          <br />
          For Your Health Journey.
        </h2>
        <p className="mt-3 text-base text-gray-500">
          One platform. Many partners. One shared goal, your health.
        </p>
      </div>

      {/* Row 1 scrolls left, Row 2 scrolls right */}
      <div className="space-y-3">
        <PartnerRow items={row1} direction={1} />
        <PartnerRow items={row2} direction={-1} />
      </div>
    </SectionWrapper>
  );
}