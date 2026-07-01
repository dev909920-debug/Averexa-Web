import Image from 'next/image'
import { FadeUp } from '@/components/motion/FadeUp'

export function ProcessHero() {
  return (
    <section
      className="relative flex min-h-[35vh] md:min-h-[45vh] items-center overflow-hidden section-padding pt-20 md:pt-32"
      aria-label="Process hero"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/hero/process/process-hero.png"
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
            <span className="eyebrow">How It Works</span>
            <h1 className="text-balance">
              Your Journey,{' '}
              <span className="text-gradient">Step by Step.</span>
            </h1>
            <p className="body-lg text-white/65 max-w-lg">
              A transparent, proven path from first conversation to signed offer letter. No black
              boxes. No surprises.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
