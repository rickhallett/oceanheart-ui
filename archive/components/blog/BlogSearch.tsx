'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

interface BlogSearchProps {
  posts: any[];
  onSearch: (results: any[]) => void;
}

export default function BlogSearch({ posts, onSearch }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ['title', 'description', 'content', 'tags'],
      threshold: 0.3,
      includeScore: true
    });
  }, [posts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      onSearch(posts);
    } else {
      const results = fuse.search(query);
      onSearch(results.map(result => result.item));
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search blog posts..."
        className="input input-bordered w-full pl-10 pr-4"
        aria-label="Search blog posts"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {searchQuery && (
        <button
          onClick={() => handleSearch('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
          aria-label="Clear search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}