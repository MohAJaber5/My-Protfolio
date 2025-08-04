import React, { useEffect, lazy, Suspense } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";

// Lazy load components
const Navbar = lazy(() => import("@/components/Navbar"));
const Hero = lazy(() => import("@/components/HeroNew"));
const About = lazy(() => import("@/components/AboutNew"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Contact = lazy(() => import("@/components/Contact"));
const Index = () => {

  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);


  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <ThemeToggle />
      <Suspense fallback={<div className="h-16 bg-background/50"></div>}>
        <Navbar />
      </Suspense>
      <main className="relative z-10">
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Hero />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;