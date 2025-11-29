import React, { memo } from "react";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-center lg:text-left space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Mohammad Jaber
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Flutter Developer & Mobile App Specialist
            </p>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Passionate about creating beautiful, high-performance mobile applications 
            with Flutter. I transform ideas into exceptional digital experiences that 
            users love and businesses trust.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 text-lg font-semibold border-2"
              onClick={() => {
                // Create download link for CV - handle both local dev and GitHub Pages
                const link = document.createElement('a');
                const basePath = import.meta.env.BASE_URL || '/';
                link.href = `${basePath}Mohammed-Jaber.pdf`;
                link.download = 'Mohammed-Jaber.pdf';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center lg:justify-start pt-4">
            <a
              href="https://github.com/mjaber5"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-12 rounded-full bg-background/20 backdrop-blur-md border border-primary/20 flex items-center justify-center transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 hover:scale-110 cursor-pointer shadow-lg"
            >
              <Github className="h-5 w-5 text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-jaber-profile/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-12 rounded-full bg-background/20 backdrop-blur-md border border-primary/20 flex items-center justify-center transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 hover:scale-110 cursor-pointer shadow-lg"
            >
              <Linkedin className="h-5 w-5 text-primary" />
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-primary/20">
              <img
                src="./me.jpeg"
                alt="Mohammad Jaber - Flutter Developer"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);