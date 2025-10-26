'use client'

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, ShoppingBag, Phone, BookOpen, Menu } from 'lucide-react';

const MobileNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { icon: Home, label: 'Главная', path: '/' },
    { icon: ShoppingBag, label: 'Магазин', path: '/shop' },
    { icon: BookOpen, label: 'Блог', path: '/blog' },
    { icon: Phone, label: 'Контакты', path: '/#contact' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-purple-900/80 backdrop-blur-lg border-t border-purple-800 z-50">
      <div className="flex justify-around items-center h-16">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center justify-center w-full h-full ${
              pathname === item.path ? 'text-fuchsia-400' : 'text-gray-400'
            } hover:text-fuchsia-400 transition-colors`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
