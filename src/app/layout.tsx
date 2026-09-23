import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { MotionProvider } from "@/components/ui/MotionProvider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://luisfilipecrivellaro.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Luis Filipe Crivellaro — Software Engineer | AI & Automation",
  description:
    "Portfolio of Luis Filipe Crivellaro, a Software Engineer focused on AI, automation, software development and modern web technologies.",
  keywords: [
    "Luis Filipe Crivellaro",
    "Software Engineer",
    "AI Automation",
    "n8n",
    "AI Agents",
    "Portfolio",
  ],
  authors: [{ name: "Luis Filipe Crivellaro" }],
  openGraph: {
    title: "Luis Filipe Crivellaro — Software Engineer | AI & Automation",
    description:
      "Portfolio of Luis Filipe Crivellaro, a Software Engineer focused on AI, automation, software development and modern web technologies.",
    url: siteUrl,
    siteName: "Luis Filipe Crivellaro",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Filipe Crivellaro — Software Engineer | AI & Automation",
    description:
      "Portfolio of Luis Filipe Crivellaro, a Software Engineer focused on AI, automation, software development and modern web technologies.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${plexMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-bg focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <GrainOverlay />
        <CustomCursor />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
