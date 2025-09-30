import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function NavBar({ currentPage, onNavigate, isDarkMode, toggleDarkMode }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Projects', page: 'projects' },
    { label: 'Certifications', page: 'certifications' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full overflow-x-hidden ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer flex items-center space-x-2"
            onClick={() => onNavigate('home')}
            aria-label="Go to home page"
          >
            <img 
              src={isDarkMode ? '/logo/logoDark.jpg' : '/logo/logoLight.jpg'} 
              alt="Pankaj Singh Logo"
              className="h-12 w-12 object-contain"
            />
            <h2 className="text-white-900">Pankaj Singh</h2>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.page}
                className="relative flex flex-col"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(item.page)}
                  className={`relative transition-colors hover:text-primary pb-1 ${
                    currentPage === item.page ? 'text-primary' : 'text-foreground'
                  }`}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label} page`}
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-primary"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <div className="flex items-center space-x-2" aria-label="Dark mode toggle">
              <Sun className="h-4 w-4" aria-hidden="true" />
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} aria-label="Toggle dark mode" />
              <Moon className="h-4 w-4" aria-hidden="true" />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ x: '100%' }}
          animate={{ x: '25%' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="md:hidden fixed top-0 right-0 h-full w-3/4 bg-background border-l border-border z-50 shadow-xl"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    currentPage === item.page
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label} page`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}