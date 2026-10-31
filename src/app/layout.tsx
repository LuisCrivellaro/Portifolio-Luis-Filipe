import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
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
  title: "Luis Filipe Crivellaro — Engenheiro de Software | IA & Automação",
  description:
    "Portfólio de Luis Filipe Crivellaro, engenheiro de software que constrói sistemas internos, agentes de IA e automações para empresas reais.",
  keywords: [
    "Luis Filipe Crivellaro",
    "Engenheiro de Software",
    "Automação com IA",
    "n8n",
    "Agentes de IA",
    "Portfólio",
  ],
  authors: [{ name: "Luis Filipe Crivellaro" }],
  openGraph: {
    title: "Luis Filipe Crivellaro — Engenheiro de Software | IA & Automação",
    description:
      "Portfólio de Luis Filipe Crivellaro, engenheiro de software que constrói sistemas internos, agentes de IA e automações para empresas reais.",
    url: siteUrl,
    siteName: "Luis Filipe Crivellaro",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Filipe Crivellaro — Engenheiro de Software | IA & Automação",
    description:
      "Portfólio de Luis Filipe Crivellaro, engenheiro de software que constrói sistemas internos, agentes de IA e automações para empresas reais.",
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
    <html lang="pt-BR">
      <body className={`${bricolage.variable} ${plexMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-bg focus:px-4 focus:py-2 focus:text-sm"
        >
          Pular para o conteúdo
        </a>
        <GrainOverlay />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
