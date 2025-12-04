import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
<<<<<<< HEAD
=======
import { Toaster } from "@/components/ui/sonner"
>>>>>>> new-version
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
  title: "Signalist",
<<<<<<< HEAD
  description: "track real-time stock prices, get personalized alerts and explore detailed company insights.",
=======
  description: "Track real-time stock prices, get personalized alerts and explore detailed company insights.",
>>>>>>> new-version
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
<<<<<<< HEAD
=======
        <Toaster />
>>>>>>> new-version
      </body>
    </html>
  );
}
