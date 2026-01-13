import { getContentByType } from "@/lib/content";
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

export default async function JournalPage() {
  const posts = (await getContentByType("journal")) as JournalPost[];

  // Get unique tags (repos) for filtering
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.frontmatter.tags || []))
  );

  return (
    <main className="bg-terminal-bg min-h-screen text-terminal">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-terminal-bg via-terminal-bg-secondary to-terminal-bg z-[1]" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-terminal text-terminal-muted text-sm mb-4">
            <span className="text-terminal-green">$</span> cat ./journal/README.md
          </p>
          <h1 className="mb-6 font-terminal text-3xl md:text-4xl text-terminal-cyan">
            Dev Journal
          </h1>
          <p className="text-lg md:text-xl text-terminal-secondary max-w-3xl mx-auto">
            Daily snapshots of building software. Commits, decisions, and the craft of shipping code.
          </p>
        </div>
      </section>

      {/* Journal Entries */}
      <section className="py-16 px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="mb-12 flex flex-wrap gap-3 justify-center">
              <Link href="/journal">
                <span className="font-terminal px-4 py-2 bg-terminal-cyan/20 border border-terminal-cyan/50 text-sm text-terminal-cyan hover:bg-terminal-cyan/30 transition-all cursor-pointer">
                  All Entries
                </span>
              </Link>
              {allTags.slice(0, 8).map((tag) => (
                <Link key={tag} href={`/journal?repo=${encodeURIComponent(tag)}`}>
                  <span className="font-terminal px-4 py-2 bg-terminal-bg-secondary border border-white/10 text-sm text-terminal-muted hover:border-terminal-cyan/50 hover:text-terminal-cyan transition-all cursor-pointer">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Entries List */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-terminal text-xl text-terminal-muted">No journal entries yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/journal/${post.slug}`}>
                  <div className="group bg-terminal-bg-secondary border border-white/10 p-6 hover:border-terminal-cyan/30 hover:shadow-[0_0_20px_rgba(125,207,255,0.1)] transition-all duration-300">
                    {/* Date & Meta Row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-terminal text-sm text-terminal-cyan">
                        {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <div className="flex gap-2">
                        {post.frontmatter.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="font-terminal text-xs px-2 py-1 bg-terminal-bg border border-white/10 text-terminal-muted"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.frontmatter.tags.length > 3 && (
                          <span className="font-terminal text-xs px-2 py-1 text-terminal-muted">
                            +{post.frontmatter.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-terminal text-lg mb-3 group-hover:text-terminal-cyan transition-colors text-terminal">
                      {post.frontmatter.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-terminal-secondary text-sm line-clamp-2">
                      {post.frontmatter.excerpt}
                    </p>

                    {/* Read more indicator */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="font-terminal text-xs text-terminal-muted group-hover:text-terminal-cyan transition-colors">
                        <span className="text-terminal-green">$</span> cat {post.slug}.md
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <TerminalFooter />
    </main>
  );
}
