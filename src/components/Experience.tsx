import React, { useEffect, useRef, useState } from 'react';
import { Folder, Building2, Calendar, MapPin, ChevronDown } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
}

interface ExperienceFolder {
  folderName: string;
  icon: React.ReactNode;
  color: string;
  experiences: ExperienceItem[];
}

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredFolder, setHoveredFolder] = useState<number | null>(null);

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

  const experienceFolders: ExperienceFolder[] = [
    {
      folderName: 'Full-Time',
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      experiences: [
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
        }
      ]
    },
    {
      folderName: 'Leadership',
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      experiences: [
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
        }
      ]
    },
    {
      folderName: 'Freelance',
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      experiences: [
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
            Hover over folders to explore my professional journey
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {experienceFolders.map((folder, folderIndex) => (
            <div
              key={folderIndex}
              className="relative opacity-0 fade-in-element"
              onMouseEnter={() => setHoveredFolder(folderIndex)}
              onMouseLeave={() => setHoveredFolder(null)}
            >
              {/* iOS-style Folder */}
              <div
                className={`
                  relative cursor-pointer transition-all duration-500 ease-out
                  ${hoveredFolder === folderIndex ? 'scale-105' : 'scale-100'}
                `}
              >
                {/* Folder Icon Background */}
                <div className={`
                  relative bg-gradient-to-br ${folder.color}
                  rounded-3xl p-8 shadow-2xl
                  transition-all duration-500
                  ${hoveredFolder === folderIndex ? 'shadow-3xl opacity-90' : 'opacity-100'}
                `}
                style={{
                  backdropFilter: 'blur(10px)',
                  background: `linear-gradient(135deg, ${folder.color})`,
                }}
                >
                  {/* Folder Tab (iOS style) */}
                  <div className="absolute -top-3 left-8 w-24 h-6 bg-gradient-to-br from-white/20 to-white/10 rounded-t-xl backdrop-blur-sm" />

                  {/* Folder Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                      <Folder className="w-12 h-12 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-1">{folder.folderName}</h3>
                      <p className="text-white/80 text-sm">
                        {folder.experiences.length} {folder.experiences.length === 1 ? 'role' : 'roles'}
                      </p>
                    </div>
                    <ChevronDown
                      className={`
                        w-6 h-6 text-white/60 transition-transform duration-300
                        ${hoveredFolder === folderIndex ? 'translate-y-1 opacity-100' : 'opacity-0'}
                      `}
                    />
                  </div>

                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />
                </div>

                {/* Expanded Cards (iOS style) */}
                <div
                  className={`
                    absolute top-full left-1/2 -translate-x-1/2 w-[400px] mt-4 z-50
                    transition-all duration-500 ease-out origin-top
                    ${hoveredFolder === folderIndex
                      ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
                      : 'opacity-0 scale-95 pointer-events-none -translate-y-4'}
                  `}
                >
                  <div className="space-y-4">
                    {folder.experiences.map((exp, expIndex) => (
                      <div
                        key={expIndex}
                        className="
                          backdrop-blur-xl bg-white/10 dark:bg-gray-900/40
                          border border-white/20 dark:border-gray-700/50
                          rounded-2xl p-6 shadow-2xl
                          transition-all duration-300
                          hover:shadow-3xl hover:scale-[1.02]
                        "
                        style={{
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        }}
                      >
                        {/* Header */}
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {exp.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                              {exp.company}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                              {exp.type}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Achievements */}
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                            Key Achievements:
                          </h5>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-1.5 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
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