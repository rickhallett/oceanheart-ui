import type { JSX } from "react";
import Link from "next/link";
import { categoryType } from "../content";

// This is the category card that appears in the home page and in the category page
const CardCategory = ({
  category,
  tag = "h2",
}: {
  category: categoryType;
  tag?: keyof JSX.IntrinsicElements;
}) => {
  const TitleTag = tag;

  // Define color variants for different categories
  const getCategoryStyles = (slug: string) => {
    switch (slug) {
      case 'feature':
        return 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:from-primary/20 hover:to-primary/10 hover:border-primary/30 text-primary';
      case 'learning':
        return 'bg-gradient-to-br from-success/10 to-success/5 border-success/20 hover:from-success/20 hover:to-success/10 hover:border-success/30 text-success';
      case 'tutorials':
        return 'bg-gradient-to-br from-info/10 to-info/5 border-info/20 hover:from-info/20 hover:to-info/10 hover:border-info/30 text-info';
      case 'research':
        return 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:from-accent/20 hover:to-accent/10 hover:border-accent/30 text-accent';
      default:
        return 'bg-gradient-to-br from-base-200 to-base-100 border-base-300 hover:from-base-300 hover:to-base-200 hover:border-base-400 text-base-content';
    }
  };

  return (
    <Link
      className={`group p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${getCategoryStyles(category.slug)}`}
      href={`/blog/category/${category.slug}`}
      title={category.title}
      rel="tag"
    >
      <div className="flex flex-col items-start space-y-2">
        <TitleTag className="text-lg font-bold group-hover:font-extrabold transition-all duration-300">
          {category?.titleShort || category.title}
        </TitleTag>
        <p className="text-sm opacity-70 group-hover:opacity-90 transition-opacity duration-300">
          {category.descriptionShort}
        </p>
        <div className="flex items-center space-x-1 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
          <span className="text-xs font-medium">Explore</span>
        </div>
      </div>
    </Link>
  );
};

export default CardCategory;
