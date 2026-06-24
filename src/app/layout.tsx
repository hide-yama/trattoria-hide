import type { Metadata, Viewport } from "next";
import { Fraunces, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

// ラテン語・数字・見出し用のディスプレイ書体（イタリアのメニューらしい高コントラストのセリフ）
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// 日本語UI用の本文書体
const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trattoria Hideへようこそ",
  description:
    "注文の特徴を読み取り、料理・州・飲み物を提案するイタリア食文化学習ゲーム",
};

export const viewport: Viewport = {
  themeColor: "#fbf6ec",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${zenKaku.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
