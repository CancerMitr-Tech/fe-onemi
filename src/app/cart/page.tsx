"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const PLATFORM_FEE_PCT = 3;
const GST_PCT = 18;

type ProductConfig = {
  id: number;
  name: string;
  mrp: number;
  price: number;
  image: string;
  url: string;
};

// Static fallback config (used until API responds)
const PRODUCT_FALLBACK: Record<string, ProductConfig> = {
  mhr: {
    id: Number(process.env.NEXT_PUBLIC_MHR_PRODUCT_ID ?? "1"),
    name: "My Health Recharge Program",
    mrp: 40000,
    price: 25000,
    image: "/images/mhr/mhr-banner.webp",
    url: "/programs/my-health-recharge",
  },
  detox: {
    id: Number(process.env.NEXT_PUBLIC_DETOX_PRODUCT_ID ?? "2"),
    name: "My Metabolic Detox Program",
    mrp: 7000,
    price: 5000,
    image: "/images/mdp/mdp-banner.webp",
    url: "/programs/my-metabolic-detox",
  },
  mind: {
    id: Number(process.env.NEXT_PUBLIC_MIND_PRODUCT_ID ?? "3"),
    name: "My Mind Matters Program",
    mrp: 12000,
    price: 9000,
    image: "/images/mmm/MMM_Banner.webp",
    url: "/programs/my-mind-matters",
  },
};

function CartPageContent() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const searchParams = useSearchParams();

  const productKey = searchParams.get("product") ?? "mhr";
  const fallback = PRODUCT_FALLBACK[productKey] ?? PRODUCT_FALLBACK.mhr;

  const [items, setItems] = useState([fallback]);

  // Fetch real product data from digital-products API
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/digital-products/${productKey}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.status && data.data) {
          const p = data.data;
          setItems([{
            id: Number(p.id),
            name: p.name,
            mrp: Number(p.mrp),
            price: Number(p.price),
            image: fallback.image, // keep local image
            url: p.program_url ?? fallback.url,
          }]);
        }
      })
      .catch(() => {}); // keep fallback on error
  }, [productKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PCT) / 100;
  const estimatedTotal = subtotal + platformFee;
  const gstAmount = (subtotal * GST_PCT) / (100 + GST_PCT);

  async function handleCheckout() {
    setLoading(true);
    try {
      const item = items[0];
      const productSnapshot = {
        name: item?.name ?? fallback.name,
        mrp: item?.mrp ?? fallback.mrp,
        price: item?.price ?? fallback.price,
        image: item?.image ?? fallback.image,
      };
      // Digital product flow: store product key and skip cart/buy-now entirely.
      // Checkout page will call /digital-products/pay directly.
      localStorage.setItem("mhr_cart", JSON.stringify({
        cartType: "DIGITAL",
        digitalProductKey: productKey,
        product: productSnapshot,
      }));
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
            <p className="text-xl text-brand-muted mb-4">Your cart is empty.</p>
            <Link
              href={fallback.url}
              className="text-brand-orange font-semibold hover:underline"
            >
              ← Back to {fallback.name}
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
            {/* ── Product table ── */}
            <div>
              <div className="grid grid-cols-[1fr_auto] border-b border-gray-200 pb-3 mb-6">
                <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Product
                </span>
                <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  Total
                </span>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] gap-4 pb-6 border-b border-gray-100"
                >
                  <div className="flex gap-4">
                    <Link
                      href={item.url}
                      className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-gray-100 block hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link
                        href={item.url}
                        className="font-semibold text-brand-dark text-sm leading-snug hover:text-brand-orange transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm mt-1.5">
                        <span className="line-through text-[#9CA3AF] mr-2">
                          ₹{item.mrp.toLocaleString("en-IN")}.00
                        </span>
                        <span className="text-brand-dark font-semibold">
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
                  <div className="text-sm font-semibold text-brand-dark whitespace-nowrap self-center">
                    ₹{item.price.toLocaleString("en-IN")}.00
                  </div>
                </div>
              ))}
            </div>

            {/* ── Cart totals ── */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wide mb-5">
                Cart Totals
              </h3>

              <div className="border border-gray-200 rounded-lg mb-5 overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-sm text-brand-dark bg-white"
                  onClick={() => setCouponOpen((v) => !v)}
                >
                  <span>Add coupons</span>
                  <svg
                    className={`w-4 h-4 text-brand-muted transition-transform ${couponOpen ? "rotate-180" : ""}`}
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
                      className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-orange"
                    />
                    <button className="bg-brand-orange text-white px-4 py-2 rounded text-sm font-semibold hover:bg-brand-orange-hover transition-colors">
                      Apply
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Subtotal</span>
                  <span className="font-semibold text-brand-dark">
                    ₹{subtotal.toLocaleString("en-IN")}.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Platform Fees {PLATFORM_FEE_PCT}%</span>
                  <span className="font-semibold text-brand-dark">
                    ₹{platformFee.toLocaleString("en-IN")}.00
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-brand-dark text-base">
                    <span>Estimated total</span>
                    <span>₹{estimatedTotal.toLocaleString("en-IN")}.00</span>
                  </div>
                  <p className="text-xs text-brand-muted mt-1">
                    Including ₹{gstAmount.toFixed(2)} GST({GST_PCT}%)
                  </p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-6 w-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white font-bold py-4 rounded-lg transition-colors text-sm"
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

export default function CartPage() {
  return (
    <Suspense>
      <CartPageContent />
    </Suspense>
  );
}