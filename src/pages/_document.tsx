import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Primary Meta Tags */}
        <meta name="title" content="100xSystems - Transform Developers into 100xEngineers" />
        <meta name="description" content="Comprehensive platform for structured software engineering education and system optimization. Transform into a 100xEngineer through depth-first learning methodologies, machine-readable configurations, and scalable system patterns." />
        <meta name="keywords" content="100xEngineer, software engineering, system design, development education, scalable systems, AI integration, technical learning, programming patterns, system optimization, Next.js, React" />
        <meta name="author" content="100xSystems" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.100xsystems.dev/" />
        <meta property="og:title" content="100xSystems - Transform Developers into 100xEngineers" />
        <meta property="og:description" content="Comprehensive platform for structured software engineering education and system optimization. Transform into a 100xEngineer through depth-first learning methodologies." />
        <meta property="og:image" content="https://www.100xsystems.dev/100xsystems.webp" />
        <meta property="og:image:alt" content="100xSystems Logo" />
        <meta property="og:site_name" content="100xSystems" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.100xsystems.dev/" />
        <meta property="twitter:title" content="100xSystems - Transform Developers into 100xEngineers" />
        <meta property="twitter:description" content="Comprehensive platform for structured software engineering education and system optimization. Transform into a 100xEngineer through depth-first learning methodologies." />
        <meta property="twitter:image" content="https://www.100xsystems.dev/100xsystems.webp" />
        <meta property="twitter:image:alt" content="100xSystems Logo" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="application-name" content="100xSystems" />
        <meta name="apple-mobile-web-app-title" content="100xSystems" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Favicon */}
        <link rel="icon" href="/100xsystemsblacklogo.webp" />
        <link rel="apple-touch-icon" href="/100xsystems.webp" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.100xsystems.dev/" />
        
        {/* Additional SEO */}
        <meta name="category" content="Technology, Education, Software Engineering" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "100xSystems",
              "url": "https://www.100xsystems.dev",
              "logo": "https://www.100xsystems.dev/100xsystems.webp",
              "description": "Comprehensive platform for structured software engineering education and system optimization, designed to transform developers into 100xEngineers through depth-first learning methodologies.",
              "sameAs": [
                "https://www.linkedin.com/company/100xsystems/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "admin@100xsystems.dev",
                "contactType": "customer service"
              },
              "offers": {
                "@type": "Offer",
                "description": "Structured software engineering education and system optimization resources",
                "category": "Educational Services"
              }
            })
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
