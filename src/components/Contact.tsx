import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';

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
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'mohjaber@ieee.org',
      href: 'mailto:mohjaber@ieee.org'
    },
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6 opacity-0 fade-in-element">
            <div className="glass-card p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg transition-colors duration-200 bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border rounded-lg transition-colors duration-200 bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg transition-colors duration-200 bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    placeholder="Project inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border rounded-lg transition-colors duration-200 bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                    placeholder="Tell me about your project idea..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200",
                    isSubmitting
                      ? "bg-muted cursor-not-allowed text-muted-foreground"
                      : "button-primary"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center p-3 bg-green-400/10 rounded-lg border border-green-400/20">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center p-3 bg-red-400/10 rounded-lg border border-red-400/20">
                    Failed to send message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 opacity-0 fade-in-element">
            {/* Contact Details */}
            <div className="glass-card p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{
                      backgroundColor: 'hsl(var(--primary) / 0.2)',
                      color: 'hsl(var(--primary))'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="transition-colors duration-200 hover:text-primary"
                          style={{ color: 'hsl(var(--foreground))' }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div style={{ color: 'hsl(var(--foreground))' }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>Follow Me</h3>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border rounded-lg flex items-center justify-center transition-all duration-200 bg-background/50 border-border text-muted-foreground hover:text-primary hover:border-primary"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Availability</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Available for new projects</span>
              </div>
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Currently accepting freelance projects and full-time opportunities. 
                Response time: 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;