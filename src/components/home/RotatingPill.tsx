"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ROTATING_PILLS } from "@/constants/home";

export default function RotatingPill() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_PILLS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-14 flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block bg-brand-amber rounded-md px-5 py-3"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "20px", lineHeight: "28px", color: "rgb(255, 255, 255)" }}
        >
          {ROTATING_PILLS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
