export type ProcessStep = {
  id: string
  number: number
  phase: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  badge?: string
  icon: string
  image?: string
}

export const processSteps: ProcessStep[] = [
  {
    id: '01',
    number: 1,
    phase: 'Phase 01',
    title: 'Career Counseling',
    subtitle: 'Personalized Career Guidance',
    description:
      'We begin with a deep conversation about your background, aspirations, and the opportunities that best match your unique profile.',
    tags: ['Career mapping', 'Goal setting', 'Industry insights'],
    icon: 'Users',
    image: '/assets/hero/process/process-1.png',
  },
  {
    id: '02',
    number: 2,
    phase: 'Phase 02',
    title: 'Industrial Brushup',
    subtitle: 'Bridge the Skill Gap',
    description:
      'We identify skill gaps and provide targeted brush-up sessions to align your expertise with current industry demands.',
    tags: ['Technical refresher', 'Domain training', 'Trend alignment'],
    icon: 'Briefcase',
    image: '/assets/hero/process/process-2.png',
  },
  {
    id: '03',
    number: 3,
    phase: 'Phase 03',
    title: 'Resume Optimization',
    subtitle: 'Craft Your Professional Narrative',
    description:
      'We enhance and refine your resume to US/Canada industry standards, ensuring your profile highlights your strengths and gets noticed.',
    tags: ['ATS-optimised', 'US/CAN format', 'LinkedIn alignment'],
    icon: 'FileText',
    image: '/assets/hero/process/process-3.png',
  },
  {
    id: '04',
    number: 4,
    phase: 'Phase 04',
    title: 'Mock Session',
    subtitle: 'Master Every Interview',
    description:
      'We conduct realistic mock interviews with detailed feedback so you walk into every real interview with confidence.',
    tags: ['Mock rounds', 'STAR coaching', 'Feedback loop'],
    icon: 'Target',
    image: '/assets/hero/process/process-4.png',
  },
  {
    id: '05',
    number: 5,
    phase: 'Phase 05',
    title: 'Aggressive Marketing',
    subtitle: 'Targeted Profile Promotion',
    description:
      'Your profile is strategically promoted to relevant employers and hiring managers through our network and partnerships.',
    tags: ['Employer outreach', 'Network activation', 'Role matching'],
    icon: 'TrendingUp',
    image: '/assets/hero/process/process-5.png',
  },
  {
    id: '06',
    number: 6,
    phase: 'Phase 06',
    title: 'Interview Assistance',
    subtitle: 'One-on-One Interview Support',
    description:
      'We support you through every interview stage — from scheduling and prep to real-time guidance and follow-up.',
    tags: ['Interview scheduling', 'Pre-interview prep', 'Real-time guidance'],
    icon: 'UserPlus',
    image: '/assets/hero/process/process-6.png',
  },
  {
    id: '07',
    number: 7,
    phase: 'Phase 07',
    title: 'Documentation &\u00a0Onboarding',
    subtitle: 'From Offer to First Day',
    description:
      'We manage offer negotiation, documentation, and onboarding formalities so your transition into the new role is seamless.',
    tags: ['Offer evaluation', 'Visa/document support', '90-day check-in'],
    icon: 'Award',
    image: '/assets/hero/process/process-7.png',
  },
]

export const homepageProcessSteps = processSteps
