import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ChevronDown, Download, Mail, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Helmet } from 'react-helmet-async';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Pankaj Singh | Full-Stack Developer</title>
        <meta
          name="description"
          content="Pankaj Singh, a skilled Full-Stack Developer and Mobile-Oriented Designer, creates exceptional digital experiences with modern technologies."
        />
        <meta
          name="keywords"
          content="Pankaj Singh, full-stack developer, mobile designer, web development, software engineer, clean code, UI/UX design"
        />
        <meta name="author" content="Pankaj Singh" />
        <meta property="og:title" content="Pankaj Singh | Full-Stack Developer" />
        <meta
          property="og:description"
          content="Explore Pankaj Singh's portfolio, showcasing innovative web and mobile solutions built with modern technologies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/PankajSinghProfile.jpg" />
        <meta property="og:url" content="https://www.codeverb.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pankaj Singh | Full-Stack Developer" />
        <meta
          name="twitter:description"
          content="Discover Pankaj Singh's expertise in full-stack development and mobile-oriented design."
        />
        <meta name="twitter:image" content="/PankajSinghProfile.jpg" />
        <link rel="canonical" href="https://www.codeverb.in" />
      </Helmet>

      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden w-full"
        role="banner"
        aria-label="Hero Section"
      >
        {/* Background with parallax effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"
          aria-hidden="true"
        />

        {/* Animated background elements */}
        <div className="absolute inset-0" aria-hidden="true">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20"
            >
              <ImageWithFallback
                src="/PankajSinghProfile.jpg"
                alt="Pankaj Singh, Full-Stack Developer"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-4"
              >
                Pankaj Singh
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-xl sm:text-2xl lg:text-3xl text-secondary mb-6"
              >
                Full-Stack & Mobile Developer
              </motion.h2>
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Crafting innovative web and mobile solutions with clean code and modern design.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => onNavigate('projects')}
                className="group"
                aria-label="View Pankaj Singh's projects"
              >
                View My Projects
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('contact')}
                className="group"
                aria-label="Contact Pankaj Singh"
              >
                <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                Get In Touch
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="group"
                onClick={() => window.open('/PankajSinghResume.pdf', '_blank')}
                aria-label="Download Pankaj Singh's resume"
              >
                <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
