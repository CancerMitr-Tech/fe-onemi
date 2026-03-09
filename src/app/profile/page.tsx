"use client";

import { useEffect, useState, useCallback } from "react";
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
  alt_number: string | null;
  email: string | null;
  dob: string | null;
  age: number | null;
  gender: string | null;
  marital_status: string | null;
  address1: string | null;
  address2: string | null;
  state: string | null;
  city: string | null;
  pincode: string | null;
  profile_image: string | null;
};

type FormState = {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  alt_phone: string;
  dob: string;
  age: string;
  gender: string;
  marital_status: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  pincode: string;
};

type LocationCity = { id: number; name: string };
type LocationState = { id: number; name: string; cities: LocationCity[] };

type FieldErrors = Partial<Record<keyof FormState, string>>;

function calcAge(dob: string): string {
  if (!dob) return "";
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age > 0 ? String(age) : "";
}

function toISODate(val: string | null | undefined): string {
  if (!val) return "";
  try {
    return new Date(val).toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxToken = useSelector((state: RootState) => state.auth.token);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [locationStates, setLocationStates] = useState<LocationState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<FormState>({
    fname: "", lname: "", phone: "", email: "", alt_phone: "",
    dob: "", age: "", gender: "", marital_status: "",
    address1: "", address2: "", state: "", city: "", pincode: "",
  });
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const fetchProfile = useCallback((token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profile/getPersonalDetails`, {
      headers: { "auth-token": token },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.status && data.data?.user) {
          setProfile(data.data.user);
          if (data.data?.location?.states) {
            setLocationStates(data.data.location.states);
          }
        } else {
          setError("Could not load profile.");
        }
      })
      .catch(() => setError("Could not connect to server."));
  }, []);

  useEffect(() => {
    const token = reduxToken ?? localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    fetchProfile(token).finally(() => setLoading(false));
  }, [reduxToken, router, fetchProfile]);

  function openEdit() {
    if (!profile) return;
    const matchedState = locationStates.find((s) => s.name === profile.state);
    setSelectedStateId(matchedState?.id ?? null);
    setForm({
      fname: profile.first_name ?? "",
      lname: profile.last_name ?? "",
      phone: profile.mobile_no ?? "",
      email: profile.email ?? "",
      alt_phone: profile.alt_number ?? "",
      dob: toISODate(profile.dob),
      age: profile.age ? String(profile.age) : "",
      gender: profile.gender ?? "",
      marital_status: profile.marital_status ?? "",
      address1: profile.address1 ?? "",
      address2: profile.address2 ?? "",
      state: profile.state ?? "",
      city: profile.city ?? "",
      pincode: profile.pincode ?? "",
    });
    setFieldErrors({});
    setSaveError("");
    setEditing(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name === "stateSelect") {
      const stateId = Number(value);
      const matched = locationStates.find((s) => s.id === stateId);
      setSelectedStateId(stateId || null);
      setForm((prev) => ({ ...prev, state: matched?.name ?? "", city: "" }));
      setFieldErrors((prev) => ({ ...prev, state: undefined, city: undefined }));
      return;
    }
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "dob") next.age = calcAge(value);
      return next;
    });
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const token = reduxToken ?? localStorage.getItem("auth_token");
    if (!token) { router.replace("/login"); return; }

    setSaving(true);
    setSaveError("");
    setFieldErrors({});

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/profile/updatePersonalDetails`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          alt_phone: form.alt_phone || undefined,
          address2: form.address2 || undefined,
        }),
      });
      const data = await res.json();

      if (data?.status) {
        await fetchProfile(token);
        setEditing(false);
      } else if (data?.errors) {
        setFieldErrors(data.errors as FieldErrors);
      } else {
        setSaveError(data?.message ?? "Failed to update profile.");
      }
    } catch {
      setSaveError("Could not connect to server.");
    } finally {
      setSaving(false);
    }
  }

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
  const citiesForState = selectedStateId
    ? (locationStates.find((s) => s.id === selectedStateId)?.cities ?? [])
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        {/* Avatar + name */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 flex items-center justify-between gap-5">
          <div className="flex items-center gap-5">
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
          {!editing && (
            <button
              onClick={openEdit}
              className="shrink-0 text-sm font-semibold text-brand-orange border border-brand-orange rounded-lg px-4 py-2 hover:bg-orange-50 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {editing ? (
          /* ── Edit Form ─────────────────────────────────────────── */
          <form onSubmit={handleSave} className="space-y-6">
            {/* Personal info */}
            <FormSection title="Personal Details">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" error={fieldErrors.fname}>
                  <input name="fname" value={form.fname} onChange={handleChange}
                    className={inputCls(fieldErrors.fname)} placeholder="First name" />
                </Field>
                <Field label="Last Name" error={fieldErrors.lname}>
                  <input name="lname" value={form.lname} onChange={handleChange}
                    className={inputCls(fieldErrors.lname)} placeholder="Last name" />
                </Field>
              </div>

              <Field label="Mobile Number" error={fieldErrors.phone}>
                <input name="phone" value={form.phone} onChange={handleChange}
                  className={inputCls(fieldErrors.phone)} placeholder="10-digit mobile" maxLength={10} />
              </Field>

              <Field label="Email Address" error={fieldErrors.email}>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className={inputCls(fieldErrors.email)} placeholder="you@example.com" />
              </Field>

              <Field label="Alternate Phone (optional)" error={fieldErrors.alt_phone}>
                <input name="alt_phone" value={form.alt_phone} onChange={handleChange}
                  className={inputCls(fieldErrors.alt_phone)} placeholder="10-digit alternate number" maxLength={10} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Date of Birth" error={fieldErrors.dob}>
                  <input name="dob" type="date" value={form.dob} onChange={handleChange}
                    className={inputCls(fieldErrors.dob)} max={new Date().toISOString().slice(0, 10)} />
                </Field>
                <Field label="Age (years)" error={fieldErrors.age}>
                  <input name="age" type="number" value={form.age} onChange={handleChange}
                    className={inputCls(fieldErrors.age)} placeholder="Auto from DOB" min={1} max={120} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Gender" error={fieldErrors.gender}>
                  <select name="gender" value={form.gender} onChange={handleChange} className={inputCls(fieldErrors.gender)}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field label="Marital Status" error={fieldErrors.marital_status}>
                  <select name="marital_status" value={form.marital_status} onChange={handleChange} className={inputCls(fieldErrors.marital_status)}>
                    <option value="">Select status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </Field>
              </div>
            </FormSection>

            {/* Address */}
            <FormSection title="Address">
              <Field label="Address Line 1" error={fieldErrors.address1}>
                <textarea name="address1" value={form.address1} onChange={handleChange}
                  className={inputCls(fieldErrors.address1) + " resize-none"} rows={2}
                  placeholder="House / flat / street (min 10 chars)" />
              </Field>

              <Field label="Address Line 2 (optional)" error={fieldErrors.address2}>
                <input name="address2" value={form.address2} onChange={handleChange}
                  className={inputCls(fieldErrors.address2)} placeholder="Landmark, area, etc." />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="State" error={fieldErrors.state}>
                  <select
                    name="stateSelect"
                    value={selectedStateId ?? ""}
                    onChange={handleChange}
                    className={inputCls(fieldErrors.state)}
                  >
                    <option value="">Select state</option>
                    {locationStates.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="City" error={fieldErrors.city}>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={inputCls(fieldErrors.city)}
                    disabled={!selectedStateId}
                  >
                    <option value="">Select city</option>
                    {citiesForState.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Pincode" error={fieldErrors.pincode}>
                <input name="pincode" value={form.pincode} onChange={handleChange}
                  className={inputCls(fieldErrors.pincode)} placeholder="6-digit pincode" maxLength={6} />
              </Field>
            </FormSection>

            {saveError && (
              <p className="text-sm text-red-600 text-center">{saveError}</p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 border border-gray-300 text-brand-dark font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-brand-orange text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          /* ── View Mode ─────────────────────────────────────────── */
          <>
            {/* Personal Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
              <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wide mb-4">Personal Details</h2>
              <div className="space-y-3">
                <ProfileRow label="Full Name" value={fullName} />
                <ProfileRow label="Mobile" value={profile.mobile_no ? `+91 ${profile.mobile_no}` : null} />
                <ProfileRow label="Alt. Phone" value={profile.alt_number ? `+91 ${profile.alt_number}` : null} />
                <ProfileRow label="Email" value={profile.email} />
                <ProfileRow label="Date of Birth" value={profile.dob ? new Date(profile.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : null} />
                <ProfileRow label="Age" value={profile.age ? `${profile.age} years` : null} />
                <ProfileRow label="Gender" value={profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : null} />
                <ProfileRow label="Marital Status" value={profile.marital_status ? profile.marital_status.charAt(0).toUpperCase() + profile.marital_status.slice(1) : null} />
              </div>
            </div>

            {/* Address */}
            {(profile.address1 || profile.state) && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wide mb-4">Address</h2>
                <div className="space-y-3">
                  <ProfileRow label="Address Line 1" value={profile.address1} />
                  {profile.address2 && <ProfileRow label="Address Line 2" value={profile.address2} />}
                  <ProfileRow label="City" value={profile.city} />
                  <ProfileRow label="State" value={profile.state} />
                  <ProfileRow label="Pincode" value={profile.pincode} />
                </div>
              </div>
            )}

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
          </>
        )}
      </div>
    </div>
  );
}

// ── Small helper components ────────────────────────────────────────────────────

function inputCls(err?: string) {
  return `w-full border rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-orange ${err ? "border-red-400" : "border-gray-300"}`;
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wide">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-brand-muted mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
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