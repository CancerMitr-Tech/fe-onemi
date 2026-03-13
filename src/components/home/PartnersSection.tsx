"use client";

import Image from "next/image";
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
    <div className="overflow-hidden whitespace-nowrap w-screen relative left-1/2 -translate-x-1/2">
      <motion.div
        className="inline-flex gap-0"
        animate={
          direction > 0 ? { x: ["0%", "-50%"] } : { x: ["-50%", "0%"] }
        }
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((name, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "30px",
                color: "rgb(69, 69, 69)",
                marginRight: "20px",
              }}
            >
              {name}
            </span>
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

export default function PartnersSection() {
  return (
    <>
      <SectionWrapper
        id="partners"
        className=" scroll-mt-20"
      >
        {/* Heading */}
        <div className="text-center mb-10">
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "60px",
              color: "rgb(37, 37, 37)",
            }}
          >
            Our Trusted Partners,
            <br />
            For Your Health Journey.
          </h2>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "30px",
              color: "rgb(69, 69, 69)",
              marginTop: "12px",
            }}
          >
            One platform. Many partners. One shared goal, your health.
          </p>
        </div>
      </SectionWrapper>

      {/* Ticker rows — full screen width, SectionWrapper ke bahar */}
      <div className="bg-white space-y-3 py-2 overflow-hidden">
        <PartnerRow items={row1} direction={1} />
        <PartnerRow items={row2} direction={-1} />
      </div>

      {/* Divider */}
      <div className="w-1/4 mx-auto mt-25">
        <Image
          src="/images/grey-line.svg"
          alt="divider"
          width={10}
          height={40}
          className="w-full block border-0 outline-none"
        />
      </div>
    </>
  );
}