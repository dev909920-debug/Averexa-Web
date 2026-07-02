import { Icon } from '@/components/ui/Icon'
import { ContactForm } from '@/components/forms/ContactForm'
import { FadeUp } from '@/components/motion/FadeUp'
import { RevealSection } from '@/components/motion/RevealSection'
import { site } from '@/config/site'

const contactInfo = [
  {
    icon: 'Phone' as const,
    label: 'Phone',
    value: site.phone,
    href: `tel:${site.phone.replace(/\D/g, '').replace(/^/, '+')}`,
  },
  {
    icon: 'Mail' as const,
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: 'MessageCircle' as const,
    label: 'WhatsApp',
    value: 'Chat with us on WhatsApp',
    href: `https://wa.me/${site.whatsapp}`,
  },
  {
    icon: 'MapPin' as const,
    label: 'Office',
    value: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`,
    href: `https://maps.google.com/?q=${encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`)}`,
  },
]

export function ContactFormSection() {
  return (
    <section id="contact-form" className="section-padding bg-ink-900 overflow-x-hidden">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          {/* Left column — contact info */}
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <span className="eyebrow">Contact Information</span>
                <h2 className="text-balance text-3xl font-bold leading-tight">
                  Let&apos;s Talk About{' '}
                  <span className="text-gradient">Your Future.</span>
                </h2>
                <p className="body-md text-white/60">
                  Fill in the form and our team will reach out to schedule a free consultation call.
                  We typically respond within 1–2 business days.
                </p>
              </div>

              <ul className="flex flex-col gap-5" aria-label="Contact details">
                {contactInfo.map(({ icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10"
                      aria-hidden="true"
                    >
                      <Icon name={icon} size="sm" className="text-emerald-400" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-white/75 hover:text-emerald-400 transition-colors duration-150"
                          {...(href.startsWith('http') && {
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          })}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-white/75">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Right column — form */}
          <RevealSection direction="right">
            <div className="rounded-2xl border border-white/[0.06] bg-charcoal-800/40 p-6 sm:p-8 backdrop-blur-sm">
              <ContactForm />
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
