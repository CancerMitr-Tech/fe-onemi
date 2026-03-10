import type { Metadata } from "next";
import "../privacy-policy/policy.css";
import PolicyHero from "@/components/policy/PolicyHero";

export const metadata: Metadata = {
  title: "Terms & Conditions | oneMi",
  description:
    "Read OneMi's Terms & Conditions to understand the rules and guidelines for using our platform.",
};

async function getPageData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pages/6168`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch Terms & Conditions");
  const data = await res.json();
  return {
    html: data.content.rendered as string,
    title: data.title.rendered as string,
  };
}

export default async function TermsAndConditionsPage() {
  const { html, title } = await getPageData();
  return <PolicyHero html={html} title={title} cssLinks={[]} styleBlocks={[]} />;
}