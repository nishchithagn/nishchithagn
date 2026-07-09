export interface Message {
  id: string;
  sender: 'user' | 'system' | 'model';
  content: string;
  timestamp: string;
  glitched?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  techStack: string[];
  classificationCode: string; // e.g. "PRJ-001"
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  score: string;
  duration: string;
  classificationCode: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[];
  classificationCode: string;
}
