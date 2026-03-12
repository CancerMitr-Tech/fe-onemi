"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";

const FEATURES = [
  {
    title: "Expert Consultation:",
    detail: "Comprehensive functional health OPD",
  },
  {
    title: "AI credits per month",
    detail: "Monthly Plan 180 | Quarterly Plan 196 | Annual Plan 206",
  },
  {
    title: "Savings and Discounts:",
    detail:
      "- 20-40% off on tests and scans\n- Up to 20% off on health products & supplements\n- 10% off on OneMi programs",
  },
  { title: "Priority Appointments & Instant Bookings", detail: "" },
  { title: "Secure Health Record Management", detail: "" },
  { title: "Dedicated Care Expert", detail: "" },
  { title: "24/7 Medical Assistance & Care Support", detail: "" },
];

const PLANS = [
  {
    name: "Monthly Plan",
    price: "₹ 599 /-",
    note: "180 AI credits / month",
    badge: "",
  },
  {
    name: "Quarterly Plan",
    price: "₹ 1,599 /-",
    note: "Extra credits: 10% | Savings: ~10%",
    badge: "",
  },
  {
    name: "Annual Plan",
    price: "₹ 4999 /-",
    note: "Extra credits: 15% | Savings: 30%",
    badge: "Best Value",
  },
];

export default function PricingSection() {
  return (
    <SectionWrapper id="onemipro" className="bg-[#EFEFEF]">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl px-8 sm:px-14 py-12">

        {/* Heading — Manrope 600, 36px, 54px lh, rgb(37,37,37) */}
        <div className="text-center mb-10">
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "36px",
              lineHeight: "54px",
              color: "rgb(37, 37, 37)",
            }}
          >
            One<span style={{ color: "#E05C1A" }}>Mi</span> Pro
          </h2>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              color: "rgb(101, 101, 101)",
              marginTop: "6px",
            }}
          >
            Smarter intelligence. Exclusive benefits. Priority care.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — feature list */}
          <ul className="space-y-5">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-3 items-start">
                <Image src="/images/tick.png" width={22} height={22} alt="" className="shrink-0 mt-0.5" />
                <div>
                  {/* Title — Montserrat 600, 20px, 27px lh, rgb(69,69,69) */}
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 600,
                      fontSize: "20px",
                      lineHeight: "27px",
                      color: "rgb(69, 69, 69)",
                      display: "block",
                    }}
                  >
                    {f.title}
                  </span>
                  {/* Detail — Montserrat 500, 20px, 28px lh, rgb(69,69,69) */}
                  {f.detail && (
                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "28px",
                        color: "rgb(69, 69, 69)",
                        marginTop: "2px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {f.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Right — plan cards + CTA */}
          <div className="flex flex-col gap-3">

            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "rgb(37, 37, 37)",
                      }}
                    >
                      {plan.name}
                    </span>
                    {plan.badge && (
                      <span className="text-[10px] font-semibold bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "rgb(37, 37, 37)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {plan.price}
                  </span>
                </div>
                {plan.note && (
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 500,
                      fontSize: "13px",
                      color: "rgb(101, 101, 101)",
                      marginTop: "4px",
                    }}
                  >
                    {plan.note}
                  </p>
                )}
              </div>
            ))}

            {/* CTA */}
            <button
              className="mt-1 w-full text-white rounded-xl transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#E05C1A",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                padding: "14px",
              }}
            >
              Get free AI credits
            </button>

            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "rgb(101, 101, 101)",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Experience the platform with up to 50 AI credits at no cost.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}