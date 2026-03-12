import type { EnquireFormConfig } from "@/components/EnquireModal";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://onemi.ai";

/**
 * My Health Recharge — 90-day program
 * post_id / queried_id visible in the existing MHR submissions (IDs 23-25)
 */
export const MHR_FORM_CONFIG: EnquireFormConfig = {
  post_id: "5985",
  form_id: "acc34aa",
  referer_title: "My Health Recharge",
  queried_id: "2842",
  referrer: `${BASE_URL}/my-health-recharge/`,
};

/**
 * My Metabolic Detox — 21-day program
 * Submissions labelled "MDP" in screenshot use the same Enquire Now form (acc34aa).
 * Update post_id / queried_id to the actual MDP page IDs from WordPress once confirmed.
 */
export const MDP_FORM_CONFIG: EnquireFormConfig = {
  post_id: "5986",        // ← replace with actual MDP page post_id from WP
  form_id: "acc34aa",
  referer_title: "My Metabolic Detox",
  queried_id: "2843",     // ← replace with actual MDP queried_id from WP
  referrer: `${BASE_URL}/programs/my-metabolic-detox/`,
};

/**
 * My Mind Matters — 6-session mental health program
 * Submissions labelled "My Mind Matters" in screenshot.
 * Update post_id / queried_id once confirmed from WP.
 */
export const MMM_FORM_CONFIG: EnquireFormConfig = {
  post_id: "5987",        // ← replace with actual MMM page post_id from WP
  form_id: "acc34aa",
  referer_title: "My Mind Matters",
  queried_id: "2844",     // ← replace with actual MMM queried_id from WP
  referrer: `${BASE_URL}/programs/my-mind-matters/`,
};

/**
 * Contact Us page
 * Uses the Contact Us form (cb4fb04) visible in submissions screenshot.
 */
export const CONTACT_FORM_CONFIG: EnquireFormConfig = {
  post_id: "4417",        // Contact Us page post_id (from getContactData fetch)
  form_id: "cb4fb04",
  referer_title: "Contact Us",
  queried_id: "4417",
  referrer: `${BASE_URL}/contact-us/`,
};