'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Oil } from '@/data/oils';
import ShopPage from './ShopPage';
import Cart from './Cart';
import CheckoutWizard from './CheckoutWizard';
import Confetti from 'react-confetti';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { submitTelegramMessage } from '@/app/actions/telegram';
import OptimizedImage from './OptimizedImage';

export interface CartItem extends Oil {
  quantity: number;
}

interface OilShopProps {
  onClose: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function OilShop({ onClose, cart, setCart }: OilShopProps) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showShop, setShowShop] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast()
  const router = useRouter();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = useCallback((oil: Oil) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === oil.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === oil.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...oil, quantity: 1 }];
    });
    toast({
      title: "Товар добавлен в корзину",
      description: `${oil.name} успешно добавлен в вашу корзину.`,
    })
  }, [setCart, toast]);

  const removeFromCart = useCallback((oilId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === oilId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      );
      return updatedCart.filter(item => item.quantity > 0);
    });
  }, [setCart]);

  const toggleFavorite = useCallback((oilId: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(oilId)
        ? prevFavorites.filter(id => id !== oilId)
        : [...prevFavorites, oilId]
    );
  }, []);

  const handleCheckout = useCallback(() => {
    setShowShop(false);
    setShowCart(false);
    setShowCheckoutForm(true);
  }, []);

  const handleClose = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleCartClick = useCallback(() => {
    setShowShop(false);
    setShowCart(true);
  }, []);

  const handleBackToShop = useCallback(() => {
    setShowCart(false);
    setShowCheckoutForm(false);
    setShowShop(true);
  }, []);

  const handleOrderSuccess = useCallback(async (orderDetails: string) => {
    try {
      const result = await submitTelegramMessage(orderDetails);
      if (result.success) {
        setShowConfetti(true);
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfetti(false);
          setShowConfirmation(false);
          setShowCheckoutForm(false);
          setCart([]);
          handleClose();
        }, 5000);
      } else {
        throw new Error(result.error || 'Неизвестная ошибка при отправке заказа');
      }
    } catch (error) {
      console.error('Error sending order to Telegram:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заказ. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    }
  }, [handleClose, setCart, toast]);

  return (
    <>
      <div className="fixed inset-0 z-0" suppressHydrationWarning>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: 'url("https://i.ibb.co/5LmmGTK/DALL-E-2024-12-06-03-15-04-A-luxurious-image-featuring-a-purple-theme-redesigned-to-showcase-drops-o.webp")',
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
      </div>
      <div className="relative z-10 min-h-screen" suppressHydrationWarning>
        <AnimatePresence>
          {showShop && (
            <ShopPage 
              addToCart={addToCart} 
              removeFromCart={removeFromCart}
              cart={cart}
              onClose={handleClose}
              onCartClick={handleCartClick} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}
          {showCart && ( 
            <Cart 
              cart={cart} 
              onCheckout={handleCheckout}
              onBackToShop={handleBackToShop}
              onClose={handleClose}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
            />
          )}
          {showCheckoutForm && (
            <CheckoutWizard
              cart={cart}
              onClose={() => setShowCheckoutForm(false)}
              onSubmit={handleOrderSuccess}
              onBackToShop={handleBackToShop} 
              className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
            />
          )}
        </AnimatePresence>
      </div>
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 300}
          recycle={false}
          numberOfPieces={500}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
        />
      )}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-[1001]"
        >
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Ваш заказ в работе</h3>
            <p>Мы вам перезвоним</p>
          </div>
        </motion.div>
      )}
      <Toaster />
    </>
  );
}
