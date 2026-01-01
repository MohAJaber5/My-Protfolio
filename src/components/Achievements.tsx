import React, { useEffect, useRef } from 'react';
import { Trophy, Award, Users, Sparkles, ArrowUpRight } from 'lucide-react';

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

  const achievements = [
    {
      icon: Trophy,
      title: 'FinTech Rally 2025',
      subtitle: 'Winner',
      description: 'YOweMe - AI-powered expense splitting solution with Google AI categorization and JoPACC API integration',
      year: '2025',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      icon: Award,
      title: 'Crown Prince Award',
      subtitle: 'Finalist',
      description: 'Qanoni - Innovative legal technology platform with digital signatures and document processing',
      year: '2024',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Trophy,
      title: 'FinTech Rally 2024',
      subtitle: '2nd Place',
      description: 'Dispute management system solution for financial services',
      year: '2024',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Users,
      title: 'CSD Team Leadership',
      subtitle: 'Team Lead',
      description: '15+ workshops, 200+ developers reached, 30+ junior developers mentored',
      year: '2024-2025',
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <section className="py-24 md:py-32 relative" id="achievements" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

        {/* Section Header */}
        <div className="mb-20 opacity-0 fade-in-element">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-muted-foreground text-sm tracking-widest uppercase">Recognition</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground lowercase">
            awards & milestones
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-primary/30 to-border hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`
                  relative flex flex-col md:flex-row items-start gap-8 opacity-0 fade-in-element
                  ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
                `}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Content Card */}
                <div className={`
                  flex-1 group
                  ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}
                `}>
                  <div className="relative overflow-hidden rounded-3xl bg-background/50 backdrop-blur-sm border border-border p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">

                    {/* Gradient Accent */}
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-32 h-32 bg-gradient-to-br ${achievement.gradient} opacity-10 blur-3xl`} />

                    {/* Year Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${achievement.gradient} text-white text-sm font-medium mb-6`}>
                      <Sparkles className="w-4 h-4" />
                      {achievement.year}
                    </div>

                    {/* Title & Subtitle */}
                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {achievement.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${achievement.gradient} text-white`}>
                        {achievement.subtitle}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {achievement.description}
                    </p>

                    {/* Icon */}
                    <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${achievement.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                        <achievement.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${achievement.gradient} ring-4 ring-background`} />
                </div>

                {/* Empty Space for Layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center opacity-0 fade-in-element">
          <p className="text-muted-foreground mb-6">
            Interested in collaborating on award-winning projects?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium transition-all duration-300 hover:scale-105 hover:bg-primary group"
          >
            Let's Connect
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Achievements;