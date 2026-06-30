import Image from 'next/image'
import { FadeUp } from '@/components/motion/FadeUp'

export function ServicesHero() {
  return (
    <section
      className="relative flex min-h-[45vh] items-center overflow-hidden section-padding pt-32"
      aria-label="Services hero"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/hero/services/services-hero.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,20,19,0.92) 0%, rgba(0,20,19,0.70) 55%, rgba(0,20,19,0.40) 100%)',
          }}
        />
      </div>

      <div className="container-site relative z-10">
        <FadeUp>
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="eyebrow">What We Do</span>
            <h1 className="text-balance">
              Services Built Around{' '}
              <span className="text-gradient">Your Success.</span>
            </h1>
            <p className="body-lg text-white/65 max-w-lg">
              End-to-end support from your first conversation to your first day on the job — across
              the US and Canada.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
