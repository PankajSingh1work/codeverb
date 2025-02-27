// src/app/layout.js
import './globals.css';

// Separate viewport export
export const viewport = {
  width: 'device-width',
  initialscale: 1.0,
};

export const metadata = {
  metadataBase: new URL('https://codeverb.in'),
  title: {
    default: "Pankaj Singh - Mobile App Developer",
    template: "%s | Pankaj Singh",
  },
  description: "Portfolio of Pankaj Singh, a mobile app developer specializing in Android, iOS, UI/UX design, and innovative tech solutions.",
  keywords: "Pankaj Singh, mobile app developer, Android, iOS, UI/UX, portfolio, technology, Codeverb, Dehradun, Uttarakhand",
  creator: "Pankaj Singh",
  publisher: "Pankaj Singh",
  robots: "index, follow",
  charset: "UTF-8",
  openGraph: {
    title: "Pankaj Singh - Mobile App Developer",
    description: "Explore the portfolio of Pankaj Singh, showcasing expertise in mobile app development and innovative solutions.",
    url: "https://codeverb.in",
    type: "website",
    locale: "en_US",
    siteName: "Pankaj Singh Portfolio",
    images: [
      {
        url: "https://codeverb.in/Logo_1024w_white.svg",
        width: 1024,
        height: 1024,
        alt: "Pankaj Singh Logo",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Singh - Mobile App Developer",
    description: "Portfolio of Pankaj Singh, a mobile app developer.",
    image: "https://codeverb.in/Logo_1024w_white.svg",
    creator: "@pankaj_rawat_991",
  },
  alternates: {
    canonical: "https://codeverb.in",
  },
};




// Structured data for the entire site (unchanged except for absolute image URL)
const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://codeverb.in",
      name: "Pankaj Singh",
      jobTitle: "Mobile App Developer",
      url: "https://codeverb.in",
      sameAs: [
        "https://instagram.com/pankaj_rawat_991",
        "https://linkedin.com/in/pankajsingh1work",
        "https://github.com/PankajSingh1work",
      ],
      description: "A passionate mobile app developer specializing in Android, iOS, and UI/UX design.",
      image: "https://codeverb.in/Logo_1024w_white.svg", // Absolute URL
    },
    {
      "@type": "WebSite",
      url: "https://codeverb.in",
      name: "Pankaj Singh Portfolio",
      description: "Portfolio showcasing Pankaj Singh's projects, certificates, and skills in mobile app development.",
      publisher: {
        "@id": "https://codeverb.in",
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Essential Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Base Title (Next.js handles this via metadata, but kept for fallback) */}
        <title>{metadata.title.default}</title>

        {/* Font Awesome - Updated to latest version, async loading */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          rel="stylesheet"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          // Remove async attribute since some icons are used in SSR components
        />

        {/* Favicon and Icon Links */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload Critical Assets */}
        <link rel="preload" href="/Logo_1024w_white.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Preconnect to External Resources */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />

        {/* Structured Data Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
      </head>
      <body className="bg-[#121212] text-[#E0E0E0]">
        {children}
      </body>
    </html>
  );
}