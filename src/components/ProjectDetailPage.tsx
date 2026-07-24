import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Clock,
  User,
  Target, 
  Palette, 
  Code, 
  Database, 
  CheckCircle,
  ArrowLeft,
  Share,
  Heart,
  Eye,
  Filter,
  Lock,
  Search,
  RefreshCw,
  LayoutDashboard,
  Bell,
  Watch,
  Dumbbell,
  Apple,
  Brain,
  HelpCircle
} from 'lucide-react';
import projectsData from '../lib/projects.json';
import { generateProjectUrl, slugify } from '../utils/slugify';

const iconMap = {
  Code: Code,
  Palette: Palette,
  Database: Database,
  Target: Target,
  Filter: Filter,
  Lock: Lock,
  Search: Search,
  Sync: RefreshCw,
  Board: LayoutDashboard,
  Bell: Bell,
  Watch: Watch,
  Dumbbell: Dumbbell,
  Apple: Apple,
  Brain: Brain,
  Support: HelpCircle
};

interface ProjectDetailPageProps {
  onNavigate: (page: string) => void;
}

export function ProjectDetailPage({ onNavigate }: ProjectDetailPageProps) {
  const { id, slug } = useParams<{ id: string; slug?: string }>();
  const navigate = useNavigate();
  const projectId = id ? parseInt(id) : null;
  
  const project = projectsData.projects.find(p => p.id === projectId);

  // Redirect to SEO-friendly URL if slug is missing or incorrect
  useEffect(() => {
    if (project && projectId) {
      const correctSlug = slugify(project.title);
      const currentPath = `/project/${projectId}/${slug || ''}`;
      const correctPath = generateProjectUrl(projectId, project.title);
      
      if (!slug || slug !== correctSlug) {
        navigate(correctPath, { replace: true });
      }
    }
  }, [project, projectId, slug, navigate]);

  if (!project || !projectId) {
    return (
      <div className="pt-20 text-center">
        <h1 className="text-primary mb-4">Project Not Found</h1>
        <Button onClick={() => navigate('/projects')}>
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" aria-label="Project Hero Section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={() => navigate('/projects')}
              className="mb-8 group"
              aria-label="Go back to projects list"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline">{project.category}</Badge>
                  <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                  {project.featured && (
                    <Badge className="bg-yellow-500 text-yellow-900 border-none">
                      Featured
                    </Badge>
                  )}
                </div>

                <div>
                  <h1 className="text-primary mb-4">{project.title}</h1>
                  <p className="text-xl text-secondary mb-4">{project.subtitle}</p>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                {/* Project Meta */}
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Client:</span>
                      <span className="font-medium">{project.client}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{project.duration}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Year:</span>
                      <span className="font-medium">{project.year}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="group" aria-label={`View live demo of ${project.title} project by Pankaj Singh`}>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      View Demo
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="group" aria-label={`View source code of ${project.title} on GitHub by Pankaj Singh`}>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      View Code
                    </a>
                  </Button>
                  <Button variant="ghost" className="group" aria-label={`Share ${project.title} project by Pankaj Singh`}>
                    <Share className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative h-96 overflow-hidden rounded-xl shadow-2xl">
                <ImageWithFallback
                  src={project.images[0]?.url}
                  alt={`Screenshot of ${project.title} project by Pankaj Singh, developer in Dehradun`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-5 w-5" />
                      <span>{project.stats.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-5 w-5" />
                      <span>{project.stats.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share className="h-5 w-5" />
                      <span>{project.stats.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20" aria-label="Project Details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-12">
            <TabsList className="justify-start overflow-x-auto w-full" style={{ display: 'flex', width: '100%' }}>
              <TabsTrigger value="overview" className="flex-1 text-center" aria-label="View overview tab for project details by Pankaj Singh">Overview</TabsTrigger>
              <TabsTrigger value="features" className="flex-1 text-center" aria-label="View features tab for project details by Pankaj Singh">Features</TabsTrigger>
              <TabsTrigger value="technical" className="flex-1 text-center" aria-label="View technical tab for project details by Pankaj Singh">Technical</TabsTrigger>
              <TabsTrigger value="gallery" className="flex-1 text-center" aria-label="View gallery tab for project details by Pankaj Singh">Gallery</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              {/* Full Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Project Overview</h2>
                    <div className="prose prose-invert text-muted-foreground space-y-4">
                      {project.fullDescription.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Challenges & Solutions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20">
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Challenges & Solutions</h2>
                    <div className="space-y-8">
                      {project.challenges.map((challenge, index) => (
                        <div key={index} className="space-y-2">
                          <h3 className="text-secondary">{challenge.title}</h3>
                          <p className="text-muted-foreground">{challenge.description}</p>
                          <p className="font-medium text-primary">Solution: {challenge.solution}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Project Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Project Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.results.map((result, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Client Testimonial */}
              {project.testimonial && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className="bg-primary/5">
                    <CardContent className="p-8 text-center">
                      <blockquote className="text-lg text-muted-foreground italic mb-6">
                        "{project.testimonial.content}"
                      </blockquote>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={project.testimonial.image}
                            alt={`Profile image of ${project.testimonial.author}, client for ${project.title} project by Pankaj Singh`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{project.testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {project.features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {iconMap[feature.icon] && React.createElement(iconMap[feature.icon], { className: 'h-6 w-6 text-primary' })}
                        </div>
                        <h3 className="text-primary">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            {/* Technical Tab */}
            <TabsContent value="technical" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Technology Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.techStack.map((tech, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                          {iconMap[tech.icon] && React.createElement(iconMap[tech.icon], { className: 'h-6 w-6 text-primary' })}
                          <div>
                            <p className="font-medium">{tech.name}</p>
                            <p className="text-sm text-muted-foreground">{tech.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-primary mb-6">Architecture & Approach</h2>
                    <div className="prose prose-invert text-muted-foreground space-y-4">
                      <p>
                        The application follows a modern microservices architecture with clear separation of concerns. 
                        The frontend is built as a single-page application using React with TypeScript for type safety.
                      </p>
                      <p>
                        Real-time functionality is implemented using WebSocket connections with Socket.io, 
                        ensuring efficient bi-directional communication between the client and server.
                      </p>
                      <p>
                        Data visualization leverages D3.js for maximum flexibility and performance, 
                        with custom components optimized for large datasets and smooth interactions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {project.images.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-96 overflow-hidden">
                      <ImageWithFallback
                        src={image.url}
                        alt={`${image.caption} for ${project.title} project by Pankaj Singh, developer in Dehradun`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">{image.caption}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-muted/30" aria-label="Related Projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary mb-4">More Projects</h2>
            <p className="text-muted-foreground">
              Explore other projects showcasing different technologies and solutions.
            </p>
          </motion.div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => navigate('/projects')}
              className="group"
              aria-label="View all projects by Pankaj Singh"
            >
              View All Projects
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
