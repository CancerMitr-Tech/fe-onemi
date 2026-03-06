"use client";
import { motion } from "framer-motion";
import { YELLOW_BANNER, TICKER_ITEMS } from "@/constants/home";

const tickerRow = [...TICKER_ITEMS, ...TICKER_ITEMS];

function TickerRow({ direction = 1 }: { direction?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-0"
        animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {tickerRow.map((item, i) => (
          <span key={i} className="inline-flex items-center text-sm font-medium text-[#1A1A2E]">
            {item}
            <span className="mx-4 text-[#E85D04] text-lg">✱</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function YellowBanner() {
  return (
    <section className="bg-[#F5E6A3] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <p className="text-2xl sm:text-3xl font-semibold text-[#1A1A2E] leading-relaxed">
          {YELLOW_BANNER}
        </p>
      </div>
      <div className="space-y-3">
        <TickerRow direction={1} />
        <TickerRow direction={-1} />
      </div>
    </section>
  );
}
