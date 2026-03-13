"use client";
import { motion } from "framer-motion";
import { YELLOW_BANNER, TICKER_ITEMS } from "@/constants/home";
import Image from "next/image";

const tickerRow = [...TICKER_ITEMS, ...TICKER_ITEMS];

function TickerRow({ direction = 1, color }: { direction?: number; color: string }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex items-center"
        animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        {tickerRow.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "22px",
              color,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ marginRight: "20px" }}>{item}</span>
            <span className="inline-flex items-center shrink-0" style={{ marginRight: "37px" }}>
              <Image
                src="/images/asterisk-1.svg"
                alt="*"
                width={18}
                height={18}
              />
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function YellowBanner() {
  return (
    <section className="bg-brand-yellow py-16">
      {/* Production: full width container, text left-aligned, 32px Montserrat 500 */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "32px",
            fontWeight: 500,
            color: "rgb(37,37,37)",
            lineHeight: "48px",
            textAlign: "left",
          }}
        >
          {YELLOW_BANNER}
        </p>
      </div>

      {/* Ticker rows */}
      <div className="space-y-4">
        <TickerRow direction={1}  color="rgb(37,37,37)" />
        <TickerRow direction={-1} color="rgb(69,69,69)" />
      </div>
    </section>
  );
}