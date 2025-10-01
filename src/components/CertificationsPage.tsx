import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  ExternalLink, 
  Calendar, 
  Award, 
  Download,
  CheckCircle,
  Filter,
  TrendingUp,
  Shield,
  Star,
  ArrowLeft
} from 'lucide-react';
import certificationsData from '../lib/certifications.json';
import { Helmet } from 'react-helmet-async';

interface CertificationsPageProps {
  onNavigate: (page: string) => void;
}

export function CertificationsPage({ onNavigate }: CertificationsPageProps) {
  const allCertifications = certificationsData.certifications;

  const categories = ['All', ...new Set(allCertifications.map(cert => cert.category))].sort();
  const levels = ['All', ...new Set(allCertifications.map(cert => cert.level))].sort();
  const statuses = ['All', ...new Set(allCertifications.map(cert => cert.status))].sort();
  const issuers = ['All', ...new Set(allCertifications.map(cert => cert.issuer))].sort();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedIssuer, setSelectedIssuer] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredCertifications = allCertifications.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || cert.level === selectedLevel;
    const matchesStatus = selectedStatus === 'All' || cert.status === selectedStatus;
    const matchesIssuer = selectedIssuer === 'All' || cert.issuer === selectedIssuer;
    const matchesFeatured = !showFeaturedOnly || cert.featured;

    return matchesSearch && matchesCategory && matchesLevel && matchesStatus && matchesIssuer && matchesFeatured;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedStatus('All');
    setSelectedIssuer('All');
    setShowFeaturedOnly(false);
  };

  const validCertifications = allCertifications.filter(cert => cert.status === 'Valid');
  const featuredCertifications = allCertifications.filter(cert => cert.featured);

  return (
    <div className="pt-20">
      <Helmet>
        <title>Certifications | Pankaj Singh - Professional Credentials</title>
        <meta
          name="description"
          content="Explore Pankaj Singh's professional certifications in web development, mobile development, cloud computing, and containerization from Dehradun, Uttarakhand."
        />
        <meta
          name="keywords"
          content="certifications, professional credentials, web development, mobile development, cloud computing, containerization, AWS, Azure, Kubernetes, Flutter, React Native, Dehradun, Uttarakhand"
        />
        <meta name="author" content="Pankaj Singh" />
        <meta property="og:title" content="Certifications | Pankaj Singh - Professional Credentials" />
        <meta
          property="og:description"
          content="View Pankaj Singh's certifications showcasing expertise in web, mobile, cloud, and containerization technologies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/PankajSinghProfile.jpg" />
        <meta property="og:url" content="https://www.codeverb.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Certifications | Pankaj Singh - Professional Credentials" />
        <meta
          name="twitter:description"
          content="Discover Pankaj Singh's validated expertise through professional certifications in various technologies."
        />
        <meta name="twitter:image" content="/PankajSinghProfile.jpg" />
        <link rel="canonical" href="https://www.codeverb.in" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" aria-label="Certifications Hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-primary mb-6">Professional Certifications</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A comprehensive collection of my professional certifications and credentials that validate 
              my expertise across various technologies and methodologies. Committed to continuous learning 
              and staying current with industry standards.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>{allCertifications.length} Total Certifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>{validCertifications.length} Currently Valid</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>{featuredCertifications.length} Featured</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>Continuously Updated</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 border-b border-border" aria-label="Certification Filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search certifications, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Search certifications by title, issuer, or skills"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48" aria-label="Select category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-36" aria-label="Select level">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32" aria-label="Select status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedIssuer} onValueChange={setSelectedIssuer}>
                <SelectTrigger className="w-48" aria-label="Select issuer">
                  <SelectValue placeholder="Issuer" />
                </SelectTrigger>
                <SelectContent>
                  {issuers.map((issuer) => (
                    <SelectItem key={issuer} value={issuer}>
                      {issuer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className="flex items-center space-x-2"
                aria-pressed={showFeaturedOnly}
                aria-label="Toggle featured only filter"
              >
                <Star className="h-4 w-4" aria-hidden="true" />
                <span>Featured Only</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={clearFilters} aria-label="Clear all filters">
                Clear Filters
              </Button>
            </div>

            {/* Results Count */}
            <div className="text-center">
              <p className="text-muted-foreground">
                Showing {filteredCertifications.length} of {allCertifications.length} certifications
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20" aria-label="Certifications Grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCertifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
              role="alert"
            >
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-primary mb-2">No certifications found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or clearing the filters.
              </p>
              <Button onClick={clearFilters} aria-label="Clear all filters to show certifications">Clear All Filters</Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 group" role="article" aria-labelledby={`cert-title-${cert.id}`}>
                    <CardContent className="p-6 space-y-6">
                      {/* Header with logo and status */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                            <ImageWithFallback
                              src={cert.logo}
                              alt={`Logo of ${cert.issuer}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 id={`cert-title-${cert.id}`} className="text-primary leading-tight group-hover:text-secondary transition-colors break-words">
                              {cert.title}
                            </h3>
                            <p className="text-sm text-muted-foreground break-words">{cert.issuer}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {cert.featured && (
                            <Badge className="bg-yellow-500 text-yellow-900 border-none text-xs">
                              <Star className="h-3 w-3 mr-1" aria-hidden="true" />
                              Featured
                            </Badge>
                          )}
                          <Badge 
                            variant={cert.status === 'Valid' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {cert.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {cert.description}
                      </p>

                      {/* Certification Details */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Level:</span>
                            <p className="font-medium">{cert.level}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Category:</span>
                            <p className="font-medium">{cert.category}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Earned:</span>
                            <p className="font-medium">{cert.date}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Valid Until:</span>
                            <p className="font-medium">{cert.validUntil}</p>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">Skills Validated:</p>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.slice(0, 4).map((skill: { name: string; proficiency: number }) => (
                            <Badge key={skill.name} variant="secondary" className="text-xs">
                              {skill.name}
                            </Badge>
                          ))}
                          {cert.skills.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{cert.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Credential ID */}
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Credential ID: {cert.credentialId}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 group/btn" aria-label={`Verify ${cert.title} certification`}>
                          <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">
                            <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" aria-hidden="true" />
                            Verify
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 group/btn" aria-label={`Download ${cert.title} certificate`}>
                          <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">
                            <Download className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" aria-hidden="true" />
                            Certificate
                          </a>
                        </Button>
                      </div>

                      {/* View Details button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group/btn"
                        onClick={() => onNavigate(`certification-detail/${cert.id}`)}
                        aria-label={`View details for ${cert.title} certification`}
                      >
                        View Details
                        <ArrowLeft className="h-4 w-4 ml-2 rotate-180 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-muted/30" aria-label="Certification Statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary mb-4">Certification Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A breakdown of my certifications by category and level, demonstrating comprehensive expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Cloud Computing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-primary mb-2">Cloud Computing</h3>
                  <p className="text-2xl font-semibold mb-2">
                    {allCertifications.filter(cert => cert.category === 'Cloud Computing').length}
                  </p>
                  <p className="text-muted-foreground text-sm">AWS, Azure, Google Cloud</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Containerization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <TrendingUp className="h-12 w-12 text-secondary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-primary mb-2">Containerization</h3>
                  <p className="text-2xl font-semibold mb-2">
                    {allCertifications.filter(cert => cert.category === 'Containerization').length}
                  </p>
                  <p className="text-muted-foreground text-sm">Kubernetes</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Advanced Level */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-primary mb-2">Advanced Level</h3>
                  <p className="text-2xl font-semibold mb-2">
                    {allCertifications.filter(cert => ['Professional', 'Expert'].includes(cert.level)).length}
                  </p>
                  <p className="text-muted-foreground text-sm">Professional & Expert certifications</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Currently Valid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-primary mb-2">Currently Valid</h3>
                  <p className="text-2xl font-semibold mb-2">
                    {validCertifications.length}
                  </p>
                  <p className="text-muted-foreground text-sm">Active credentials</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" aria-label="Call to Action">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-primary">Validated Expertise You Can Trust</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These certifications represent my commitment to excellence and continuous learning. 
              Ready to bring this validated expertise to your next project?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('contact')}
                className="group"
                aria-label="Start a conversation"
              >
                Start a Conversation
                <Calendar className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('projects')}
                aria-label="View my work"
              >
                View My Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}