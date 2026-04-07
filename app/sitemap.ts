import { MetadataRoute } from "next";
import { client } from "@/utils/client";
import { getAllBlogsQuery } from "@/services/blogs";
import { Blog } from "@/hooks/use-blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await client.fetch(getAllBlogsQuery);

  const blogRoutes = blogs.map((blog: Blog) => ({
    url: `https://blogs.kyusda.org/blog/${blog.slug.current}`,
    lastModified: blog.updatedAt || blog.publishedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://blogs.kyusda.org",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...blogRoutes,
  ];
}
