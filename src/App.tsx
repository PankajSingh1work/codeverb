
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { SEOWrapper } from './components/SEOWrapper';
import { ScrollToTop } from './components/ScrollToTop';
import { DynamicFavicon } from './components/DynamicFavicon';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNavigation = (page: string) => {
    navigate(`/${page === 'home' ? '' : page}`);
    // Note: ScrollToTop component handles the scrolling automatically
  };

  // Get current page from location
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/project/')) return 'project-detail';
    if (path.startsWith('/certification/')) return 'certification-detail';
    return path.substring(1); // Remove leading slash
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full">
      <ScrollToTop />
      <DynamicFavicon isDarkMode={isDarkMode} />
      
      <NavBar
        currentPage={getCurrentPage()}
        onNavigate={handleNavigation}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full overflow-x-hidden"
          role="main"
          aria-label="Main content"
          tabIndex={-1}
        >
          <Routes>
            <Route 
              path="/" 
              element={
                <SEOWrapper>
                  <HomePage onNavigate={handleNavigation} />
                </SEOWrapper>
              } 
            />
            <Route 
              path="/about" 
              element={
                <SEOWrapper>
                  <AboutPage />
                </SEOWrapper>
              } 
            />
            <Route 
              path="/services" 
              element={
                <SEOWrapper>
                  <ServicesPage onNavigate={handleNavigation} />
                </SEOWrapper>
              } 
            />
            <Route 
              path="/project/:id/:slug?" 
              element={
                <SEOWrapper>
                  <ProjectDetailPage onNavigate={handleNavigation} />
                </SEOWrapper>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <SEOWrapper>
                  <ProjectsPage onNavigate={handleNavigation} />
                </SEOWrapper>
              } 
            />
            <Route 
              path="/certification/:id/:slug?" 
              element={
                <SEOWrapper>
                  <CertificationDetailPage onNavigate={handleNavigation} />
                </SEOWrapper>
              } 
            />
            <Route 
              path="/certifications" 
              element={
                <SEOWrapper>
                  <CertificationsPage onNavigate={handleNavigation} />
                </SEOWrapper>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <SEOWrapper>
                  <ContactPage />
                </SEOWrapper>
              } 
            />
            {/* Redirect any unknown routes to home */}
            <Route 
              path="*" 
              element={
                <SEOWrapper>
                  <HomePage onNavigate={handleNavigation} />
                </SEOWrapper>
              } 
            />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer onNavigate={handleNavigation} />

      <Toaster />
    </div>
  );
}