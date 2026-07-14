import { MetadataRoute } from "next";
import { getEncouragements } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"; // replace with the real production domain
  const staticRoutes = ["", "/encouragements", "/testimonies", "/contact", "/support"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  const messageRoutes = getEncouragements().map((e) => ({
    url: `${base}/encouragements/${e.slug}`,
    lastModified: e.date,
  }));
  return [...staticRoutes, ...messageRoutes];
}
