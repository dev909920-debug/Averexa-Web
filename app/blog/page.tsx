import type { Metadata } from 'next'
import { pageMetadata } from '@/config/seo'
import { getAllPosts } from '@/services/blog.service'
import { BlogListingGrid } from '@/components/blog/BlogListingGrid'
import { FadeUp } from '@/components/motion/FadeUp'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description:
    'Career insights, resume strategies, interview preparation, and relocation guides for professionals targeting full-time roles in the US and Canada.',
})

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main id="main-content">
      <section className="section-padding pt-32 bg-ink-900">
        <div className="container-site">
          <FadeUp>
            <div className="blog-listing-header mb-14 flex flex-col gap-4 max-w-2xl xl:max-w-3xl">
              <span className="eyebrow">Insights</span>
              <h1 className="text-balance">
                Career Resources &{' '}
                <span className="text-gradient">Guidance.</span>
              </h1>
              <p className="body-lg text-white/65">
                Practical advice for landing and thriving in US and Canada roles — from resume
                optimization to relocation.
              </p>
            </div>
          </FadeUp>

          <BlogListingGrid posts={posts} />
        </div>
      </section>

      <CTASection />
    </main>
  )
}
