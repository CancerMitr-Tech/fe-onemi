"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:5000";

type OrderData = {
  orderNumber: string;
  razorpayOrderId: string | null;
  amount: number;
  total: number;
  email: string;
  token: string | null;
};

export default function OrderPayPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [paying, setPaying] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    const stored = localStorage.getItem("mhr_order");
    if (!stored) {
      router.replace("/cart");
      return;
    }
    setOrder(JSON.parse(stored));
  }, [router]);

  function openRazorpay(o: OrderData) {
    setPaying(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const rzp = new (
        window as unknown as {
          Razorpay: new (opts: unknown) => { open(): void };
        }
      ).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: o.amount,
        currency: "INR",
        name: "OneMi",
        description: "My Health Recharge Program",
        order_id: o.razorpayOrderId,
        prefill: { email: o.email },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          if (o.token) {
            await fetch(`${API_BASE}/v1/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${o.token}`,
              },
              body: JSON.stringify(response),
            });
          }
          localStorage.removeItem("mhr_cart");
          localStorage.removeItem("mhr_order");
          router.push("/checkout/success");
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
        theme: { color: "#E85D04" },
      });
      rzp.open();
    };
    script.onerror = () => setPaying(false);
    document.body.appendChild(script);
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Order details grid */}
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-4 mb-10 border-b border-gray-200 pb-10">
          <div>
            <p className="text-sm text-[#6B7280]">Order number:</p>
            <p className="text-base font-bold text-[#1A1A2E]">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-sm text-[#6B7280]">Date:</p>
            <p className="text-base font-bold text-[#1A1A2E]">{today}</p>
          </div>
          <div>
            <p className="text-sm text-[#6B7280]">Total:</p>
            <p className="text-base font-bold text-[#1A1A2E]">
              ₹{order.total.toLocaleString("en-IN")}.00
            </p>
          </div>
          <div>
            <p className="text-sm text-[#6B7280]">Payment method:</p>
            <p className="text-base font-bold text-[#1A1A2E]">UPI, Cards, NetBanking</p>
          </div>
        </div>

        {/* CTA */}
        <p className="text-sm text-[#6B7280] mb-6">
          Thank you for your order, please click the button below to pay with Razorpay.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => openRazorpay(order)}
            disabled={paying}
            className="bg-[#E85D04] hover:bg-[#C94E03] disabled:opacity-60 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            {paying ? "Opening..." : "Pay Now"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("mhr_order");
              router.push("/cart");
            }}
            className="border border-[#E85D04] text-[#E85D04] hover:bg-[#E85D04] hover:text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
