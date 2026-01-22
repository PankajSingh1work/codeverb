import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Code, Palette, Server, Database, Globe, Smartphone, Bug, Shield, GitBranch } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const skills = [
  { name: 'Mobile Dev', category: 'Mobile', icon:Smartphone, level:90},
  { name: 'Web Dev', category: 'Web', icon: Code, level: 80 },
  { name: 'UI/UX Design', category: 'UI/UX', icon: Palette, level: 85 },
  { name: 'Version Control', category: 'Version Control', icon: GitBranch, level: 80 },
  { name: 'Deployment', category: 'Deployment', icon: Globe, level: 80 },
  { name: 'Testing', category: 'Testing', icon: Bug, level: 75 },
  { name: 'Cyber Security', category: 'Cyber Security', icon: Shield, level: 70 },
  { name: 'AI/ML', category: 'AI', icon: Code, level: 75 },
  { name: 'Databases', category: 'Databases', icon: Database, level: 80 },
  { name: 'System Design', category: 'Architecture', icon: Server, level: 70 },  
];

const education = [
  {
    year: '2023–2026',
    degree: 'BTech in Computer Science & Engineering',
    institution: 'Shivalik College of Engineering, Dehradun, Uttarakhand',
    description: 'Currently pursuing a degree with a focus on software development, AI, and system design.',
  },
  {
    year: '2021–2023',
    degree: 'Diploma in Computer Science & Engineering',
    institution: 'Govt. Polytechnic Kashipur, Uttarakhand',
    description: 'Specialized in web and mobile development, mastering foundational programming concepts.',
  },
  {
    year: '2021',
    degree: 'Schooling',
    institution: 'Pt. G. B. Pant I C Kashipur, Uttarakhand',
    description: 'Completed schooling with a strong foundation in mathematics and computer science.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30" aria-label="About Pankaj Singh">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-primary mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover my journey as a developer in mobile and web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0">
                <ImageWithFallback
                  src="/PankajSinghProfile.jpg"
                  alt="Pankaj Singh, Full-Stack and Mobile Developer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-primary mb-2">Hello, I'm Pankaj!</h3>
                <p className="text-muted-foreground">
                  Developer based in Dehradun, Uttarakhand
                </p>
              </div>
            </div>
            
            <div className="space-y-4 text-foreground">
              <p>
                As a developer, I focus on creating innovative mobile and web solutions that blend functionality with aesthetic appeal. My journey in technology started with a deep curiosity for coding and design, leading me to master frameworks like Flutter, React Native, and Next.js, alongside languages such as JavaScript, Python, and Kotlin.
              </p>
              <p>
                My expertise spans mobile development, full-stack web technologies, and UI/UX design using tools like Figma. I build robust backend systems with Node.js, Python, and databases such as Firebase, Supabase, MySQL, and MongoDB, ensuring applications are scalable, secure, and user-centric. I also prioritize writing clean, testable code with tools like Jest for unit testing and Insomnia for API testing.
              </p>
              <p>
                Beyond coding, I actively contribute to open-source projects on GitHub, explore advancements in AI and machine learning, and stay updated with modern deployment platforms like Vercel and Netlify. My interest in cybersecurity drives me to implement secure coding practices, while my passion for continuous learning keeps me engaged with emerging tech trends.
              </p>
              
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-primary">Technical Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <skill.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-primary text-center">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className="text-xs">
                          {edu.year}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-primary mb-2">{edu.degree}</h4>
                        <p className="text-secondary mb-3">{edu.institution}</p>
                        <p className="text-muted-foreground text-sm">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}