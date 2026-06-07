export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Publication {
  title: string;
  journal: string;
  date: string;
}

export interface AboutData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  linkedIn: string;
  dob: string;
  location: string;
  education: Education[];
  certifications: Certification[];
  publications: Publication[];
  interests: string[];
  awards: string[];
  languages: string[];
}

export interface ExperienceProject {
  name: string;
  points: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  projects: ExperienceProject[];
}

export interface ProjectItem {
  id: string;
  title: string;
  period: string;
  tags: string[];
  description: string;
  points: string[];
  status: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillModel {
  categories: SkillCategory[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
