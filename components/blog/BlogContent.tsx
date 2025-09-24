'use client';

import { useState, useMemo, useEffect } from 'react';
import BlogSearch from './BlogSearch';
import TagFilter from './TagFilter';
import CardArticle from '@/app/blog/_assets/components/CardArticle';

interface BlogContentProps {
  initialPosts: any[];
  allTags: string[];
}

export default function BlogContent({ initialPosts, allTags }: BlogContentProps) {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState(initialPosts);

  // Apply both search and tag filters
  useEffect(() => {
    let posts = searchResults;
    
    if (selectedTags.length > 0) {
      posts = posts.filter(post => 
        post.tags.some((tag: string) => selectedTags.includes(tag))
      );
    }
    
    setFilteredPosts(posts);
  }, [searchResults, selectedTags]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search focus
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
      // Escape to clear filters
      if (e.key === 'Escape') {
        setSelectedTags([]);
        setSearchResults(initialPosts);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [initialPosts]);

  return (
    <>
      <div className="mb-12">
        <BlogSearch posts={initialPosts} onSearch={setSearchResults} />
        <TagFilter tags={allTags} selectedTags={selectedTags} onTagSelect={setSelectedTags} />
        
        {/* Results count */}
        <div className="text-sm text-base-content/60 mb-4">
          Showing {filteredPosts.length} of {initialPosts.length} posts
          {(selectedTags.length > 0 || searchResults.length !== initialPosts.length) && (
            <button
              onClick={() => {
                setSelectedTags([]);
                setSearchResults(initialPosts);
              }}
              className="ml-2 link link-primary"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-base-content/60">No posts found matching your criteria.</p>
        </div>
      ) : (
        <section className="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
          {filteredPosts.map((article, i) => (
            <CardArticle
              article={article}
              key={article.slug}
              isImagePriority={i <= 2}
            />
          ))}
        </section>
      )}
    </>
  );
}