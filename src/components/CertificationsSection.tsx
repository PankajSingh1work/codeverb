import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink, Calendar, Award, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import certificationsData from '../lib/certifications.json';

interface CertificationsSectionProps {
  onNavigate: (page: string) => void;
}

export function CertificationsSection({ onNavigate }: CertificationsSectionProps) {
  const featuredCertifications = certificationsData.certifications.filter(cert => cert.featured).slice(0, 3);

  return (
    <section className="py-20 bg-background" aria-label="Certifications by Pankaj Singh">
      <Helmet>
        <title>Certifications | Pankaj Singh - Professional Credentials</title>
        <meta
          name="description"
          content="Explore Pankaj Singh's professional certifications in web development, mobile app development, UI/UX design, and more, earned from reputed institutions, showcasing expertise from Dehradun, Uttarakhand."
        />
        <meta
          name="keywords"
          content="Pankaj Singh, certifications, web development, mobile development, UI/UX design, Flutter, React Native, Next.js, Dehradun, professional credentials, programming certifications"
        />
        <meta name="author" content="Pankaj Singh" />
        <meta property="og:title" content="Certifications | Pankaj Singh - Professional Credentials" />
        <meta
          property="og:description"
          content="Discover Pankaj Singh's certifications validating skills in web and mobile development, UI/UX design, and more, earned from top platforms, based in Dehradun, Uttarakhand."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/PankajSinghProfile.jpg" />
        <meta property="og:url" content="https://www.codeverb.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Certifications | Pankaj Singh - Professional Credentials" />
        <meta
          name="twitter:description"
          content="View Pankaj Singh's professional certifications in technologies like Flutter, React Native, and Next.js, showcasing expertise from Dehradun, Uttarakhand."
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
          <h2 className="text-primary mb-4">Featured Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {featuredCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 space-y-6">
                  {/* Header with logo and status */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                        <ImageWithFallback
                          src={cert.logo}
                          alt={`Logo of ${cert.issuer} for ${cert.title} certification`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-primary leading-tight">{cert.title}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={cert.status === 'Valid' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {cert.status}
                    </Badge>
                  </div>

                  {/* Description with 3-line truncation */}
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills (limited to 3) */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">Skills Validated:</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map((skill: { name: string; proficiency: number }) => (
                        <Badge key={skill.name} variant="secondary" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Date info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Earned {cert.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>Valid until {cert.validUntil}</span>
                    </div>
                  </div>

                  {/* Credential ID */}
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Credential ID: {cert.credentialId}
                    </p>
                  </div>

                  {/* Action button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group/btn"
                    onClick={() => onNavigate(`certification-detail/${cert.id}`)}
                    aria-label={`View details of ${cert.title} certification by ${cert.issuer}`}
                  >
                    <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => onNavigate('certifications')}
            className="group"
            aria-label="View all certifications earned by Pankaj Singh"
          >
            View All Certifications
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}