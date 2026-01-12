import { getContentByType } from "@/lib/content";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { Navigation } from "@/components/kaishin/Navigation";
import { Footer } from "@/components/kaishin/Footer";

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

export default async function BlogPage() {
  const posts = (await getContentByType("blog")) as BlogPost[];

  // Get unique categories for filtering
  const allCategories = Array.from(
    new Set(posts.flatMap((post) => post.frontmatter.categories || []))
  );

  return (
    <main className="bg-black min-h-screen text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#4fc3f7" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-[1]" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <h1 className="mb-6 text-3xl md:text-5xl font-serif font-light text-zinc-100">
            The <span className="text-gold">Oceanheart.ai</span> Blog
          </h1>
          <p className="text-xl md:text-2xl font-light text-zinc-300 max-w-3xl mx-auto">
            Insights on integration, embodied wisdom, and mastering the five bodies
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
                <span className="px-4 py-2 bg-gold/20 border border-gold/50 rounded-full text-sm text-gold hover:bg-gold/30 transition-all cursor-pointer">
                  All Posts
                </span>
              </Link>
              {allCategories.map((category) => (
                <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
                  <span className="px-4 py-2 bg-black border border-white/[0.1] backdrop-blur-xl rounded-full text-sm text-zinc-300 hover:border-gold/50 hover:text-gold transition-all cursor-pointer">
                    {category}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-zinc-400">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="group bg-black border border-white/[0.1] backdrop-blur-xl rounded-2xl overflow-hidden hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(212,165,116,0.2)] transition-all duration-300 h-full flex flex-col">
                    {/* Thumbnail */}
                    {post.frontmatter.thumbnail && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.frontmatter.thumbnail}
                          alt={post.frontmatter.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.frontmatter.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="text-xs px-2 py-1 bg-gold/20 text-gold rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl mb-3 group-hover:text-gold transition-colors line-clamp-2 text-zinc-100">
                        {post.frontmatter.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-3 flex-1">
                        {post.frontmatter.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-white/10">
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
            {/* Atmospheric background orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />

            <div className="bg-gold/10 border border-gold/30 p-12 max-w-3xl mx-auto relative z-10 hover:shadow-[0_0_30px_rgba(212,165,116,0.3)] transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-zinc-100">Begin Your Journey of Integration</h2>
              <p className="text-zinc-300 mb-8 font-light">
                Unite mind, body, and spirit through The Kaishin Method
              </p>
              <Link
                href="/program#start"
                className="inline-block px-8 py-3 bg-gold text-black border border-gold hover:bg-gold/90 hover:shadow-[0_0_20px_rgba(212,165,116,0.8),0_0_40px_rgba(212,165,116,0.4)] transition-all duration-300 font-semibold"
              >
                Explore The Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
