import React from 'react';
import { blogPosts } from '@/data/blogPosts';
import OptimizedImage from '@/components/OptimizedImage';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import type { Metadata, Viewport } from 'next'
import RelatedPosts from '@/components/RelatedPosts';
import { getSafeBackgroundImage } from '@/utils/imageUtils';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.id === params.id);
  if (!post) {
    return {
      title: 'Статья не найдена | AROMA SPA СТУДИЯ',
      description: 'Запрашиваемая статья не найдена.',
    };
  }
  return {
    title: `${post.title} | AROMA SPA СТУДИЯ`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

const BlogPost: React.FC<{ params: { id: string } }> = ({ params }) => {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    return <div>Статья не найдена</div>;
  }

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
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex space-x-4 mb-8">
            <Link href="/">
              <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                На главную
              </Button>
            </Link>
            <Link href="/blog">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                К блогу
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-white">{post.title}</h1>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-semibold text-fuchsia-400 bg-fuchsia-400/10 px-3 py-1 rounded">
              {post.category}
            </span>
            <span className="text-sm text-gray-400">• {post.readTime} мин чтения</span>
          </div>

          <div className="mb-8">
            <OptimizedImage
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-sm bg-purple-800/50 text-purple-300 px-3 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400 mb-8">
            <span>{post.date}</span>
            <span>{post.author}</span>
          </div>
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <RelatedPosts currentPost={post} allPosts={blogPosts} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
