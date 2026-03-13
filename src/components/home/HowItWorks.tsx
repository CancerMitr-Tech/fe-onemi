"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HOW_IT_WORKS } from "@/constants/home";

const CARD_H = 700;
const SCROLL_PER_STEP = 700;
const TOTAL = HOW_IT_WORKS.length;
const CONTAINER_H = SCROLL_PER_STEP * (TOTAL - 1) + CARD_H + 300;

function StepCard({
  step,
  index,
  containerScrollY,
}: {
  step: (typeof HOW_IT_WORKS)[0];
  index: number;
  containerScrollY: MotionValue<number>;
}) {
  const scrollIn  = (index - 1) * SCROLL_PER_STEP;
  const scrollOut = index       * SCROLL_PER_STEP;

  const yPct = useTransform(
    containerScrollY,
    index === 0 ? [0, 1] : [scrollIn, scrollOut],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  return (
    <motion.div
      className="absolute inset-0 bg-[#F8F9FA]"
      style={{ zIndex: index + 1, y: yPct }}
    >
      {/* Full width layout — no box/card, just margin on all 4 sides */}
      <div
        className="w-full h-full flex"
        style={{ padding: "40px 60px" }}
      >
        {/* ── Left: Image with margin on all sides inside the image area ── */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: "47%",
            paddingRight: "40px",
            borderRight: "2px solid #EA5A1A",
          }}
        >
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Image
              src={step.image}
              alt={`${step.title} ${step.highlight}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
            />
          </div>
        </div>

        {/* ── Right: Content with left gap from divider ── */}
        <div
          className="flex flex-col justify-center overflow-y-auto"
          style={{ width: "53%", paddingLeft: "48px" }}
        >
          {/* Step label */}
          <p
            className="mb-2 tracking-wide"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "rgb(234,90,26)",
            }}
          >
            {step.step}
          </p>

          {/* Title */}
          <h3
            className="text-brand-dark mb-3"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "36px",
              fontWeight: 600,
              lineHeight: "49px",
            }}
          >
            {step.title}{" "}
            <span style={{ color: "rgb(234,90,26)" }}>{step.highlight}</span>
          </h3>

          {/* Subtitle */}
          <p
            className="mb-5"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "18px",
              fontWeight: 500,
              color: "rgb(101,101,101)",
              lineHeight: "28px",
            }}
          >
            {step.subtitle}
          </p>

          {/* Feature list */}
          <ul className="space-y-3 mb-5">
            {step.items.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Image
                  src="/images/tick.png"
                  width={22}
                  height={22}
                  alt=""
                  className="shrink-0"
                />
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "rgb(101,101,101)",
                    lineHeight: "28px",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Programs or Tagline */}
          {step.programs && step.programs.length > 0 ? (
            <div>
              <div className="w-full h-px bg-gray-200 mb-4" />
              <p
                className="text-center mb-4"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "rgb(107,114,128)",
                }}
              >
                {step.tagline}
              </p>
              <div className="grid grid-cols-2">
                {step.programs.map((prog, pi) => (
                  <div
                    key={prog.href}
                    className={`flex flex-col items-center text-center px-4 gap-1 ${
                      pi === 0 ? "border-r border-gray-200" : ""
                    }`}
                  >
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "18px",
                        fontWeight: 500,
                        color: "rgb(69,69,69)",
                        lineHeight: "28px",
                      }}
                    >
                      {prog.title}
                    </p>
                    <p
                      className="mb-3"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "rgb(26,26,46)",
                        lineHeight: "22px",
                      }}
                    >
                      {prog.subtitle}
                    </p>
                    <Link
                      href={prog.href}
                      className="w-full inline-block bg-brand-orange hover:bg-brand-orange-hover text-white text-center py-2.5 rounded-lg transition-colors duration-200"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      Read more
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "14px",
                color: "rgb(107,114,128)",
              }}
            >
              {step.tagline}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollY } = useScroll();
  const [containerTop, setContainerTop] = useState(9999);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerTop(
          containerRef.current.getBoundingClientRect().top + window.scrollY
        );
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const containerScrollY = useTransform(
    scrollY,
    (v) => Math.max(0, v - containerTop)
  );

  useEffect(() => {
    const unsub = containerScrollY.on("change", (v) => {
      setActive(Math.min(TOTAL - 1, Math.floor(v / SCROLL_PER_STEP)));
    });
    return unsub;
  }, [containerScrollY]);

  return (
    <div className="bg-[#F8F9FA]">
      <div ref={containerRef} style={{ height: CONTAINER_H }} className="relative">
        <div className="sticky overflow-hidden" style={{ top: 80 }}>
          <div className="max-w-6xl mx-auto">

            {/* Card stack — no extra padding here, handled inside each card */}
            <div
              className="relative overflow-hidden"
              style={{ height: CARD_H }}
            >
              {HOW_IT_WORKS.map((step, i) => (
                <StepCard
                  key={i}
                  step={step}
                  index={i}
                  containerScrollY={containerScrollY}
                />
              ))}
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-4 pb-6">
              {HOW_IT_WORKS.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 24 : 6,
                    backgroundColor: i === active ? "#E85D04" : "#D1D5DB",
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
      <div className="pb-10" />
    </div>
  );
}