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
  title: "GasKeep",
  description: "GasKeep adalah platform yang menyediakan layanan tempat parkir dan perawatan kendaraan",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/img/Logo_Web_GasKeep_Biru.png', type: 'image/png' }
    ],
    shortcut: '/img/Logo_Web_GasKeep_Biru.png',
    apple: '/img/Logo_Web_GasKeep_Biru.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
