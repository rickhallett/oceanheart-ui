import { getAllPosts } from "@/libs/blog";
import { categories } from "./_assets/content";
import CardArticle from "./_assets/components/CardArticle";
import CardCategory from "./_assets/components/CardCategory";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `${config.appName} AI, Therapy and going at it alone`,
  description:
    "My journey into the intersection at AI and mental health",
  canonicalUrlRelative: "/blog",
});

export default async function Blog() {
  // Get posts from markdown files
  const markdownPosts = await getAllPosts();
  
  // Transform markdown posts to match existing article format temporarily
  const articlesToDisplay = markdownPosts.slice(0, 6).map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.date,
    image: {
      urlRelative: post.image,
      alt: post.title
    },
    author: {
      name: post.author,
      slug: post.author
    },
    categories: post.tags.map(tag => ({
      slug: tag,
      title: tag
    }))
  }))
  return (
    <>
      <section className="text-center max-w-xl mx-auto mt-12 mb-24 md:mb-32">
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
          The {config.appName} Blog
        </h1>
        <p className="text-lg text-base-content opacity-80 leading-relaxed">
          Here you can find <span className="font-bold text-primary">feature releases</span>, <span className="font-bold text-accent">roadmap updates</span>, <span className="font-bold text-primary">community survey research</span>, the <span className="font-bold text-success">ups</span> and <span className="font-bold text-error">downs</span> of building a startup, and a <span className="font-bold text-info">magical breadcrumb trail</span> of the latest developments at the intersection of AI and therapy.
        </p>
      </section>

      <section className="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
        {articlesToDisplay.map((article, i) => (
          <CardArticle
            article={article}
            key={article.slug}
            isImagePriority={i <= 2}
          />
        ))}
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="font-bold text-2xl lg:text-4xl tracking-tight mb-4">
            Browse by Category
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover articles organized by topics that matter most to therapy professionals and AI enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categories.map((category) => (
            <CardCategory key={category.slug} category={category} tag="div" />
          ))}
        </div>
      </section>
    </>
  );
}
