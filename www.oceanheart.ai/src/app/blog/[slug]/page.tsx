import { getContentBySlug, getContentByType } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/kaishin/Navigation";
import { TerminalFooter } from "@/components/terminal";

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    author: string;
    date: string;
    thumbnail?: string;
    excerpt: string;
    categories: string[];
    tags: string[];
    published?: boolean;
  };
  content: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = (await getContentByType("blog")) as BlogPost[];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = (await getContentBySlug("blog", slug)) as BlogPost | null;

  if (!post) {
    return {
      title: "Post Not Found | oceanheart.ai",
    };
  }

  return {
    title: `${post.frontmatter.title} | oceanheart.ai Blog`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: post.frontmatter.thumbnail ? [post.frontmatter.thumbnail] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = (await getContentBySlug("blog", slug)) as BlogPost | null;

  if (!post) {
    notFound();
  }

  // Get related posts (same category)
  const allPosts = (await getContentByType("blog")) as BlogPost[];
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.frontmatter.categories.some((cat) =>
          post.frontmatter.categories.includes(cat)
        )
    )
    .slice(0, 3);

  return (
    <main className="bg-terminal-bg min-h-screen text-terminal">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden">
        {post.frontmatter.thumbnail && (
          <>
            <img
              src={post.frontmatter.thumbnail}
              alt={post.frontmatter.title}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-terminal-bg/50 via-terminal-bg/70 to-terminal-bg z-[1]" />
          </>
        )}

        <div className="relative z-10 w-full px-6 pb-12 pt-32">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-terminal text-sm text-terminal-muted hover:text-terminal-cyan transition-colors mb-8"
            >
              <span className="text-terminal-green">$</span> cd ../blog
            </Link>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.frontmatter.categories.map((cat) => (
                <span
                  key={cat}
                  className="font-terminal text-xs px-3 py-1 bg-terminal-cyan/10 text-terminal-cyan border border-terminal-cyan/30"
                >
                  [{cat}]
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-6 font-terminal text-3xl md:text-4xl text-terminal-cyan">{post.frontmatter.title}</h1>

            {/* Meta */}
            <div className="flex items-center gap-6 font-terminal text-sm text-terminal-muted">
              <span className="flex items-center gap-2">
                <span className="text-terminal-green">&gt;</span>
                {post.frontmatter.author}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-terminal-purple">#</span>
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Excerpt/Introduction */}
      {post.frontmatter.excerpt && (
        <section className="py-6 px-6 border-b border-white/10">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-terminal-secondary leading-relaxed italic">
              {post.frontmatter.excerpt}
            </p>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="py-24 px-6 bg-terminal-bg">
        <div className="max-w-4xl mx-auto">
          {/* Article Body - styled prose for terminal */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-terminal prose-headings:text-terminal-cyan prose-headings:tracking-wide
              prose-h1:hidden
              prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-terminal-cyan prose-h2:first:mt-0 prose-h2:leading-tight
              prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-terminal
              prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-terminal-secondary
              prose-p:text-terminal-secondary prose-p:leading-[1.8] prose-p:mb-4 prose-p:text-base
              prose-p:first:text-lg prose-p:first:leading-[1.8] prose-p:first:text-terminal prose-p:first:mb-5
              prose-a:text-terminal-cyan prose-a:no-underline prose-a:border-b prose-a:border-terminal-cyan/30
              hover:prose-a:border-terminal-cyan hover:prose-a:text-terminal-blue prose-a:transition-all
              prose-strong:text-terminal-cyan prose-strong:font-semibold
              prose-em:text-terminal-muted prose-em:italic
              prose-blockquote:border-l-terminal-cyan prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:py-3 prose-blockquote:my-6
              prose-blockquote:italic prose-blockquote:text-terminal-secondary prose-blockquote:text-base prose-blockquote:bg-terminal-bg-secondary
              prose-ul:text-terminal-secondary prose-ul:space-y-2 prose-ul:my-4 prose-ul:pl-6
              prose-ol:text-terminal-secondary prose-ol:space-y-2 prose-ol:my-4 prose-ol:pl-6
              prose-li:leading-[1.6] prose-li:text-base prose-li:pl-2
              prose-li:marker:text-terminal-cyan prose-li:marker:font-bold prose-li:marker:text-base
              prose-code:bg-terminal-bg-tertiary prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:font-terminal prose-code:text-terminal-cyan
              prose-code:before:content-[''] prose-code:after:content-[''] prose-code:border prose-code:border-white/10
              prose-pre:bg-terminal-bg-tertiary prose-pre:border prose-pre:border-white/10 prose-pre:p-0 prose-pre:my-10 prose-pre:overflow-x-auto
              [&_pre_code]:p-6 [&_pre_code]:block
              prose-img:my-12 prose-img:border prose-img:border-white/10 prose-img:opacity-90
              prose-hr:border-white/10 prose-hr:my-12
              prose-table:border-collapse prose-table:my-10 prose-table:border prose-table:border-white/10 prose-table:overflow-hidden
              prose-thead:bg-terminal-bg-secondary prose-thead:border-b prose-thead:border-white/10
              prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-terminal prose-th:text-terminal-cyan
              prose-td:px-6 prose-td:py-4 prose-td:border-t prose-td:border-white/10 prose-td:text-terminal-secondary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="font-terminal text-sm text-terminal-muted mb-4">
                <span className="text-terminal-green">$</span> grep -r &quot;tags&quot;
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-terminal text-xs px-3 py-1 bg-terminal-bg-secondary border border-white/10 text-terminal-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 bg-terminal-bg-secondary border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <p className="font-terminal text-terminal-muted text-sm mb-4">
              <span className="text-terminal-green">$</span> ls ./related/
            </p>
            <h2 className="font-terminal text-2xl mb-8 text-terminal">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <div className="group bg-terminal-bg border border-white/10 overflow-hidden hover:border-terminal-cyan/30 hover:shadow-[0_0_20px_rgba(125,207,255,0.1)] transition-all duration-300 h-full">
                    {relatedPost.frontmatter.thumbnail && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedPost.frontmatter.thumbnail}
                          alt={relatedPost.frontmatter.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/80 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-terminal text-lg mb-2 group-hover:text-terminal-cyan transition-colors line-clamp-2 text-terminal">
                        {relatedPost.frontmatter.title}
                      </h3>
                      <p className="text-terminal-secondary text-sm line-clamp-2">
                        {relatedPost.frontmatter.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 bg-terminal-bg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-terminal-bg-secondary border border-terminal-cyan/20 p-12 hover:border-terminal-cyan/40 transition-all">
            <p className="font-terminal text-terminal-muted text-sm mb-4">
              <span className="text-terminal-green">$</span> ./start_conversation
            </p>
            <h2 className="font-terminal text-2xl md:text-3xl mb-4 text-terminal">Let&apos;s Build Something</h2>
            <p className="text-terminal-secondary mb-8 text-lg">
              AI systems that work for humans, not against them.
            </p>
            <a
              href="https://calendar.app.google/RMwsbtUZ76G6VZzb7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-terminal text-sm px-6 py-3 border border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan/10 transition-all"
            >
              <span className="text-terminal-green mr-1">$</span> schedule_call
            </a>
          </div>
        </div>
      </section>

      <TerminalFooter />
    </main>
  );
}
