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
  title: "Ringtone Maker – Free Online Audio Trimmer & Editor",
  description:
    "Create custom ringtones online. Upload, trim, and export audio easily with our free ringtone maker. No signup required.",
  keywords: [
    "ringtone maker",
    "audio trimmer",
    "mp3 editor",
    "online ringtone",
    "free ringtone",
    "audio editor",
    "music cutter",
    "custom ringtone",
  ],
  openGraph: {
    title: "Ringtone Maker – Free Online Audio Trimmer & Editor",
    description:
      "Create custom ringtones online. Upload, trim, and export audio easily with our free ringtone maker.",
    url: "https://ringtonemaker.example.com",
    siteName: "Ringtone Maker",
    images: [
      {
        url: "https://ringtonemaker.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ringtone Maker – Free Online Audio Trimmer & Editor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ringtone Maker – Free Online Audio Trimmer & Editor",
    description:
      "Create custom ringtones online. Upload, trim, and export audio easily with our free ringtone maker.",
    images: ["https://ringtonemaker.example.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
