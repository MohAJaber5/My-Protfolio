import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Contact = () => {
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

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/mohammad-jaber-profile',
      icon: Linkedin
    },
    {
      label: 'GitHub',
      href: 'https://github.com/mjaber5',
      icon: Github
    },
    {
      label: 'Email',
      href: 'mailto:mhammdjbr555@gmail.com',
      icon: Mail
    }
  ];

  return (
    <section className="py-24 md:py-32 relative" id="contact" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 opacity-0 fade-in-element">
            <span className="text-foreground">Let's stay </span>
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              connected
            </span>
            <span className="text-foreground">.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl mb-12 opacity-0 fade-in-element">
            Hope to see you later!
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 opacity-0 fade-in-element">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground opacity-0 fade-in-element">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">from Amman, Jordan / available globally</span>
          </div>

          {/* Divider */}
          <div className="my-16 h-px bg-border opacity-0 fade-in-element" />

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-0 fade-in-element">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              Home
            </button>
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              Work
            </a>
            <a
              href="/My-Protfolio/MohammedJaber.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              Resume
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-12 text-muted-foreground/60 text-xs opacity-0 fade-in-element">
            © {new Date().getFullYear()} Mohammad Jaber.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary opacity-80 hover:opacity-100 z-50"
        aria-label="Back to top"
      >
        <ArrowUpRight className="w-5 h-5 rotate-[-45deg]" />
      </button>
    </section>
  );
};

export default Contact;