import Link from 'next/link'
import Image from 'next/image'
import { CTAButton } from '@/components/ui/CTAButton'

export function NotFoundContent() {
  return (
    <div className="min-h-screen bg-ink-900 flex flex-col items-center justify-center text-center px-6">
      <Link href="/" aria-label="Averexa Placement Home" className="mb-8 inline-block">
        <Image
          src="/brand/logo.svg"
          alt="Averexa Placement"
          width={128}
          height={128}
          className="h-32 w-auto mx-auto"
        />
      </Link>

      <p className="eyebrow mb-4">404 Not Found</p>
      <h1 className="text-white font-bold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
        Page Not Found
      </h1>
      <p className="text-white/60 text-lg mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <CTAButton label="Back to Home" href="/" />
        <CTAButton label="Explore Services" href="/services" />
      </div>
    </div>
  )
}
