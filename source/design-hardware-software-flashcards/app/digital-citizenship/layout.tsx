import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/digital-citizenship-og.png`;

  return {
    title: "Digital Citizenship | Grade 6 Design",
    description: "Practise digital footprints, password safety and netiquette through three self-correcting flashcard decks.",
    openGraph: {
      title: "Digital Citizenship | Grade 6 Design",
      description: "Be smart. Be safe. Be kind. Master three essential digital citizenship topics.",
      images: [{ url: imageUrl, width: 1730, height: 909, alt: "Digital Citizenship — Be smart. Be safe. Be kind." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Digital Citizenship | Grade 6 Design",
      description: "Be smart. Be safe. Be kind. Master three essential digital citizenship topics.",
      images: [imageUrl],
    },
  };
}

export default function DigitalCitizenshipLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
