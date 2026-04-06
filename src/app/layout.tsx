import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fortis Brothers | Full-Service Construction & Remodeling in Miami, FL",
  description:
    "Fortis Brothers is a licensed full-service construction and remodeling company serving Miami Beach and South Florida. We specialize in framing, drywall, interior finishes, bathroom renovations, stucco, and flooring installation. Free estimates available.",
  keywords: [
    "construction company Miami",
    "remodeling Miami Beach",
    "bathroom renovation Miami",
    "flooring installation South Florida",
    "drywall contractor Miami",
    "stucco repair Miami Beach",
    "framing contractor Florida",
    "interior finishes Miami",
    "home renovation Miami Beach FL",
    "commercial construction Miami",
    "general contractor Miami Beach",
    "kitchen remodeling Miami",
  ],
  openGraph: {
    title: "Fortis Brothers | Construction & Remodeling | Miami, FL",
    description:
      "Full-service construction and remodeling in Miami Beach. Framing, drywall, bathrooms, stucco, flooring, and interior finishes. Everything under one roof.",
    url: "https://fortisbrothers.com",
    siteName: "Fortis Brothers",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://fortisbrothers.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Fortis Brothers",
  image: "https://fortisbrothers.com/images/hero.jpg",
  url: "https://fortisbrothers.com",
  telephone: "+1-786-XXX-XXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8201 Abbott Avenue #4",
    addressLocality: "Miami Beach",
    addressRegion: "FL",
    postalCode: "33141",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.8527,
    longitude: -80.1284,
  },
  areaServed: [
    "Miami Beach",
    "Miami",
    "South Beach",
    "Coral Gables",
    "Coconut Grove",
    "Brickell",
    "Wynwood",
    "Fort Lauderdale",
    "South Florida",
  ],
  priceRange: "$$",
  openingHours: "Mo-Sa 07:00-18:00",
  sameAs: ["https://www.instagram.com/fortisbrothers/"],
  description:
    "Licensed full-service construction and remodeling company serving Miami Beach and South Florida. Specializing in framing, drywall, interior finishes, bathroom renovations, stucco, and flooring.",
  serviceType: [
    "Framing",
    "Drywall Installation",
    "Interior Finishes",
    "Bathroom Renovation",
    "Stucco Application",
    "Flooring Installation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise-overlay bg-cream text-espresso antialiased">
        {children}
      </body>
    </html>
  );
}
