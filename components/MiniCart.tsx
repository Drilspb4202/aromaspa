'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import OptimizedImage from './OptimizedImage';
import { CartItem } from './OilShop';

interface MiniCartProps {
  cart: CartItem[];
  onClose: () => void;
  onViewCart: () => void;
  removeFromCart: (id: string) => void;
}

export default function MiniCart({ cart, onClose, onViewCart, removeFromCart }: MiniCartProps) {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 right-4 z-50 bg-purple-900/90 backdrop-blur-xl p-4 rounded-lg shadow-lg w-80"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Корзина</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white/80 hover:text-fuchsia-400 p-1 h-auto w-auto hover:bg-transparent rounded-md transition-colors"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      {cart.length === 0 ? (
        <p className="text-white text-center py-4">Ваша корзина пуста</p>
      ) : (
        <>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-2 bg-purple-800/30 p-2 rounded-lg"
              >
                <OptimizedImage
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <p className="text-sm text-white">{item.name}</p>
                  <p className="text-xs text-gray-300">{item.quantity} x {item.price} ₽</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white font-semibold mb-4">Итого: {getTotalPrice()} ₽</p>
            <Button onClick={onViewCart} className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Перейти в корзину
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}
