import type { IconName } from '@/config/icons'

export type RoleTrack = {
  key: string
  label: string
  tagline: string
  roles: { name: string; icon: IconName }[]
}

export const roleTracks: RoleTrack[] = [
  {
    key: 'it',
    label: 'IT & Technology',
    tagline: 'Our deepest bench.',
    roles: [
      { name: 'Software Development', icon: 'Code' },
      { name: 'Data & Analytics', icon: 'BarChart3' },
      { name: 'Cloud & DevOps', icon: 'Globe' },
      { name: 'QA & Testing', icon: 'Target' },
      { name: 'Cybersecurity', icon: 'Shield' },
      { name: 'IT Project Management', icon: 'Briefcase' },
      { name: 'Data Science & AI/ML', icon: 'Zap' },
      { name: 'Java Full Stack Development', icon: 'Code' },
      { name: 'Network Engineering', icon: 'Settings' },
      { name: 'Business Intelligence', icon: 'Eye' },
    ],
  },
  {
    key: 'non-it',
    label: 'Non-IT & Business',
    tagline: 'The same commitment.',
    roles: [
      { name: 'Finance & Accounting', icon: 'FileText' },
      { name: 'Healthcare', icon: 'Heart' },
      { name: 'Human Resources', icon: 'Users' },
      { name: 'Sales & Marketing', icon: 'TrendingUp' },
      { name: 'Engineering', icon: 'Settings' },
      { name: 'Customer Service & Admin', icon: 'MessageCircle' },
      { name: 'Supply Chain & Logistics', icon: 'Navigation' },
      { name: 'Business Analysis', icon: 'BarChart3' },
      { name: 'FinTech & Banking', icon: 'Award' },
      { name: 'Clinical & Pharmaceutical', icon: 'Star' },
    ],
  },
]

export type Specialization = {
  name: string
  icon: IconName
  category: 'it' | 'non-it'
}

export const specializations: Specialization[] = [
  { name: 'Data Scientist', icon: 'BarChart3', category: 'it' },
  { name: 'AI/ML Engineer', icon: 'Zap', category: 'it' },
  { name: 'Java Full Stack Developer', icon: 'Code', category: 'it' },
  { name: 'Network Engineer', icon: 'Settings', category: 'it' },
  { name: 'Business Intelligence Analyst', icon: 'Eye', category: 'it' },
  { name: 'Supply Chain Analyst', icon: 'Navigation', category: 'non-it' },
  { name: 'Business Analyst', icon: 'FileText', category: 'non-it' },
  { name: 'FinTech', icon: 'TrendingUp', category: 'non-it' },
  { name: 'Banking & Finance', icon: 'Briefcase', category: 'non-it' },
  { name: 'Clinical & Pharmaceutical', icon: 'Heart', category: 'non-it' },
]
