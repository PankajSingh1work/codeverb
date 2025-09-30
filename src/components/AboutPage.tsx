import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Code, Palette, Server, Database, Globe, Smartphone, Award, Briefcase, GraduationCap, Bug, Shield, GitBranch } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const skills = [
  { 
    name: 'Mobile Dev', 
    category: 'Mobile', 
    icon: Smartphone, 
    level: 90,
    description: 'Expert in cross-platform and native mobile development using Flutter, React Native, Kotlin, and Jetpack Compose.'
  },
  { 
    name: 'Web Dev', 
    category: 'Web', 
    icon: Code, 
    level: 80,
    description: 'Proficient in full-stack web development with Next.js, React.js, JavaScript, Tailwind CSS, and HTML.'
  },
  { 
    name: 'UI/UX Design', 
    category: 'UI/UX', 
    icon: Palette, 
    level: 85,
    description: 'User-centered design with Figma, prototyping, wireframing, and creating intuitive interfaces.'
  },
  { 
    name: 'Version Control', 
    category: 'Version Control', 
    icon: GitBranch, 
    level: 80,
    description: 'Efficient collaboration and code management using Git and GitHub.'
  },
  { 
    name: 'Deployment', 
    category: 'Deployment', 
    icon: Globe, 
    level: 80,
    description: 'Seamless deployment and hosting with Vercel, Netlify, and cloud platforms.'
  },
  { 
    name: 'Testing', 
    category: 'Testing', 
    icon: Bug, 
    level: 75,
    description: 'Ensuring code quality with unit testing (Jest), API testing (Insomnia), and debugging.'
  },
  { 
    name: 'Cyber Security', 
    category: 'Cyber Security', 
    icon: Shield, 
    level: 70,
    description: 'Implementing secure coding practices, authentication, and vulnerability assessments.'
  },
  { 
    name: 'AI/ML', 
    category: 'AI', 
    icon: Code, 
    level: 75,
    description: 'Integrating AI and machine learning models into applications for enhanced functionality.'
  },
  { 
    name: 'Databases', 
    category: 'Databases', 
    icon: Database, 
    level: 80,
    description: 'Managing data with MySQL, MongoDB, Firebase, and Supabase.'
  },
  { 
    name: 'System Design', 
    category: 'Architecture', 
    icon: Server, 
    level: 70,
    description: 'Designing scalable systems, microservices, and backend with Node.js, Python, and Java.'
  }
];

const experiences = [
  {
    title: 'Founder & Developer',
    company: 'Personal Startup',
    period: 'May 2025 - Present',
    location: 'Dehradun, Uttarakhand',
    description: 'Currently developing two products in EdTech and AI Productivity sectors. Handling all aspects including user research, architecture design, UI/UX, frontend development, backend development, API creation, AI integration, and mobile development. This hands-on experience is enhancing my understanding of real-world development scenarios, system design, and new skills acquisition.',
    achievements: [
      'Conducted comprehensive user research to inform product features',
      'Designed scalable system architecture for both products',
      'Implemented full-stack development across web and mobile platforms',
      'Integrated AI capabilities to enhance productivity features'
    ],
    technologies: ['Flutter', 'React Native', 'Next.js', 'Node.js', 'Python', 'Firebase', 'Supabase', 'AI/ML Tools', 'Figma']
  }
];

const education = [
  {
    degree: 'BTech in Computer Science & Engineering',
    institution: 'Shivalik College of Engineering, Dehradun, Uttarakhand',
    period: '2023 - 2026',
    gpa: '7/10',
    honors: '',
    description: 'Currently pursuing a degree with a focus on software development, AI, and system design.',
    coursework: [
      'Data Structures & Algorithms',
      'Software Engineering',
      'Artificial Intelligence',
      'Machine Learning',
      'System Design',
      'Web Development',
      'Mobile App Development',
      'Database Management Systems',
      'Computer Networks'
    ]
  },
  {
    degree: 'Diploma in Computer Science & Engineering',
    institution: 'Govt. Polytechnic Kashipur, Uttarakhand',
    period: '2021 - 2023',
    gpa: '9/10',
    honors:'',
    description: 'Specialized in web and mobile development, mastering foundational programming concepts.',
    coursework: [
      'Programming Fundamentals',
      'Web Technologies',
      'Mobile Application Development',
      'Database Systems',
      'Operating Systems',
      'Data Structures',
      'Software Testing'
    ]
  },
  {
    degree: 'High School',
    institution: 'Pt. G. B. Pant I C Kashipur, Uttarakhand',
    period: 'Up to 2021',
    gpa: '80%',
    honors:'',
    description: 'Completed schooling with a strong foundation in mathematics and computer science.',
    coursework: [
      'Mathematics',
      'Computer Science',
      'Physics',
      'Chemistry',
      'English'
    ]
  }
];

export function AboutPage() {
  return (
    <div className="pt-20">
      <Helmet>
        <title>About Pankaj Singh | Full-Stack & Mobile Developer</title>
        <meta
          name="description"
          content="Learn about Pankaj Singh, a skilled developer specializing in Flutter, React Native, Next.js, and UI/UX design, based in Dehradun, Uttarakhand."
        />
        <meta
          name="keywords"
          content="Pankaj Singh, full-stack developer, mobile developer, Flutter, React Native, Kotlin, Jetpack Compose, Next.js, React.js, JavaScript, Tailwind CSS, HTML, unit testing, MySQL, MongoDB, Firebase, Supabase, Node.js, Python, Java, Insomnia, Figma, AI, Git, GitHub, Vercel, Netlify, cybersecurity, Dehradun"
        />
        <meta name="author" content="Pankaj Singh" />
        <meta property="og:title" content="About Pankaj Singh | Full-Stack & Mobile Developer" />
        <meta
          property="og:description"
          content="Discover Pankaj Singh's journey as a developer proficient in mobile and web technologies, based in Dehradun, Uttarakhand."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/PankajSinghProfile.jpg" />
        <meta property="og:url" content="https://www.codeverb.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Pankaj Singh | Full-Stack & Mobile Developer" />
        <meta
          name="twitter:description"
          content="Explore Pankaj Singh's skills in Flutter, React Native, Next.js, and more, as a developer from Dehradun."
        />
        <meta name="twitter:image" content="/PankajSinghProfile.jpg" />
        <link rel="canonical" href="https://www.codeverb.in" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" aria-label="About Pankaj Singh Hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mx-auto mb-8">
              <ImageWithFallback
                src="/PankajSinghProfile.jpg"
                alt="Pankaj Singh, Full-Stack and Mobile Developer"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-primary mb-4">About Pankaj Singh</h1>
            <p className="text-xl text-secondary mb-6">Full-Stack & Mobile Developer</p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              As a developer, I focus on creating innovative mobile and web solutions that blend functionality with aesthetic appeal. My journey in technology started with a deep curiosity for coding and design, leading me to master frameworks like Flutter, React Native, and Next.js, alongside languages such as JavaScript, Python, and Kotlin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20" aria-label="Main About Content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-primary mb-4">Technical Skills</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A comprehensive overview of my technical capabilities and proficiency levels.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <skill.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-primary">{skill.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {skill.category}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Proficiency</span>
                            <span className="font-medium">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-primary mb-4">Professional Experience</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My career journey and the impact I've made at various organizations.
                </p>
              </motion.div>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-1 space-y-4">
                            <div className="flex items-center space-x-2">
                              <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
                              <Badge variant="outline">{exp.period}</Badge>
                            </div>
                            <div>
                              <h3 className="text-primary mb-1">{exp.title}</h3>
                              <p className="text-secondary font-medium">{exp.company}</p>
                              <p className="text-muted-foreground text-sm">{exp.location}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="lg:col-span-2 space-y-4">
                            <p className="text-muted-foreground">{exp.description}</p>
                            <div>
                              <h4 className="text-primary mb-3">Key Achievements:</h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <span className="text-muted-foreground text-sm">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-primary mb-4">Education & Learning</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  My academic background and commitment to continuous learning.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-primary" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <Badge variant="outline" className="text-xs">
                              {edu.period}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-primary mb-2">{edu.degree}</h3>
                          <p className="text-secondary font-medium mb-1">{edu.institution}</p>
                          {edu.gpa && (
                            <p className="text-muted-foreground text-sm">GPA: {edu.gpa}</p>
                          )}
                          {edu.honors && (
                            <Badge variant="secondary" className="text-xs mt-2">
                              {edu.honors}
                            </Badge>
                          )}
                        </div>

                        <p className="text-muted-foreground text-sm">{edu.description}</p>

                        <div>
                          <h4 className="text-primary mb-3 text-sm">Relevant Coursework:</h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((course) => (
                              <Badge key={course} variant="outline" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}