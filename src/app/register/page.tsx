"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setToken, setUserName } from "@/store/authSlice";

type Step = "details" | "otp";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [step, setStep] = useState<Step>("details");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleValidateAndRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!fname.trim()) { setError("First name is required."); return; }
    if (!lname.trim()) { setError("Last name is required."); return; }
    if (!/^\d{10}$/.test(phone)) { setError("Enter a valid 10-digit mobile number."); return; }
    if (!consent) { setError("Please accept the terms and privacy policy."); return; }

    setLoading(true);
    try {
      // Step 1: validate registration details
      const valRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/validate-registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname: fname.trim(), lname: lname.trim(), phone }),
      });
      const valData = await valRes.json();
      if (!valRes.ok || valData.status === false) {
        setError(valData.message ?? "Validation failed.");
        setLoading(false);
        return;
      }

      // Step 2: request OTP
      const otpRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/request/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, type: "register" }),
      });
      const otpData = await otpRes.json();
      if (!otpRes.ok || otpData.status === false) {
        setError(otpData.message ?? "Failed to send OTP.");
        setLoading(false);
        return;
      }

      setStep("otp");
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^\d{4,6}$/.test(otp)) { setError("Enter the OTP sent to your number."); return; }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/verify-otp-and-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          otp,
          fname: fname.trim(),
          lname: lname.trim(),
          consent_type: "app_terms",
          consent_version_id: Number(process.env.NEXT_PUBLIC_CONSENT_VERSION_ID ?? "1"),
          consent_data: "User accepted terms and privacy policy",
        }),
      });
      const data = await res.json();
      if (res.ok && data.status !== false && data.token) {
        localStorage.setItem("auth_token", data.token);
        dispatch(setToken(data.token));
        if (data.user?.name) dispatch(setUserName(data.user.name));
        router.push("/profile");
      } else {
        setError(data.message ?? "Registration failed. Please try again.");
      }
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-brand-dark mb-1">Create account</h1>
        <p className="text-sm text-brand-muted mb-8">
          {step === "details" ? "Join OneMi to start your health journey." : `OTP sent to +91 ${phone}`}
        </p>

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {step === "details" ? (
          <form onSubmit={handleValidateAndRequestOtp} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">First Name</label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="Rahul"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Last Name</label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  placeholder="Sharma"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>
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
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-brand-orange"
              />
              <span className="text-xs text-brand-muted">
                I agree to the{" "}
                <a href="/terms" className="text-brand-orange hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="/privacy" className="text-brand-orange hover:underline">Privacy Policy</a>.
              </span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {loading ? "Please wait..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
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
              {loading ? "Creating account..." : "Create Account"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("details"); setOtp(""); setError(""); }}
              className="w-full text-sm text-brand-muted hover:text-brand-orange transition-colors"
            >
              ← Go back
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-brand-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-orange font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}