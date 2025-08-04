import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  icon: string;
  title: string;
  skills: string[];
  index: number;
}

const SkillCard = ({ icon, title, skills, index }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass-card p-6 hover:bg-white/10 transition-all duration-300 opacity-0 border border-white/10"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-2">
        {skills.map((skill, skillIndex) => (
          <div key={skillIndex} className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-gray-300">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
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

  const skillCategories = [
    {
      icon: '📱',
      title: 'Mobile Development (90%)',
      skills: ['Flutter', 'Android', 'Dart', 'Mobile UI/UX']
    },
    {
      icon: '💻',
      title: 'Programming Languages',
      skills: ['Dart (90%)', 'Java (80%)', 'JavaScript (75%)', 'Python (70%)']
    },
    {
      icon: '🏗️',
      title: 'Architecture & Patterns (85%)',
      skills: ['MVVM', 'Clean Architecture', 'SOLID Principles', 'Design Patterns']
    },
    {
      icon: '⚙️',
      title: 'Backend & Database',
      skills: ['Firebase (85%)', 'MySQL (75%)', '.NET Core (70%)', 'REST APIs (80%)']
    },
    {
      icon: '🛠️',
      title: 'Development Tools',
      skills: ['Git & GitHub (85%)', 'Postman (80%)', 'CI/CD (70%)', 'Testing (75%)']
    },
    {
      icon: '🌐',
      title: 'Specialized Skills',
      skills: ['IoT Integration (75%)', 'Real-time Apps (80%)', 'Performance Optimization (75%)', 'Security Best Practices (70%)']
    }
  ];

  return (
    <section className="py-16 md:py-24 relative" id="skills" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="pulse-chip mx-auto mb-4 opacity-0 fade-in-element">
            <span>Technical Skills</span>
          </div>
          <h2 className="section-title text-white mb-4 opacity-0 fade-in-element">
            Skills & Technologies
          </h2>
          <p className="section-subtitle text-gray-300 mx-auto opacity-0 fade-in-element">
            2+ years of mobile development expertise with 10+ technologies mastered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>

        {/* Tech Stack Visualization */}
        <div className="mt-16 opacity-0 fade-in-element">
          <h3 className="text-2xl font-semibold text-white text-center mb-8">
            Preferred Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Flutter', 'Dart', 'Android', 'Java', 'Kotlin', 'Firebase', 'MVVM', 'IoT', 'Git'].map((tech, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full border border-yellow-400/30 text-yellow-400 font-medium hover:scale-105 transition-transform duration-200"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;