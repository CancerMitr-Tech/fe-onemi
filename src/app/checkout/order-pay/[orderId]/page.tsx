"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderData = {
  orderNumber: string;
  razorpayOrderId: string | null;
  amount: number;
  total: number;
  email: string;
  token: string | null;
  paymentId: string | null;
  razorpayKey: string | null;
  isDigital?: boolean;
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
    const parsed: OrderData = JSON.parse(stored);
    setOrder(parsed);
    // Auto-open Razorpay if we have a real order
    const hasKey = parsed.razorpayKey ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (parsed.razorpayOrderId && hasKey) {
      launchRazorpay(parsed);
    }
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  type RazorpayWindow = Window & {
    Razorpay: new (opts: unknown) => { open(): void };
  };

  function initRzpModal(o: OrderData) {
    const key = o.razorpayKey ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      alert("Payment configuration missing. Please contact support.");
      setPaying(false);
      return;
    }
    const rzp = new (window as unknown as RazorpayWindow).Razorpay({
      key,
      amount: o.amount,
      currency: "INR",
      name: "OneMi",
      description: "Health Program",
      order_id: o.razorpayOrderId,
      prefill: { email: o.email },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        if (o.token) {
          try {
            const verifyEndpoint = o.isDigital
              ? `${process.env.NEXT_PUBLIC_API_BASE}/digital-products/verify`
              : `${process.env.NEXT_PUBLIC_API_BASE}/payment/verify`;
            const verifyRes = await fetch(verifyEndpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": o.token,
              },
              body: JSON.stringify({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                paymentId: o.paymentId,
              }),
            });
            if (!verifyRes.ok) {
              const errData = await verifyRes.json().catch(() => ({}));
              console.error("Payment verify failed:", errData);
            }
          } catch (err) {
            console.error("Payment verify network error:", err);
          }
        }
        // Read program name before clearing storage
        let programName = "";
        try {
          const cartStr = localStorage.getItem("mhr_cart");
          if (cartStr) programName = JSON.parse(cartStr)?.product?.name ?? "";
        } catch { /* ignore */ }
        localStorage.removeItem("mhr_cart");
        localStorage.removeItem("mhr_order");
        const successUrl = programName
          ? `/checkout/success?program=${encodeURIComponent(programName)}`
          : "/checkout/success";
        router.push(successUrl);
      },
      modal: { ondismiss: () => setPaying(false) },
      theme: { color: "#E85D04" },
    });
    rzp.open();
  }

  function launchRazorpay(o: OrderData) {
    setPaying(true);
    // If SDK already loaded (cached), open directly — don't wait for onload
    if ((window as unknown as RazorpayWindow).Razorpay) {
      initRzpModal(o);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => initRzpModal(o);
    script.onerror = () => setPaying(false);
    document.body.appendChild(script);
  }

  function openRazorpay(o: OrderData) {
    launchRazorpay(o);
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-x-16 gap-y-4 mb-10 border-b border-gray-200 pb-10">
          <div>
            <p className="text-sm text-brand-muted">Order number:</p>
            <p className="text-base font-bold text-brand-dark">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-sm text-brand-muted">Date:</p>
            <p className="text-base font-bold text-brand-dark">{today}</p>
          </div>
          <div>
            <p className="text-sm text-brand-muted">Total:</p>
            <p className="text-base font-bold text-brand-dark">
              ₹{order.total.toLocaleString("en-IN")}.00
            </p>
          </div>
          <div>
            <p className="text-sm text-brand-muted">Payment method:</p>
            <p className="text-base font-bold text-brand-dark">UPI, Cards, NetBanking</p>
          </div>
        </div>

        <p className="text-sm text-brand-muted mb-6">
          Thank you for your order, please click the button below to pay with Razorpay.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => openRazorpay(order)}
            disabled={paying}
            className="bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            {paying ? "Opening..." : "Pay Now"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("mhr_order");
              router.push("/cart");
            }}
            className="border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}