"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MHR_PRODUCT_URL = "/product/my-health-recharge-program";
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:5000";

// MHR product — update MHR_PRODUCT_ID to match the backend product ID
const MHR_PRODUCT_ID = 3420;
const MHR_PRODUCT = {
  id: MHR_PRODUCT_ID,
  name: "My Health Recharge Program",
  mrp: 40000,
  price: 25000,
  image: "/images/mhr/mhr-banner.webp",
};

const PLATFORM_FEE_PCT = 3;
const GST_PCT = 18;

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState([MHR_PRODUCT]);
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PCT) / 100;
  const estimatedTotal = subtotal + platformFee;
  // GST is inclusive in price: gst = price × rate / (1 + rate)
  const gstAmount = (subtotal * GST_PCT) / (100 + GST_PCT);

  async function handleCheckout() {
    setLoading(true);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

      if (token) {
        // Add to cart via backend buy-now API
        const res = await fetch(`${API_BASE}/v1/cart/buy-now`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: MHR_PRODUCT_ID, quantity: 1 }),
        });
        const data = await res.json();
        if (data?.data?.cartId) {
          localStorage.setItem(
            "mhr_cart",
            JSON.stringify({ cartId: data.data.cartId, cartType: "BUY_NOW" })
          );
        }
      } else {
        // No auth — store cart locally so checkout page knows the product
        localStorage.setItem(
          "mhr_cart",
          JSON.stringify({ cartId: null, cartType: "BUY_NOW", local: true })
        );
      }
    } catch {
      // On error still proceed to checkout with local data
      localStorage.setItem(
        "mhr_cart",
        JSON.stringify({ cartId: null, cartType: "BUY_NOW", local: true })
      );
    } finally {
      setLoading(false);
      router.push("/checkout");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-[#6B7280] mb-4">Your cart is empty.</p>
            <Link
              href="/programs/my-health-recharge"
              className="text-[#E85D04] font-semibold hover:underline"
            >
              ← Back to My Health Recharge
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
            {/* ── Left: product table ── */}
            <div>
              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto] border-b border-gray-200 pb-3 mb-6">
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Product
                </span>
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Total
                </span>
              </div>

              {/* Product row */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] gap-4 pb-6 border-b border-gray-100"
                >
                  <div className="flex gap-4">
                    <Link href={MHR_PRODUCT_URL} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 block hover:opacity-90 transition-opacity">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link href={MHR_PRODUCT_URL} className="font-semibold text-[#1A1A2E] text-sm leading-snug hover:text-[#E85D04] transition-colors">
                        {item.name}
                      </Link>
                      <p className="text-sm mt-1.5">
                        <span className="line-through text-[#9CA3AF] mr-2">
                          ₹{item.mrp.toLocaleString("en-IN")}.00
                        </span>
                        <span className="text-[#1A1A2E] font-semibold">
                          ₹{item.price.toLocaleString("en-IN")}.00
                        </span>
                      </p>
                      <button
                        onClick={() => setItems([])}
                        className="mt-2 self-start text-xs text-red-500 hover:underline"
                      >
                        Remove item
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-[#1A1A2E] whitespace-nowrap self-center">
                    ₹{item.price.toLocaleString("en-IN")}.00
                  </div>
                </div>
              ))}
            </div>

            {/* ── Right: cart totals ── */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-[#1A1A2E] uppercase tracking-wide mb-5">
                Cart Totals
              </h3>

              {/* Add coupons */}
              <div className="border border-gray-200 rounded-lg mb-5 overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-sm text-[#1A1A2E] bg-white"
                  onClick={() => setCouponOpen((v) => !v)}
                >
                  <span>Add coupons</span>
                  <svg
                    className={`w-4 h-4 text-[#6B7280] transition-transform ${couponOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {couponOpen && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex gap-2">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#E85D04]"
                    />
                    <button className="bg-[#E85D04] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#C94E03] transition-colors">
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Pricing rows */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Subtotal</span>
                  <span className="font-semibold text-[#1A1A2E]">
                    ₹{subtotal.toLocaleString("en-IN")}.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Platform Fees {PLATFORM_FEE_PCT}%</span>
                  <span className="font-semibold text-[#1A1A2E]">
                    ₹{platformFee.toLocaleString("en-IN")}.00
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-[#1A1A2E] text-base">
                    <span>Estimated total</span>
                    <span>₹{estimatedTotal.toLocaleString("en-IN")}.00</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Including ₹{gstAmount.toFixed(2)} GST({GST_PCT}%)
                  </p>
                </div>
              </div>

              {/* Proceed to Checkout */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-6 w-full bg-[#E85D04] hover:bg-[#C94E03] disabled:opacity-60 text-white font-bold py-4 rounded-lg transition-colors text-sm"
              >
                {loading ? "Please wait..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
