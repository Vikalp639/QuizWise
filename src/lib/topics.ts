import { type LucideIcon, HeartPulse, Cpu, Landmark, FlaskConical } from 'lucide-react';

export type Topic = {
  name: string;
  slug: string;
  IconComponent: LucideIcon;
  description: string;
};

export const topics: Topic[] = [
  {
    name: 'Wellness',
    slug: 'wellness',
    IconComponent: HeartPulse,
    description: 'Explore topics on health, mindfulness, and personal growth.',
  },
  {
    name: 'Tech Trends',
    slug: 'tech-trends',
    IconComponent: Cpu,
    description: 'Test your knowledge on the latest in technology and innovation.',
  },
  {
    name: 'History',
    slug: 'history',
    IconComponent: Landmark,
    description: 'Journey through time and challenge your historical knowledge.',
  },
  {
    name: 'Science',
    slug: 'science',
    IconComponent: FlaskConical,
    description: 'Dive into the world of scientific discoveries and principles.',
  },
];
