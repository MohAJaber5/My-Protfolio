import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const About = () => {
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
              }, index * 200);
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

  return (
    <section className="py-16 md:py-24 relative" id="about" ref={sectionRef}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="pulse-chip opacity-0 fade-in-element">
              <span>About</span>
            </div>
            
            <h2 className="section-title opacity-0 fade-in-element">
              Crafting Digital Excellence Through <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{
                backgroundImage: `linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))`
              }}>Mobile Innovation</span>
            </h2>
            
            <div className="space-y-6 opacity-0 fade-in-element" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <p className="text-lg leading-relaxed">
                As a Flutter Developer at Mujeer, I specialize in architecting scalable mobile solutions 
                that bridge cutting-edge technology with real-world business needs. My expertise spans from 
                IoT integration to real-time application development, delivering measurable impact across diverse industries.
              </p>
              
              <p className="leading-relaxed">
                My professional journey is distinguished by recognition as a Crown Prince Award Finalist for the 
                Qanoni legal technology platform and securing 2nd place at FinTech Rally 2024. As a CSD Team Leader, 
                I've spearheaded technical workshops and mentored emerging developers, contributing to Jordan's 
                growing tech ecosystem.
              </p>
              
              <blockquote className="border-l-4 pl-6 italic leading-relaxed" style={{ 
                borderColor: 'hsl(var(--primary))',
                color: 'hsl(var(--foreground))'
              }}>
                "Excellence in mobile development isn't just about writing clean code—it's about creating digital 
                experiences that genuinely improve people's lives while driving business success."
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-6 opacity-0 fade-in-element">
              <div className="text-center p-6 glass-card border border-border">
                <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>2+</div>
                <div className="text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Years Experience</div>
              </div>
              <div className="text-center p-6 glass-card border border-border">
                <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>15+</div>
                <div className="text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Projects Delivered</div>
              </div>
            </div>
          </div>
          
          {/* Image/Visual Content */}
          <div className="relative opacity-0 fade-in-element">
            <div className="relative z-10">
              <div className="w-full glass-card border border-border rounded-2xl p-8 shadow-2xl">
                <div className="h-full flex flex-col justify-center space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl" style={{
                      background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                      color: 'hsl(var(--primary-foreground))'
                    }}>
                      MJ
                    </div>
                    <div>
                      <div className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>Mohammad Jaber</div>
                      <div className="font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Flutter Developer @ Mujeer</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
                      <span style={{ color: 'hsl(var(--foreground))' }}>📍 Amman, Jordan (Remote Ready)</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--secondary))' }}></div>
                      <span style={{ color: 'hsl(var(--foreground))' }}>🏆 Crown Prince Award Finalist</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
                      <span style={{ color: 'hsl(var(--foreground))' }}>🥈 FinTech Rally 2024 Winner</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--secondary))' }}></div>
                      <span style={{ color: 'hsl(var(--foreground))' }}>👥 Technical Team Lead</span>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <div className="text-sm font-medium mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>Core Expertise:</div>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 rounded-full text-sm font-medium border" style={{
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                        color: 'hsl(var(--primary))',
                        borderColor: 'hsl(var(--primary) / 0.3)'
                      }}>Flutter Development</span>
                      <span className="px-4 py-2 rounded-full text-sm font-medium border" style={{
                        backgroundColor: 'hsl(var(--secondary) / 0.1)',
                        color: 'hsl(var(--secondary))',
                        borderColor: 'hsl(var(--secondary) / 0.3)'
                      }}>IoT Integration</span>
                      <span className="px-4 py-2 rounded-full text-sm font-medium border" style={{
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                        color: 'hsl(var(--primary))',
                        borderColor: 'hsl(var(--primary) / 0.3)'
                      }}>Real-time Systems</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20" style={{
              background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`
            }}></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-2xl opacity-20" style={{
              background: `linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))`
            }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;