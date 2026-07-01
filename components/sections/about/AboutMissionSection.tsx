import { RevealSection } from '@/components/motion/RevealSection'

export function AboutMissionSection() {
  return (
    <section id="about-mission" className="section-padding bg-ink-900">
      <div className="container-site">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Story */}
          <RevealSection direction="left">
            <div className="flex flex-col gap-6">
              <span className="eyebrow">Our Story</span>
              <h2 className="text-balance">
                Built on a{' '}
                <span className="text-gradient">Simple Belief.</span>
              </h2>
              <p className="body-lg text-white/65 leading-relaxed">
                Averexa Placement was founded on a simple, powerful belief: <em>the right opportunity
                can change a person&apos;s life.</em>
              </p>
              <p className="body-lg text-white/65 leading-relaxed">
                We saw talented professionals — skilled, driven, ready — held back not by ability,
                but by access. They didn&apos;t have a guide through the maze of cross-border hiring:
                the resume standards, the interview expectations, the application systems, the
                relentless follow-up required to break into the US and Canada job markets.
              </p>
              <p className="body-lg text-white/65 leading-relaxed">
                So we built the partner we wished they had. Not a job board. Not a faceless agency.
                A team that treats every candidate&apos;s career like it matters — because it does.
              </p>
            </div>
          </RevealSection>

          {/* Mission & Vision */}
          <RevealSection direction="right" delay={0.15}>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 rounded-xl border border-white/8 p-6 md:p-8 glass">
                <span className="eyebrow text-xs">Mission</span>
                <h3 className="text-xl font-semibold text-white">
                  Connect Talent With Opportunity
                </h3>
                <p className="body-lg text-white/60 leading-relaxed">
                  To connect talented individuals with meaningful full-time opportunities across the
                  US and Canada, while delivering our services with professionalism, integrity, and a
                  people-first approach.
                </p>
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-white/8 p-6 md:p-8 glass">
                <span className="eyebrow text-xs">Vision</span>
                <h3 className="text-xl font-semibold text-white">
                  A Trusted Global Career Partner
                </h3>
                <p className="body-lg text-white/60 leading-relaxed">
                  To become a trusted global career partner recognized for excellence, innovation,
                  and the ability to create impactful connections that change lives.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
