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
              <span>About Me</span>
            </div>
            
            <h2 className="section-title text-white opacity-0 fade-in-element">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Mohammad Jaber</span>
            </h2>
            
            <div className="space-y-4 text-gray-300 opacity-0 fade-in-element">
              <p className="text-lg leading-relaxed">
                I'm Mohammad Jaber, a dedicated Flutter Mobile Developer with 2+ years of experience creating 
                innovative mobile solutions. Currently working at Mujeer, I specialize in Flutter development, 
                IoT integration, and real-time applications that solve real-world problems.
              </p>
              
              <p className="leading-relaxed">
                My journey has been marked by significant achievements including being a Crown Prince Award 
                Finalist for the Qanoni App and winning 2nd place at the FinTech Rally 2024. As a CSD Team 
                Leader, I've led 6+ workshops, mentoring fellow developers and building community.
              </p>
              
              <p className="leading-relaxed">
                "Technology should serve humanity, not the other way around. I strive to create mobile 
                experiences that are intuitive, accessible, and meaningful. Every line of code I write 
                is an opportunity to make someone's day a little bit better."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 opacity-0 fade-in-element">
              <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-yellow-400">2+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-yellow-400">10+</div>
                <div className="text-gray-400 text-sm">Technologies Mastered</div>
              </div>
            </div>
          </div>
          
          {/* Image/Visual Content */}
          <div className="relative opacity-0 fade-in-element">
            <div className="relative z-10">
              <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                <div className="h-full flex flex-col justify-center space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-gray-900 font-bold text-xl">MJ</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Mohammad Jaber</div>
                      <div className="text-gray-400">Flutter Mobile Developer @ Mujeer</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">📍 Amman, Jordan (Remote Ready)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">🏆 Crown Prince Award Finalist</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300">🥈 FinTech Rally Winner</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-300">👥 CSD Team Leader</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="text-gray-400 text-sm mb-2">Specializing in:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">IoT Integration</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Real-time Apps</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;