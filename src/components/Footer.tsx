
import { motion } from 'motion/react';
import { FaInstagram, FaMedium, FaYoutube } from 'react-icons/fa';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Projects', page: 'projects' },
    { label: 'Certifications', page: 'certifications' },
    { label: 'Contact', page: 'contact' }
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/PankajSingh1work', ariaLabel: 'Visit Pankaj Singh on GitHub' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/pankajsingh1work/', ariaLabel: 'Connect with Pankaj Singh on LinkedIn' },
    { icon: FaMedium, label: 'Medium', href: 'https://medium.com/@rawatpanku991', ariaLabel: 'Read articles by Pankaj Singh on Medium' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/codeverb.in/', ariaLabel: 'Follow Pankaj Singh on Instagram' },
    { icon: Mail, label: 'Email', href: 'mailto:pankajsingh1work@gmail.com', ariaLabel: 'Email Pankaj Singh' },
    { icon: FaYoutube, label: 'YouTube', href: 'https://www.youtube.com/@codeverb-in', ariaLabel: 'Subscribe to Pankaj Singh on YouTube' }
  ];

  return (
    <footer className="bg-card border-t border-border" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-primary">Pankaj Singh</h3>
            <p className="text-muted-foreground">
              Full-Stack & Mobile Developer crafting innovative web and mobile solutions with clean code and modern design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4>Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.page}
                  whileHover={{ x: 5 }}
                  onClick={() => onNavigate(link.page)}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`Navigate to ${link.label} page`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4>Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.ariaLabel}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground flex items-center justify-center space-x-1">
            <span>© 2025 Pankaj Singh. Made with</span>
            <Heart className="h-4 w-4 text-red-500" aria-hidden="true" />
            <span>and lots of coffee.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
