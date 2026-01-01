import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-4 bg-background/80 backdrop-blur-md border-b border-border/50"
          : "py-6 bg-transparent"
      )}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-blue-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 lg:px-12">
        {/* Logo / Name */}
        <a
          href="#"
          className="group flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          <span className="text-base font-semibold text-foreground hover:text-primary transition-colors">Mohammad Jaber</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-foreground/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/My-Protfolio/Mohammed Jaber.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 text-sm font-medium rounded-full bg-foreground text-background hover:bg-primary transition-colors duration-200"
          >
            Resume
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-out",
          "bg-background",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 p-2 text-foreground"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-3xl font-medium text-foreground hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/My-Protfolio/Mohammed Jaber.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 text-lg font-medium rounded-full bg-foreground text-background hover:bg-primary transition-colors"
            onClick={closeMenu}
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
