import React, { useEffect, useRef } from 'react';
import { Building2, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
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

  const experiences = [
    {
      title: 'Flutter Developer',
      company: 'Mujeer',
      location: 'Amman, Jordan',
      period: '2025 - Present',
      type: 'Full-time',
      description: 'Leading mobile development initiatives with focus on scalable Flutter applications.',
      achievements: [
        'Architected and delivered 3+ enterprise mobile applications',
        'Implemented real-time data synchronization reducing load times by 40%',
        'Led code reviews and mentored junior developers',
        'Integrated IoT devices with mobile applications for smart solutions'
      ]
    },
    {
      title: 'CSD Team Leader',
      company: 'Community Development',
      location: 'Amman, Jordan',
      period: '2024 - 2025',
      type: 'Leadership',
      description: 'Leading technical workshops and community development initiatives in software engineering.',
      achievements: [
        'Organized 15+ technical workshops reaching 200+ developers',
        'Mentored 30+ junior developers in mobile development',
        'Built strategic partnerships with local tech companies',
        'Established coding bootcamp curriculum for Flutter development'
      ]
    },
    {
      title: 'Mobile Developer',
      company: 'Freelance',
      location: 'Remote',
      period: '2023 - 2025',
      type: 'Contract',
      description: 'Developed custom mobile solutions for startups and small businesses across various industries.',
      achievements: [
        'Delivered 7 mobile applications with 10k+ total downloads',
        'Maintained 4.8+ star rating across all published apps',
        'Reduced development time by 30% through reusable component libraries',
        'Implemented payment gateways and e-commerce features'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 relative" id="experience" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="pulse-chip mx-auto mb-4 opacity-0 fade-in-element">
            <span>Professional Journey</span>
          </div>
          <h2 className="section-title mb-4 opacity-0 fade-in-element">
            Work Experience
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            Building impactful mobile solutions and leading technical teams
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative opacity-0 fade-in-element"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div 
                  className="absolute left-6 top-16 w-0.5 h-32 z-0"
                  style={{ backgroundColor: 'hsl(var(--primary) / 0.3)' }}
                />
              )}
              
              <div className="flex gap-6 mb-12 relative z-10">
                {/* Timeline dot */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-4"
                  style={{
                    backgroundColor: 'hsl(var(--primary))',
                    borderColor: 'hsl(var(--background))'
                  }}
                >
                  <Building2 className="w-5 h-5" style={{ color: 'hsl(var(--primary-foreground))' }} />
                </div>
                
                {/* Content */}
                <div className="flex-1 glass-card p-6 border border-border">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold" style={{ color: 'hsl(var(--primary))' }}>
                          {exp.company}
                        </span>
                        <span className="text-sm px-2 py-1 rounded-full border" style={{
                          backgroundColor: 'hsl(var(--primary) / 0.1)',
                          color: 'hsl(var(--primary))',
                          borderColor: 'hsl(var(--primary) / 0.3)'
                        }}>
                          {exp.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mb-4 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {exp.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                          <span style={{ color: 'hsl(var(--muted-foreground))' }}>{achievement}</span>
                        </li>
                      ))}
                    </ul>
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

export default Experience;