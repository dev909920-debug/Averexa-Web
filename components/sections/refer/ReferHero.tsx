import Image from 'next/image'
import { FadeUp } from '@/components/motion/FadeUp'

export function ReferHero() {
  return (
    <section
      className="relative flex min-h-[50vh] items-center overflow-hidden section-padding pt-32"
      aria-label="Refer and earn hero"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/hero/refer/refer-hero.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Dark-top overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,20,19,0.85) 0%, rgba(0,20,19,0.55) 45%, rgba(0,20,19,0.80) 100%)',
          }}
        />
      </div>

      <div className="container-site relative z-10">
        <FadeUp>
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="eyebrow">Refer &amp; Earn</span>
            <h1 className="text-balance">
              Know Someone Ready for{' '}
              <span className="text-gradient">Their Next Move?</span>
            </h1>
            <p className="body-lg text-white/70 max-w-lg">
              Refer a friend or colleague to Averexa Placement — when they succeed, you&apos;re
              rewarded. Reach out to learn about our referral program.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
