'use client'

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, ShoppingBag, Phone, BookOpen, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const MobileNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useCart(); // Используем хук useCart для получения данных корзины

  // Вычисляем общее количество товаров в корзине
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (pathname === '/shop') return null;

  const navigationItems = [
    { icon: Home, label: 'Главная', path: '/' },
    { icon: ShoppingBag, label: 'Магазин', path: '/shop' },
    { icon: BookOpen, label: 'Блог', path: '/blog' },
    { icon: Phone, label: 'Контакты', path: '/#контакты' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-purple-900/80 backdrop-blur-lg border-t border-purple-800 z-50">
      <div className="flex justify-around items-center h-16">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center justify-center w-full h-full ${
              pathname === item.path ? 'text-fuchsia-400' : 'text-gray-400'
            } hover:text-fuchsia-400 transition-colors relative`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
            {item.label === 'Магазин' && cartItemsCount > 0 && (
              <span className="absolute top-0 right-1/4 bg-fuchsia-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;

