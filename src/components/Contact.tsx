import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("TXG2kGhNAMU5x3Jtn");
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (form.current) {
        // Send email using EmailJS
        const result = await emailjs.sendForm(
          'service_xja4mkn',
          'template_b8tn94i',
          form.current,
          'TXG2kGhNAMU5x3Jtn'
        );
        
        console.log('Email sent successfully:', result.text);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email Alt',
      value: 'mhammdjbr555@gmail.com',
      href: 'mailto:mhammdjbr555@gmail.com'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Amman, Jordan (Remote Ready)',
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      href: 'https://github.com/mjaber5'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/mohammad-jaber-profile'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative" id="contact" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-20">
          <div className="pulse-chip mx-auto mb-6 opacity-0 fade-in-element">
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title mb-6 opacity-0 fade-in-element">
            Let's Build Something Extraordinary
          </h2>
          <p className="section-subtitle mx-auto max-w-3xl opacity-0 fade-in-element">
            Have a project in mind? Looking for a technical partner? Or simply want to discuss the latest 
            in mobile development? I'd love to hear from you and explore how we can create exceptional 
            digital experiences together.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Contact Form */}
          <div className="w-full max-w-2xl space-y-6 opacity-0 fade-in-element">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
              <div className="relative z-10 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Send Message</h3>
                </div>
              
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block mb-3 text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border rounded-xl transition-all duration-300 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background/80 focus:shadow-lg focus:shadow-primary/10 hover:border-border group-hover:border-primary/50"
                          placeholder="Your full name"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </div>
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block mb-3 text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Email *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border rounded-xl transition-all duration-300 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background/80 focus:shadow-lg focus:shadow-primary/10 hover:border-border group-hover:border-primary/50"
                          placeholder="your.email@example.com"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="subject" className="block mb-3 text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Subject *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 border rounded-xl transition-all duration-300 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background/80 focus:shadow-lg focus:shadow-primary/10 hover:border-border group-hover:border-primary/50"
                        placeholder="Project inquiry or collaboration"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="message" className="block mb-3 text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-5 py-4 border rounded-xl transition-all duration-300 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background/80 focus:shadow-lg focus:shadow-primary/10 hover:border-border group-hover:border-primary/50 resize-none"
                        placeholder="Tell me about your project idea, timeline, and how I can help bring your vision to life..."
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "relative w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 group overflow-hidden",
                      isSubmitting
                        ? "bg-muted/50 cursor-not-allowed text-muted-foreground border border-muted"
                        : "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] border border-primary/20"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="relative z-10">Send Message</span>
                      </>
                    )}
                  </button>
                  
                  {/* Friendly message */}
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground italic flex items-center justify-center space-x-2">
                      <span className="text-lg">💬</span>
                      <span>I love to listen and collaborate on exciting projects!</span>
                    </p>
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="text-green-400 text-center p-4 bg-green-400/10 rounded-xl border border-green-400/20 animate-in slide-in-from-bottom duration-300">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                      </div>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="text-red-400 text-center p-4 bg-red-400/10 rounded-xl border border-red-400/20 animate-in slide-in-from-bottom duration-300">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">×</span>
                        </div>
                        <span className="font-medium">Failed to send message. Please try again or contact me directly.</span>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;