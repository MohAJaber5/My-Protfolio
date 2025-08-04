import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}

const ProjectCard = ({ title, description, tech, image, liveUrl, githubUrl, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass-card group hover:bg-white/10 transition-all duration-500 opacity-0 border border-white/10 overflow-hidden"
      style={{ animationDelay: `${0.2 * index}s` }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl">{image}</div>
        </div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>{title}</h3>
        <p className="mb-4 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{description}</p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((technology, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 rounded-full text-xs font-medium border"
              style={{
                backgroundColor: 'hsl(var(--primary) / 0.2)',
                color: 'hsl(var(--primary))',
                borderColor: 'hsl(var(--primary) / 0.3)'
              }}
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.fade-in-element');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects = [
    {
      title: 'Galaxy Coder Journey',
      description: 'Interactive space-themed portfolio website with stunning galaxy navigation, animated starfield, planetary sections, and immersive coding experience. A journey through the coding universe with React + TypeScript.',
      tech: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
      image: '🌌',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    },
    {
      title: 'Smart-Home Flutter App',
      description: 'IoT-integrated smart home application with real-time device control, energy tracking, automation, and security integration for comprehensive home management.',
      tech: ['Flutter', 'Dart', 'IoT', 'Firebase', 'MQTT'],
      image: '🏠',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    },
    {
      title: 'Qanoni-App',
      description: 'Crown Prince Award Finalist - Legal tech application with advanced PDF processing, digital signatures, legal compliance, and document versioning capabilities.',
      tech: ['Flutter', 'Dart', 'PDF Processing', 'Digital Signatures'],
      image: '⚖️',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    },
    {
      title: 'Movie-API Android App',
      description: 'MVVM architecture showcase with advanced search functionality, movie recommendations, and offline caching for seamless user experience.',
      tech: ['Android', 'Kotlin', 'MVVM', 'Retrofit', 'Room DB'],
      image: '🎬',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    },
    {
      title: 'Community Projects',
      description: 'Open source contributions and developer mentoring initiatives. Led 6+ workshops as CSD Team Leader, building developer community and sharing knowledge.',
      tech: ['Flutter', 'Dart', 'Community Building', 'Open Source'],
      image: '👥',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative" id="projects" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="pulse-chip mx-auto mb-4 opacity-0 fade-in-element">
            <span>Portfolio</span>
          </div>
          <h2 className="section-title mb-4 opacity-0 fade-in-element">
            Featured Projects
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            A showcase of mobile applications that solve real-world problems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tech={project.tech}
              image={project.image}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 opacity-0 fade-in-element">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
              Interested in working together?
            </h3>
            <p className="mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
              I'm always excited to take on new challenges and create amazing mobile experiences.
            </p>
            <a
              href="#contact"
              className="button-primary inline-flex items-center"
            >
              Let's Build Something Amazing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;