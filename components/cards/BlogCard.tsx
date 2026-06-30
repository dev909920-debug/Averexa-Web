'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type BlogCardProps = {
  slug: string
  title: string
  excerpt: string
  category: string
  coverImage?: string
  readTime?: number
  publishedAt: string
  className?: string
}

export function BlogCard({
  slug,
  title,
  excerpt,
  category,
  coverImage,
  publishedAt,
  className,
}: BlogCardProps) {
  const date = new Date(publishedAt)
  const day = date.toLocaleDateString('en-US', { day: 'numeric' })
  const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <article className={cn('blog-card group', className)}>
      <Link
        href={`/blog/${slug}`}
        className="absolute inset-0 focus-visible:outline-none"
        aria-label={title}
      >
        {/* Full-bleed cover image */}
        {coverImage ? (
          <Image
            src={coverImage}
            alt=""
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'var(--gradient-hero)' }}
          />
        )}

        {/* Dark gradient overlay — heaviest at the bottom for content legibility */}
        <div className="blog-card-overlay" aria-hidden="true" />

        {/* Top-left: date badge */}
        <div
          className="absolute top-3 left-3 flex flex-col items-center rounded-md px-2.5 py-2 min-w-[2.75rem] text-center select-none"
          style={{ background: 'var(--gradient-accent)' }}
          aria-hidden="true"
        >
          <span className="block text-xl font-bold text-white leading-none">{day}</span>
          <span className="block text-[0.6rem] font-medium text-white/90 uppercase tracking-widest leading-tight mt-0.5">
            {monthYear}
          </span>
        </div>

        {/* Top-right: category glass pill */}
        <div
          className="absolute top-3 right-3 glass rounded-full px-3 py-1.5 select-none"
          aria-hidden="true"
        >
          <span className="text-xs font-medium text-white/90 font-mono tracking-wide uppercase whitespace-nowrap">
            {category}
          </span>
        </div>

        {/* Bottom content — title + Read More always visible; excerpt slides up on hover/focus */}
        <div className="blog-card-content">
          <h3 className="text-base font-semibold text-white leading-snug line-clamp-2 mb-2">
            {title}
          </h3>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400"
            aria-hidden="true"
          >
            Read More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {/* Excerpt — always visible on touch; reveals on hover/focus on pointer devices */}
          <p className="body-sm text-white/65 leading-relaxed line-clamp-3 mt-3">
            {excerpt}
          </p>
        </div>
      </Link>
    </article>
  )
}
