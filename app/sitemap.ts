import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

const siteUrl = "https://www.markmontagebeab.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/om-oss`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${siteUrl}/certifikat`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/projekt`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/tjanster/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
