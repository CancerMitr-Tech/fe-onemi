import type { Metadata } from "next";
import "./about.css";
import AboutHero from "@/components/about/AboutHero";

export const metadata: Metadata = {
  title: "About Us | oneMi",
  description:
    "Learn why oneMi was built — to connect fragmented healthcare with AI-powered longitudinal care.",
};

async function getAboutData() {
  const [apiRes, pageRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_WP_API}/pages/3813`, {
      next: { revalidate: 60 },
    }),
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/about/`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; NextJS/1.0)" },
    }),
  ]);

  if (!apiRes.ok) throw new Error("Failed to fetch About page data");

  const data = await apiRes.json();
  const fullHtml = pageRes.ok ? await pageRes.text() : "";

  // ── Extract Elementor & page-specific CSS links ──
  const cssLinks: string[] = [];
  const linkRegex =
    /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = linkRegex.exec(fullHtml)) !== null) {
    const href = m[1];
    if (
      href.includes("elementor") ||
      href.includes("post-3813") ||
      href.includes("google") ||
      href.includes("fonts")
    ) {
      cssLinks.push(href);
    }
  }

  // ── Extract Elementor inline <style> blocks ──
  const styleBlocks: string[] = [];
  const styleRegex =
    /<style[^>]*id=["'][^"']*elementor[^"']*["'][^>]*>([\s\S]*?)<\/style>/gi;
  while ((m = styleRegex.exec(fullHtml)) !== null) {
    styleBlocks.push(m[1]);
  }

  // ── Also grab global inline styles (custom properties, kit CSS) ──
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

export default async function AboutPage() {
  const { html, cssLinks, styleBlocks } = await getAboutData();
  return <AboutHero html={html} cssLinks={cssLinks} styleBlocks={styleBlocks} />;
}
