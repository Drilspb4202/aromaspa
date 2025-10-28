'use client'

import React, { useEffect } from 'react';
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
      className="bg-purple-900/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-48">
          {inView && (
            <OptimizedImage
              src={post.image}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-full object-cover"
              loading={index < 6 ? 'eager' : 'lazy'}
            />
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
          <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{post.date}</span>
            <span>{post.author}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogList: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 -mt-4">
      {blogPosts.map((post, index) => (
        <BlogPostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};

export default BlogList;
