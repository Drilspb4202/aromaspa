'use client'

import React, { useEffect } from 'react';
import BlogList from '../../components/BlogList';
import { motion } from 'framer-motion';
import { Button } from "../../components/ui/button";
import { useRouter } from 'next/navigation';
import { getSafeBackgroundImage } from '../../utils/imageUtils';
const BlogPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: getSafeBackgroundImage('https://i.ibb.co/5LmmGTK/DALL-E-2024-12-06-03-15-04-A-luxurious-image-featuring-a-purple-theme-redesigned-to-showcase-drops-o.webp'),
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 pt-12 pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => router.push('/')}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
            >
              Вернуться на главную
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-center mb-12 text-white">Наш блог</h1>
          <BlogList />
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPage;
