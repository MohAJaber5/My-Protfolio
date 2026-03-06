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

    about: () => `Mohammad Jaber - Mobile Software Engineer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location: Amman, Jordan
Specialization: Secure, Scalable & Production-Grade Mobile Systems
Focus: Flutter & Android (Kotlin/Java)

Designed and implemented a runtime security architecture for a digital banking platform featuring 40+ adaptive threat signals, risk-based access control, and OWASP MASVS-aligned resilience. Experienced in architecting multi-tenant SaaS applications and server-driven e-commerce platforms.`,

    skills: () => `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mobile Development:
  • Flutter, Dart, Android (Kotlin/Java)
  • Platform Channels, Native Module Integration
  
Security & Architecture:
  • OWASP MASVS, Runtime Threat Detection, Risk Engine Design
  • AES Encryption, Biometric Authentication
  • Clean Architecture, BLoC/Cubit, MVVM, get_it
  
Backend & APIs:
  • RESTful APIs, Encrypted API Communication
  • Firebase (Firestore, FCM, Auth)
  • Real-time Systems (Pusher, WebSocket)
  
Tools & Practices:
  • Git, Unit Testing, CI/CD, Performance Optimization`,

    experience: () => `Work Experience:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mobile Engineer — MUJEER | Jun 2025 – Present | Amman, Jordan
• Walyt (Digital Banking): Architected a native security layer (Kotlin+Swift) with 40+ threat detections. 
  Designed a centralized risk engine and AES encrypted API layer. Reduced cold start time by 3 seconds.
• Basma (SaaS Workforce): Built a multi-tenant platform with biometric auth, role-based access, and BLoC.
• Neelli (E-Commerce): Implemented a server-driven UI (SDUI) architecture enabling dynamic layout rendering.
• WMS (Monitoring System): Created a workforce coordination app with VoIP, real-time fleet tracking, and live cameras.

Mobile Developer — Hakk Shop | E-Commerce Marketplace
• Developed a Jordan-focused e-commerce marketplace with advanced filtering and multi-language support.
• Integrated eFawateercom payment gateway and optimized app launch time by 2-3 seconds.`,

    education: () => `Education and Certifications:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B.Sc. in Computing Smart Devices (Very Good GPA)
Tafila Technical University, Jordan (Graduated June 2025)

Certifications:
• AWS Deploying Serverless Applications (2025)
• AWS DevOps Guru Getting Started (2025)
• Flutter Advanced: BLoC and MVVM Pattern (2024)
• CI/CD for Mobile Applications (2024)
• Complete C# Masterclass (2025)`,

    contact: () => `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: mhammdjbr555@gmail.com
LinkedIn: https://www.linkedin.com/in/mohammad-jaber-profile/
GitHub: https://github.com/mjaber5
Phone: +962 779294486`,

    clear: () => 'CLEAR_TERMINAL',

    whoami: () => 'mohammad-jaber@portfolio:~$ Mobile Software Engineer & Security Specialist'
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