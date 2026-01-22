import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}

// Common structured data schemas
export const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Pankaj Singh",
  "jobTitle": "Full-Stack & Mobile Developer",
  "description": "Pankaj Singh is a skilled developer specializing in web and mobile app development, UI/UX design, and digital consulting, based in Dehradun, Uttarakhand.",
  "url": "https://www.codeverb.in",
  "image": "https://www.codeverb.in/PankajSinghProfile.jpg",
  "sameAs": [
    "mailto:pankajsingh1work@gmail.com",
    "tel:+919058253317"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dehradun",
    "addressRegion": "Uttarakhand",
    "addressCountry": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9058253317",
    "contactType": "Customer Service",
    "email": "pankajsingh1work@gmail.com",
    "availableLanguage": ["English", "Hindi"]
  }
};

export const WebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Pankaj Singh Portfolio",
  "url": "https://www.codeverb.in",
  "description": "Professional portfolio of Pankaj Singh, showcasing web development, mobile app development, UI/UX design, and digital consulting services from Dehradun, Uttarakhand.",
  "author": PersonSchema,
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.codeverb.in/?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pankaj Singh - Developer Services",
  "description": "Professional services in web development, mobile app development, UI/UX design, and digital consulting by Pankaj Singh in Dehradun, Uttarakhand.",
  "url": "https://www.codeverb.in",
  "telephone": "+91-9058253317",
  "email": "pankajsingh1work@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dehradun",
    "addressLocality": "Dehradun",
    "addressRegion": "Uttarakhand",
    "addressCountry": "India"
  },
  "image": "https://www.codeverb.in/PankajSinghProfile.jpg",
  "sameAs": [
    "https://www.codeverb.in",
    "mailto:pankajsingh1work@gmail.com"
  ],
  "openingHours": "Mo-Fr 09:00-18:00",
  "areaServed": {
    "@type": "Place",
    "name": ["Dehradun", "Uttarakhand", "India"]
  },
  "serviceType": [
    "Web Development",
    "Mobile App Development", 
    "UI/UX Design",
    "Digital Consulting"
  ]
};