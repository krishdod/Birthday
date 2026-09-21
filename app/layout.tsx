import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Bubu, with love, Krish",
  description: "A little world for Anita. Birthday wishes, little love notes, and all our tomorrows. 06-10-2001.",
  robots: { index: false, follow: false },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
