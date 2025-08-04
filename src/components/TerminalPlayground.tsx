import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Command {
  input: string;
  output: string;
  timestamp: Date;
}

const TerminalPlayground = () => {
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
• projects - View projects
• contact - Contact information
• clear - Clear terminal
• whoami - Current user info`,
    
    about: () => `Mohammad Jaber - Mobile App Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location: Amman, Jordan
Specialization: Flutter & Android Development
Focus: Building scalable, smart, and beautiful mobile applications

Passionate about creating innovative mobile experiences that solve real-world problems.`,

    skills: () => `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mobile Development:
  • Flutter (Dart)
  • Android (Java/Kotlin)
  • iOS Development
  
Backend & APIs:
  • Node.js
  • REST APIs
  • Firebase
  • Supabase
  
Tools & Technologies:
  • Git/GitHub
  • Docker
  • CI/CD
  • Database Design`,

    projects: () => `Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. E-Commerce Mobile App
   • Flutter, Firebase, Payment Integration
   • 10k+ downloads on Play Store
   
2. Task Management App
   • Real-time sync, Offline support
   • Android & iOS platforms
   
3. Travel Companion App
   • GPS integration, Social features
   • Winner of local hackathon`,

    contact: () => `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: mohammad.jaber@example.com
LinkedIn: linkedin.com/in/mohammadjaber
GitHub: github.com/mohammadjaber
Location: Amman, Jordan

Available for freelance projects and full-time opportunities.`,

    whoami: () => 'mohammad@portfolio:~$',
    
    clear: () => null,
    
    date: () => new Date().toLocaleString(),
    
    pwd: () => '/home/mohammad/portfolio',
    
    ls: () => `about.txt  skills.md  projects/  contact.info  resume.pdf`,
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Add welcome message
    setHistory([{
      input: '',
      output: `Welcome to Mohammad Jaber's Portfolio Terminal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type 'help' to see available commands.
Type 'about' to learn more about me.`,
      timestamp: new Date()
    }]);
  }, []);

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let output: string | null;
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      setIsLoading(false);
      return;
    }
    
    if (commands[trimmedCmd as keyof typeof commands]) {
      output = commands[trimmedCmd as keyof typeof commands]();
    } else if (trimmedCmd === '') {
      output = '';
    } else {
      output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    
    if (output !== null) {
      setHistory(prev => [...prev, {
        input: cmd,
        output,
        timestamp: new Date()
      }]);
    }
    
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="py-16 md:py-24" id="terminal">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4" style={{ color: 'hsl(var(--foreground))' }}>
            Interactive Terminal
          </h2>
          <p className="section-subtitle mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Explore my portfolio through a command-line interface
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-400 text-sm font-mono">mohammad@portfolio: ~</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div 
              ref={terminalRef}
              className="h-96 overflow-y-auto p-4 font-mono text-sm bg-gray-900 cursor-text"
              onClick={handleTerminalClick}
            >
              {history.map((entry, index) => (
                <div key={index} className="mb-2">
                  {entry.input && (
                    <div className="flex items-center text-green-400">
                      <span className="text-blue-400 mr-2">mohammad@portfolio:~$</span>
                      <span>{entry.input}</span>
                    </div>
                  )}
                  {entry.output && (
                    <div className="text-gray-300 whitespace-pre-line mt-1 ml-4">
                      {entry.output}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Current Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-blue-400 mr-2">mohammad@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-green-400 outline-none font-mono"
                  placeholder={isLoading ? "Processing..." : "Type a command..."}
                  disabled={isLoading}
                  autoFocus
                />
                {isLoading && (
                  <div className="ml-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </form>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Try commands like <code className="px-2 py-1 rounded" style={{ 
                backgroundColor: 'hsl(var(--muted))', 
                color: 'hsl(var(--primary))' 
              }}>help</code>, 
              <code className="px-2 py-1 rounded ml-1" style={{ 
                backgroundColor: 'hsl(var(--muted))', 
                color: 'hsl(var(--primary))' 
              }}>about</code>, or 
              <code className="px-2 py-1 rounded ml-1" style={{ 
                backgroundColor: 'hsl(var(--muted))', 
                color: 'hsl(var(--primary))' 
              }}>skills</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalPlayground;