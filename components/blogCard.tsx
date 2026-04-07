/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blog } from "@/hooks/use-blogs";
import Image from "next/image";
import Link from "next/link";

// Portable Text → plain string
function getPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";

  return blocks
    .filter(
      (block) => block?._type === "block" && Array.isArray(block.children),
    )
    .map((block) =>
      block.children
        .filter((child: any) => typeof child.text === "string")
        .map((child: any) => child.text)
        .join(""),
    )
    .join(" ")
    .trim();
}

export default function BlogCard({ blog }: { blog: Blog }) {
  const excerpt = getPlainText(blog.content ?? []).slice(0, 120);

  return (
    <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      {/* IMAGE */}
      <Link href={`/blog/${blog.slug.current}`}>
        <div className="overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.thumbnailAlt ?? blog.title}
            width={384}
            height={192}
            className="
              w-full h-48 object-cover
              transform transition duration-500 ease-out
              group-hover:scale-105
            "
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4 flex flex-col justify-between h-50">
        <div>
          <p className="text-sm text-gray-500">
            {new Date(blog.publishedAt).toDateString()} • {blog.readingTime} min
            read
          </p>

          <h2 className="text-lg font-semibold mt-2 line-clamp-2">
            {blog.title}
          </h2>

          <p className="text-gray-600 mt-2 text-base line-clamp-3">
            {excerpt ? `${excerpt}...` : ""}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/blog/${blog.slug.current}`}
          className="
            mt-4 inline-flex items-center text-sm font-medium
            text-blue-600 hover:text-blue-800
            transition
          "
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
