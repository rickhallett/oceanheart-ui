import { getContentBySlug, getContentByType } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/kaishin/Navigation";
import { TerminalFooter } from "@/components/terminal";

interface JournalPost {
  slug: string;
  frontmatter: {
    title: string;
    author: string;
    date: string;
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

// Generate static params for all journal entries
export async function generateStaticParams() {
  const posts = (await getContentByType("journal")) as JournalPost[];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = (await getContentBySlug("journal", slug)) as JournalPost | null;

  if (!post) {
    return {
      title: "Entry Not Found | oceanheart.ai",
    };
  }

  return {
    title: `${post.frontmatter.title} | oceanheart.ai Journal`,
    description: post.frontmatter.excerpt,
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = (await getContentBySlug("journal", slug)) as JournalPost | null;

  if (!post) {
    notFound();
  }

  // Get adjacent entries for navigation
  const allPosts = (await getContentByType("journal")) as JournalPost[];
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <main className="bg-terminal-bg min-h-screen text-terminal">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[30vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-terminal-bg via-terminal-bg-secondary to-terminal-bg z-[1]" />

        <div className="relative z-10 w-full px-6 pb-12 pt-32">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 font-terminal text-sm text-terminal-muted hover:text-terminal-cyan transition-colors mb-8"
            >
              <span className="text-terminal-green">$</span> cd ../journal
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
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Excerpt */}
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
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-terminal prose-headings:text-terminal-cyan prose-headings:tracking-wide
              prose-h1:hidden
              prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-terminal-cyan prose-h2:first:mt-0 prose-h2:leading-tight
              prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-terminal
              prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-terminal-secondary
              prose-p:text-terminal-secondary prose-p:leading-[1.8] prose-p:mb-4 prose-p:text-base
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
              prose-hr:border-white/10 prose-hr:my-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags (repos) */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="font-terminal text-sm text-terminal-muted mb-4">
                <span className="text-terminal-green">$</span> git remote -v
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-terminal text-xs px-3 py-1 bg-terminal-bg-secondary border border-white/10 text-terminal-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Navigation between entries */}
      <section className="py-12 px-6 bg-terminal-bg-secondary border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            {prevPost ? (
              <Link
                href={`/journal/${prevPost.slug}`}
                className="group flex flex-col items-start"
              >
                <span className="font-terminal text-xs text-terminal-muted mb-2">
                  <span className="text-terminal-green">$</span> git log --oneline -1 HEAD~1
                </span>
                <span className="font-terminal text-sm text-terminal group-hover:text-terminal-cyan transition-colors">
                  {prevPost.frontmatter.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link
                href={`/journal/${nextPost.slug}`}
                className="group flex flex-col items-end text-right"
              >
                <span className="font-terminal text-xs text-terminal-muted mb-2">
                  <span className="text-terminal-green">$</span> git log --oneline -1 HEAD@{"{1}"}
                </span>
                <span className="font-terminal text-sm text-terminal group-hover:text-terminal-cyan transition-colors">
                  {nextPost.frontmatter.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <TerminalFooter />
    </main>
  );
}
