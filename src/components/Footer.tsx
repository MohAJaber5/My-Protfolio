
import React from "react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-16 relative z-10 border-t border-border/50">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                  color: 'hsl(var(--primary-foreground))'
                }}
              >
                MJ
              </div>
              <div>
                <div className="font-bold text-lg" style={{ color: 'hsl(var(--foreground))' }}>
                  Mohammad Jaber
                </div>
                <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Flutter Developer
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Passionate about creating innovative mobile experiences that solve real-world problems. 
              Specialized in Flutter development and IoT integration.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg" style={{ color: 'hsl(var(--foreground))' }}>
              Get In Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Amman, Jordan
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                <a 
                  href="mailto:mhammdjbr555@gmail.com" 
                  className="text-sm hover:underline transition-colors"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  mhammdjbr555@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  0779294486
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg" style={{ color: 'hsl(var(--foreground))' }}>
              Connect With Me
            </h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/mjaber5" 
                className="w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: 'hsl(var(--border))',
                  backgroundColor: 'hsl(var(--background))',
                  color: 'hsl(var(--muted-foreground))'
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/mohammadjaber" 
                className="w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: 'hsl(var(--border))',
                  backgroundColor: 'hsl(var(--background))',
                  color: 'hsl(var(--muted-foreground))'
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:mohammad.jaber@example.com" 
                className="w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: 'hsl(var(--border))',
                  backgroundColor: 'hsl(var(--background))',
                  color: 'hsl(var(--muted-foreground))'
                }}
                aria-label="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-4">
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 button-primary text-sm font-semibold"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              © {currentYear} Mohammad Jaber. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span style={{ color: 'hsl(var(--muted-foreground))' }}>
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Available for Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
