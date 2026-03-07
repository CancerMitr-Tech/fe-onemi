"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken, setUserName } from "@/store/authSlice";
import Link from "next/link";

type Step = "phone" | "otp";

function LoginContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "1";

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/request/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, type: "login" }),
      });
      const data = await res.json();
      if (res.ok && data.status !== false) {
        setStep("otp");
      } else {
        setError(data.message ?? "Failed to send OTP. Please try again.");
      }
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^\d{4,6}$/.test(otp)) {
      setError("Enter the OTP sent to your number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("auth_token", data.token);
        dispatch(setToken(data.token));
        // Fetch name for navbar
        try {
          const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profile/getPersonalDetails`, {
            headers: { "auth-token": data.token },
          });
          const profileData = await profileRes.json();
          if (profileData?.data?.user) {
            const name = `${profileData.data.user.first_name ?? ""} ${profileData.data.user.last_name ?? ""}`.trim();
            if (name) {
              localStorage.setItem("auth_name", name);
              dispatch(setUserName(name));
            }
          }
        } catch { /* non-critical */ }
        router.push("/");
      } else {
        setError(data.message ?? "Invalid OTP. Please try again.");
      }
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-brand-dark mb-1">Welcome back</h1>
        <p className="text-sm text-brand-muted mb-8">
          {step === "phone" ? "Enter your mobile number to receive an OTP." : `OTP sent to +91 ${phone}`}
        </p>

        {registered && (
          <div className="mb-5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
            Account created! Please log in.
          </div>
        )}

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {step === "phone" ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Mobile Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-brand-muted text-sm rounded-l-lg">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="9876543210"
                  className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Enter OTP</label>
              <input
                type="tel"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="• • • • • •"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-center tracking-widest focus:outline-none focus:border-brand-orange"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
              className="w-full text-sm text-brand-muted hover:text-brand-orange transition-colors"
            >
              ← Change number
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-brand-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-brand-orange font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}