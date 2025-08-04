import React, { useEffect, useRef } from 'react';
import { Trophy, Award, Users, Star } from 'lucide-react';

const Achievements = () => {
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

  const achievements = [
    {
      icon: Trophy,
      title: 'Crown Prince Award Finalist',
      description: 'Recognized for innovative legal technology platform Qanoni',
      year: '2024',
      category: 'Innovation',
      color: 'hsl(var(--primary))'
    },
    {
      icon: Award,
      title: 'FinTech Rally 2024 - 2nd Place',
      description: 'YOweMe AI-powered expense splitting solution',
      year: '2024',
      category: 'Competition',
      color: 'hsl(var(--secondary))'
    },
    {
      icon: Users,
      title: 'CSD Team Leadership',
      description: 'Leading community development and mentoring developers',
      year: '2023-Present',
      category: 'Leadership',
      color: 'hsl(var(--primary))'
    },
    {
      icon: Star,
      title: 'Technical Excellence',
      description: '4.8+ star rating across all published mobile applications',
      year: '2022-2024',
      category: 'Recognition',
      color: 'hsl(var(--secondary))'
    }
  ];

  const stats = [
    { number: '2', label: 'Major Awards', color: 'hsl(var(--primary))' },
    { number: '15+', label: 'Projects Delivered', color: 'hsl(var(--secondary))' },
    { number: '30+', label: 'Developers Mentored', color: 'hsl(var(--primary))' },
    { number: '10k+', label: 'App Downloads', color: 'hsl(var(--secondary))' }
  ];

  return (
    <section className="py-16 md:py-24 relative" id="achievements" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="pulse-chip mx-auto mb-4 opacity-0 fade-in-element">
            <span>Recognition</span>
          </div>
          <h2 className="section-title mb-4 opacity-0 fade-in-element">
            Awards & Achievements
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            Recognition for technical excellence and innovation in mobile development
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center opacity-0 fade-in-element glass-card p-6 border border-border"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.number}
              </div>
              <div className="text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="opacity-0 fade-in-element glass-card p-8 border border-border hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="flex items-start gap-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${achievement.color} / 0.1`,
                    border: `1px solid ${achievement.color} / 0.3`
                  }}
                >
                  <achievement.icon className="w-8 h-8" style={{ color: achievement.color }} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                      {achievement.title}
                    </h3>
                    <span className="text-sm px-3 py-1 rounded-full border" style={{
                      backgroundColor: `${achievement.color} / 0.1`,
                      color: achievement.color,
                      borderColor: `${achievement.color} / 0.3`
                    }}>
                      {achievement.category}
                    </span>
                  </div>
                  
                  <p className="leading-relaxed mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {achievement.description}
                  </p>
                  
                  <div className="text-sm font-semibold" style={{ color: achievement.color }}>
                    {achievement.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 opacity-0 fade-in-element">
          <div className="glass-card p-8 border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
              Ready to Build Something Amazing?
            </h3>
            <p className="mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Let's collaborate on your next mobile project and create solutions that make a difference.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-3 button-primary text-lg font-semibold"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;