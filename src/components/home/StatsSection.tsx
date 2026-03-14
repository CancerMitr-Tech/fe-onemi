"use client";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/constants/home";

const DISPLAY_STATS = STATS.map((s) =>
  s.label === "OneMi Programs" ? { ...s, label: "Health Programs" } : s
);

function useCountUp(target: string, duration = 1800, started: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!started) return;
    const numericStr = target.replace(/[^0-9]/g, "");
    const end = parseInt(numericStr, 10);
    if (isNaN(end)) { setDisplay(target); return; }

    const suffix = target.replace(/[0-9,]/g, "");
    const hasCommas = target.includes(",");
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      const formatted = hasCommas ? current.toLocaleString("en-IN") : current.toString();
      setDisplay(formatted + suffix);
      if (progress < 1) { raf = requestAnimationFrame(step); }
      else { setDisplay(target); }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return display;
}

function StatItem({ value, label, started }: { value: string; label: string; started: boolean }) {
  const animated = useCountUp(value, 1800, started);
  return (
    <div className="flex flex-col items-center gap-2">
      <p
        className="text-brand-orange"
        style={{ fontFamily: "'Manrope', sans-serif", fontSize: "32px", lineHeight: "32px", fontWeight: 700, color: "rgb(234, 90, 26)" }}
      >
        {animated}
      </p>
      <p
        className="text-center"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "20px", lineHeight: "50px", fontWeight: 600, color: "rgb(69, 69, 69)" }}
      >
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="px-10 sm:px-8 lg:px-20 -mt-12 relative z-10" ref={ref}>
      {/* Full width within margins, rounded-3xl corners, matches production */}
      <div className="w-full bg-white rounded-[50px] shadow-md px-10 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {DISPLAY_STATS.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} started={started} />
          ))}
        </div>
      </div>
    </div>
  );
}