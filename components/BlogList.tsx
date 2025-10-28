'use client'

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts, BlogPost } from '../data/blogPosts';
import OptimizedImage from './OptimizedImage';
import { useInView } from 'react-intersection-observer';

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

const BlogPostCard = ({ post, index }: BlogPostCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-purple-900/30 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-purple-800/30"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-48 overflow-hidden">
          {inView && (
            <OptimizedImage
              src={post.image}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading={index < 6 ? 'eager' : 'lazy'}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-fuchsia-400 bg-fuchsia-400/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">• {post.readTime} мин чтения</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-fuchsia-300 transition-colors">{post.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs bg-purple-800/50 text-purple-300 px-2 py-1 rounded-full hover:bg-purple-700/50 transition-colors">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{post.date}</span>
            <span className="text-fuchsia-400">{post.author}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map(post => post.category)));
    return cats;
  }, []);

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return blogPosts;
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedCategory === null
              ? 'bg-fuchsia-600 text-white'
              : 'bg-purple-800/50 text-purple-300 hover:bg-purple-700/50'
          }`}
        >
          Все статьи
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === category
                ? 'bg-fuchsia-600 text-white'
                : 'bg-purple-800/50 text-purple-300 hover:bg-purple-700/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 -mt-4">
          {filteredPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          <p>Нет статей в этой категории</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
