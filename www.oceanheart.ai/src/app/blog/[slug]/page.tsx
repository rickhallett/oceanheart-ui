import { getContentBySlug, getContentByType } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { Navigation } from "@/components/kaishin/Navigation";
import { Footer } from "@/components/kaishin/Footer";

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
      title: "Post Not Found | The Kaishin Method",
    };
  }

  return {
    title: `${post.frontmatter.title} | The Kaishin Method Blog`,
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
    <main className="bg-black min-h-screen text-white">
      <Navigation />

      {/* Hero Section with Featured Image */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        {post.frontmatter.thumbnail && (
          <>
            <img
              src={post.frontmatter.thumbnail}
              alt={post.frontmatter.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black z-[1]" />
          </>
        )}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#4fc3f7" />

        <div className="relative z-10 w-full px-6 pb-12 pt-32">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-ocean-blue transition-colors mb-8"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.frontmatter.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-3 py-1 bg-ocean-blue/20 text-ocean-blue border border-ocean-blue/30"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl md:text-5xl font-serif font-light text-zinc-100">{post.frontmatter.title}</h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-zinc-400">
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {post.frontmatter.author}
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
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
            <p className="text-lg md:text-xl font-light text-zinc-300 leading-relaxed italic">
              {post.frontmatter.excerpt}
            </p>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="py-24 px-6 bg-gradient-to-b from-black via-black/95 to-black">
        <div className="max-w-4xl mx-auto">
          {/* Article Body - styled prose */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-zinc-100 prose-headings:tracking-wide
              prose-h1:hidden
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-ocean-blue prose-h2:font-light prose-h2:first:mt-0 prose-h2:leading-tight
              prose-h2:drop-shadow-[0_0_20px_rgba(79,195,247,0.3)]
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:font-light prose-h3:text-zinc-100
              prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-6 prose-h4:font-light prose-h4:text-zinc-200
              prose-p:text-zinc-300 prose-p:leading-[1.6] prose-p:mb-4 prose-p:font-light prose-p:text-base
              prose-p:first:text-lg prose-p:first:leading-[1.6] prose-p:first:text-zinc-200 prose-p:first:mb-5
              prose-a:text-ocean-blue prose-a:no-underline prose-a:font-normal prose-a:border-b prose-a:border-ocean-blue/30
              hover:prose-a:border-ocean-blue hover:prose-a:text-ocean-blue/80 prose-a:transition-all
              prose-strong:text-ocean-blue prose-strong:font-semibold prose-strong:bg-ocean-blue/10 prose-strong:px-2 prose-strong:py-0.5
              prose-em:text-zinc-400 prose-em:italic
              prose-blockquote:border-l-ocean-blue prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:py-3 prose-blockquote:my-6
              prose-blockquote:italic prose-blockquote:text-zinc-300 prose-blockquote:text-base prose-blockquote:bg-ocean-blue/5
              prose-blockquote:shadow-[0_0_30px_rgba(79,195,247,0.1)]
              prose-ul:text-zinc-300 prose-ul:space-y-2 prose-ul:my-4 prose-ul:pl-6
              prose-ol:text-zinc-300 prose-ol:space-y-2 prose-ol:my-4 prose-ol:pl-6
              prose-li:leading-[1.6] prose-li:text-base prose-li:font-light prose-li:pl-2
              prose-li:marker:text-ocean-blue prose-li:marker:font-bold prose-li:marker:text-base
              prose-code:text-ocean-blue prose-code:bg-white/[0.05] prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:font-mono
              prose-code:before:content-[''] prose-code:after:content-[''] prose-code:border prose-code:border-ocean-blue/20
              prose-pre:bg-white/[0.05] prose-pre:border-2 prose-pre:border-ocean-blue/20 prose-pre:p-6 prose-pre:my-10 prose-pre:overflow-x-auto
              prose-pre:shadow-[0_0_40px_rgba(79,195,247,0.15)]
              prose-img:shadow-2xl prose-img:my-12 prose-img:border-2 prose-img:border-ocean-blue/20
              prose-img:shadow-[0_0_50px_rgba(79,195,247,0.2)]
              prose-hr:border-ocean-blue/20 prose-hr:my-12
              prose-table:border-collapse prose-table:my-10 prose-table:border prose-table:border-ocean-blue/20 prose-table:overflow-hidden
              prose-thead:bg-ocean-blue/10 prose-thead:border-b-2 prose-thead:border-ocean-blue/30
              prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-medium prose-th:text-ocean-blue
              prose-td:px-6 prose-td:py-4 prose-td:border-t prose-td:border-white/10 prose-td:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="text-sm text-zinc-500 mb-4">Tagged with:</h4>
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-white/[0.02] border border-white/10 text-zinc-400"
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
        <section className="py-16 px-6 bg-white/[0.02] border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif font-light mb-12 text-center text-zinc-100">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <div className="group bg-black backdrop-blur-sm border border-white/[0.1] overflow-hidden hover:border-ocean-blue/50 hover:shadow-[0_0_20px_rgba(79,195,247,0.2)] transition-all duration-300 h-full">
                    {relatedPost.frontmatter.thumbnail && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedPost.frontmatter.thumbnail}
                          alt={relatedPost.frontmatter.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg mb-2 group-hover:text-ocean-blue transition-colors line-clamp-2 text-zinc-100">
                        {relatedPost.frontmatter.title}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2">
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-ocean-blue/20 to-ocean-blue/5 border border-ocean-blue/30 p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-zinc-100">Begin Your Journey of Integration</h2>
            <p className="text-zinc-300 mb-8 text-lg font-light">
              Unite mind, body, and spirit through The Kaishin Method
            </p>
            <Link
              href="/program#start"
              className="inline-block px-8 py-3 bg-ocean-blue text-black border border-ocean-blue hover:bg-ocean-blue/90 hover:shadow-[0_0_20px_rgba(79,195,247,0.8),0_0_40px_rgba(79,195,247,0.4)] transition-all duration-300 font-semibold"
            >
              Explore The Journey
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
