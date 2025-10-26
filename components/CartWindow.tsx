import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartItem } from './OilShop';

interface CartWindowProps {
  cart: CartItem[];
  onCheckout: () => void;
  onBackToShop: () => void;
  onClose: () => void;
}

export default function CartWindow({ cart, onCheckout, onBackToShop, onClose }: CartWindowProps) {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-transparent backdrop-blur-xl p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Корзина</h2>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onBackToShop} 
              variant="ghost"
              className="text-white hover:bg-purple-800/50 hover:text-white flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад в магазин
            </Button>
            <Button 
              onClick={onClose} 
              variant="ghost" 
              className="text-white hover:bg-purple-800/50 hover:text-white"
            >
              Закрыть
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-white/90">Ваша корзина пуста</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-white/90">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{item.price * item.quantity} ₽</span>
                </div>
              ))}
              <div className="text-xl font-bold text-white pt-4 border-t border-white/10">
                Итого: {getTotalPrice()} ₽
              </div>
              <Button
                onClick={onCheckout}
                className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                variant="default"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Оформить заказ
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
