import type { Metadata } from "next";
import "./policy.css";
import PolicyHero from "@/components/policy/PolicyHero";

export const metadata: Metadata = {
  title: "Privacy Policy | oneMi",
  description:
    "Read OneMi's Privacy Policy to understand how we collect, use, and protect your personal health data.",
};

async function getPageData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pages/3`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch Privacy Policy");
  const data = await res.json();
  return {
    html: data.content.rendered as string,
    title: data.title.rendered as string,
  };
}

export default async function PrivacyPolicyPage() {
  const { html, title } = await getPageData();
  return <PolicyHero html={html} title={title} cssLinks={[]} styleBlocks={[]} />;
}