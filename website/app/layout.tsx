import type { Metadata } from "next";
import Link from "next/link";
import { Loading } from "@/presentation/features/loading.feature";
import { FooterWrapper } from "./layout-footer-wrapper";
import { HeaderWrapper } from "./layout-header-wrapper";
import Script from "next/script";
import "./globals.css";
import { ScrollRestoration } from "./scroll-restoration";

// Ensure highlight.js CSS is available for syntax highlighting in MDX
import "highlight.js/styles/github.css";

export const metadata: Metadata = {
  title: {
    default: "100xSystems - Transform Developers into 100xEngineers",
    template: "%s - 100xSystems",
  },
  description:
    "Comprehensive platform for structured software engineering education and system optimization. Transform into a 100xEngineer through depth-first learning methodologies.",
  keywords: [
    "100xEngineer",
    "software engineering",
    "system design",
    "development education",
    "scalable systems",
    "systems thinking",
    "technical learning",
    "programming patterns",
    "system optimization",
    "Next.js",
    "React",
  ],
  authors: [{ name: "100xSystems" }],
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.100xsystems.dev"),
  openGraph: {
    type: "website",
    url: "https://www.100xsystems.dev/",
    title: "100xSystems - Transform Developers into 100xEngineers",
    description:
      "Comprehensive platform for structured software engineering education and system optimization. Transform into a 100xEngineer through depth-first learning methodologies.",
    images: [
      {
        url: "https://www.100xsystems.dev/100xsystems.webp",
        alt: "100xSystems Logo",
      },
    ],
    siteName: "100xSystems",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "100xSystems - Transform Developers into 100xEngineers",
    description:
      "Comprehensive platform for structured software engineering education and system optimization.",
    images: ["https://www.100xsystems.dev/100xsystems.webp"],
  },
  icons: {
    icon: "/100xsystemsblacklogo.webp",
    apple: "/100xsystems.webp",
  },
  other: {
    "google-adsense-account": "ca-pub-6524892676012386",
    "msapplication-TileColor": "#ffffff",
    "application-name": "100xSystems",
    "apple-mobile-web-app-title": "100xSystems",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    category: "Technology, Education, Software Engineering",
    coverage: "Worldwide",
    distribution: "Global",
    rating: "General",
  },
};

const headerItems = [
  { id: 'systems', label: 'Systems', href: '/systems' },
  { id: 'knowledge', label: 'Knowledge Base', children: [
    { id: 'principles', label: 'Principles', href: '/principles', description: 'Foundational engineering principles' },
    { id: 'patterns', label: 'Patterns', href: '/patterns', description: 'Design patterns & blueprints' },
    { id: 'tools', label: 'Tools', href: '/tools', description: 'Essential dev tools' },
    { id: 'technologies', label: 'Technologies', href: '/technologies', description: 'Key technologies & platforms' },
  ]},
  { id: 'cli-docs', label: 'CLI Docs', href: '/cli-docs' },
  { id: 'search', label: 'Search', href: '/search' },

];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://www.100xsystems.dev/" />
      </head>
      <body className="antialiased">
        <ScrollRestoration />
        <Loading />
        <HeaderWrapper
          items={headerItems}
          logo={
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/assets/cubix/base/cubix-brand-logo.png"
                alt="Cubix"
                className="h-10 w-auto lg:h-12"
              />
              <span className="text-xl lg:text-2xl font-extrabold text-fg tracking-tight select-none uppercase">
                100XSYSTEMS
              </span>
            </Link>
          }
        />
        <main>{children}</main>
        <FooterWrapper />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6524892676012386"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script
          id="schema-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "100xSystems",
              url: "https://www.100xsystems.dev",
              logo: "https://www.100xsystems.dev/100xsystems.webp",
              description:
                "Comprehensive platform for structured software engineering education and system optimization, designed to transform developers into 100xEngineers through depth-first learning methodologies.",
              sameAs: ["https://www.linkedin.com/company/100xsystems/"],
              contactPoint: {
                "@type": "ContactPoint",
                email: "admin@100xsystems.dev",
                contactType: "customer service",
              },
              offers: {
                "@type": "Offer",
                description:
                  "Structured software engineering education and system optimization resources",
                category: "Educational Services",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
