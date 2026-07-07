import { site } from '@/config/site'

export type ChatAction = {
  label: string
  href: string
  external?: boolean
}

export type ChatTopic = {
  id: string
  label: string
  keywords: string[]
  answer: string
  action?: ChatAction
}

export const CHATBOT_NAME = 'Averexa Assistant'

export const chatGreeting =
  "Hi, I'm the Averexa Assistant. I can answer quick questions about our placement process, services, pricing, and eligibility. Pick a topic below or type your question."

export const chatFallback =
  "I don't have a direct answer for that one yet. Try one of the topics below, or talk to a recruiter for anything more specific."

export const chatTopics: ChatTopic[] = [
  {
    id: 'guarantee',
    label: 'Do you guarantee placement?',
    keywords: ['guarantee', 'guaranteed', 'promise', 'sure shot', 'confirm job', 'assured'],
    answer:
      'We cannot guarantee a final placement, but every enrolled candidate gets a guaranteed interview opportunity. We actively improve your profile, connect you with relevant roles, and support you through every stage to maximize your chances of success.',
  },
  {
    id: 'process',
    label: 'How does the process work?',
    keywords: ['process', 'steps', 'how does it work', 'how it works', 'stages', 'procedure'],
    answer:
      'Our process runs in 7 phases: Career Counseling, Industrial Brushup, Resume Optimization, Mock Interview Sessions, Aggressive Marketing, Interview Assistance, and Documentation & Onboarding. You have a dedicated recruiter with you at every stage.',
    action: { label: 'See full process', href: '/process' },
  },
  {
    id: 'resume',
    label: 'Do you help with resumes?',
    keywords: ['resume', 'cv', 'profile optimization', 'linkedin', 'ats'],
    answer:
      'Yes. We provide resume reviews, ATS-optimized formatting for US/Canada standards, LinkedIn alignment, and interview preparation so you present yourself effectively to employers.',
  },
  {
    id: 'roles',
    label: 'What roles do you place?',
    keywords: ['roles', 'positions', 'jobs', 'full time', 'contract role', 'types of jobs', 'openings'],
    answer:
      'Full-time, contract, contract-to-hire, and executive search opportunities, from entry-level to leadership roles.',
  },
  {
    id: 'it-nonit',
    label: 'IT or Non-IT roles?',
    keywords: ['it role', 'non-it', 'non it', 'software', 'industry', 'field', 'domain', 'sector'],
    answer:
      'Both. We specialize in IT (software development, cloud, cybersecurity, data, DevOps) and Non-IT (finance, healthcare, manufacturing, engineering, retail, logistics, sales) placements.',
    action: { label: 'View all services', href: '/services' },
  },
  {
    id: 'pricing',
    label: 'Any hidden charges?',
    keywords: ['price', 'pricing', 'cost', 'fee', 'charge', 'hidden', 'payment', 'money', 'expensive'],
    answer:
      'No hidden costs. We believe in complete transparency, all service details and applicable fees are communicated clearly upfront before you enroll.',
  },
  {
    id: 'timeline',
    label: 'How fast will I see results?',
    keywords: ['timeline', 'how long', 'how fast', 'when will', 'results', 'duration'],
    answer:
      'Profile review and resume optimization are typically completed within 48 hours. Most candidates receive their first interview coordination within 2 to 4 weeks, depending on role availability and profile readiness.',
  },
  {
    id: 'countries',
    label: 'Which countries?',
    keywords: ['country', 'countries', 'usa', 'canada', 'location', 'where do you place'],
    answer: 'We place candidates with employers across the United States and Canada.',
  },
  {
    id: 'eligibility',
    label: 'Who can apply?',
    keywords: ['eligible', 'eligibility', 'apply', 'qualify', 'criteria', 'requirement', 'fresher', 'experience'],
    answer:
      'We work with job-ready professionals across experience levels, entry-level to executive, in IT and Non-IT fields who are eligible to work in the US or Canada. Share your background with us and we will assess the best-fit roles for you.',
    action: { label: 'Get started', href: '/contact' },
  },
  {
    id: 'employer',
    label: "I'm an employer",
    keywords: ['employer', 'hire', 'hiring', 'recruit talent', 'partner with', 'company looking', 'staffing'],
    answer:
      'Employers looking to hire vetted talent can reach us via our contact form, email, or LinkedIn. We will discuss your hiring needs and build a tailored recruitment strategy.',
    action: { label: 'Contact us', href: '/contact' },
  },
  {
    id: 'refer',
    label: 'Refer & Earn program',
    keywords: ['refer', 'referral', 'earn', 'reward', 'commission'],
    answer:
      'Know someone looking for a US or Canada role? Refer them through our Refer & Earn program and get rewarded once they are successfully placed.',
    action: { label: 'Refer & Earn', href: '/refer' },
  },
  {
    id: 'contact',
    label: 'Talk to a recruiter',
    keywords: ['talk', 'human', 'recruiter', 'contact', 'call', 'phone', 'email', 'whatsapp', 'reach', 'agent'],
    answer: `You can reach our team directly at ${site.phone} or ${site.email}, or chat with us instantly on WhatsApp.`,
    action: { label: 'Chat on WhatsApp', href: `https://wa.me/${site.whatsapp}`, external: true },
  },
]

const smallTalk: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'helo', 'namaste'],
    answer: 'Hello! Pick a topic below, or ask me anything about placements, process, or pricing.',
  },
  {
    keywords: ['thank', 'thanks', 'thankyou', 'thnx'],
    answer: "You're welcome. Anything else you'd like to know?",
  },
  {
    keywords: ['bye', 'goodbye', 'see you'],
    answer: 'Take care! You can reopen this chat anytime if you have more questions.',
  },
]

export function findBestTopic(input: string): ChatTopic | null {
  const normalized = input.toLowerCase().trim()
  if (!normalized) return null

  let best: ChatTopic | null = null
  let bestScore = 0

  for (const topic of chatTopics) {
    const score = topic.keywords.reduce((count, keyword) => count + (normalized.includes(keyword) ? 1 : 0), 0)
    if (score > bestScore) {
      bestScore = score
      best = topic
    }
  }

  return best
}

export function findSmallTalk(input: string): string | null {
  const normalized = input.toLowerCase().trim()
  if (!normalized) return null

  for (const entry of smallTalk) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.answer
    }
  }

  return null
}
