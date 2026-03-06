"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const MRP = 40000;
const PRICE = 25000;
const DISCOUNT = Math.round(((MRP - PRICE) / MRP) * 100);

export default function MHRProductPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* ── Left: product image — no border-radius, natural dimensions ── */}
          <div className="w-full lg:w-[440px] flex-shrink-0">
            <Image
              src="/images/mhr/MHR.webp"
              alt="My Health Recharge Program"
              width={440}
              height={470}
              className="w-full object-cover"
              priority
            />
          </div>

          {/* ── Right: product info ── */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Title */}
            <h1 className="text-[22px] font-normal text-[#1A1A2E] leading-snug">
              My Health Recharge Program
            </h1>

            {/* Discount badge */}
            <div>
              <span
                className="inline-block text-white text-xs font-semibold px-2.5 py-1 rounded"
                style={{ backgroundColor: "#E85D04" }}
              >
                -{DISCOUNT}%
              </span>
            </div>

            {/* Prices — same line, strikethrough then sale */}
            <div className="flex items-baseline gap-3 text-base text-[#1A1A2E]">
              <span className="line-through text-[#9CA3AF]">
                ₹{MRP.toLocaleString("en-IN")}.00
              </span>
              <span className="font-normal">
                ₹{PRICE.toLocaleString("en-IN")}.00
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#3D3D3D] leading-relaxed">
              <strong>Restore your Health in 90 days</strong>{" "}
              Initiate | Maintain | Sustain My Health Recharge is a restorative health
              management program designed for metabolic health, cancer care and chronic
              lifestyle diseases.
            </p>

            {/* Add to Cart */}
            <div className="mt-2">
              <button
                onClick={() => router.push("/cart")}
                className="bg-[#E85D04] hover:bg-[#C94E03] text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm"
              >
                Add Program to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
