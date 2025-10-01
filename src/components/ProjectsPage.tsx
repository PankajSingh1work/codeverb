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
  Filter, 
  ExternalLink, 
  Github, 
  Calendar, 
  Code,
  Eye,
  Star,
  ArrowRight
} from 'lucide-react';
import projectsData from '../lib/projects.json';
import { Helmet } from 'react-helmet-async';

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const allProjects = projectsData.projects;

  const categories = ['All', ...new Set(allProjects.map(project => project.category))].sort();
  const years = ['All', ...new Set(allProjects.map(project => project.year))].sort();
  const status = ['All', ...new Set(allProjects.map(project => project.status))].sort();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.some(tech => tech.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || project.year === selectedYear;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
    const matchesFeatured = !showFeaturedOnly || project.featured;

    return matchesSearch && matchesCategory && matchesYear && matchesStatus && matchesFeatured;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedYear('All');
    setSelectedStatus('All');
    setShowFeaturedOnly(false);
  };

  return (
    <div className="pt-20">
      <Helmet>
        <title>Projects | Pankaj Singh - Portfolio of Web & Mobile Developments</title>
        <meta
          name="description"
          content="Explore Pankaj Singh's portfolio of projects in web development, mobile app development, UI/UX design, and digital solutions from Dehradun, Uttarakhand."
        />
        <meta
          name="keywords"
          content="projects, portfolio, web development, mobile development, UI/UX design, Flutter, React Native, Next.js, React.js, Figma, Dehradun, Uttarakhand"
        />
        <meta name="author" content="Pankaj Singh" />
        <meta property="og:title" content="Projects | Pankaj Singh - Portfolio of Web & Mobile Developments" />
        <meta
          property="og:description"
          content="View a showcase of projects by Pankaj Singh, demonstrating skills in full-stack development, mobile apps, and UI/UX design."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/PankajSinghProfile.jpg" />
        <meta property="og:url" content="https://www.codeverb.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Pankaj Singh - Portfolio of Web & Mobile Developments" />
        <meta
          name="twitter:description"
          content="Discover projects in web, mobile, and design by developer Pankaj Singh from Dehradun."
        />
        <meta name="twitter:image" content="/PankajSinghProfile.jpg" />
        <link rel="canonical" href="https://www.codeverb.in" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" aria-label="Projects Hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-primary mb-6">My Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A comprehensive showcase of my development work across web applications, mobile apps, 
              and digital solutions. Each project represents a unique challenge and innovative solution.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>{allProjects.length} Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>{allProjects.filter(p => p.featured).length} Featured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>{Math.min(...allProjects.map(p => parseInt(p.year))) + ' - ' + Math.max(...allProjects.map(p => parseInt(p.year)))}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 border-b border-border" aria-label="Project Filters">
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
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Search projects by title, description, or technologies"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40" aria-label="Select category">
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

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32" aria-label="Select year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-36" aria-label="Select status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {status.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
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
                Showing {filteredProjects.length} of {allProjects.length} projects
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20" aria-label="Projects Grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
              role="alert"
            >
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-primary mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or clearing the filters.
              </p>
              <Button onClick={clearFilters} aria-label="Clear all filters to show projects">Clear All Filters</Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105" role="article" aria-labelledby={`project-title-${project.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={project.images[0]?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'}
                        alt={`Featured image for project: ${project.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Project badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {project.featured && (
                          <Badge className="bg-yellow-500 text-yellow-900 border-none">
                            <Star className="h-3 w-3 mr-1" aria-hidden="true" />
                            Featured
                          </Badge>
                        )}
                        <Badge 
                          variant={project.status === 'Completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>

                      {/* Category and year */}
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className="text-xs text-white border-white/50 mb-2">
                          {project.category}
                        </Badge>
                        <p className="text-white/80 text-sm">{project.year}</p>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 id={`project-title-${project.id}`} className="text-primary mb-2 break-words">{project.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Project details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Client:</span>
                          <span className="font-medium break-words">{project.client}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{project.duration}</span>
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">Tech Stack:</p>
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 4).map((tech: { name: string; category: string; icon: string }) => (
                            <Badge key={tech.name} variant="secondary" className="text-xs">
                              {tech.name}
                            </Badge>
                          ))}
                          {project.techStack.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.techStack.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">Key Features:</p>
                        <ul className="space-y-1">
                          {project.features.slice(0, 2).map((feature: { title: string; description: string; icon: string }, i: number) => (
                            <li key={i} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-primary rounded-full" aria-hidden="true" />
                              <span className="text-xs text-muted-foreground">{feature.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-2 pt-4">
                        <Button variant="outline" size="sm" className="flex-1 group/btn" aria-label="View demo">
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">
                            <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" aria-hidden="true" />
                            Demo
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 group/btn" aria-label="View code on GitHub">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">
                            <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" aria-hidden="true" />
                          Code
                          </a>
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group/btn"
                        onClick={() => onNavigate(`project-detail/${project.id}`)}
                        aria-label={`View details for ${project.title}`}
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30" aria-label="Call to Action">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-primary">Ready to Start Your Own Project?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm always excited to work on new challenges and bring innovative ideas to life. 
              Let's discuss how I can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('contact')}
                className="group"
                aria-label="Start a project"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('services')}
                aria-label="View services"
              >
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}