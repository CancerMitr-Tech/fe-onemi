"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "@/store/authSlice";
import { clearCart } from "@/store/cartSlice";
import type { RootState } from "@/store";
import Link from "next/link";

type UserProfile = {
  first_name: string | null;
  last_name: string | null;
  mobile_no: string | null;
  email: string | null;
  dob: string | null;
  age: number | null;
  gender: string | null;
  profile_image: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxToken = useSelector((state: RootState) => state.auth.token);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = reduxToken ?? localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profile/getPersonalDetails`, {
      headers: { "auth-token": token },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.status && data.data?.user) {
          setProfile(data.data.user);
        } else {
          setError("Could not load profile.");
        }
      })
      .catch(() => setError("Could not connect to server."))
      .finally(() => setLoading(false));
  }, [reduxToken, router]);

  async function handleLogout() {
    const token = reduxToken ?? localStorage.getItem("auth_token");
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`, {
          method: "POST",
          headers: { "auth-token": token },
        });
      } catch { /* ignore */ }
    }
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_name");
    localStorage.removeItem("mhr_cart");
    localStorage.removeItem("mhr_order");
    dispatch(clearToken());
    dispatch(clearCart());
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-brand-muted">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-brand-muted mb-4">{error || "Profile not found."}</p>
          <Link href="/" className="text-brand-orange font-semibold hover:underline">← Go to Home</Link>
        </div>
      </div>
    );
  }

  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "User";
  const initials = [profile.first_name?.[0], profile.last_name?.[0]].filter(Boolean).join("").toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Avatar + name */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
            <span className="text-white text-xl font-bold">{initials}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-brand-dark">{fullName}</h1>
            {profile.mobile_no && (
              <p className="text-sm text-brand-muted">+91 {profile.mobile_no}</p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wide mb-4">Personal Details</h2>
          <div className="space-y-3">
            <ProfileRow label="Full Name" value={fullName} />
            <ProfileRow label="Mobile" value={profile.mobile_no ? `+91 ${profile.mobile_no}` : null} />
            <ProfileRow label="Email" value={profile.email} />
            <ProfileRow label="Date of Birth" value={profile.dob ? new Date(profile.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : null} />
            <ProfileRow label="Age" value={profile.age ? `${profile.age} years` : null} />
            <ProfileRow label="Gender" value={profile.gender} />
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
          <Link
            href="/orders"
            className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-brand-dark">My Orders</span>
            <svg className="w-4 h-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/programs/my-health-recharge"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-brand-dark">Browse Programs</span>
            <svg className="w-4 h-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full border border-red-200 text-red-500 hover:bg-red-50 font-semibold py-3 rounded-xl transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="flex justify-between text-sm border-b border-gray-50 pb-3 last:border-0 last:pb-0">
      <span className="text-brand-muted">{label}</span>
      <span className="font-medium text-brand-dark text-right">{value ?? <span className="text-[#9CA3AF]">Not set</span>}</span>
    </div>
  );
}