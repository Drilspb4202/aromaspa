'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Oil } from '@/data/oils';

export interface CartItem extends Oil {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (oil: Oil) => void;
  removeFromCart: (oilId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (oil: Oil) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === oil.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === oil.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...oil, quantity: 1 }];
    });
  };

  const removeFromCart = (oilId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === oilId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      );
      return updatedCart.filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

