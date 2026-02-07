import { getContentByType } from "@/lib/content";
import Link from "next/link";
import { Navigation } from "@/components/kaishin/Navigation";
import { TerminalFooter } from "@/components/terminal";

// Type for blog post with proper frontmatter
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory } = await searchParams;
  const allPosts = (await getContentByType("blog")) as BlogPost[];

  // Get unique categories for filtering
  const allCategories = Array.from(
    new Set(allPosts.flatMap((post) => post.frontmatter.categories || []))
  );

  // Filter posts by category if one is selected
  const posts = activeCategory
    ? allPosts.filter((post) =>
        post.frontmatter.categories?.includes(activeCategory)
      )
    : allPosts;

  return (
    <main className="bg-terminal-bg min-h-screen text-terminal">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-terminal-bg via-terminal-bg-secondary to-terminal-bg z-[1]" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-terminal text-terminal-muted text-sm mb-4">
            <span className="text-terminal-green">$</span> cat ./blog/index.md
          </p>
          <h1 className="mb-6 font-terminal text-3xl md:text-4xl text-terminal-cyan">
            Learning in Public
          </h1>
          <p className="text-lg md:text-xl text-terminal-secondary max-w-3xl mx-auto">
            Notes on building AI systems, shipping software, and the craft of engineering.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          {allCategories.length > 0 && (
            <div className="mb-12 flex flex-wrap gap-3 justify-center">
              <Link href="/blog">
                <span className={`font-terminal px-4 py-2 border text-sm transition-all cursor-pointer ${
                  !activeCategory 
                    ? "bg-terminal-cyan/20 border-terminal-cyan/50 text-terminal-cyan" 
                    : "bg-terminal-bg-secondary border-white/10 text-terminal-muted hover:border-terminal-cyan/50 hover:text-terminal-cyan"
                }`}>
                  All Posts
                </span>
              </Link>
              {allCategories.map((category) => (
                <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
                  <span className={`font-terminal px-4 py-2 border text-sm transition-all cursor-pointer ${
                    activeCategory === category
                      ? "bg-terminal-cyan/20 border-terminal-cyan/50 text-terminal-cyan"
                      : "bg-terminal-bg-secondary border-white/10 text-terminal-muted hover:border-terminal-cyan/50 hover:text-terminal-cyan"
                  }`}>
                    {category}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-terminal text-xl text-terminal-muted">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="group bg-terminal-bg-secondary border border-white/10 overflow-hidden hover:border-terminal-cyan/30 hover:shadow-[0_0_20px_rgba(125,207,255,0.1)] transition-all duration-300 h-full flex flex-col">
                    {/* Thumbnail */}
                    {post.frontmatter.thumbnail && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.frontmatter.thumbnail}
                          alt={post.frontmatter.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/80 to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.frontmatter.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="font-terminal text-xs px-2 py-1 bg-terminal-cyan/10 text-terminal-cyan"
                          >
                            [{cat}]
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-terminal text-lg mb-3 group-hover:text-terminal-cyan transition-colors line-clamp-2 text-terminal">
                        {post.frontmatter.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-terminal-secondary text-sm mb-4 line-clamp-3 flex-1">
                        {post.frontmatter.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-terminal-muted pt-4 border-t border-white/10 font-terminal">
                        <span>{post.frontmatter.author}</span>
                        <span>
                          {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 text-center relative">
            <div className="bg-terminal-bg-secondary border border-terminal-cyan/20 p-12 max-w-3xl mx-auto relative z-10 hover:border-terminal-cyan/40 transition-all duration-300">
              <p className="font-terminal text-terminal-muted text-sm mb-4">
                <span className="text-terminal-green">$</span> ./schedule_consultation
              </p>
              <h2 className="font-terminal text-2xl md:text-3xl mb-4 text-terminal">Need something built?</h2>
              <p className="text-terminal-secondary mb-8">
                Custom AI tools, production systems, and human-centred software.
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
        </div>
      </section>

      <TerminalFooter />
    </main>
  );
}
