import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fortis-brothers.com"),
  title: {
    default:
      "Fortis Brothers | General Contractor & Remodeling Company in Miami Beach, FL",
    template: "%s | Fortis Brothers Construction Miami",
  },
  description:
    "Fortis Brothers is a licensed general contractor and full-service remodeling company in Miami Beach, FL. We handle framing, drywall, bathroom renovations, interior finishes, stucco, and flooring installation across Miami-Dade and Broward counties. English-speaking crew. Free estimates. Call (305) 922-3498.",
  keywords: [
    "general contractor Miami Beach",
    "construction company Miami FL",
    "remodeling contractor Miami Beach",
    "bathroom renovation Miami",
    "bathroom remodel Miami Beach",
    "flooring installation Miami",
    "flooring contractor South Florida",
    "drywall contractor Miami",
    "drywall installation Miami Beach",
    "stucco contractor Miami",
    "stucco repair South Florida",
    "framing contractor Miami",
    "interior finishes Miami Beach",
    "home renovation Miami Beach FL",
    "commercial construction Miami",
    "kitchen remodeling Miami Beach",
    "construction company near me Miami",
    "licensed contractor Miami-Dade",
    "residential contractor Coral Gables",
    "contractor Brickell",
    "contractor Coconut Grove",
    "contractor Wynwood",
    "tile installation Miami",
    "luxury vinyl plank Miami",
    "crown molding installation Miami",
    "English speaking contractor Miami",
  ],
  openGraph: {
    title: "Fortis Brothers | General Contractor in Miami Beach, FL",
    description:
      "Licensed full-service construction and remodeling in Miami Beach. Framing, drywall, bathrooms, stucco, flooring, and interior finishes. 5.0 Google Rating. Free estimates. (305) 922-3498.",
    url: "https://fortis-brothers.com",
    siteName: "Fortis Brothers Construction",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/bathroom-luxury.jpg",
        width: 1200,
        height: 900,
        alt: "Luxury bathroom renovation by Fortis Brothers in Miami Beach, FL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortis Brothers | General Contractor Miami Beach, FL",
    description:
      "Licensed construction & remodeling in Miami. Framing, drywall, bathrooms, stucco, flooring. 5.0 Google Rating. (305) 922-3498.",
    images: ["/images/bathroom-luxury.jpg"],
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
  alternates: {
    canonical: "https://fortis-brothers.com",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    // Add Google Search Console verification code here once you have it
    // google: "your-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Fortis Brothers",
  legalName: "Fortis Brothers Construction LLC",
  image: "https://fortis-brothers.com/images/logo.png",
  logo: "https://fortis-brothers.com/images/logo.png",
  url: "https://fortis-brothers.com",
  telephone: "+1-305-922-3498",
  email: "contact@fortis-brothers.com",
  foundingDate: "2018",
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
    { "@type": "City", name: "Miami Beach" },
    { "@type": "City", name: "Miami" },
    { "@type": "City", name: "Coral Gables" },
    { "@type": "City", name: "Coconut Grove" },
    { "@type": "City", name: "Brickell" },
    { "@type": "City", name: "Wynwood" },
    { "@type": "City", name: "Key Biscayne" },
    { "@type": "City", name: "Aventura" },
    { "@type": "City", name: "Fort Lauderdale" },
    { "@type": "City", name: "Hollywood" },
    { "@type": "City", name: "Pinecrest" },
    { "@type": "City", name: "Surfside" },
    { "@type": "City", name: "Bal Harbour" },
    { "@type": "State", name: "Florida" },
  ],
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Check, Credit Card",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://www.instagram.com/fortisbrothers/"],
  description:
    "Licensed full-service construction and remodeling company serving Miami Beach and South Florida. Specializing in framing, drywall, interior finishes, bathroom renovations, stucco, and flooring. English-speaking crew. Free estimates available.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction & Remodeling Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Framing",
        description:
          "Wood and metal stud framing for residential and commercial projects in Miami-Dade County",
      },
      {
        "@type": "OfferCatalog",
        name: "Drywall Installation",
        description:
          "Full drywall installation, taping, mudding, and Level 5 finishing in Miami",
      },
      {
        "@type": "OfferCatalog",
        name: "Interior Finishes",
        description:
          "Trim carpentry, crown molding, baseboards, shiplap, and custom millwork in Miami Beach",
      },
      {
        "@type": "OfferCatalog",
        name: "Bathroom Renovation",
        description:
          "Complete bathroom remodels including tile, freestanding tubs, glass showers, and waterproofing in Miami",
      },
      {
        "@type": "OfferCatalog",
        name: "Stucco Application",
        description:
          "Three-coat stucco systems and EIFS for residential and commercial exteriors in South Florida",
      },
      {
        "@type": "OfferCatalog",
        name: "Flooring Installation",
        description:
          "Luxury vinyl plank, hardwood, porcelain tile, and natural stone flooring installation in Miami",
      },
    ],
  },
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
