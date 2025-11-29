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
          <div className="w-full max-w-3xl space-y-6 opacity-0 fade-in-element">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-secondary/[0.02]"></div>
              <div className="relative z-10 p-10 md:p-12">
                <div className="mb-10">
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent mb-3">
                    Send a Message
                  </h3>
                  <p className="text-base text-muted-foreground/80 font-light">
                    Fill out the form below and I'll respond within 24-48 hours.
                  </p>
                </div>
              
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block mb-2.5 text-sm font-semibold tracking-wide uppercase text-foreground/70">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 bg-background/60 border-border/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:bg-background/80 focus:ring-4 focus:ring-primary/10 hover:border-border/60"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block mb-2.5 text-sm font-semibold tracking-wide uppercase text-foreground/70">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 bg-background/60 border-border/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:bg-background/80 focus:ring-4 focus:ring-primary/10 hover:border-border/60"
                        placeholder="john.doe@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="subject" className="block mb-2.5 text-sm font-semibold tracking-wide uppercase text-foreground/70">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 bg-background/60 border-border/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:bg-background/80 focus:ring-4 focus:ring-primary/10 hover:border-border/60"
                      placeholder="Project Inquiry, Consultation, Partnership"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block mb-2.5 text-sm font-semibold tracking-wide uppercase text-foreground/70">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={7}
                      className="w-full px-5 py-4 border-2 rounded-2xl transition-all duration-300 bg-background/60 border-border/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:bg-background/80 focus:ring-4 focus:ring-primary/10 hover:border-border/60 resize-none leading-relaxed"
                      placeholder="Describe your project requirements, objectives, and timeline. Include any specific technical requirements or constraints."
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "relative w-full flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 group overflow-hidden tracking-wide uppercase",
                        isSubmitting
                          ? "bg-muted/50 cursor-not-allowed text-muted-foreground border-2 border-muted"
                          : "bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.2)] hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] border-2 border-primary/30"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
                          <span className="relative z-10">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Send Message</span>
                          <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="text-green-500 text-center p-5 bg-green-500/5 rounded-2xl border-2 border-green-500/20 animate-in slide-in-from-bottom duration-300 backdrop-blur-sm">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <span className="font-semibold text-base">Message Delivered Successfully</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">I'll review your message and respond within 24-48 hours.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="text-red-500 text-center p-5 bg-red-500/5 rounded-2xl border-2 border-red-500/20 animate-in slide-in-from-bottom duration-300 backdrop-blur-sm">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                          <span className="text-white text-sm font-bold">!</span>
                        </div>
                        <span className="font-semibold text-base">Delivery Failed</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Unable to send message. Please try again or reach out via email directly.</p>
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