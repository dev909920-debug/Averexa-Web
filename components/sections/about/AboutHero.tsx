import Image from 'next/image'
import { FadeUp } from '@/components/motion/FadeUp'

export function AboutHero() {
  return (
    <section
      className="relative flex min-h-[35vh] md:min-h-[45vh] items-center overflow-hidden section-padding pt-20 md:pt-32"
      aria-label="About hero"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/hero/about/about-hero.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Dark-left overlay — text positioned left of logo zones in the image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,20,19,0.92) 0%, rgba(0,20,19,0.65) 55%, rgba(0,20,19,0.30) 100%)',
          }}
        />
      </div>

      <div className="container-site relative z-10">
        <FadeUp>
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="eyebrow">About Averexa</span>
            <h1 className="text-balance">
              We Exist to Move{' '}
              <span className="text-gradient">Careers Forward.</span>
            </h1>
            <p className="body-lg text-white/65 max-w-lg">
              A dedicated cross-border placement partner for professionals chasing opportunity in the
              US and Canada.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
