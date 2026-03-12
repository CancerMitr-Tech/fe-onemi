"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_FORM_CONFIG } from "@/lib/formConfigs";

const WP_AJAX_URL =
  process.env.NEXT_PUBLIC_WP_AJAX_URL ??
  "https://onemi.ai/wp-admin/admin-ajax.php";

type Props = {
  html: string;
  cssLinks: string[];
  styleBlocks: string[];
};

export default function ContactHero({ html, cssLinks, styleBlocks }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const form = container.querySelector<HTMLFormElement>(".elementor-form");
    if (!form) return;

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      setSubmitState("sending");

      // Disable submit button during request
      const btn = form.querySelector<HTMLButtonElement>(
        'button[type="submit"], .elementor-button'
      );
      if (btn) btn.disabled = true;

      const fd = new FormData(form);

      // Ensure required Elementor AJAX fields are present
      if (!fd.has("action"))
        fd.set("action", "elementor_pro_forms_send_form");
      if (!fd.has("post_id"))
        fd.set("post_id", CONTACT_FORM_CONFIG.post_id);
      if (!fd.has("form_id"))
        fd.set("form_id", CONTACT_FORM_CONFIG.form_id);
      if (!fd.has("referer_title"))
        fd.set("referer_title", CONTACT_FORM_CONFIG.referer_title);
      if (!fd.has("queried_id"))
        fd.set("queried_id", CONTACT_FORM_CONFIG.queried_id);
      if (!fd.has("referrer"))
        fd.set("referrer", CONTACT_FORM_CONFIG.referrer);

      try {
        const res = await fetch(WP_AJAX_URL, { method: "POST", body: fd });
        if (res.ok) {
          setSubmitState("success");
          form.reset();
        } else {
          setSubmitState("error");
        }
      } catch {
        setSubmitState("error");
      } finally {
        if (btn) btn.disabled = false;
      }
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="wp-contact"
      style={{ marginTop: "calc(-1 * var(--navbar-height, 0px))" }}
    >
      <div className="elementor elementor-4417 elementor-location-single">
        {/* Elementor external CSS */}
        {cssLinks.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}

        {/* Elementor inline style blocks */}
        {styleBlocks.map((css, i) => (
          <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
        ))}

        {/* WordPress page HTML */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      {/* Submission feedback overlay */}
      {submitState === "success" && (
        <div
          style={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#1A1A2E",
            color: "#fff",
            borderRadius: 12,
            padding: "14px 28px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            zIndex: 9999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
          }}
        >
          ✅ Message sent! Our team will get back to you shortly.
        </div>
      )}

      {submitState === "error" && (
        <div
          style={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#E85D04",
            color: "#fff",
            borderRadius: 12,
            padding: "14px 28px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            zIndex: 9999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
          }}
        >
          Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
}
