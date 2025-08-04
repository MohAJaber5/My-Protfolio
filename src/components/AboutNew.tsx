import React, { useState, useEffect, useRef, memo } from 'react';
import { Terminal, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Command {
  input: string;
  output: string;
  timestamp: Date;
}

const About = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = {
    help: () => `Available commands:
• help - Show this help message
• about - About Mohammad Jaber
• skills - Technical skills
• experience - Work experience
• education - Education and certifications
• contact - Contact information
• clear - Clear terminal`,
    
    about: () => `Mohammad Jaber - Flutter Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location: Amman, Jordan
Specialization: Flutter & Mobile Development
Focus: Building scalable, beautiful mobile applications

Passionate about creating innovative mobile experiences 
that solve real-world problems with clean, efficient code.`,

    skills: () => `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mobile Development:
  • Flutter (Dart) - Advanced
  • Android (Java/Kotlin) - Intermediate
  • iOS Development - Intermediate
  
Backend & APIs:
  • Node.js - Intermediate
  • REST APIs - Advanced
  • Firebase - Advanced
  • Supabase - Intermediate
  
Tools & Technologies:
  • Git/GitHub - Advanced
  • Docker - Intermediate
  • CI/CD - Intermediate`,

    experience: () => `Work Experience:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Flutter Developer - Mujeer
Full-time | 2025 - Present | Amman, Jordan
Leading mobile development initiatives with focus on scalable Flutter applications.

Key Achievements:
• Architected and delivered 3+ enterprise mobile applications
• Implemented real-time data synchronization reducing load times by 40%
• Led code reviews and mentored junior developers
• Integrated IoT devices with mobile applications for smart solutions

CSD Team Leader - Community Development
Leadership | 2024 - 2025 | Amman, Jordan
Leading technical workshops and community development initiatives in software engineering.

Key Achievements:
• Organized 15+ technical workshops reaching 200+ developers
• Mentored 30+ junior developers in mobile development
• Built strategic partnerships with local tech companies
• Established coding bootcamp curriculum for Flutter development

Mobile Developer - Freelance
Contract | 2023 - 2025 | Remote
Developed custom mobile solutions for startups and small businesses across various industries.

Key Achievements:
• Delivered 7 mobile applications with 10k+ total downloads
• Maintained 4.8+ star rating across all published apps
• Reduced development time by 30% through reusable component libraries
• Implemented payment gateways and e-commerce features`,

    education: () => `Education and Certifications:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B.Sc. in Computing Smart Devices
Tafila Technical University, Jordan (June 2025)

Certifications:
• The Complete 2022 Flutter & Dart Development Course | Udemy
• Flutter Advanced Course Bloc and MVVM Pattern | Udemy
• CI/CD for Mobile Applications | Udemy | 2024
• Complete C# Masterclass | Udemy | 2025
• Coaching Career Guidance (CCG) Program from Coach You`,

    contact: () => `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: mhammdjbr555@gmail.com
LinkedIn: https://www.linkedin.com/in/mohammad-jaber-profile/
GitHub: https://github.com/mjaber5
Phone: +962 779294486`,

    clear: () => 'CLEAR_TERMINAL',
    
    whoami: () => 'mohammad-jaber@portfolio:~$ Flutter Developer & Mobile App Specialist'
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const commandFunction = commands[command as keyof typeof commands];
    
    if (commandFunction) {
      const output = commandFunction();
      if (output === 'CLEAR_TERMINAL') {
        setHistory([]);
        return;
      }
      return output;
    } else {
      return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const output = executeCommand(input);
      const newCommand: Command = {
        input: input.trim(),
        output,
        timestamp: new Date()
      };
      
      setHistory(prev => [...prev, newCommand]);
      setInput('');
      setIsLoading(false);
    }, 500);
  };

  const runDemoCommand = (cmd: string) => {
    setInput(cmd);
    setTimeout(() => {
      const output = executeCommand(cmd);
      const newCommand: Command = {
        input: cmd,
        output,
        timestamp: new Date()
      };
      setHistory(prev => [...prev, newCommand]);
      setInput('');
    }, 300);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Welcome message
    const welcomeCommand: Command = {
      input: 'welcome',
      output: `Welcome to Mohammad Jaber's Portfolio Terminal!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type 'help' to see available commands or try:
• 'about' - Learn about me
• 'skills' - View my technical skills
• 'experience' - See my work experience`,
      timestamp: new Date()
    };
    setHistory([welcomeCommand]);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my background, skills, and experience through this interactive terminal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Terminal */}
          <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Terminal className="w-4 h-4" />
                <span>terminal</span>
              </div>
            </div>
            
            <div 
              ref={terminalRef}
              className="p-4 h-96 overflow-y-auto bg-background font-mono text-sm"
            >
              {history.map((cmd, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <span>$</span>
                    <span>{cmd.input}</span>
                  </div>
                  <div className="mt-1 text-foreground whitespace-pre-line pl-4">
                    {cmd.output}
                  </div>
                </div>
              ))}
              
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <span className="text-primary">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground"
                  placeholder="Type a command..."
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="w-2 h-4 bg-primary animate-pulse"></div>
                )}
              </form>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Quick Commands
              </h3>
              <p className="text-muted-foreground mb-6">
                Click any command below to run it in the terminal, or type them manually.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(commands).filter(cmd => cmd !== 'clear').map((cmd) => (
                <Button
                  key={cmd}
                  variant="outline"
                  className="justify-start text-left h-auto p-4"
                  onClick={() => runDemoCommand(cmd)}
                >
                  <div>
                    <div className="font-semibold">{cmd}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {cmd === 'help' && 'Show available commands'}
                      {cmd === 'about' && 'Learn about my background'}
                      {cmd === 'skills' && 'View technical skills'}
                      {cmd === 'experience' && 'Work experience'}
                      {cmd === 'education' && 'Education and certifications'}
                      {cmd === 'contact' && 'Contact information'}
                      {cmd === 'whoami' && 'Current user info'}
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            <div className="pt-4">
              <Button
                variant="ghost"
                onClick={() => runDemoCommand('clear')}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear Terminal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);