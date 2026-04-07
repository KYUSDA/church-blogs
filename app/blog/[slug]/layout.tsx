import { client } from "@/utils/client";
import { getBlogBySlugQuery } from "@/services/blogs";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  return client.fetch(getBlogBySlugQuery, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // 👈 IMPORTANT

  const post = await getPost(slug);

  if (!post) return {};

  const postUrl = `https://blogs.kyusda.org/blog/${post.slug.current}`;

  return {
    title: post.title,
    description: post.seo?.metaDescription || post.title,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.seo?.metaDescription || post.title,
      url: postUrl,
      type: "article",
      images: post.thumbnail
        ? [
            {
              url: post.thumbnail,
              width: 1200,
              height: 630,
              alt: post.thumbnailAlt || post.title,
            },
          ]
        : [],
      authors: post.author?.name ? [post.author.name] : [],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seo?.metaDescription || post.title,
      images: post.thumbnail ? [post.thumbnail] : [],
      creator: "@kyusdachurch",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
