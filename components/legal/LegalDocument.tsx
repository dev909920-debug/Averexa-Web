type LegalDocumentProps = {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalDocument({
  title,
  lastUpdated,
  children,
}: LegalDocumentProps) {
  return (
    <article className="section-padding pt-16">
      <div className="container-site">
        <div className="legal-body mx-auto max-w-3xl xl:max-w-[960px]">
          <header className="mb-10 border-b border-white/8 pb-8">
            <h1 className="text-balance">{title}</h1>
            <p className="mt-3 text-sm text-white/40">Last updated: {lastUpdated}</p>
          </header>

          <div className="legal-prose flex flex-col gap-8">{children}</div>
        </div>
      </div>
    </article>
  )
}

type LegalSectionProps = {
  heading: string
  children: React.ReactNode
}

export function LegalSection({ heading, children }: LegalSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-white">{heading}</h2>
      <div className="flex flex-col gap-3 text-white/65 leading-relaxed [&_a]:text-emerald-400 [&_a]:underline [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  )
}
