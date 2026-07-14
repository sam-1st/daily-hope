import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Daily Hope";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Daily encouragement and hope`,
  description:
    "Short, scripture-rooted reflections and real testimonies to encourage you, one day at a time.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: SITE_NAME,
    description: "Daily encouragement and hope, one reflection at a time.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${manrope.variable} font-body`}>
        <ToastProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
