import Image from 'next/image'
import { FadeUp } from '@/components/motion/FadeUp'

export function ContactHero() {
  return (
    <section
      className="relative flex min-h-[35vh] md:min-h-[45vh] items-center overflow-hidden section-padding pt-20 md:pt-32"
      aria-label="Contact hero"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/hero/contact/contact-hero.png"
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
              'linear-gradient(to right, rgba(0,20,19,0.92) 0%, rgba(0,20,19,0.65) 55%, rgba(0,20,19,0.35) 100%)',
          }}
        />
      </div>

      <div className="container-site relative z-10">
        <FadeUp>
          <div className="flex flex-col gap-4 max-w-xl">
            <span className="eyebrow">Get in Touch</span>
            <h1 className="text-balance">
              Start Your{' '}
              <span className="text-gradient">Career Journey.</span>
            </h1>
            <p className="body-lg text-white/65 max-w-md">
              Whether you&apos;re exploring opportunities or ready to make your move, our team is here to guide you every step of the way.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
