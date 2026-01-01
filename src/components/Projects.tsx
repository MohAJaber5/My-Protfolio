import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  gradient: string;
  readTime?: string;
  href: string;
  index: number;
}

const ProjectCard = ({ title, category, image, gradient, readTime, href, index }: ProjectCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 w-[85vw] md:w-[50vw] lg:w-[40vw] transition-transform duration-300 hover:-translate-y-2"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[16/10] shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
        {/* Gradient Background (fallback) */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{ background: gradient }}
        />

        {/* Project Image */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          draggable={false}
        />

        {/* Read Time Badge */}
        {readTime && (
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-medium z-10">
            {readTime}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Project Info */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            {category}
          </p>
        </div>

        {/* Arrow Button */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

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
      { threshold: 0.05 }
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

  const projects: Omit<ProjectCardProps, 'index'>[] = [
    {
      title: 'Hakk Shop E-commerce Platform',
      category: 'Flutter Development / Clean Architecture / E-commerce',
      image: './projects/hakk-shop.png',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      readTime: 'Lead Developer',
      href: 'https://github.com/mjaber5'
    },
    {
      title: 'YOweMe - AI Expense Splitting',
      category: 'Fintech Rally 2025 Winner / Flutter / AI Integration',
      image: './projects/yoweme.png',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      readTime: '48hr Hackathon',
      href: 'https://github.com/mjaber5'
    },
    {
      title: 'Qanoni Legal Tech App',
      category: 'Crown Prince Award Finalist / Digital Signatures / PDF',
      image: './projects/qanoni.png',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      readTime: 'Award Winning',
      href: 'https://github.com/mjaber5'
    },
    {
      title: 'Smart Home IoT Application',
      category: 'IoT Integration / Real-time Control / MQTT / Firebase',
      image: './projects/smart-home.png',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      readTime: 'Personal Project',
      href: 'https://github.com/mjaber5'
    },
    {
      title: 'TaskZen - Task Management',
      category: 'Flutter / Firebase Auth / Firestore / BLoC Pattern',
      image: './projects/taskzen.png',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      readTime: 'Open Source',
      href: 'https://github.com/mjaber5'
    },
    {
      title: 'Movie Discovery Android App',
      category: 'Kotlin / MVVM Architecture / Retrofit / Room DB',
      image: './projects/movie-app.png',
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      readTime: 'Native Android',
      href: 'https://github.com/mjaber5'
    }
  ];

  // Reset scroll position to start
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <section className="py-24 md:py-32 relative" id="projects" ref={sectionRef}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 mb-12 opacity-0 fade-in-element">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-muted-foreground text-sm tracking-widest uppercase">Selected Work</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="flex items-end justify-between">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground lowercase">
            work canvas
          </h2>

        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 md:gap-8 overflow-x-auto cursor-grab select-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))',
          paddingRight: '1.5rem'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            {...project}
            index={index}
          />
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-6 md:w-12" />
      </div>


      {/* Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 mt-12 opacity-0 fade-in-element">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">{projects.length} projects</span>
        </div>
      </div>
    </section>
  );
};

export default Projects;