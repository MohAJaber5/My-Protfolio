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
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((technology, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-medium border border-yellow-400/30"
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
      title: 'E-Commerce Mobile App',
      description: 'A comprehensive e-commerce platform with real-time inventory, secure payments, and personalized recommendations. Built with Flutter for cross-platform compatibility.',
      tech: ['Flutter', 'Firebase', 'Stripe API', 'Push Notifications'],
      image: '🛒',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time synchronization, offline support, and team collaboration features.',
      tech: ['Android', 'Kotlin', 'Room Database', 'Retrofit'],
      image: '✅',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Travel Companion',
      description: 'Social travel app with GPS integration, trip planning, expense tracking, and social sharing features. Winner of local hackathon.',
      tech: ['Flutter', 'Google Maps API', 'Node.js', 'MongoDB'],
      image: '✈️',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Fitness Tracker',
      description: 'Health and fitness tracking app with workout plans, progress monitoring, and social challenges. Integrates with wearable devices.',
      tech: ['Android', 'Health Connect', 'Charts', 'SQLite'],
      image: '🏃‍♂️',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Food Delivery App',
      description: 'On-demand food delivery platform with real-time tracking, multiple payment options, and restaurant management dashboard.',
      tech: ['Flutter', 'Node.js', 'Socket.io', 'Payment Gateway'],
      image: '🍕',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Learning Management',
      description: 'Educational platform with video streaming, progress tracking, quizzes, and interactive learning modules for students and educators.',
      tech: ['Flutter', 'Video Player', 'Firebase', 'Analytics'],
      image: '📚',
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative" id="projects" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="pulse-chip mx-auto mb-4 opacity-0 fade-in-element">
            <span>Portfolio</span>
          </div>
          <h2 className="section-title text-white mb-4 opacity-0 fade-in-element">
            Featured Projects
          </h2>
          <p className="section-subtitle text-gray-300 mx-auto opacity-0 fade-in-element">
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
            <h3 className="text-2xl font-semibold text-white mb-4">
              Interested in working together?
            </h3>
            <p className="text-gray-300 mb-8">
              I'm always excited to take on new challenges and create amazing mobile experiences.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
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