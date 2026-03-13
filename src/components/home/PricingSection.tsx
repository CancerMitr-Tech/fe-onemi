"use client";

import Image from "next/image";

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
    /*
      Split background: top half #EFEFEF (membership bg), bottom half #E5EDEE (trust bg).
      Card appears to float across both section backgrounds.
    */
    <section
      id="onemipro"
      style={{
        background: "linear-gradient(to bottom, #EFEFEF 70%, #E5EDEE 30%)",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
       <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">

        {/* Floating white card with border */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            border: "2px solid #9CA3AF",
            padding: "48px 64px",
            boxShadow: "0 2px 16px 0 rgba(0,0,0,0.06)",
          }}
        >
          {/* ── Heading ── */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            {/* Manrope 600, 36px, 54px lh, rgb(37,37,37) */}
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: "36px",
                lineHeight: "54px",
                color: "rgb(37,37,37)",
                margin: 0,
              }}
            >
              One<span style={{ color: "#EA5A1A" }}>Mi</span> Pro
            </h2>
            {/* Montserrat 500, 20px, 30px lh, rgb(101,101,101) */}
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "30px",
                color: "rgb(101,101,101)",
                marginTop: "6px",
                marginBottom: 0,
              }}
            >
              Smarter intelligence. Exclusive benefits. Priority care.
            </p>
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — feature list */}
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
              {FEATURES.map((f) => (
                <li key={f.title} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <Image
                    src="/images/tick.png"
                    width={22}
                    height={22}
                    alt=""
                    style={{ flexShrink: 0, marginTop: "3px" }}
                  />
                  <div>
                    {/* Feature title: Montserrat 600, 20px, 27px lh, rgb(69,69,69) */}
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                        fontSize: "20px",
                        lineHeight: "27px",
                        color: "rgb(69,69,69)",
                        display: "block",
                      }}
                    >
                      {f.title}
                    </span>
                    {/* Feature detail: Montserrat 500, 16px, 26px lh, rgb(69,69,69) */}
                    {f.detail && (
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "26px",
                          color: "rgb(69,69,69)",
                          marginTop: "2px",
                          marginBottom: 0,
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
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    padding: "14px 20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {/* Plan name: Montserrat 500, 16px, 26px lh, rgb(69,69,69) */}
                      <span
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "26px",
                          color: "rgb(69,69,69)",
                        }}
                      >
                        {plan.name}
                      </span>
                      {plan.badge && (
                        <span
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600,
                            fontSize: "11px",
                            backgroundColor: "#FDE68A",
                            color: "#92400E",
                            padding: "2px 8px",
                            borderRadius: "999px",
                          }}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    {/* Price: Montserrat 500, 16px, rgb(69,69,69) */}
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "rgb(69,69,69)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {plan.price}
                    </span>
                  </div>
                  {/* Note: Montserrat 500, 20px, 30px lh, rgb(101,101,101) */}
                  {plan.note && (
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "30px",
                        color: "rgb(101,101,101)",
                        marginTop: "4px",
                        marginBottom: 0,
                      }}
                    >
                      {plan.note}
                    </p>
                  )}
                </div>
              ))}

              {/* CTA button */}
              <button
                style={{
                  marginTop: "4px",
                  width: "100%",
                  backgroundColor: "#EA5A1A",
                  color: "#fff",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "24px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Get free AI credits
              </button>

              {/* Fine print: Montserrat 400, 16px, 28px lh, rgb(10,19,35) */}
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "28px",
                  color: "rgb(10,19,35)",
                  textAlign: "center",
                  fontStyle: "italic",
                  marginTop: "4px",
                  marginBottom: 0,
                }}
              >
                Experience the platform with up to 50 AI credits at no cost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}