import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6 bg-background/95 backdrop-blur-md animate-in fade-in duration-300">

      {/* Desktop Absolute Close Button */}
      <button
        onClick={onClose}
        className="hidden md:flex absolute top-6 right-6 z-[210] p-3 rounded-full bg-background/50 hover:bg-background border border-border/50 shadow-xl transition-all"
        aria-label="Close modal"
      >
        <X className="w-6 h-6 text-foreground" />
      </button>

      {/* Main Modal Container */}
      <div className="relative w-full h-full md:h-auto md:max-w-5xl md:max-h-[85vh] bg-card md:border md:border-border md:rounded-2xl shadow-2xl flex flex-col md:overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">

        {/* Mobile Top Bar (Permanent flex header) */}
        <div className="md:hidden flex-none z-[120] flex items-center justify-between px-5 py-3.5 bg-background border-b border-border shadow-sm">
          <span className="font-semibold text-base truncate pr-4">{project.title}</span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">

          {/* Left Side: Hero Image / LinkedIn Area */}
          <div className="w-full md:w-1/2 flex-shrink-0 md:max-h-full md:overflow-y-auto bg-muted/30 md:border-r border-border pb-8 md:pb-0">
            {/* Main Cover Image */}
            <div className="relative aspect-[16/10] w-full">
              <div className="absolute inset-0 opacity-90" style={{ background: project.gradient }} />
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* LinkedIn Post Placeholder/Link */}
            <div className="p-6 md:p-8">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5 flex items-center gap-2">
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                Featured on LinkedIn
              </h4>
              {project.linkedinUrl ? (
                <a
                  href={project.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-8 border border-border/60 shadow-sm rounded-2xl text-foreground bg-background hover:bg-muted transition-colors group text-center"
                >
                  <Linkedin className="w-10 h-10 mb-4 text-[#0A66C2] group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-lg mb-1">View Discussion & Demo</span>
                  <span className="text-sm text-muted-foreground mt-1 px-4 leading-relaxed">Check out the full post, comments, and video demo on LinkedIn</span>
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border border-dashed border-border/60 rounded-2xl text-muted-foreground bg-background/50 text-center">
                  <Linkedin className="w-10 h-10 mb-3 opacity-30" />
                  <p className="text-sm font-medium text-foreground mb-1">LinkedIn Integration</p>
                  <p className="text-xs opacity-70">Add your LinkedIn post URL to highlight it here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col md:max-h-full md:overflow-y-auto bg-background">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
                {project.readTime || 'Project Details'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight pr-0">
                {project.title}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground/80 font-medium mb-6 leading-relaxed">
                {project.category}
              </p>
            </div>

            <div className="prose prose-base dark:prose-invert max-w-none mb-10 text-muted-foreground whitespace-pre-line leading-relaxed flex-1">
              {project.description}
            </div>

            <div className="mt-auto pt-6 border-t border-border/50 flex flex-col sm:flex-row flex-wrap gap-4 pb-8 md:pb-0">
              {project.playStore && (
                <a
                  href={project.playStore}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-foreground text-background rounded-xl font-medium hover:opacity-90 transition-opacity flex-1 sm:flex-none"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Google Play
                </a>
              )}
              {project.appStore && (
                <a
                  href={project.appStore}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-background border border-border text-foreground hover:bg-muted/50 rounded-xl font-medium transition-colors flex-1 sm:flex-none shadow-sm"
                >
                  <ExternalLink className="w-5 h-5 opacity-80" />
                  App Store
                </a>
              )}

              {(!project.playStore && !project.appStore) && (
                <div className="w-full text-sm flex items-center justify-center gap-2 px-4 py-3 border border-border/60 rounded-xl text-muted-foreground/80 bg-muted/20">
                  <ExternalLink className="w-4 h-4 opacity-40" />
                  Store links not available for this project
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
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
      title: 'Neelli',
      category: 'Neelli - Makeup - Beauty',
      image: './neelli-logo.png',
      gradient: 'linear-gradient(135deg, #2e5ea9 0%, #ffffffff 100%)',
      readTime: 'E-commerce App',
      description: 'Architected a Server-Driven UI (SDUI) mobile application enabling dynamic layout rendering without requiring app updates. Engineered the full checkout pipeline including cart state management and delivery calculations.',
      playStore: '',
      appStore: 'https://apps.apple.com/jo/app/neelli-make-up-beauty/id1516417246',
      linkedinUrl: 'https://www.linkedin.com/posts/mohammad-jaber-profile_eid-mubarak-everyone-hope-youre-all-activity-7441378164473245696-dxuz?utm_source=share&utm_medium=member_desktop&rcm=ACoAADXz-4IBGANI8R5VFe1MtTXq-rt8j7o2fZs'
    },
    {
      title: 'Basma SaaS Platform',
      category: 'Attendance & Workforce Management / BLoC / Clean Architecture',
      image: './basma-logo.jpg',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      readTime: 'SaaS Platform',
      description: 'Architected and developed a multi-tenant SaaS workforce management application enabling policy-driven attendance tracking and structured approval workflows. Implemented biometric auth, role-based access control, and leave request pipelines.',
      playStore: 'https://play.google.com/store/apps/details?id=cloud.basma.app',
      appStore: 'https://apps.apple.com/jo/app/basma-time-attendance/id6757984682',
      linkedinUrl: 'https://www.linkedin.com/posts/mohammad-jaber-profile_basma-saas-hrtech-activity-7427241424410050560-1EAY?utm_source=share&utm_medium=member_ios&rcm=ACoAADXz-4IBGANI8R5VFe1MtTXq-rt8j7o2fZs'
    },

    {
      title: 'Hakk Shop E-Commerce',
      category: 'Flutter Development / E-commerce / Payments',
      // To use an image from public folder, use `./image-name.png` or `/image-name.png`
      image: './hakk-logo.png',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      readTime: 'E-commerce App',
      description: 'Developed a Jordan-focused e-commerce marketplace with OTP authentication, multi-language support (Arabic RTL/English), and advanced product filtering. Integrated eFawateercom payment gateway and optimized app launch times by 2-3 seconds.',
      playStore: 'https://play.google.com/store/apps/details?id=hakk.shop.app',
      appStore: 'https://apps.apple.com/jo/app/hakk-offers-deals-more/id6749207035',
      // Place your linked post url here
      linkedinUrl: 'https://www.linkedin.com/posts/mohammad-jaber-profile_softwareengineering-flutter-mobiledevelopment-activity-7418912098984001536-2y34?utm_source=share&utm_medium=member_ios&rcm=ACoAADXz-4IBGANI8R5VFe1MtTXq-rt8j7o2fZs'
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