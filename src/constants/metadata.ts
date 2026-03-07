export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://onemi.ai";

export const DEFAULT_METADATA = {
  title: {
    default: "oneMi — My Health in My Hands",
    template: "%s | oneMi",
  },
  description:
    "India's first AI-powered Health Management Platform. Empowering health with clinical insights, curated solutions & personalised care.",
  openGraph: {
    siteName: "oneMi",
    url: BASE_URL,
    type: "website" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
  },
};
