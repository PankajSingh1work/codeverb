import './globals.css';

export const metadata = {
  // Base metadata for all pages (can be overridden by child pages)
  title: {
    default: "Pankaj Singh - Mobile App Developer",
    template: "%s | Pankaj Singh",
  },
  description: "Portfolio of Pankaj Singh, a mobile app developer specializing in Android, iOS, UI/UX design, and innovative tech solutions.",
  keywords: "Pankaj Singh, mobile app developer, Android, iOS, UI/UX, portfolio, technology, developer , Pankaj Singh Rawat , Pankaj Singh Dehradun , Pankaj Singh Kashipur , Pankaj Singh Mobile Application Developer , Software Engineer , Shivalik College of Engineering , Government Polytechnic Kashipur , Codeverb by Pankaj Singh , Codeverb , Full Stack Developer in India, Web Developer Portfolio, Mobile App Developer in India, Next.js Developer Portfolio, Freelance Web Developer in India, UI/UX Designer & Developer, Best Web Developer in Uttarakhand, Full Stack App Developer in Dehradun, Professional Web Development Services, Hire a Freelance Web Developer, React.js Developer Portfolio, Next.js SEO Optimization Services, Firebase Database Integration, Web App Development Expert, CodeVerb Web Development, UI/UX Designer for Hire, Affordable Website Development India, Frontend Developer in Uttarakhand, Custom Website Development Services, Expert in Mobile App UI/UX, Pankaj Singh Rawat Developer Portfolio, CodeVerb Web & App Development, Hire Pankaj Singh for Web Projects, Best Freelancer Developer in Dehradun, CodeVerb Freelance Services, Pankaj Singh Rawat Full Stack Developer, CodeVerb YouTube Channel, Instagram Web Developer Codever.in, Hire CodeVerb for Custom Web Apps, Dehradun Based App Developer, Web Developer from Shivalik College of Engineering, Dehradun Web & App Development, Uttarakhand Full Stack Developer, Kashipur Website Development Services, Best Developer in Shivalik College, Web & App Solutions in Uttarakhand, Freelancer App Developer Kashipur, Mobile App UI/UX in Uttarakhand, CodeVerb India – Custom Development, Affordable Web Development in Dehradun ",
  creator: "Pankaj Singh",
  publisher: "Pankaj Singh",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
  openGraph: {
    title: "Pankaj Singh - Mobile App Developer",
    description: "Explore the portfolio of Pankaj Singh, showcasing expertise in mobile app development and innovative solutions.",
    url: "https://codeverb.in", // Replace with your actual domain
    type: "website",
    locale: "en_US",
    siteName: "Pankaj Singh Portfolio",
    images: [
      {
        url: "/Logo_1024w_white.svg", // Using your logo as the OG image
        width: 1024, // Match your logo's dimensions
        height: 1024, // Match your logo's dimensions
        alt: "Pankaj Singh Logo",
        type: "image/svg+xml", // Specify SVG MIME type
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pankaj Singh - Mobile App Developer",
    description: "Portfolio of Pankaj Singh, a mobile app developer.",
    image: "/Logo_1024w_white.svg", // Using your logo as the Twitter image
    creator: "@pankaj_rawat_991", // Replace with your Twitter handle if different
  },
  alternates: {
    canonical: "https://codeverb.in", // Replace with your actual domain
  },
};

// Structured data for the entire site (Organization/Person schema)
const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Pankaj Singh",
      jobTitle: "Mobile App Developer",
      url: "https://codeverb.in", // Replace with your actual domain
      sameAs: [
        "https://instagram.com/pankaj_rawat_991",
        "https://linkedin.com/in/pankajsingh1work",
        "https://github.com/PankajSingh1work",
      ],
      description: "A passionate mobile app developer specializing in Android, iOS, and UI/UX design.",
      image: "https://codeverb.in/Logo_1024w_white.svg", // Absolute URL for schema
    },
    {
      "@type": "WebSite",
      url: "https://codeverb.in", // Replace with your actual domain
      name: "Pankaj Singh Portfolio",
      description: "Portfolio showcasing Pankaj Singh's projects, certificates, and skills in mobile app development.",
      publisher: {
        "@id": "https://codeverb.in/#person", // Links to the Person schema
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
        
        {/* Base Title (overridden by page-specific metadata) */}
        <title>{metadata.title.default}</title>
        
        {/* Font Awesome for Icons */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        
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