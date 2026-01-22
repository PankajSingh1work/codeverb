import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { ProjectsSection } from './ProjectsSection';
import { CertificationsSection } from './CertificationsSection';
import { ContactSection } from './ContactSection';
import { StructuredData, PersonSchema, WebsiteSchema, LocalBusinessSchema } from './StructuredData';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="w-full overflow-x-hidden">
      <StructuredData data={PersonSchema} />
      <StructuredData data={WebsiteSchema} />
      <StructuredData data={LocalBusinessSchema} />
      
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
      <ServicesSection onNavigate={onNavigate} />
      <ProjectsSection onNavigate={onNavigate} />
      <CertificationsSection onNavigate={onNavigate} />
      <ContactSection />
    </div>
  );
}