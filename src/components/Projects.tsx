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
      title: 'Hakk Shop at Mujeer - E-commerce Marketplace',
      description: 'Comprehensive Flutter e-commerce marketplace with clean architecture, multi-language support (Arabic/English), Firebase authentication, real-time search, payment integration (eFawateer), and advanced filtering system.',
      tech: ['Flutter', 'Clean Architecture', 'Firebase', 'BLoC/Cubit', 'Payment Gateway', 'Multi-language', 'Real-time Search'],
      image: '🛍️',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    },
    {
      title: 'YOweMe - AI-Powered Expense Splitting',
      description: 'Fintech Rally 2025 hackathon project. AI-powered mobile & web solution for smart expense splitting with Google AI categorization, JoPACC API integration, and intelligent debt settlement system built in 48 hours.',
      tech: ['Flutter', 'Google AI', 'JoPACC API', 'Web Dashboard', 'Biometric Auth', 'Arabic/English'],
      image: '💸',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    },
    {
      title: 'TaskZen - Simplify Tasks, Amplify Focus',
      description: 'Modern task management mobile application with Firebase authentication, Firestore integration, and customizable theming. Features animated splash screen, bottom navigation, and robust state management with flutter_bloc.',
      tech: ['Flutter', 'Firebase Auth', 'Firestore', 'Flutter Bloc', 'Go Router', 'Dark/Light Theme'],
      image: '✅',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    },
    {
      title: 'Emotion Prediction from Twitter Posts',
      description: 'Machine learning project implementing multiple classification models (KNN, SVM, Decision Tree, Random Forest, Neural Network) to predict emotions from Twitter posts using NLP techniques and TF-IDF vectorization.',
      tech: ['Python', 'Machine Learning', 'NLP', 'TF-IDF', 'Scikit-learn', 'Data Visualization'],
      image: '🧠',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    },
    {
      title: 'Tweet Classification with Machine Learning',
      description: 'Comprehensive tweet classification system using supervised ML algorithms. Features data preprocessing, TF-IDF vectorization, and comparative analysis of KNN, SVM, Decision Trees, Random Forest, and Neural Networks.',
      tech: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF', 'Data Science', 'Classification'],
      image: '🐦',
      liveUrl: '#',
      githubUrl: 'https://github.com/mjaber5'
    },
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
        <div className="text-center mb-20">
          <div className="pulse-chip mx-auto mb-6 opacity-0 fade-in-element">
            <span>Portfolio</span>
          </div>
          <h2 className="section-title mb-6 opacity-0 fade-in-element">
            Featured Projects & Solutions
          </h2>
          <p className="section-subtitle mx-auto max-w-3xl opacity-0 fade-in-element">
            A curated selection of mobile applications and platforms that demonstrate technical excellence, 
            innovative problem-solving, and measurable business impact across diverse industries.
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
        <div className="text-center mt-20 opacity-0 fade-in-element">
          <div className="max-w-3xl mx-auto glass-card p-12 border border-border">
            <h3 className="text-3xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
              Ready to Transform Your Ideas into Reality?
            </h3>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Whether you're looking to build a cutting-edge mobile application, integrate IoT solutions, 
              or scale your existing platform, I'm here to deliver exceptional results that drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="button-primary inline-flex items-center px-8 py-4 text-lg font-semibold"
              >
                Start Your Project
              </a>
              <a
                href="#about"
                className="button-secondary inline-flex items-center px-8 py-4 text-lg font-semibold"
              >
                Learn More About Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;