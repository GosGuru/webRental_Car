import type { Metadata } from "next";
import { Outfit, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const unbounded = Unbounded({ 
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Autos Bustamante - Venta de Coches de Segunda Mano en Cabra, Córdoba",
    template: "%s | Autos Bustamante",
  },
  description: "Concesionario de vehículos de segunda mano en Cabra, Córdoba. Amplio catálogo de coches con garantía y financiación. Encuentra tu coche ideal al mejor precio.",
  keywords: [
    "coches segunda mano",
    "venta coches Córdoba",
    "concesionario Cabra",
    "coches ocasión",
    "Autos Bustamante",
    "vehículos usados",
    "coches baratos Córdoba",
  ],
  authors: [{ name: "Autos Bustamante" }],
  creator: "Autos Bustamante",
  publisher: "Autos Bustamante",
  metadataBase: new URL("https://autosbustamante.com"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://autosbustamante.com",
    siteName: "Autos Bustamante",
    title: "Autos Bustamante - Venta de Coches de Segunda Mano",
    description: "Concesionario de vehículos de segunda mano en Cabra, Córdoba. Amplio catálogo con garantía y financiación.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autos Bustamante - Venta de Coches de Segunda Mano",
    description: "Concesionario de vehículos de segunda mano en Cabra, Córdoba.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Reemplazar con código real de Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.variable} ${unbounded.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
