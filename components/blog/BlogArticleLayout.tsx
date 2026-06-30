import { MDXRemote } from 'next-mdx-remote/rsc'
import { BlogArticleHeader } from './BlogArticleHeader'
import { mdxComponents } from '@/lib/mdx'
import type { BlogPostWithContent } from '@/types/blog'

type BlogArticleLayoutProps = {
  post: BlogPostWithContent
}

export function BlogArticleLayout({ post }: BlogArticleLayoutProps) {
  return (
    <article className="section-padding pt-32">
      <div className="container-site">
        <div className="blog-article-body mx-auto max-w-2xl xl:max-w-[960px]">
          <BlogArticleHeader post={post} />

          <div className="mt-12">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </div>
    </article>
  )
}
