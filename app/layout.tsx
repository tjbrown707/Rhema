import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Elegant serif for scripture reading (falls back gracefully)
const scriptureFont = Geist({
  variable: "--font-scripture",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Rhema",
  description: "A Bible study app for understanding Scripture in its original context and language. Encounter the Word as it was spoken.",
  icons: {
    icon: "/favicon.ico",
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
      className={`${geistSans.variable} ${geistMono.variable} ${scriptureFont.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0c12] text-[#e8e4d9]">
        {children}
      </body>
    </html>
  );
}
