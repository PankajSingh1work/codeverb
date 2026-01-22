import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
          subject: formData.subject,
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
            subject: '',
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

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'pankajsingh1work@gmail.com',
      href: 'mailto:pankajsingh1work@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9058253317',
      href: 'tel:+919058253317'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Dehradun, Uttarakhand, India',
      href: 'https://www.google.com/maps/place/Dehradun,+Uttarakhand,+India'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30" aria-label="Contact Pankaj Singh">
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
        <meta property="og:title" content="Pankaj Singh - Full Stack & Mobile Developer in Dehradun" />
        <meta
          property="og:description"
          content="Reach out to Pankaj Singh in Dehradun, Uttarakhand, to discuss your next project in web development, mobile apps, UI/UX design, or digital consulting."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/PankajSinghProfile.jpg" />
        <meta property="og:url" content="https://www.codeverb.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pankaj Singh - Full Stack & Mobile Developer in Dehradun" />
        <meta
          name="twitter:description"
          content="Contact Pankaj Singh for professional services in web and mobile development, UI/UX design, and digital consulting from Dehradun, Uttarakhand."
        />
        <meta name="twitter:image" content="/PankajSinghProfile.jpg" />
        <link rel="canonical" href="https://www.codeverb.in" />
      </Helmet>

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
            Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-8">
                {!isSubmitted ? (
                  <>
                    <h3 className="text-primary mb-6">Send me a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="transition-all duration-200 focus:scale-105"
                            aria-label="Your name for contacting Pankaj Singh"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
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
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="transition-all duration-200 focus:scale-105"
                          aria-label="Subject of your message to Pankaj Singh"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="transition-all duration-200 focus:scale-105 resize-none"
                          aria-label="Your message to Pankaj Singh"
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
                        aria-label="Submit contact form to send message to Pankaj Singh"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </Button>
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
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </motion.div>
                    <h3 className="text-primary mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you soon!
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-primary mb-6">Let's connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you're a company looking to hire, or you're an individual looking for help 
                with your project, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-card transition-colors group"
                  aria-label={`Contact Pankaj Singh via ${item.label}: ${item.value}`}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">{item.label}</p>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Google Maps Embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="h-64 rounded-lg overflow-hidden"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
