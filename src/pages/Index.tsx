import React, { useEffect, lazy, Suspense, useState } from "react";
import MobileDev3DBackground from "@/components/MobileDev3DBackground";
import ThemeToggle from "@/components/ThemeToggle";

// Lazy load components
const Navbar = lazy(() => import("@/components/Navbar"));
const Hero = lazy(() => import("@/components/HeroNew"));
const About = lazy(() => import("@/components/AboutNew"));
const Projects = lazy(() => import("@/components/Projects"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    <div
      className={`min-h-screen relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <MobileDev3DBackground />
      <ThemeToggle />
      <Suspense fallback={<div className="h-16 bg-background/50"></div>}>
        <Navbar />
      </Suspense>
      <main className="relative z-10">
        <Suspense fallback={<div className="h-screen flex items-center justify-center"></div>}>
          <Hero />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center"></div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center"></div>}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="h-64 flex items-center justify-center"></div>}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;