import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poler382's 徒然サイト",
  description: "Poler382のポートフォリオサイトです。",
  keywords: ["Poler382", "ポートフォリオ", "サイト", "ツール", "共有", "プロフィール", "カード"],
  openGraph: {
    title: "Poler382's 徒然サイト",
    description: "Poler382のポートフォリオサイトです。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="white">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-200`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
