
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import TerminalPlayground from "@/components/TerminalPlayground";
import Contact from "@/components/Contact";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

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

  if (isMobile) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 relative">
            <AnimatedBackground />
            <ThemeToggle />
            
            {/* Mobile Sidebar Trigger */}
            <div className="fixed top-4 left-4 z-50">
              <SidebarTrigger className="bg-background/80 backdrop-blur-md border border-border/50 hover:bg-accent/50 rounded-lg p-2" />
            </div>
            
            <main className="relative z-10 backdrop-blur-[1px] bg-background/80">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <TerminalPlayground />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <ThemeToggle />
      <Navbar />
      <main className="relative z-10 backdrop-blur-[1px] bg-background/80">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <TerminalPlayground />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
