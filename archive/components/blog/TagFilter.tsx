'use client';

import { useState } from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tags: string[]) => void;
}

export default function TagFilter({ tags, selectedTags, onTagSelect }: TagFilterProps) {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagSelect(selectedTags.filter(t => t !== tag));
    } else {
      onTagSelect([...selectedTags, tag]);
    }
  };

  const clearAll = () => {
    onTagSelect([]);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-8">
      <span className="text-sm font-medium text-base-content/70 mr-2">Filter by tags:</span>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`badge badge-lg cursor-pointer transition-all ${
            selectedTags.includes(tag)
              ? 'badge-primary'
              : 'badge-outline hover:badge-primary hover:badge-outline'
          }`}
          aria-pressed={selectedTags.includes(tag)}
        >
          {tag}
        </button>
      ))}
      {selectedTags.length > 0 && (
        <button
          onClick={clearAll}
          className="btn btn-ghost btn-xs ml-2"
          aria-label="Clear all filters"
        >
          Clear all
        </button>
      )}
    </div>
  );
}