import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X, Image as ImageIcon, ExternalLink, Play, Linkedin } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  gradient: string;
  readTime?: string;
  description: string;
  playStore?: string;
  appStore?: string;
  linkedinUrl?: string;
}

const ProjectCard = ({
  project,
  index,
  onClick
}: {
  project: ProjectCardProps;
  index: number;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="group flex-shrink-0 w-[85vw] md:w-[50vw] lg:w-[40vw] transition-transform duration-300 hover:-translate-y-2 text-left"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[16/10] shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{ background: project.gradient }}
        />
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          draggable={false}
        />
        {project.readTime && (
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-medium z-10">
            {project.readTime}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Project Info */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
            {project.category}
          </p>
        </div>
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </button>
  );
};

// --- Modal Component ---
const ProjectModal = ({ project, onClose }: { project: ProjectCardProps; onClose: () => void }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-md transition-colors border border-border"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Left Side: Hero Image / Screenshots Area */}
        <div className="w-full md:w-1/2 md:max-h-full overflow-y-auto bg-muted border-r border-border">
          {/* Main Cover Image */}
          <div className="relative aspect-[16/10] w-full">
            <div className="absolute inset-0" style={{ background: project.gradient }} />
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* LinkedIn Post Placeholder/Link */}
          <div className="p-6">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-blue-500" />
              Featured on LinkedIn
            </h4>
            {project.linkedinUrl ? (
              <a
                href={project.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-8 border-2 border-border rounded-xl text-primary bg-primary/5 hover:bg-primary/10 transition-colors group text-center"
              >
                <Linkedin className="w-8 h-8 mb-3 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium text-lg">View Discussion & Demo</span>
                <span className="text-sm text-muted-foreground mt-1">Check out the full post on LinkedIn</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl text-muted-foreground bg-background/50 text-center">
                <Linkedin className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">LinkedIn post integration.</p>
                <p className="text-xs mt-1 opacity-70">Add your LinkedIn post URL to highlight it here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
              {project.readTime || 'Project Details'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {project.title}
            </h2>
            <p className="text-lg text-muted-foreground font-medium mb-6">
              {project.category}
            </p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-muted-foreground whitespace-pre-line leading-relaxed flex-1">
            {project.description}
          </div>

          <div className="mt-auto pt-6 border-t border-border flex flex-wrap gap-4">
            {project.playStore && (
              <a
                href={project.playStore}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Play className="w-5 h-5" />
                Google Play
              </a>
            )}
            {project.appStore && (
              <a
                href={project.appStore}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-muted border border-border text-foreground hover:bg-muted/80 rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                App Store
              </a>
            )}

            {(!project.playStore && !project.appStore) && (
              <div className="text-sm flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-muted-foreground bg-muted/50">
                <ExternalLink className="w-4 h-4 opacity-50" />
                Store links not available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [selectedProject, setSelectedProject] = useState<ProjectCardProps | null>(null);

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
    const walk = (x - startX) * 1.5;
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

  const projects: ProjectCardProps[] = [
    {
      title: 'Hakk Shop E-Commerce',
      category: 'Flutter Development / E-commerce / Payments',
      // To use an image from public folder, use `./image-name.png` or `/image-name.png`
      image: './hakk-logo.png',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      readTime: 'Production App',
      description: 'Developed a Jordan-focused e-commerce marketplace with OTP authentication, multi-language support (Arabic RTL/English), and advanced product filtering. Integrated eFawateercom payment gateway and optimized app launch times by 2-3 seconds.',
      playStore: 'https://play.google.com/store/apps/details?id=hakk.shop.app',
      appStore: 'https://apps.apple.com/jo/app/hakk-offers-deals-more/id6749207035',
      // Place your linked post url here
      linkedinUrl: 'https://www.linkedin.com/posts/mohammad-jaber-profile_softwareengineering-flutter-mobiledevelopment-activity-7418912098984001536-2y34?utm_source=share&utm_medium=member_ios&rcm=ACoAADXz-4IBGANI8R5VFe1MtTXq-rt8j7o2fZs'
    },
    {
      title: 'Basma SaaS Platform',
      category: 'Attendance & Workforce Management / BLoC / Clean Architecture',
      image: './basma-logo.jpg',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      readTime: 'SaaS Platform',
      description: 'Architected and developed a multi-tenant SaaS workforce management application enabling policy-driven attendance tracking and structured approval workflows. Implemented biometric auth, role-based access control, and leave request pipelines.',
      playStore: '',
      appStore: '',
      linkedinUrl: 'https://www.linkedin.com/posts/mohammad-jaber-profile_basma-saas-hrtech-activity-7427241424410050560-1EAY?utm_source=share&utm_medium=member_ios&rcm=ACoAADXz-4IBGANI8R5VFe1MtTXq-rt8j7o2fZs'
    },
    {
      title: 'Qanoni Legal Tech App',
      category: 'Crown Prince Award Finalist / Digital Signatures',
      image: './qanoni-logo.png',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      readTime: 'Award Winning (Unpublished)',
      description: 'Led full development (A-Z) of a mobile application enabling digital contract creation with predefined legal templates. Implemented PDF processing, AI-powered chatbot for legal queries, real-time notifications, and secure payment integrations. (Currently showing screenshots only as it is strictly B2B/Unpublished)',
      playStore: '',
      appStore: '',
      linkedinUrl: 'https://www.linkedin.com/posts/mohammad-jaber-profile_qanoniapp-graduationproject-legaltech-activity-7285579302174130177-mgTM?utm_source=share&utm_medium=member_desktop&rcm=ACoAADXz-4IBGANI8R5VFe1MtTXq-rt8j7o2fZs'
    },
    {
      title: 'Neelli Server-Driven Platform',
      category: 'Server-Driven UI / Adaptive Styling / Cart State',
      image: './neelli-logo.png',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      readTime: 'Architecture Design (Unpublished)',
      description: 'Architected a Server-Driven UI (SDUI) mobile application enabling dynamic layout rendering without requiring app updates. Engineered the full checkout pipeline including cart state management and delivery calculations.',
      playStore: '',
      appStore: '',
      linkedinUrl: ''
    },
    {
      title: 'Wali Monitoring System',
      category: 'VoIP Telephony / Real-time Fleet Tracking',
      image: './wms-logo.png',
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      readTime: 'Enterprise App',
      description: 'Built enterprise workforce coordination app with VoIP/SIP telephony, real-time fleet tracking, and live camera monitoring feeds. Integrated native platform channels (Kotlin/Swift) for device-level call handling and audio management.',
      playStore: 'https://play.google.com/store/apps/details?id=alwali.wms.app',
      appStore: 'https://apps.apple.com/jo/app/wms-real-time-fleet-manager/id6755349368',
      linkedinUrl: 'https://www.linkedin.com/posts/mohammad-jaber-profile_mobile-app-presentation-activity-7383054787124297729--2As?utm_source=share&utm_medium=member_desktop&rcm=ACoAADXz-4IBGANI8R5VFe1MtTXq-rt8j7o2fZs'
    }
  ];

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <>
      <section className="py-24 md:py-32 relative" id="projects" ref={sectionRef}>
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
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
          <div className="flex-shrink-0 w-6 md:w-12" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 mt-12 opacity-0 fade-in-element">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-sm">{projects.length} projects</span>
          </div>
        </div>
      </section>

      {/* Render Modal if a project is selected */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Projects;