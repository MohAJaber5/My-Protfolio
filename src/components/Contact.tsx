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
            <div className="glass-card p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>Send Message</h3>
              
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
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
                
                {/* Friendly message */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground italic">
                    💬 I love to listen and collaborate on exciting projects!
                  </p>
                </div>
                
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
        </div>
      </div>
    </section>
  );
};

export default Contact;