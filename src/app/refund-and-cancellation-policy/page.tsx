import type { Metadata } from "next";
import "../privacy-policy/policy.css";
import PolicyHero from "@/components/policy/PolicyHero";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | oneMi",
  description:
    "Read OneMi's Refund & Cancellation Policy to understand our guidelines for refunds and cancellations.",
};

async function getPageData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/pages/3375`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch Refund & Cancellation Policy");
  const data = await res.json();
  return {
    html: data.content.rendered as string,
    title: data.title.rendered as string,
  };
}

export default async function RefundCancellationPage() {
  const { html, title } = await getPageData();
  return <PolicyHero html={html} title={title} cssLinks={[]} styleBlocks={[]} />;
}