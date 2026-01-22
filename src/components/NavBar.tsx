import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

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
    { label: 'Home', page: 'home', path: '/' },
    { label: 'About', page: 'about', path: '/about' },
    { label: 'Services', page: 'services', path: '/services' },
    { label: 'Projects', page: 'projects', path: '/projects' },
    { label: 'Certifications', page: 'certifications', path: '/certifications' },
    { label: 'Contact', page: 'contact', path: '/contact' }
  ];

  // Helper to compute scrolled classes, skipping blur when menu is open
  const getScrolledClasses = () => {
    if (!isScrolled) return 'bg-transparent';
    if (isMenuOpen) return 'bg-background/95 shadow-sm'; // No blur to avoid containing block issue
    return 'bg-background/95 backdrop-blur-sm shadow-sm';
  };

  const isActivePage = (page: string, path: string) => {
    if (page === 'home') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${getScrolledClasses()}`} // Removed overflow-x-hidden to prevent clipping
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer flex items-center space-x-2"
            aria-label="Go to home page"
          >
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={isDarkMode ? '/logo/logoDark.jpg' : '/logo/logoLight.jpg'} 
                alt="Pankaj Singh Logo"
                className="h-12 w-12 object-contain"
              />
              <h2 className="text-white-900">Pankaj Singh</h2>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.page}
                className="relative flex flex-col"
              >
                <Link to={item.path}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative transition-colors hover:text-primary pb-1 ${
                      isActivePage(item.page, item.path) ? 'text-primary' : 'text-foreground'
                    }`}
                    aria-current={isActivePage(item.page, item.path) ? 'page' : undefined}
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
                </Link>
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
          animate={{ x: '15%' }} // Changed to full slide-in (no partial clip)
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} // Slightly faster easing for smoother start, cubic-bezier for momentum
          className="h-full md:hidden fixed top-0 right-0  w-3/4 bg-background border-l border-border z-[60] shadow-xl" // Bumped z-index slightly higher
          style={{ willChange: 'transform' }} // Hardware accel hint for smoother animation
          role="menu"
          aria-orientation="vertical"
        >
          <div className="flex flex-col h-full ">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1 flex-1 bg-background h-full">
              {navItems.map((item) => (
                <Link key={item.page} to={item.path}>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      isActivePage(item.page, item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    aria-current={isActivePage(item.page, item.path) ? 'page' : undefined}
                    aria-label={`Navigate to ${item.label} page`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}