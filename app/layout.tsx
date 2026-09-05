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
title: "Leu Crew HQ",
description: "Family command center for the Leu Crew",
manifest: "/manifest.json",
appleWebApp: {
capable: true,
statusBarStyle: "default",
title: "Leu Crew HQ",
},
icons: {
icon: [
{
url: "/icon-192.png",
sizes: "192x192",
type: "image/png",
},
{
url: "/icon-512.png",
sizes: "512x512",
type: "image/png",
},
],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
