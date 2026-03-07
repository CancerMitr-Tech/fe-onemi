"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const DEFAULT_PRODUCT = {
  name: "My Health Recharge Program",
  mrp: 40000,
  price: 25000,
  image: "/images/mhr/mhr-banner.webp",
};

const PLATFORM_FEE_PCT = 3;
const GST_PCT = 18;

type CartProduct = { name: string; mrp: number; price: number; image: string };

type Address = {
  address_id?: number;
  name: string;
  mobile_no: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [product, setProduct] = useState<CartProduct>(DEFAULT_PRODUCT);
  const [digitalProductKey, setDigitalProductKey] = useState<string | null>(null);
  const [profileName, setProfileName] = useState("");
  const [profileMobile, setProfileMobile] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile_no: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = product.price;
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PCT) / 100;
  const total = subtotal + platformFee;
  const gstAmount = (subtotal * GST_PCT) / (100 + GST_PCT);

  useEffect(() => {
    const resolvedToken = token ?? localStorage.getItem("auth_token");

    // Read cart from localStorage
    let cartData: Record<string, unknown> = {};
    try {
      const stored = localStorage.getItem("mhr_cart");
      if (!stored) { router.replace("/cart"); return; }
      cartData = JSON.parse(stored);
    } catch {
      router.replace("/cart");
      return;
    }

    // Extract product snapshot
    if (cartData.product) {
      const p = cartData.product as Record<string, unknown>;
      setProduct({
        name: String(p.name || DEFAULT_PRODUCT.name),
        mrp: Number(p.mrp) || DEFAULT_PRODUCT.mrp,
        price: Number(p.price) || DEFAULT_PRODUCT.price,
        image: String(p.image || DEFAULT_PRODUCT.image),
      });
    }

    // Store digital product key for checkout
    if (cartData.cartType === "DIGITAL" && cartData.digitalProductKey) {
      setDigitalProductKey(String(cartData.digitalProductKey));
    }

    setReady(true);

    // Always fetch profile when logged in
    if (resolvedToken) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profile/getPersonalDetails`, {
        headers: { "auth-token": resolvedToken },
      })
        .then((r) => r.json())
        .then((data) => {
          const u = data?.data?.user;
          if (!u) return;
          if (u.email) setEmail(u.email);
          const fullName = [u.first_name, u.last_name].filter(Boolean).join(" ");
          const mobile = u.mobile_no ? String(u.mobile_no) : "";
          if (fullName) setProfileName(fullName);
          if (mobile) setProfileMobile(mobile);
          setForm((prev) => ({
            ...prev,
            name: prev.name || fullName,
            mobile_no: prev.mobile_no || mobile,
          }));

          // Use profile address if present
          const addr = data?.data?.address;
          if (addr?.address_line1) {
            setSelectedAddress({
              name: addr.name || fullName,
              mobile_no: addr.mobile_no || mobile,
              address_line1: addr.address_line1,
              address_line2: addr.address_line2 || "",
              city: addr.city || "",
              state: addr.state || "",
              pincode: addr.pincode || "",
              address_id: addr.address_id,
            });
          } else {
            setShowAddressForm(true);
          }
        })
        .catch(() => setShowAddressForm(true));
    } else {
      setShowAddressForm(true);
    }
  }, [token, router]);

  async function handlePlaceOrder() {
    if (!email.trim()) { setError("Please enter your email address."); return; }
    setError("");
    setPlacing(true);

    const resolvedToken = token ?? localStorage.getItem("auth_token");

    try {
      if (!resolvedToken) {
        setError("Please log in to complete your purchase.");
        return;
      }

      // For digital products, address is optional (no physical delivery).
      // Use saved address_id if one was loaded; otherwise proceed without one.
      const savedAddressId = (selectedAddress as Address & { address_id?: number })?.address_id;

      // 2. Create Razorpay order via digital-products/pay
      const payRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/digital-products/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": resolvedToken },
        body: JSON.stringify({
          key: digitalProductKey,
          addressId: savedAddressId ?? undefined,
        }),
      });
      const payData = await payRes.json();

      if (!payData?.data?.razorpayOrderId) {
        setError("Payment initiation failed. Please try again.");
        return;
      }

      // 3. Store order info and navigate to payment page
      const orderNum = payData.data.soNumber;
      localStorage.setItem("mhr_order", JSON.stringify({
        orderNumber: orderNum,
        razorpayOrderId: payData.data.razorpayOrderId,
        amount: payData.data.amount,
        total,
        email,
        token: resolvedToken,
        paymentId: payData.data.paymentId,
        razorpayKey: payData.data.razorpayKey,
        isDigital: true,
      }));

      localStorage.removeItem("mhr_cart");
      router.push(`/checkout/order-pay/${orderNum}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── Left: checkout form ── */}
          <div className="space-y-8">
            <div>
              <h2 className="text-base font-bold text-brand-dark mb-4">Contact information</h2>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange text-brand-dark"
              />
            </div>

            <div>
              <h2 className="text-base font-bold text-brand-dark mb-1">
                Billing address
              </h2>
              <p className="text-sm text-brand-muted mb-4">
                Enter the billing address that matches your payment method.
              </p>

              {selectedAddress && !showAddressForm && (
                <div className="border border-gray-200 rounded-lg px-4 py-4 flex justify-between items-start">
                  <div className="text-sm text-brand-dark">
                    <p className="font-semibold">{selectedAddress.name}</p>
                    <p className="text-brand-muted mt-0.5">
                      {selectedAddress.address_line1}
                      {selectedAddress.address_line2 && `, ${selectedAddress.address_line2}`},{" "}
                      {selectedAddress.city} {selectedAddress.pincode},{" "}
                      {selectedAddress.state}, India
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setForm({
                        name: selectedAddress.name || profileName,
                        mobile_no: selectedAddress.mobile_no || profileMobile,
                        address_line1: selectedAddress.address_line1 || "",
                        address_line2: selectedAddress.address_line2 || "",
                        city: selectedAddress.city || "",
                        state: selectedAddress.state || "",
                        pincode: selectedAddress.pincode || "",
                      });
                      setShowAddressForm(true);
                    }}
                    className="text-sm text-brand-orange font-semibold hover:underline ml-4"
                  >
                    Edit
                  </button>
                </div>
              )}

              {showAddressForm && (
                <div className="space-y-3">
                  {selectedAddress && (
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="text-sm text-brand-muted hover:text-brand-orange transition-colors mb-1"
                    >
                      ← Use saved address
                    </button>
                  )}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                    />
                    <input
                      placeholder="Mobile number"
                      value={form.mobile_no}
                      onChange={(e) => setForm({ ...form, mobile_no: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <input
                    placeholder="Address line 1"
                    value={form.address_line1}
                    onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                  />
                  <input
                    placeholder="Address line 2 (optional)"
                    value={form.address_line2}
                    onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                  />
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                    />
                    <input
                      placeholder="State"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                    />
                    <input
                      placeholder="Pincode"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-base font-bold text-brand-dark mb-3">Payment options</h2>
              <div className="border border-gray-300 rounded-lg px-4 py-4">
                <div className="flex items-center gap-3 mb-1">
                  <input
                    type="radio"
                    id="razorpay"
                    name="payment"
                    defaultChecked
                    className="accent-brand-orange"
                  />
                  <label htmlFor="razorpay" className="text-sm font-semibold text-brand-dark">
                    Pay by Razorpay
                  </label>
                </div>
                <p className="text-xs text-brand-muted ml-6">
                  Pay securely via UPI, Credit/Debit Card, or Internet Banking through Razorpay.
                </p>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addNote}
                  onChange={(e) => setAddNote(e.target.checked)}
                  className="accent-brand-orange"
                />
                <span className="text-sm text-brand-dark">Add a note to your order</span>
              </label>
              {addNote && (
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Notes about your order."
                  rows={3}
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                />
              )}
            </div>

            <p className="text-xs text-brand-muted">
              By proceeding with your purchase you agree to our{" "}
              <a href="#" className="text-brand-orange hover:underline">Terms and Conditions</a>{" "}
              and{" "}
              <a href="#" className="text-brand-orange hover:underline">Privacy Policy</a>
            </p>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
            )}

            <div className="flex items-center justify-between gap-4">
              <Link
                href="/cart"
                className="flex items-center gap-1 text-sm text-brand-dark hover:text-brand-orange transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Cart
              </Link>
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white font-bold px-8 py-3 rounded-lg transition-colors text-sm"
              >
                {placing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>

          {/* ── Right: order summary ── */}
          <div className="bg-[#F9FAFB] rounded-2xl p-6 sticky top-24">
            <h3 className="text-sm font-bold text-brand-dark mb-5">Order summary</h3>

            <div className="flex gap-3 mb-5">
              <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden border border-gray-100">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="w-full h-full bg-orange-50 flex items-center justify-center">
                    <span className="text-brand-orange text-lg font-bold">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-muted text-white text-xs rounded-full flex items-center justify-center font-bold">
                  1
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-dark leading-snug">
                  {product.name}
                </p>
                <p className="text-sm mt-0.5">
                  <span className="line-through text-[#9CA3AF] mr-1.5">
                    ₹{product.mrp.toLocaleString("en-IN")}.00
                  </span>
                  <span className="font-bold text-brand-dark">
                    ₹{product.price.toLocaleString("en-IN")}.00
                  </span>
                </p>
              </div>
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
                <div className="flex justify-between font-bold text-brand-dark">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}.00</span>
                </div>
                <p className="text-xs text-brand-muted mt-1">
                  Including ₹{gstAmount.toFixed(2)} GST({GST_PCT}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}