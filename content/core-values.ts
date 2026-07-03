import type { IconName } from '@/config/icons'

export type CoreValue = {
  id: string
  icon: IconName
  title: string
  description: string
}

export const coreValues: CoreValue[] = [
  {
    id: 'integrity',
    icon: 'Shield',
    title: 'Integrity',
    description:
      'We uphold honesty and transparency in every interaction. Trust is our foundation and our promise to every candidate.',
  },
  {
    id: 'excellence',
    icon: 'Trophy',
    title: 'Excellence',
    description:
      'We strive to exceed expectations in every placement and every preparation session average is not in our vocabulary.',
  },
  {
    id: 'commitment',
    icon: 'Target',
    title: 'Commitment',
    description:
      "We understand each candidate’s unique needs and deliver results that create lasting value in their careers.",
  },
  {
    id: 'innovation',
    icon: 'Zap',
    title: 'Innovation',
    description:
      'We embrace modern recruitment practices and technology for efficient, effective outcomes that move faster.',
  },
  {
    id: 'people-first',
    icon: 'Heart',
    title: 'People First',
    description:
      'People are at the heart of everything we do. Aspirations, relationships, and human potential drive every decision.',
  },
  {
    id: 'collaboration',
    icon: 'Users',
    title: 'Collaboration',
    description:
      'We work closely with candidates and employers, fostering partnerships built on mutual growth and shared success.',
  },
]
