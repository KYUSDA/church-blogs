import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KYUSDA Blogs - Faith, Community & Insights",
    template: "%s | KYUSDA Blogs",
  },
  description:
    "Explore faith-based articles, church updates, and community insights from KYUSDA.",
  keywords: ["KYUSDA", "Christian blogs", "faith", "Bible", "church articles"],
  metadataBase: new URL("https://blogs.kyusda.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KYUSDA Blogs",
    description:
      "Explore faith-based articles, church updates, and community insights.",
    url: "https://blogs.kyusda.org",
    siteName: "KYUSDA Blogs",
    images: [
      {
        url: "/kyusda.jpg",
        width: 1200,
        height: 630,
        alt: "KYUSDA Blogs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KYUSDA Blogs",
    description:
      "Explore faith-based articles, church updates, and community insights.",
    images: ["/kyusda.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
