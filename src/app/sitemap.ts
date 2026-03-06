import type { MetadataRoute } from "next";
import { BASE_URL } from "@/constants/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/programs/my-health-recharge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programs/my-metabolic-detox`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programs/my-mind-matters`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
