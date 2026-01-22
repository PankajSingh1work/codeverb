import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import projectsData from '../lib/projects.json';
import certificationsData from '../lib/certifications.json';
import { extractIdFromPath } from '../utils/slugify';

interface SEOWrapperProps {
  children: React.ReactNode;
}

interface PageSEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
}

export function SEOWrapper({ children }: SEOWrapperProps) {
  const location = useLocation();
  const params = useParams();
  
  const baseUrl = 'https://www.codeverb.in';
  const defaultImage = '/PankajSinghProfile.jpg';

  const getPageSEOData = (): PageSEOData => {
    const path = location.pathname;

    switch (true) {
      case path === '/':
        return {
          title: 'Pankaj Singh | Full-Stack & Mobile Developer in Dehradun',
          description: 'Welcome to Pankaj Singh\'s portfolio, showcasing expertise in web development, mobile app development, UI/UX design, and digital consulting from Dehradun, Uttarakhand. Explore projects, services, and certifications.',
          keywords: 'Pankaj Singh, full-stack developer, mobile developer, web development, UI/UX design, digital consulting, React, Next.js, Flutter, React Native, Dehradun, Uttarakhand, portfolio',
          canonical: baseUrl,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Pankaj Singh",
            "jobTitle": "Full-Stack & Mobile Developer",
            "description": "Pankaj Singh is a skilled developer specializing in web and mobile app development, UI/UX design, and digital consulting, based in Dehradun, Uttarakhand.",
            "url": baseUrl,
            "image": `${baseUrl}${defaultImage}`,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dehradun",
              "addressRegion": "Uttarakhand",
              "addressCountry": "India"
            }
          }
        };

      case path === '/about':
        return {
          title: 'About Pankaj Singh | Full-Stack Developer & UI/UX Designer',
          description: 'Learn about Pankaj Singh, a passionate full-stack developer and UI/UX designer from Dehradun, Uttarakhand. Discover his journey, skills, and expertise in modern web and mobile technologies.',
          keywords: 'Pankaj Singh about, full-stack developer biography, UI/UX designer, web developer skills, mobile app developer, Dehradun developer, React expert, Flutter developer',
          canonical: `${baseUrl}/about`
        };

      case path === '/services':
        return {
          title: 'Development Services | Web & Mobile App Development by Pankaj Singh',
          description: 'Professional web development, mobile app development, UI/UX design, and digital consulting services by Pankaj Singh. Expert in React, Next.js, Flutter, and modern technologies.',
          keywords: 'web development services, mobile app development, UI/UX design services, digital consulting, React development, Flutter development, Next.js development, Dehradun developer services',
          canonical: `${baseUrl}/services`,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Web & Mobile Development Services",
            "description": "Professional development services including web applications, mobile apps, UI/UX design, and digital consulting",
            "provider": {
              "@type": "Person",
              "name": "Pankaj Singh"
            },
            "areaServed": "India",
            "serviceType": ["Web Development", "Mobile App Development", "UI/UX Design", "Digital Consulting"]
          }
        };

      case path === '/projects':
        return {
          title: 'Portfolio Projects | Web & Mobile Apps by Pankaj Singh',
          description: 'Explore Pankaj Singh\'s portfolio of web applications, mobile apps, and UI/UX projects. See real-world implementations using React, Flutter, Next.js, and modern technologies.',
          keywords: 'Pankaj Singh projects, web development portfolio, mobile app portfolio, React projects, Flutter apps, Next.js applications, UI/UX design portfolio',
          canonical: `${baseUrl}/projects`
        };

      case path.startsWith('/project/'):
        const projectId = extractIdFromPath(path);
        const project = projectId ? projectsData.projects.find(p => p.id === projectId) : null;
        
        if (project) {
          return {
            title: `${project.title} | Pankaj Singh - ${project.category} Project`,
            description: `Explore ${project.title}, a ${project.category} project by Pankaj Singh. ${project.subtitle}. Built with ${project.techStack.slice(0, 3).map(tech => tech.name).join(', ')} and more. View live demo and source code.`,
            keywords: `${project.title}, ${project.category}, Pankaj Singh, web development, mobile development, ${project.techStack.map(tech => tech.name).join(', ')}, Dehradun developer, portfolio project`,
            canonical: `${baseUrl}/project/${project.id}/${project.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')}`,
            ogImage: project.images[0]?.url || defaultImage,
            structuredData: {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": project.title,
              "description": project.description,
              "author": {
                "@type": "Person",
                "name": "Pankaj Singh"
              },
              "dateCreated": project.year,
              "url": `${baseUrl}/project/${project.id}`,
              "image": project.images[0]?.url ? `${baseUrl}${project.images[0].url}` : `${baseUrl}${defaultImage}`,
              "keywords": project.techStack.map(tech => tech.name).join(', ')
            }
          };
        }
        
        return {
          title: `Project Details | Pankaj Singh - Developer Portfolio`,
          description: `Detailed view of a portfolio project by Pankaj Singh. Explore the technologies used, features implemented, and development process.`,
          keywords: `Pankaj Singh project, web development case study, mobile app development, project details, React project, Flutter app`,
          canonical: `${baseUrl}${path}`
        };

      case path === '/certifications':
        return {
          title: 'Certifications & Achievements | Pankaj Singh Developer Credentials',
          description: 'View Pankaj Singh\'s professional certifications and achievements in web development, mobile development, UI/UX design, and related technologies from recognized institutions.',
          keywords: 'Pankaj Singh certifications, developer certifications, web development certificates, mobile development credentials, UI/UX certifications, professional achievements',
          canonical: `${baseUrl}/certifications`
        };

      case path.startsWith('/certification/'):
        const certId = extractIdFromPath(path);
        const cert = certId ? certificationsData.certifications.find(c => c.id === certId) : null;
        
        if (cert) {
          return {
            title: `${cert.title} | Pankaj Singh - ${cert.issuer} Certification`,
            description: `${cert.title} certification earned by Pankaj Singh from ${cert.issuer}. ${cert.subtitle}. Demonstrates expertise in ${cert.skills.slice(0, 3).map(skill => skill.name).join(', ')} and related technologies.`,
            keywords: `${cert.title}, ${cert.issuer}, Pankaj Singh, certification, ${cert.category}, ${cert.skills.map(skill => skill.name).join(', ')}, professional credentials, Dehradun developer`,
            canonical: `${baseUrl}/certification/${cert.id}/${cert.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')}`,
            ogImage: cert.logo || defaultImage,
            structuredData: {
              "@context": "https://schema.org",
              "@type": "EducationalOccupationalCredential",
              "name": cert.title,
              "description": cert.description,
              "credentialCategory": cert.category,
              "recognizedBy": {
                "@type": "Organization",
                "name": cert.issuer
              },
              "dateCreated": cert.date,
              "validUntil": cert.validUntil,
              "credentialSubject": {
                "@type": "Person",
                "name": "Pankaj Singh"
              }
            }
          };
        }
        
        return {
          title: `Certification Details | Pankaj Singh - Professional Credentials`,
          description: `Detailed information about a professional certification earned by Pankaj Singh. View credentials and achievements.`,
          keywords: `Pankaj Singh certification, developer certificate, professional credential, web development certification, mobile development certificate`,
          canonical: `${baseUrl}${path}`
        };

      case path === '/contact':
        return {
          title: 'Contact Pankaj Singh | Hire Full-Stack Developer in Dehradun',
          description: 'Get in touch with Pankaj Singh for web development, mobile app development, UI/UX design, and digital consulting services. Based in Dehradun, Uttarakhand, available for projects worldwide.',
          keywords: 'contact Pankaj Singh, hire full-stack developer, web developer Dehradun, mobile app developer contact, UI/UX designer hire, digital consulting services',
          canonical: `${baseUrl}/contact`,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Pankaj Singh",
            "description": "Contact information for Pankaj Singh, Full-Stack & Mobile Developer",
            "mainEntity": {
              "@type": "Person",
              "name": "Pankaj Singh",
              "email": "pankajsingh1work@gmail.com",
              "telephone": "+91-9058253317",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dehradun",
                "addressRegion": "Uttarakhand",
                "addressCountry": "India"
              }
            }
          }
        };

      default:
        return {
          title: 'Pankaj Singh | Full-Stack & Mobile Developer in Dehradun',
          description: 'Welcome to Pankaj Singh\'s portfolio, showcasing expertise in web development, mobile app development, UI/UX design, and digital consulting from Dehradun, Uttarakhand.',
          keywords: 'Pankaj Singh, full-stack developer, mobile developer, web development, UI/UX design, digital consulting, React, Next.js, Flutter, React Native, Dehradun, Uttarakhand',
          canonical: baseUrl
        };
    }
  };

  const seoData = getPageSEOData();
  const fullImageUrl = seoData.ogImage ? `${baseUrl}${seoData.ogImage}` : `${baseUrl}${defaultImage}`;

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="author" content="Pankaj Singh" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:url" content={seoData.canonical || `${baseUrl}${location.pathname}`} />
        <meta property="og:site_name" content="Pankaj Singh Portfolio" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={fullImageUrl} />
        <meta name="twitter:creator" content="@PankajSinghWork" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={seoData.canonical || `${baseUrl}${location.pathname}`} />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Structured Data */}
        {seoData.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(seoData.structuredData)}
          </script>
        )}
      </Helmet>
      {children}
    </>
  );
}