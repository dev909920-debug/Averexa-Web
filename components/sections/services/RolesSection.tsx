'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { roleTracks, specializations } from '@/content/roles'
import { cn } from '@/lib/utils'
import type { IconName } from '@/config/icons'

const EASE = [0.16, 1, 0.3, 1] as const

const headlineWords = ['Across', 'Every', 'Industry.', 'In', 'Every', 'Role', 'That', 'Matters.']

function RoleRow({
  index,
  name,
  icon,
}: {
  index: number
  name: string
  icon: IconName
}) {
  const router = useRouter()

  return (
    <motion.li
      role="link"
      tabIndex={0}
      onClick={() => router.push('/contact')}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); router.push('/contact') } }}
      className="role-row group relative flex cursor-pointer items-center gap-4 overflow-hidden border-b border-white/[0.07] py-4 md:py-5"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* Hover gradient sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-emerald-500/10 to-transparent transition-transform duration-500 group-hover:scale-x-100"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      />

      {/* Number */}
      <span
        aria-hidden="true"
        className="relative font-mono text-sm font-bold text-white/20 transition-colors duration-300 group-hover:text-emerald-500"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <span className="relative flex items-center justify-center transition-colors duration-300 group-hover:text-emerald-400">
        <Icon name={icon} size="sm" className="text-white/30 transition-colors duration-300 group-hover:text-emerald-400" />
      </span>

      {/* Role name */}
      <span className="relative flex-1 text-base text-white/60 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white md:text-lg">
        {name}
      </span>

      {/* Arrow */}
      <ArrowUpRight
        aria-hidden="true"
        className="relative size-4 -translate-x-2 text-emerald-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </motion.li>
  )
}

function SpecializationCard({ name, icon, category, index }: { name: string; icon: IconName; category: 'it' | 'non-it'; index: number }) {
  const router = useRouter()

  return (
    <motion.div
      role="link"
      tabIndex={0}
      onClick={() => router.push('/contact')}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); router.push('/contact') } }}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
      className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl glass px-4 py-3 transition-all duration-300 hover:border-emerald-500/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(200px circle at 50% 50%, rgba(26,138,113,0.08), transparent 70%)',
        }}
      />
      <span className="relative flex items-center justify-center">
        <Icon name={icon} size="sm" className="text-emerald-500/60 transition-colors duration-300 group-hover:text-emerald-400" />
      </span>
      <span className="relative text-sm font-medium text-white/70 transition-colors duration-300 group-hover:text-white md:text-base">
        {name}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider transition-colors duration-300',
          category === 'it'
            ? 'bg-emerald-500/10 text-emerald-500/60 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
            : 'bg-white/5 text-white/30 group-hover:bg-white/10 group-hover:text-white/50',
        )}
      >
        {category === 'it' ? 'IT' : 'Non-IT'}
      </span>
    </motion.div>
  )
}

export function RolesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const headlineInView = useInView(headlineRef, { once: false, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="roles-we-power"
      className="relative min-h-screen overflow-hidden bg-ink-900 py-24 md:py-36"
    >
      {/* Ambient gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70rem 40rem at 50% -10%, rgba(26,138,113,0.08), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-[min(94%,80rem)]">
        {/* ── Header ── */}
        <div ref={headlineRef} className="mb-16 md:mb-20">
          <motion.span
            className="eyebrow mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Positions We Power
          </motion.span>

          <h2 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className={cn(
                  'mr-[0.3em] inline-block',
                  word === 'Matters.' && 'text-gradient',
                )}
                initial={{ opacity: 0, y: 40 }}
                animate={headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: EASE,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className="body-lg mt-6 max-w-2xl text-white/50"
            initial={{ opacity: 0, y: 20 }}
            animate={headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          >
            From software engineers to supply chain specialists, from cybersecurity experts to
            clinical professionals — we cover the full spectrum of talent placement across US and
            Canada.
          </motion.p>
        </div>

        {/* ── Twin Indexes ── */}
        <div className="relative grid gap-14 md:grid-cols-2 md:gap-0">
          {/* Center spine */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Center ampersand badge */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-0 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-emerald-500/20 bg-ink-900 text-lg font-bold text-emerald-500 md:grid"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          >
            &amp;
          </motion.div>

          {roleTracks.map((track, t) => (
            <div key={track.key} className={t === 0 ? 'md:pr-14' : 'md:pl-14'}>
              {/* Track header */}
              <motion.div
                className="mb-8 flex items-baseline justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.7, delay: t * 0.1, ease: EASE }}
              >
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{track.label}</h3>
                <p className="hidden text-xs uppercase tracking-[0.25em] text-white/30 md:block">
                  {track.tagline}
                </p>
              </motion.div>

              {/* Role list */}
              <ol className="border-t border-white/[0.07]">
                {track.roles.map((role, i) => (
                  <RoleRow key={role.name} index={i} name={role.name} icon={role.icon} />
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* ── Specializations Grid ── */}
        <motion.div
          className="mt-20 md:mt-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="mb-8 flex items-center gap-4">
            <span className="eyebrow">Specializations</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {specializations.map((spec, i) => (
              <SpecializationCard
                key={spec.name}
                name={spec.name}
                icon={spec.icon}
                category={spec.category}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
