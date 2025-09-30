
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { ProjectsPage } from './components/ProjectsPage';
import { CertificationsPage } from './components/CertificationsPage';
import { ContactPage } from './components/ContactPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { CertificationDetailPage } from './components/CertificationDetailPage';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'about' | 'services' | 'projects' | 'certifications' | 'contact' | 'project-detail' | 'certification-detail' | string;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentPage.startsWith('project-detail/')) {
      const id = parseInt(currentPage.split('/')[1]);
      if (!isNaN(id)) {
        return <ProjectDetailPage onNavigate={handleNavigation} projectId={id} />;
      }
    } else if (currentPage.startsWith('certification-detail/')) {
      const id = parseInt(currentPage.split('/')[1]);
      if (!isNaN(id)) {
        return <CertificationDetailPage onNavigate={handleNavigation} certificationId={id} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigation} />;
      case 'projects':
        return <ProjectsPage onNavigate={handleNavigation} />;
      case 'certifications':
        return <CertificationsPage onNavigate={handleNavigation} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full">
      <NavBar
        currentPage={currentPage}
        onNavigate={handleNavigation}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full overflow-x-hidden"
          role="main"
          aria-label="Main content"
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      <Footer onNavigate={handleNavigation} />

      <Toaster />
    </div>
  );
}