import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zenbethel.com"),
  title: "ZEN Sushi · Bethel, AK — Asian & American Cuisine",
  description:
    "ZEN Sushi — family-run Japanese, Korean, Chinese & American cuisine in Bethel, Alaska. Dine-in, takeout, and no-contact delivery. Open daily from 11 AM.",
  keywords: [
    "ZEN Sushi",
    "Bethel Alaska",
    "sushi Bethel",
    "Japanese restaurant Alaska",
    "Korean food Bethel",
    "Asian fusion",
    "ZEN Bethel",
  ],
  authors: [{ name: "ZEN Sushi" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/zen/favicon.svg",
    apple: "/zen/favicon.svg",
  },
  openGraph: {
    title: "ZEN Sushi · Bethel, AK",
    description:
      "Family-run Japanese, Korean, Chinese & American cuisine in Bethel, Alaska.",
    url: "https://zenbethel.com",
    siteName: "ZEN Sushi",
    type: "website",
    images: ["/zen/hero-sushi.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEN Sushi · Bethel, AK",
    description:
      "Family-run Japanese, Korean, Chinese & American cuisine in Bethel, Alaska.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased bg-ink text-ivory font-sans`}
      >
        {children}
        <Toaster />
        <SonnerToaster
          position="top-center"
          toastOptions={{
            style: {
              background: "oklch(0.18 0.012 270)",
              color: "oklch(0.96 0.008 90)",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
      </body>
    </html>
  );
}
