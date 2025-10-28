import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/data/blogPosts';
import OptimizedImage from './OptimizedImage';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  limit?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, allPosts, limit = 3 }) => {
  // Find related posts by matching tags or category
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => {
      // Check if posts share tags or category
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      return sharedTags.length > 0 || post.category === currentPost.category;
    })
    .sort((a, b) => {
      // Prioritize by number of shared tags
      const aSharedTags = a.tags.filter(tag => currentPost.tags.includes(tag)).length;
      const bSharedTags = b.tags.filter(tag => currentPost.tags.includes(tag)).length;
      return bSharedTags - aSharedTags;
    })
    .slice(0, limit);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-16 border-t border-purple-800/50 pt-12">
      <h2 className="text-3xl font-bold text-white mb-8">Связанные статьи</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="bg-purple-900/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative h-32">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                width={300}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{post.readTime} мин</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;

