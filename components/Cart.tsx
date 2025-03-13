import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Plus, Minus, Trash2, X, Search } from 'lucide-react';
import { CartItem } from './OilShop';
import OptimizedImage from './OptimizedImage';
import ImageModal from './ImageModal';

interface CartProps {
  cart: CartItem[];
  onCheckout: () => void;
  onBackToShop: () => void;
  onClose: () => void;
  removeFromCart: (oilId: string) => void;
  addToCart: (oil: CartItem) => void;
}

export default function Cart({ 
  cart, 
  onCheckout, 
  onBackToShop, 
  onClose, 
  removeFromCart,
  addToCart
}: CartProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

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
      <div className="bg-purple-900/90 backdrop-blur-xl p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
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
              className="text-white/80 hover:text-fuchsia-400 p-2 h-auto w-auto hover:bg-transparent rounded-md transition-colors"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/90 text-center py-8"
              >
                Ваша корзина пуста
              </motion.p>
            ) : (
              <>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-between items-center text-white/90 bg-purple-800/30 p-4 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSelectedImage({ src: item.image, alt: item.name })}
                        className="relative w-12 h-12 rounded-md overflow-hidden hover:ring-2 hover:ring-fuchsia-500 transition-all duration-200"
                      >
                        <OptimizedImage
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                          <Search className="w-4 h-4 text-white" />
                        </div>
                      </button>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-fuchsia-300">{item.price} ₽ за шт.</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        onClick={() => removeFromCart(item.id)} 
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                        variant="default"
                        size="sm"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        onClick={() => addToCart(item)} 
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                        variant="default"
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          for (let i = 0; i < item.quantity; i++) {
                            removeFromCart(item.id);
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white ml-2"
                        variant="default"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
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
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

