import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: {
    default: "TravelEase",
    template: "%s · TravelEase"
  },
  description: "Discover destinations, plan itineraries, and manage bookings in one place.",
  applicationName: "TravelEase",
  metadataBase: new URL("http://localhost:3000"),
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

