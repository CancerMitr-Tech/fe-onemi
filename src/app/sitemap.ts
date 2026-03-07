import type { MetadataRoute } from "next";
import { BASE_URL } from "@/constants/metadata";
import { WP_API } from "@/lib/blog";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/programs/my-health-recharge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/programs/my-metabolic-detox`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/programs/my-mind-matters`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${WP_API}/posts?per_page=100&_fields=slug,modified`, {
      next: { revalidate: 3600 },
    });
    const posts = await res.json();

    const blogRoutes: MetadataRoute.Sitemap = Array.isArray(posts)
      ? posts.map((p: { slug: string; modified: string }) => ({
          url: `${BASE_URL}/blog/${p.slug}`,
          lastModified: new Date(p.modified),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }))
      : [];

    return [...staticRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
