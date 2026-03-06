"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:5000";

const MHR_PRODUCT = {
  name: "My Health Recharge Program",
  mrp: 40000,
  price: 25000,
  image: "/images/mhr/mhr-banner.webp",
};

const PLATFORM_FEE_PCT = 3;
const GST_PCT = 18;

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

type CheckoutData = {
  cartId: string | null;
  cartType: string;
  savedAddresses: Address[];
  profileAddress: Address | null;
};

export default function CheckoutPage() {
  const router = useRouter();

  // Cart state
  const [cartData, setCartData] = useState<CheckoutData | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  // Address form state
  const [form, setForm] = useState({
    name: "",
    mobile_no: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = MHR_PRODUCT.price;
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PCT) / 100;
  const total = subtotal + platformFee;
  const gstAmount = (subtotal * GST_PCT) / (100 + GST_PCT);

  // Load cart and checkout data on mount
  useEffect(() => {
    const stored = localStorage.getItem("mhr_cart");
    if (!stored) {
      router.replace("/cart");
      return;
    }
    const parsed: CheckoutData = JSON.parse(stored);
    setCartData(parsed);

    const token = localStorage.getItem("auth_token");
    if (token && parsed.cartId) {
      // Fetch checkout init data from backend
      fetch(
        `${API_BASE}/v1/cart/checkout/init?cartId=${parsed.cartId}&cartType=${parsed.cartType}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((r) => r.json())
        .then((data) => {
          if (data?.data) {
            const addresses: Address[] = [
              ...(data.data.profileAddress ? [data.data.profileAddress] : []),
              ...(data.data.savedAddresses || []),
            ];
            if (addresses.length > 0) setSelectedAddress(addresses[0]);
            else setShowAddressForm(true);
          }
        })
        .catch(() => setShowAddressForm(true));
    } else {
      setShowAddressForm(true);
    }
  }, [router]);

  async function handlePlaceOrder() {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!selectedAddress && !form.name) {
      setError("Please enter a delivery address.");
      return;
    }
    setError("");
    setPlacing(true);

    try {
      const token = localStorage.getItem("auth_token");
      if (!token || !cartData?.cartId) {
        // No auth / local flow — navigate to order-pay with static data
        const fakeOrderNum = Math.floor(Math.random() * 9000 + 1000).toString();
        localStorage.setItem(
          "mhr_order",
          JSON.stringify({
            orderNumber: fakeOrderNum,
            razorpayOrderId: null,
            amount: total * 100,
            total,
            email,
            token: null,
          })
        );
        router.push(`/checkout/order-pay/${fakeOrderNum}`);
        return;
      }

      // 1. Save address if using form
      let addressId: number | undefined = (selectedAddress as Address & { address_id?: number })?.address_id;
      if (!addressId && form.name) {
        const addrRes = await fetch(`${API_BASE}/v1/cart/address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...form, is_primary: 1 }),
        });
        const addrData = await addrRes.json();
        addressId = addrData?.data?.address_id;
      }

      if (!addressId) {
        setError("Could not save address. Please try again.");
        return;
      }

      // 2. Create Razorpay order via backend
      const payRes = await fetch(`${API_BASE}/v1/payment/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartId: cartData.cartId,
          addressId: String(addressId),
          shippingCharge: 0,
          cartType: cartData.cartType,
        }),
      });
      const payData = await payRes.json();

      if (!payData?.data?.razorpayOrderId) {
        setError("Payment initiation failed. Please try again.");
        return;
      }

      // 3. Store order data and navigate to order-pay page
      const orderNum = payData.data.soNumber || payData.data.orderId || "—";
      localStorage.setItem(
        "mhr_order",
        JSON.stringify({
          orderNumber: orderNum,
          razorpayOrderId: payData.data.razorpayOrderId,
          amount: payData.data.amount,
          total: total,
          email,
          token,
        })
      );
      router.push(`/checkout/order-pay/${orderNum}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── Left: checkout form ── */}
          <div className="space-y-8">

            {/* Contact information */}
            <div>
              <h2 className="text-base font-bold text-[#1A1A2E] mb-4">Contact information</h2>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04] text-[#1A1A2E]"
              />
            </div>

            {/* Billing and shipping address */}
            <div>
              <h2 className="text-base font-bold text-[#1A1A2E] mb-1">Billing and shipping address</h2>
              <p className="text-sm text-[#6B7280] mb-4">
                Enter the billing and shipping address that matches your payment method.
              </p>

              {/* Show saved address */}
              {selectedAddress && !showAddressForm && (
                <div className="border border-gray-200 rounded-lg px-4 py-4 flex justify-between items-start">
                  <div className="text-sm text-[#1A1A2E]">
                    <p className="font-semibold">{selectedAddress.name}</p>
                    <p className="text-[#6B7280] mt-0.5">
                      {selectedAddress.address_line1}
                      {selectedAddress.address_line2 && `, ${selectedAddress.address_line2}`},{" "}
                      {selectedAddress.city} {selectedAddress.pincode},{" "}
                      {selectedAddress.state}, India
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-sm text-[#E85D04] font-semibold hover:underline ml-4"
                  >
                    Edit
                  </button>
                </div>
              )}

              {/* Address form */}
              {showAddressForm && (
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04]"
                    />
                    <input
                      placeholder="Mobile number"
                      value={form.mobile_no}
                      onChange={(e) => setForm({ ...form, mobile_no: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04]"
                    />
                  </div>
                  <input
                    placeholder="Address line 1"
                    value={form.address_line1}
                    onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04]"
                  />
                  <input
                    placeholder="Address line 2 (optional)"
                    value={form.address_line2}
                    onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04]"
                  />
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04]"
                    />
                    <input
                      placeholder="State"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04]"
                    />
                    <input
                      placeholder="Pincode"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment options */}
            <div>
              <h2 className="text-base font-bold text-[#1A1A2E] mb-3">Payment options</h2>
              <div className="border border-gray-300 rounded-lg px-4 py-4">
                <div className="flex items-center gap-3 mb-1">
                  <input
                    type="radio"
                    id="razorpay"
                    name="payment"
                    defaultChecked
                    className="accent-[#E85D04]"
                  />
                  <label htmlFor="razorpay" className="text-sm font-semibold text-[#1A1A2E]">
                    Pay by Razorpay
                  </label>
                </div>
                <p className="text-xs text-[#6B7280] ml-6">
                  Pay securely via UPI, Credit/Debit Card, or Internet Banking through Razorpay.
                </p>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addNote}
                  onChange={(e) => setAddNote(e.target.checked)}
                  className="accent-[#E85D04]"
                />
                <span className="text-sm text-[#1A1A2E]">Add a note to your order</span>
              </label>
              {addNote && (
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  rows={3}
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E85D04]"
                />
              )}
            </div>

            {/* Terms */}
            <p className="text-xs text-[#6B7280]">
              By proceeding with your purchase you agree to our{" "}
              <a href="#" className="text-[#E85D04] hover:underline">Terms and Conditions</a>{" "}
              and{" "}
              <a href="#" className="text-[#E85D04] hover:underline">Privacy Policy</a>
            </p>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/cart"
                className="flex items-center gap-1 text-sm text-[#1A1A2E] hover:text-[#E85D04] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Cart
              </Link>
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="bg-[#E85D04] hover:bg-[#C94E03] disabled:opacity-60 text-white font-bold px-8 py-3 rounded-lg transition-colors text-sm"
              >
                {placing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>

          {/* ── Right: order summary ── */}
          <div className="bg-[#F9FAFB] rounded-2xl p-6 sticky top-24">
            <h3 className="text-sm font-bold text-[#1A1A2E] mb-5">Order summary</h3>

            {/* Product */}
            <div className="flex gap-3 mb-5">
              <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
                <Image
                  src={MHR_PRODUCT.image}
                  alt={MHR_PRODUCT.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6B7280] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  1
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A2E] leading-snug">
                  {MHR_PRODUCT.name}
                </p>
                <p className="text-sm mt-0.5">
                  <span className="line-through text-[#9CA3AF] mr-1.5">
                    ₹{MHR_PRODUCT.mrp.toLocaleString("en-IN")}.00
                  </span>
                  <span className="font-bold text-[#1A1A2E]">
                    ₹{MHR_PRODUCT.price.toLocaleString("en-IN")}.00
                  </span>
                </p>
              </div>
            </div>

            {/* Add coupons */}
            <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden bg-white">
              <button className="w-full flex justify-between items-center px-4 py-3 text-sm text-[#1A1A2E]">
                <span>Add coupons</span>
                <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Pricing */}
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
                <div className="flex justify-between font-bold text-[#1A1A2E]">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}.00</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-1">
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
