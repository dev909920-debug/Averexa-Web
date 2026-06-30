'use client'

import Image from 'next/image'
import { partnerCompanies } from '@/content/partner-companies'

const mid = Math.ceil(partnerCompanies.length / 2)
const row1 = partnerCompanies.slice(0, mid)
const row2 = partnerCompanies.slice(mid)

function CompanyPill({ name, domain }: { name: string; domain: string }) {
  return (
    <div
      className="group flex shrink-0 cursor-default items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2.5 backdrop-blur-lg transition-all duration-500 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
      style={{
        boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 -1px 0 rgba(0,0,0,0.4) inset',
        willChange: 'box-shadow, border-color',
      }}
    >
      <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/[0.06]">
        <Image
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt={`${name} logo`}
          width={20}
          height={20}
          className="size-5 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
      <span className="select-none whitespace-nowrap text-sm font-medium tracking-wide text-white/60 transition-colors duration-500 group-hover:text-white/80">
        {name}
      </span>
    </div>
  )
}

function MarqueeRow({
  companies,
  direction,
  duration,
}: {
  companies: typeof partnerCompanies
  direction: 'left' | 'right'
  duration: number
}) {
  const triple = [...companies, ...companies, ...companies]
  return (
    <div className="relative overflow-hidden">
      <div
        className="marquee-track flex w-max gap-3"
        style={{
          animationName: direction === 'left' ? 'marquee-ltr' : 'marquee-rtl',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          willChange: 'transform',
        }}
      >
        {triple.map((c, i) => (
          <CompanyPill key={`${c.domain}-${i}`} {...c} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-900 to-transparent" />
    </div>
  )
}

export function LogoScroller() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.04] bg-ink-900 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '60%',
          height: '200%',
          background:
            'radial-gradient(ellipse 50% 40% at center, rgba(26,138,113,0.02) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto mb-12 max-w-4xl space-y-3 px-6 text-center">
        <span className="inline-block text-xs font-semibold tracking-[0.15em] text-[#64748B] uppercase">
          Trusted By
        </span>
        <h2 className="text-balance text-3xl font-light leading-[1.05] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
          Leading organizations{' '}
          <span className="font-normal text-white/85">rely on Averexa</span>
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-white/[0.07]" />
      </div>

      <MarqueeRow companies={row1} direction="left" duration={24} />
      <div className="h-3" />
      <MarqueeRow companies={row2} direction="right" duration={30} />

      <div className="mt-10 text-center">
        <span className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] text-white/[0.12] uppercase">
          <span className="inline-block h-px w-6 bg-white/[0.08]" />
          180+ active employer partners
          <span className="inline-block h-px w-6 bg-white/[0.08]" />
        </span>
      </div>

      <style>{`
        @keyframes marquee-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-rtl {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </section>
  )
}
