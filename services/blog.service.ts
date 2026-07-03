import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { BlogPost, BlogPostWithContent } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

const WORDS_PER_MINUTE = 200

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

function parseFile(fileName: string): BlogPostWithContent {
  const slug = fileName.replace(/\.mdx?$/, '')
  const fullPath = path.join(BLOG_DIR, fileName)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    publishedAt: String(data.publishedAt ?? ''),
    ...(data.updatedAt && { updatedAt: String(data.updatedAt) }),
    author: String(data.author ?? 'Averexa Team'),
    category: String(data.category ?? 'Career'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: calculateReadingTime(content),
    ...(data.featured !== undefined && { featured: Boolean(data.featured) }),
    ...(data.coverImage && { coverImage: String(data.coverImage) }),
    ...(data.coverImageAlt && { coverImageAlt: String(data.coverImageAlt) }),
    content,
  }
}

function readBlogDir(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f))
}

/** All posts (without MDX body), newest first. */
export function getAllPosts(): BlogPost[] {
  return readBlogDir()
    .map((file) => {
      const { content: _content, ...meta } = parseFile(file)
      return meta
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

/** A single post with its MDX body, or null if not found. */
export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`]
  const fileName = candidates.find((c) => fs.existsSync(path.join(BLOG_DIR, c)))
  if (!fileName) return null
  return parseFile(fileName)
}

/** All slugs used by generateStaticParams. */
export function getAllSlugs(): string[] {
  return readBlogDir().map((f) => f.replace(/\.mdx?$/, ''))
}
