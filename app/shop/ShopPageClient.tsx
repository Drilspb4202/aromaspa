'use client';

import React, { useEffect, useState } from 'react';
import OilShop from '../../components/OilShop';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartItem } from '../../components/OilShop';
import { motion } from 'framer-motion';
import MobileNavigation from '../../components/MobileNavigation'; // Update: Import statement for MobileNavigation

export default function ShopPageClient() {
  const router = useRouter();
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    switch (section) {
      case 'home':
        router.push('/');
        break;
      case 'search':
        // Implement search functionality
        break;
      case 'cart':
        // Show cart
        break;
      case 'wishlist':
        // Show wishlist
        break;
      case 'account':
        // Show account page
        break;
    }
  };

  return (
    <div className="min-h-screen relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 min-h-screen"
      >
        <OilShop
          onClose={() => router.push('/')}
          cart={cart}
          setCart={setCart}
        />
      </motion.div>
      <MobileNavigation />
    </div>
  );
}

