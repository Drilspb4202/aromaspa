'use client'

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, ShoppingBag, Phone, BookOpen, Menu } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Removed: if (pathname === '/shop') return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-purple-900/95 backdrop-blur-md z-50 border-t border-fuchsia-500/30">
      <div className="flex justify-around py-1">
        <button
          onClick={() => {
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              router.push('/');
            }
          }}
          className="flex flex-col items-center text-white p-1"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Главная</span>
        </button>
        <button
          onClick={() => router.push('/shop')}
          className="flex flex-col items-center text-white p-1"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Магазин</span>
        </button>
        <button
          onClick={() => {
            const servicesSection = document.getElementById('услуги');
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              router.push('/#услуги');
            }
          }}
          className="flex flex-col items-center text-white p-1"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Услуги</span>
        </button>
        <button
          onClick={() => router.push('/blog')}
          className="flex flex-col items-center text-white p-1"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Блог</span>
        </button>
        <button
          onClick={() => {
            const contactSection = document.getElementById('контакты');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              router.push('/#контакты');
            }
          }}
          className="flex flex-col items-center text-white p-1"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Контакты</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavigation;
