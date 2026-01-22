import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import projectsData from '../lib/projects.json';
import { generateProjectUrl } from '../utils/slugify';

interface ProjectsSectionProps {
  onNavigate: (page: string) => void;
}

export function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  const navigate = useNavigate();
  const featuredProjects = projectsData.projects.filter(project => project.featured);

  return (
    <section className="py-20 bg-muted/30" aria-label="Projects by Pankaj Singh">
      <Helmet>
        <title>Projects | Pankaj Singh - Web & Mobile Development Portfolio</title>
        <meta
          name="description"
          content="Discover Pankaj Singh's portfolio of projects showcasing expertise in web development, mobile app development, and UI/UX design using React, Flutter, Next.js, and more, from Dehradun, Uttarakhand."
        />
        <meta
          name="keywords"
          content="Pankaj Singh, projects, portfolio, web development, mobile development, UI/UX design, React, Next.js, Flutter, React Native, Tailwind CSS, Dehradun, software development"
        />
        <meta name="author" content="Pankaj Singh" />
        <meta property="og:title" content="Projects | Pankaj Singh - Web & Mobile Development Portfolio" />
        <meta
          property="og:description"
          content="Explore Pankaj Singh's featured projects in web and mobile development, showcasing skills in React, Flutter, Next.js, and UI/UX design, from Dehradun, Uttarakhand."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/PankajSinghProfile.jpg" />
        <meta property="og:url" content="https://www.codeverb.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Pankaj Singh - Web & Mobile Development Portfolio" />
        <meta
          name="twitter:description"
          content="View Pankaj Singh's portfolio of projects in web and mobile development, built with modern technologies like React, Flutter, and Next.js, from Dehradun."
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
          <h2 className="text-primary mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and the technologies I'm passionate about.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.images[0]?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'}
                    alt={`Screenshot of ${project.title} project by Pankaj Singh`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Badge 
                      variant={project.status === 'Completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="outline" className="text-xs text-white border-white/50">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-primary mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
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
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 group/btn"
                      aria-label={`View live demo of ${project.title} project`}
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Demo
                      </a> 
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 group/btn"
                      aria-label={`View source code of ${project.title} project on GitHub`}
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">
                        <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Code
                      </a>
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group/btn"
                    onClick={() => navigate(generateProjectUrl(project.id, project.title))}
                    aria-label={`View detailed information about ${project.title} project`}
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => onNavigate('projects')}
            className="group"
            aria-label="View all projects by Pankaj Singh"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}