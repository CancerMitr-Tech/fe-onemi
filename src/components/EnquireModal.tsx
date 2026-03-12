"use client";

import { useState } from "react";

export interface EnquireFormConfig {
  post_id: string;
  form_id: string;
  referer_title: string;
  queried_id: string;
  referrer: string;
}

interface EnquireModalProps {
  open: boolean;
  onClose: () => void;
  formConfig: EnquireFormConfig;
}

const WP_AJAX_URL =
  process.env.NEXT_PUBLIC_WP_AJAX_URL ??
  "https://onemi.ai/wp-admin/admin-ajax.php";

export default function EnquireModal({
  open,
  onClose,
  formConfig,
}: EnquireModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("post_id", formConfig.post_id);
      formData.append("form_id", formConfig.form_id);
      formData.append("referer_title", formConfig.referer_title);
      formData.append("queried_id", formConfig.queried_id);
      formData.append("form_fields[name]", name);
      formData.append("form_fields[field_9fe9a7e]", phone);
      formData.append("form_fields[message]", concern);
      formData.append("action", "elementor_pro_forms_send_form");
      formData.append("referrer", formConfig.referrer);

      const res = await fetch(WP_AJAX_URL, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setPhone("");
        setConcern("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setSubmitted(false);
    setError("");
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl w-full mx-4"
        style={{ maxWidth: 480, padding: "36px 32px 32px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          style={{
            fontSize: 22,
            lineHeight: 1,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "rgb(37,37,37)",
              }}
            >
              Thank you!
            </p>
            <p
              className="mt-2"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgb(107,114,128)",
              }}
            >
              Our team will get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            <p
              className="text-center mb-6"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "26px",
                color: "rgb(37,37,37)",
              }}
            >
              We&apos;re here to help, reach out and our team will get back to
              you shortly.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "rgb(69,69,69)",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "12px 16px",
                  outline: "none",
                  width: "100%",
                }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "rgb(69,69,69)",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "12px 16px",
                  outline: "none",
                  width: "100%",
                }}
              />
              <textarea
                placeholder="Your Concern"
                rows={4}
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "rgb(69,69,69)",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "12px 16px",
                  outline: "none",
                  width: "100%",
                  resize: "vertical",
                }}
              />

              {error && (
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "13px",
                    color: "#E85D04",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#fff",
                  backgroundColor: submitting ? "#f0a070" : "#E85D04",
                  border: "none",
                  borderRadius: 8,
                  padding: "14px",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s",
                  width: "100%",
                }}
              >
                {submitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}