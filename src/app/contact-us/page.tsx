import type { Metadata } from "next";
import "./contact.css";
import ContactHero from "@/components/contact/ContactHero";

export const metadata: Metadata = {
  title: "Contact Us | oneMi",
  description:
    "Get in touch with oneMi. Reach out for partnerships, product queries, or healthcare collaboration.",
};

async function getContactData() {
  const [apiRes, pageRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_WP_API}/pages/4417`, {
      next: { revalidate: 60 },
    }),
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/contact-us/`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; NextJS/1.0)" },
    }),
  ]);

  if (!apiRes.ok) throw new Error("Failed to fetch Contact page data");

  const data = await apiRes.json();
  const fullHtml = pageRes.ok ? await pageRes.text() : "";

  const cssLinks: string[] = [];
  const linkRegex =
    /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi;

  let m: RegExpExecArray | null;

  while ((m = linkRegex.exec(fullHtml)) !== null) {
    const href = m[1];

    if (
      href.includes("elementor") ||
      href.includes("post-4417") ||
      href.includes("google") ||
      href.includes("fonts")
    ) {
      cssLinks.push(href);
    }
  }

  const styleBlocks: string[] = [];

  const styleRegex =
    /<style[^>]*id=["'][^"']*elementor[^"']*["'][^>]*>([\s\S]*?)<\/style>/gi;

  while ((m = styleRegex.exec(fullHtml)) !== null) {
    styleBlocks.push(m[1]);
  }

  const globalStyleRegex =
    /<style[^>]*id=["'][^"']*global[^"']*["'][^>]*>([\s\S]*?)<\/style>/gi;

  while ((m = globalStyleRegex.exec(fullHtml)) !== null) {
    styleBlocks.push(m[1]);
  }

  return {
    html: data.content.rendered as string,
    cssLinks,
    styleBlocks,
  };
}

export default async function ContactPage() {
  const { html, cssLinks, styleBlocks } = await getContactData();

  return (
    <ContactHero html={html} cssLinks={cssLinks} styleBlocks={styleBlocks} />
  );
}