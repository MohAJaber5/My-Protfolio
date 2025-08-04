import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface ProfileData {
  name: string;
  title: string;
  location: string;
  summary: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  experience: string;
  skills: string;
}

interface LinkedInImporterProps {
  onImport: (data: ProfileData) => void;
}

export const LinkedInImporter: React.FC<LinkedInImporterProps> = ({ onImport }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    title: '',
    location: '',
    summary: '',
    email: '',
    phone: '',
    linkedinUrl: 'https://www.linkedin.com/in/mohammad-jaber-profile/',
    githubUrl: '',
    experience: '',
    skills: ''
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImport = () => {
    if (!formData.name || !formData.title) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and title",
        variant: "destructive"
      });
      return;
    }

    onImport(formData);
    toast({
      title: "Profile Imported",
      description: "Your LinkedIn information has been imported successfully!"
    });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Import LinkedIn Profile</h2>
      <p className="text-muted-foreground mb-6">
        Fill in your LinkedIn information to automatically populate your portfolio
      </p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Mohammad Jaber"
            />
          </div>
          <div>
            <Label htmlFor="title">Professional Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Senior Software Engineer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="mohammad@example.com"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, Country"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={formData.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            placeholder="Brief description of your professional background and expertise..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="experience">Experience (Separate multiple roles with |)</Label>
          <Textarea
            id="experience"
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            placeholder="Senior Software Engineer at Company A | Software Developer at Company B"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="skills">Skills (Comma separated)</Label>
          <Textarea
            id="skills"
            value={formData.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            placeholder="React, TypeScript, Node.js, Python, AWS..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
            <Input
              id="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>
          <div>
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              value={formData.githubUrl}
              onChange={(e) => handleInputChange('githubUrl', e.target.value)}
              placeholder="https://github.com/yourusername"
            />
          </div>
        </div>

        <Button onClick={handleImport} className="w-full">
          Import Profile Data
        </Button>
      </div>
    </Card>
  );
};