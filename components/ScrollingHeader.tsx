'use client'

import React from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollingHeader() {
  const pathname = usePathname();
     
  if (pathname === '/shop' || pathname.startsWith('/blog')) {
    return null;
  }

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-purple-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-2">
        <div className="text-center">
          <h1 className="text-lg font-bold bg-gradient-to-r from-white via-purple-300 to-fuchsia-300 bg-clip-text text-transparent tracking-wider font-playfair">
            Гармония Души и Тела
          </h1>
          <div className="text-xs font-light text-fuchsia-400 italic tracking-wide">
            by Радмила Яковлева
          </div>
        </div>
      </div>
    </div>
  );
}

