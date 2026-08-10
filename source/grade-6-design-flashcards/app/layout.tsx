import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grade 6 Flashcards",
  description: "Learn and practise Grade 6 Music and Design concepts.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Grade 6 Flashcards",
    description: "Think first. Learn together. Practise again.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grade 6 Flashcards",
    description: "Think first. Learn together. Practise again.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
