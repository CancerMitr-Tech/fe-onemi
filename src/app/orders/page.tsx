"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Image from "next/image";

type TrackingStep = {
  step: number;
  label: string;
  completed: boolean;
  active: boolean;
};

type OrderItem = {
  product_id: string;
  product_name: string;
  quantity: number;
  category: string;
  tracking: TrackingStep[];
  delivery_info: string | null;
  base_price: number;
  mrp: number;
  total: number;
  image: string | null;
};

type Order = {
  order_id: string;
  so_number: string;
  order_date: string;
  total_amount: number;
  item_count: number;
  items: OrderItem[];
  pricing: {
    subtotal: number;
    total_amount: number;
    platform_fee: number;
    total_tax: number;
  };
  order_category: string;
  is_digital?: boolean;
  digital_product?: {
    id: number;
    name: string;
    mrp: number;
    price: number;
    program_url: string | null;
  };
};

const STATUS_LABEL: Record<string, string> = {
  ORDER_PLACED: "Order Placed",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const STATUS_COLOR: Record<string, string> = {
  ORDER_PLACED: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-yellow-100 text-yellow-700",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const reduxToken = useSelector((state: RootState) => state.auth.token);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Prefer Redux token; fall back to localStorage in case Redux hasn't hydrated yet
    const token = reduxToken ?? (typeof window !== "undefined" ? localStorage.getItem("auth_token") : null);
    if (!token) {
      setError("Please log in to view your orders.");
      setLoading(false);
      return;
    }
    // Fetch both physical and digital orders in parallel
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/digital-products/my-orders`, {
        headers: { "auth-token": token },
      }).then((r) => r.json()).catch(() => ({ status: false })),
    ])
      .then(([digitalData]) => {
        const digitalOrders: Order[] = (digitalData?.data?.orders ?? []).map(
          (o: {
            order_id: string; so_number: string; order_date: string;
            total_amount: number; status: string; is_digital: boolean;
            product: { id: number; name: string; mrp: number; price: number; program_url: string | null };
            pricing: { subtotal: number; platform_fee: number; total_amount: number; total_tax: number };
          }) => ({
            order_id: o.order_id,
            so_number: o.so_number,
            order_date: o.order_date,
            total_amount: o.total_amount,
            item_count: 1,
            items: [],
            pricing: o.pricing,
            order_category: o.status === "PAID" ? "ORDER_PLACED" : "ORDER_PLACED",
            is_digital: true,
            digital_product: o.product,
          })
        );
        setOrders(digitalOrders);
      })
      .catch(() => setError("Could not connect to server."))
      .finally(() => setLoading(false));
  }, [reduxToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-brand-muted">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-brand-muted mb-4">{error}</p>
          <a href="/" className="text-brand-orange font-semibold hover:underline">← Go to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-brand-dark mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-brand-muted mb-4">You have no orders yet.</p>
            <a
              href="/programs/my-health-recharge"
              className="text-brand-orange font-semibold hover:underline"
            >
              Browse Programs →
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
              >
                {/* Order header */}
                <div className="flex flex-wrap gap-4 justify-between items-center px-6 py-4 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-brand-muted uppercase tracking-wide">Order</p>
                    <p className="font-bold text-brand-dark">{order.so_number}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted uppercase tracking-wide">Date</p>
                    <p className="font-semibold text-brand-dark">
                      {new Date(order.order_date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted uppercase tracking-wide">Total</p>
                    <p className="font-bold text-brand-dark">
                      ₹{order.total_amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      STATUS_COLOR[order.order_category] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {STATUS_LABEL[order.order_category] ?? order.order_category}
                  </span>
                </div>

                {/* Digital product row */}
                {order.is_digital && order.digital_product && (
                  <div className="px-6 py-5">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 shrink-0 rounded-lg bg-orange-50 flex items-center justify-center">
                        <span className="text-brand-orange text-xl font-bold">
                          {order.digital_product.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-brand-dark">{order.digital_product.name}</p>
                        <p className="text-sm text-brand-muted mt-0.5">Digital Program · Qty: 1</p>
                        <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          Digital
                        </span>
                      </div>
                      <div className="text-right">
                        {order.digital_product.mrp > order.digital_product.price && (
                          <p className="text-xs line-through text-[#9CA3AF]">
                            ₹{order.digital_product.mrp.toLocaleString("en-IN")}
                          </p>
                        )}
                        <p className="font-bold text-brand-dark">
                          ₹{order.total_amount.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Physical product items */}
                <div className="divide-y divide-gray-50">
                  {order.items.map((item) => (
                    <div key={item.product_id} className="px-6 py-5">
                      <div className="flex gap-4 mb-5">
                        {item.image ? (
                          <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-100">
                            <Image
                              src={item.image}
                              alt={item.product_name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 shrink-0 rounded-lg bg-orange-50 flex items-center justify-center">
                            <span className="text-brand-orange text-xl font-bold">
                              {item.product_name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-brand-dark">{item.product_name}</p>
                          <p className="text-sm text-brand-muted mt-0.5">Qty: {item.quantity}</p>
                          {item.delivery_info && (
                            <p className="text-xs text-brand-orange mt-1 font-medium">
                              {item.delivery_info}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          {item.mrp > item.base_price && (
                            <p className="text-xs line-through text-[#9CA3AF]">
                              ₹{item.mrp.toLocaleString("en-IN")}
                            </p>
                          )}
                          <p className="font-bold text-brand-dark">
                            ₹{item.total.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      {/* Tracking steps */}
                      {item.tracking && item.tracking.length > 0 && (
                        <div className="flex items-center gap-0">
                          {item.tracking.map((step, idx) => (
                            <div key={step.step} className="flex items-center flex-1 last:flex-none">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                    step.completed
                                      ? "bg-brand-orange text-white"
                                      : step.active
                                      ? "border-2 border-brand-orange text-brand-orange bg-white"
                                      : "bg-gray-200 text-gray-400"
                                  }`}
                                >
                                  {step.completed ? (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  ) : (
                                    step.step
                                  )}
                                </div>
                                <p
                                  className={`text-[9px] mt-1 text-center leading-tight max-w-13 ${
                                    step.completed || step.active
                                      ? "text-brand-dark font-semibold"
                                      : "text-[#9CA3AF]"
                                  }`}
                                >
                                  {step.label}
                                </p>
                              </div>
                              {idx < item.tracking.length - 1 && (
                                <div
                                  className={`flex-1 h-0.5 mx-1 mb-4 ${
                                    step.completed ? "bg-brand-orange" : "bg-gray-200"
                                  }`}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pricing summary */}
                <div className="bg-gray-50 px-6 py-4 text-sm flex flex-wrap gap-x-6 gap-y-1">
                  <span className="text-brand-muted">
                    Subtotal: <span className="font-semibold text-brand-dark">₹{order.pricing.subtotal.toLocaleString("en-IN")}</span>
                  </span>
                  {order.pricing.platform_fee > 0 && (
                    <span className="text-brand-muted">
                      Platform fee: <span className="font-semibold text-brand-dark">₹{order.pricing.platform_fee.toLocaleString("en-IN")}</span>
                    </span>
                  )}
                  {order.pricing.total_tax > 0 && (
                    <span className="text-brand-muted">
                      GST: <span className="font-semibold text-brand-dark">₹{order.pricing.total_tax.toLocaleString("en-IN")}</span>
                    </span>
                  )}
                  <span className="font-bold text-brand-dark ml-auto">
                    Total: ₹{order.total_amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}