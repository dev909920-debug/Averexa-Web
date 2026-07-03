import type { IconName } from '@/config/icons'

export type Service = {
  id: string
  icon: IconName
  title: string
  description: string
}

export const services: Service[] = [
  {
    id: 'it-placement',
    icon: 'Globe',
    title: 'IT Placement',
    description:
      'Roles across software development, cloud, cybersecurity, data, DevOps, and project management matched to your skills and ambitions.',
  },
  {
    id: 'non-it-placement',
    icon: 'Briefcase',
    title: 'Non-IT Placement',
    description:
      'Opportunities across finance, healthcare, manufacturing, engineering, retail, logistics, sales, and administration.',
  },
  {
    id: 'permanent-placement',
    icon: 'Award',
    title: 'Permanent / Full-Time Placement',
    description:
      'Long-term, payroll roles aligned with your skills, goals, and the culture you will thrive in.',
  },
  {
    id: 'contract',
    icon: 'RefreshCw',
    title: 'Contract & Contract-to-Hire',
    description:
      'Flexible engagements short-term, long-term, and contract-to-hire pathways into top companies.',
  },
  {
    id: 'executive-search',
    icon: 'Trophy',
    title: 'Executive Search',
    description:
      'Senior and leadership placements for experienced professionals ready for their next big move.',
  },
  {
    id: 'resume-optimization',
    icon: 'FileText',
    title: 'Resume Optimization',
    description:
      'Detailed resume reviews and profile refinement to meet US/Canada employer standards.',
  },
  {
    id: 'interview-prep',
    icon: 'Target',
    title: 'Interview Preparation',
    description:
      'Technical and behavioral mock interviews with real feedback until you are genuinely ready.',
  },
  {
    id: 'career-guidance',
    icon: 'Users',
    title: 'Career Guidance & Counseling',
    description:
      'Honest, personalized guidance to help you navigate your cross-border career with confidence.',
  },
]
