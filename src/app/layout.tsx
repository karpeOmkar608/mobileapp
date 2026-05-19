import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/auth/Providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CreatorOS — The Operating System for the Creator Economy",
  description:
    "Manage creator collaborations, payments, campaigns, and brand deals — all in one place. Built for creators, brands, and agencies.",
  keywords: ["creator economy", "influencer marketing", "brand deals", "campaign management", "creator CRM"],
  openGraph: {
    title: "CreatorOS — The Operating System for the Creator Economy",
    description: "All-in-one ecosystem for creators, brands, and agencies.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
