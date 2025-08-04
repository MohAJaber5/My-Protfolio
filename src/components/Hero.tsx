
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/loop-header.lottie')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error("Error loading Lottie animation:", error));
  }, []);

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);
  
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  return (
    <section 
      className="overflow-hidden relative min-h-screen flex items-center" 
      id="hero" 
      style={{
        background: 'transparent',
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] opacity-20 blur-3xl rounded-full" style={{
        background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`
      }}></div>
      
      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div 
              className="pulse-chip mb-6 sm:mb-8 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full mr-3" style={{
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))'
              }}>✓</span>
              <span>Available for Projects</span>
            </div>
            
            <h1 
              className="section-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight opacity-0 animate-fade-in font-bold tracking-tight" 
              style={{ animationDelay: "0.3s" }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{
                backgroundImage: `linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))`
              }}>Mohammad Jaber</span><br className="hidden sm:inline" />
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Flutter Developer</span>
            </h1>
            
            <p 
              style={{ animationDelay: "0.5s" }} 
              className="section-subtitle mt-6 sm:mt-8 mb-8 sm:mb-10 leading-relaxed opacity-0 animate-fade-in font-normal text-lg sm:text-xl text-left max-w-2xl"
            >
              Transforming ideas into exceptional mobile experiences. Award-winning developer with expertise in Flutter, IoT integration, and scalable mobile solutions. Currently building the future at Mujeer.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-6 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.7s" }}
            >
              <a 
                href="#projects" 
                className="flex items-center justify-center group px-8 py-4 button-primary text-lg font-semibold" 
              >
                View My Work
                <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#contact" 
                className="button-secondary flex items-center justify-center group px-8 py-4 text-lg font-semibold" 
              >
                Let's Connect
              </a>
            </div>
            
            {/* Professional stats */}
            <div 
              className="flex flex-wrap gap-8 mt-12 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.9s" }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>2+</div>
                <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>15+</div>
                <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>2</div>
                <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Awards Won</div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            {lottieData ? (
              <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                <LottieAnimation 
                  animationPath={lottieData} 
                  className="w-full h-auto max-w-lg mx-auto"
                  loop={true}
                  autoplay={true}
                />
              </div>
            ) : (
              <>
              <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-xl"></div>
              <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💻</div>
                    <div className="text-xl font-semibold">Mobile Developer</div>
                    <div className="text-gray-400">Flutter • Android • iOS</div>
                  </div>
                </div>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl -z-10 parallax opacity-30" data-speed="0.05" style={{
        background: `linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3))`
      }}></div>
    </section>
  );
};

export default Hero;
