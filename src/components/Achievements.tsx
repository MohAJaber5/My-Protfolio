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
      icon: Award,
      title: 'FinTech Rally 2025',
      description: 'YOweMe AI-powered expense splitting solution',
      year: '2025',
      category: 'Competition',
      color: 'hsl(var(--primary))',
        variant: 'primary'
    },
    {
      icon: Trophy,
      title: 'Crown Prince Award Finalist',
      description: 'Recognized for innovative legal technology platform Qanoni',
      year: '2024',
      category: 'Innovation',
      variant: 'primary'
    },
    {
      icon: Award,
      title: 'FinTech Rally 2024 - 2nd Place',
      description: 'Dispute management system solution',
      year: '2024',
      category: 'Competition',
      variant: 'primary'
    },
    {
      icon: Users,
      title: 'CSD Team Leadership',
      description: 'Leading community development and mentoring developers',
      year: '2024-2025',
      category: 'Leadership',
      variant: 'primary'
    },
    {
      icon: Star,
      title: 'Technical Excellence',
      description: '4.8+ star rating across all published mobile applications',
      year: '2022-2024',
      category: 'Recognition',
      variant: 'primary'
    }
  ];

  const stats = [
    { number: '2', label: 'Major Awards', variant: 'primary' },
    { number: '15+', label: 'Projects Delivered', variant: 'primary' },
    { number: '10+', label: 'Developers Mentored', variant: 'primary' },
{ number: '20+', label: 'App Testers', variant: 'primary' }
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
              <div className={`text-3xl font-bold mb-2 ${stat.variant === 'primary' ? 'text-primary' : 'text-secondary'}`}>
                {stat.number}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
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
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                  achievement.variant === 'primary' 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'bg-secondary/10 border-secondary/30'
                }`}>
                  <achievement.icon className={`w-8 h-8 ${
                    achievement.variant === 'primary' ? 'text-primary' : 'text-secondary'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {achievement.title}
                    </h3>
                    <span className={`text-sm px-3 py-1 rounded-full border ${
                      achievement.variant === 'primary'
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-secondary/10 text-secondary border-secondary/30'
                    }`}>
                      {achievement.category}
                    </span>
                  </div>
                  
                  <p className="leading-relaxed mb-3 text-muted-foreground">
                    {achievement.description}
                  </p>
                  
                  <div className={`text-sm font-semibold ${
                    achievement.variant === 'primary' ? 'text-primary' : 'text-secondary'
                  }`}>
                    {achievement.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;