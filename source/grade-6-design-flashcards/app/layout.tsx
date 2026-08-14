import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music & Design Flashcards",
  description: "Choose a grade and practise Music and Design concepts.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Music & Design Flashcards",
    description: "Choose a grade. Think first. Learn together. Practise again.",
    images: ["/og-music-design.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Music & Design Flashcards",
    description: "Choose a grade. Think first. Learn together. Practise again.",
    images: ["/og-music-design.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
