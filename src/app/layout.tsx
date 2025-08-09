import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Intro TechStack | 技術スタック共有ツール",
  description:
    "技術スタックを視覚的に共有できるカード生成サイト。画像アップロード、技術選択、ドラッグ＆ドロップでカスタマイズして、PNGでダウンロード可能。",
  keywords: ["技術スタック", "開発者", "ツール", "共有", "プロフィール", "カード"],
  openGraph: {
    title: "Intro TechStack",
    description: "技術スタックを視覚的に共有できるカード生成サイト",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-200`}>
        {children}
      </body>
    </html>
  );
}
