import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { FaInstagram, FaMedium, FaYoutube, FaWhatsapp } from 'react-icons/fa';

import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  MessageCircle,
  Calendar,
  Clock,
  Globe,
  Github,
  Linkedin,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'pankajsingh1work@gmail.com',
    href: 'mailto:pankajsingh1work@gmail.com',
    description: 'Best for detailed project discussions',
    available: '24/7'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9058253317',
    href: 'tel:+919058253317',
    description: 'Quick questions and consultations',
    available: 'Mon-Fri, 9AM-6PM IST'
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+91 9058253317',
    href: 'https://wa.me/919058253317',
    description: 'Instant messaging and quick updates',
    available: 'Mon-Sat, 8AM-8PM IST'
  },
  {
    icon: Calendar,
    label: 'Schedule a Call',
    value: 'Book a meeting',
    href: '#',
    description: 'In-depth project discussions',
    available: 'By appointment'
  }
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/PankajSingh1work',
    username: '@PankajSingh1work',
    description: 'Check out my latest projects and contributions'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pankajsingh1work/',
    username: 'Pankaj Singh',
    description: 'Professional network and career updates'
  },
  {
    icon: FaMedium, 
    label: 'Medium',
    href: 'https://medium.com/@rawatpanku991',
    username: '@rawatpanku991',
    description: 'Tech insights and industry discussions'
  },
  {
    icon: FaInstagram, 
    label: 'Instagram',
    href: 'https://www.instagram.com/codeverb.in/',
    username: '@codeverb.in',
    description: 'Visual updates and behind-the-scenes'
  },
  {
    icon: FaYoutube,
    label: 'YouTube',
    href: 'https://www.youtube.com/@codeverb-in',
    username: '@codeverb-in',
    description: 'Video tutorials and project walkthroughs'
  }
];

const projectTypes = [
  'Web Application',
  'Mobile App',
  'E-commerce Site',
  'Portfolio Website',
  'API Development',
  'UI/UX Design',
  'Consulting',
  'Other'
];

const timelines = [
  'ASAP',
  '1-2 weeks',
  '1 month',
  '2-3 months',
  '3-6 months',
  '6+ months',
  'Flexible'
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    timeline: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd7cd00d8-81a4-4d62-853c-50d706c8a2c9',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          projectType: formData.projectType,
          timeline: formData.timeline,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setIsSubmitting(false);

        // Reset form after success animation
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            projectType: '',
            timeline: '',
            message: ''
          });
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <Helmet>
        <title>Contact | Pankaj Singh - Developer in Dehradun</title>
        <meta
          name="description"
          content="Get in touch with Pankaj Singh, a developer based in Dehradun, Uttarakhand, for web development, mobile app development, UI/UX design, and digital consulting services."
        />
        <meta
          name="keywords"
          content="Pankaj Singh, contact, web development, mobile development, UI/UX design, digital consulting, Dehradun, Uttarakhand, React, Flutter, Next.js, developer"
        />
        <meta name="author" content="Pankaj Singh" />
        <meta property="og:title" content="Contact | Pankaj Singh - Developer in Dehradun" />
        <meta
          property="og:description"
          content="Reach out to Pankaj Singh in Dehradun, Uttarakhand, to discuss your next project in web development, mobile apps, UI/UX design, or digital consulting."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/PankajSinghProfile.jpg" />
        <meta property="og:url" content="https://www.codeverb.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact | Pankaj Singh - Developer in Dehradun" />
        <meta
          name="twitter:description"
          content="Contact Pankaj Singh for professional services in web and mobile development, UI/UX design, and digital consulting from Dehradun, Uttarakhand."
        />
        <meta name="twitter:image" content="/PankajSinghProfile.jpg" />
        <link rel="canonical" href="https://www.codeverb.in" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" aria-label="Contact Hero Section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-primary mb-6">Let's Work Together</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ready to bring your ideas to life? I'd love to hear about your project and discuss 
              how we can create something amazing together. Get in touch using any of the methods below.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Quick Response Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>Remote-Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Free Consultation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20" aria-label="Contact Methods">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the communication method that works best for you. I'm here to help and respond promptly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                aria-label={`Contact via ${method.label}: ${method.value}`}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <method.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-primary mb-2">{method.label}</h3>
                      <p className="font-medium mb-2">{method.value}</p>
                      <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                      <p className="text-xs text-muted-foreground">{method.available}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-muted/30" aria-label="Main Contact Section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden">
                <CardContent className="p-8">
                  {!isSubmitted ? (
                    <>
                      <div className="mb-8">
                        <h3 className="text-primary mb-2">Send me a detailed message</h3>
                        <p className="text-muted-foreground">
                          The more details you provide, the better I can understand your project and provide an accurate estimate.
                        </p>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="transition-all duration-200 focus:scale-105"
                              aria-label="Your full name for contacting Pankaj Singh"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="transition-all duration-200 focus:scale-105"
                              aria-label="Your email address for contacting Pankaj Singh"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="company">Company (Optional)</Label>
                            <Input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleInputChange}
                              className="transition-all duration-200 focus:scale-105"
                              aria-label="Your company name (optional) for contacting Pankaj Singh"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone (Optional)</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="transition-all duration-200 focus:scale-105"
                              aria-label="Your phone number (optional) for contacting Pankaj Singh"
                            />
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="space-y-4">
                          <h4 className="text-primary">Project Details</h4>
                          
                          <div className="space-y-2">
                            <Label>Project Type *</Label>
                            <Select onValueChange={(value) => handleSelectChange('projectType', value)}>
                              <SelectTrigger aria-label="Select project type for your inquiry to Pankaj Singh">
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                              <SelectContent>
                                {projectTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Timeline</Label>
                            <Select onValueChange={(value) => handleSelectChange('timeline', value)}>
                              <SelectTrigger aria-label="Select project timeline for your inquiry to Pankaj Singh">
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent>
                                {timelines.map((timeline) => (
                                  <SelectItem key={timeline} value={timeline}>
                                    {timeline}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Project Description *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Please describe your project in detail. Include features, requirements, and any specific technologies you'd like to use."
                            className="transition-all duration-200 focus:scale-105 resize-none"
                            aria-label="Your project description for contacting Pankaj Singh"
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm">{error}</p>
                        )}
                        
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full group"
                          disabled={isSubmitting}
                          aria-label="Submit detailed contact form to send message to Pankaj Singh"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                          ) : (
                            <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          )}
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          I typically respond within 24 hours. All information is kept confidential.
                        </p>
                      </form>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </motion.div>
                      <h3 className="text-primary mb-4">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out! I've received your message and will get back to you within 24 hours. 
                        I'm excited to learn more about your project.
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>What happens next:</p>
                        <ul className="space-y-1">
                          <li>• I'll review your project details</li>
                          <li>• We'll schedule a call to discuss further</li>
                          <li>• I'll provide a detailed proposal</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-primary mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a href="mailto:pankajsingh1work@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email Pankaj Singh at pankajsingh1work@gmail.com">
                            pankajsingh1work@gmail.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <a href="tel:+919058253317" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Call Pankaj Singh at +91 9058253317">
                            +91 9058253317
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">Dehradun, Uttarakhand, India</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Business Hours</p>
                          <p className="text-muted-foreground">Mon-Fri: 9AM-6PM IST</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-primary">Connect on Social Media</h3>
                  <div className="space-y-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                        aria-label={`Connect with Pankaj Singh on ${social.label}: ${social.username}`}
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <social.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{social.label}</p>
                          <p className="text-sm text-muted-foreground">{social.username}</p>
                          <p className="text-xs text-muted-foreground">{social.description}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-primary mb-4">Location</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0R3QO2J1Ir-HV-O2gip0nfwu7J22Z01E&q=Dehradun,Uttarakhand,India"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Map of Dehradun, Uttarakhand, India"
                      aria-label="Interactive map showing Pankaj Singh's location in Dehradun, Uttarakhand"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" aria-label="Frequently Asked Questions">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about working together and my development process.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What's your typical response time?",
                answer: "I typically respond to emails within 24 hours during business days. For urgent matters, feel free to call or text me directly."
              },
              {
                question: "Do you work with clients internationally?",
                answer: "Yes! I work with clients worldwide. I'm flexible with time zones and use various communication tools to ensure smooth collaboration."
              },
              {
                question: "What information do you need to provide a quote?",
                answer: "The more details you can provide about your project, the more accurate my estimate will be. Include features, timeline, and any specific requirements."
              },
              {
                question: "Do you offer maintenance and support?",
                answer: "Yes, I provide ongoing maintenance and support packages for all projects. This includes updates, bug fixes, and feature enhancements."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-primary mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}