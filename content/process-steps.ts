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
    title: 'Profile Review',
    subtitle: 'Deep-Dive Career Assessment',
    description:
      'We conduct a comprehensive review of your background, skills, and career aspirations to identify opportunities that align with your goals.',
    tags: ['Skills audit', 'Experience mapping', 'Goal alignment'],
    icon: 'User',
    image: '/assets/hero/process/process-1.png',
  },
  {
    id: '02',
    number: 2,
    phase: 'Phase 02',
    title: 'Resume',
    subtitle: 'Craft Your Professional Narrative',
    description:
      'We enhance and refine your resume to US/Canada industry standards, ensuring your profile highlights your strengths and gets noticed.',
    tags: ['ATS-optimised', 'US/CAN format', 'LinkedIn alignment'],
    icon: 'FileText',
    image: '/assets/hero/process/process-2.png',
  },
  {
    id: '03',
    number: 3,
    phase: 'Phase 03',
    title: 'Marketing',
    subtitle: 'Targeted Profile Promotion',
    description:
      'Your profile is strategically promoted to relevant employers and hiring managers through our network and partnerships.',
    tags: ['Employer outreach', 'Network activation', 'Role matching'],
    icon: 'TrendingUp',
    image: '/assets/hero/process/process-3.png',
  },
  {
    id: '04',
    number: 4,
    phase: 'Phase 04',
    title: 'Dedicated Recruiter',
    subtitle: 'One-on-One Expert Guidance',
    description:
      'A dedicated recruiter guides you throughout — managing submissions, coordinating interviews, and supporting you at every stage.',
    tags: ['Single point of contact', 'Progress tracking', 'Real-time updates'],
    icon: 'Users',
    image: '/assets/hero/process/process-4.png',
  },
  {
    id: '05',
    number: 5,
    phase: 'Phase 05',
    title: 'Interview Prep',
    subtitle: 'Master Every Round',
    description:
      'We provide interview preparation, mock sessions, and feedback to help you perform with confidence — from first round to final offer.',
    tags: ['Mock interviews', 'STAR coaching', 'Technical prep'],
    icon: 'Target',
    image: '/assets/hero/process/process-5.png',
  },
  {
    id: '06',
    number: 6,
    phase: 'Phase 06',
    title: 'Offer & Onboarding',
    subtitle: 'Negotiate & Start Strong',
    description:
      'We manage offer negotiation and joining formalities, supporting you through to a successful start in your new role.',
    tags: ['Offer evaluation', 'Salary negotiation', '90-day check-in'],
    icon: 'Award',
    image: '/assets/hero/process/process-6.png',
  },
]

// The condensed homepage teaser mirrors the full six-stage candidate journey
// (Profile Review -> Offer & Onboarding). Kept as a named export so the journey
// stays a single source of truth - if the canonical flow changes, both surfaces
// update together.
export const homepageProcessSteps = processSteps
