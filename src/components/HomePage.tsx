import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { ProjectsSection } from './ProjectsSection';
import { CertificationsSection } from './CertificationsSection';
import { ContactSection } from './ContactSection';
import { Helmet } from 'react-helmet-async';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="w-full overflow-x-hidden">
      <Helmet>
        <title>Pankaj Singh | Full-Stack & Mobile Developer in Dehradun</title>
        <meta
          name="description"
          content="Welcome to Pankaj Singh's portfolio, showcasing expertise in web development, mobile app development, UI/UX design, and digital consulting from Dehradun, Uttarakhand. Explore projects, services, and certifications."
        />
        <meta
          name="keywords"
          content="Pankaj Singh, full-stack developer, mobile developer, web development, UI/UX design, digital consulting, React, Next.js, Flutter, React Native, Dehradun, Uttarakhand, portfolio"
        />
        <meta name="author" content="Pankaj Singh" />
        <meta property="og:title" content="Pankaj Singh | Full-Stack & Mobile Developer in Dehradun" />
        <meta
          property="og:description"
          content="Discover Pankaj Singh's portfolio featuring web and mobile development, UI/UX design, and digital consulting services, based in Dehradun, Uttarakhand."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/PankajSinghProfile.jpg" />
        <meta property="og:url" content="https://www.codeverb.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pankaj Singh | Full-Stack & Mobile Developer in Dehradun" />
        <meta
          name="twitter:description"
          content="Explore Pankaj Singh's professional portfolio in web and mobile development, UI/UX design, and digital consulting, from Dehradun, Uttarakhand."
        />
        <meta name="twitter:image" content="/PankajSinghProfile.jpg" />
        <link rel="canonical" href="https://www.codeverb.in" />
      </Helmet>
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
      <ServicesSection onNavigate={onNavigate} />
      <ProjectsSection onNavigate={onNavigate} />
      <CertificationsSection onNavigate={onNavigate} />
      <ContactSection />
    </div>
  );
}