import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from './OptimizedImage';
import { oils } from '@/data/oils';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface ShopWindowProps {
  addToCart: (oil: any) => void;
  removeFromCart: (oilId: string) => void;
  cart: { id: string; quantity: number }[];
  onClose: () => void;
  onCartClick: () => void;
}

export default function ShopWindow({ addToCart, removeFromCart, cart, onClose, onCartClick }: ShopWindowProps) {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div className="bg-transparent backdrop-blur-xl p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Магазин масел</h2>
          <div className="flex space-x-4">
            <Button 
              onClick={onCartClick}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              variant="default"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Корзина ({totalItems})
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {oils.map(oil => {
            const cartItem = cart.find(item => item.id === oil.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <Card key={oil.id} className="bg-purple-800/30 border-fuchsia-500/30 backdrop-blur-md">
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                    <OptimizedImage
                      src={oil.image}
                      alt={oil.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{oil.name}</h3>
                      <p className="text-fuchsia-300">{oil.price} ₽</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        onClick={() => removeFromCart(oil.id)} 
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                        variant="default"
                        disabled={quantity === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-white/90">{quantity}</span>
                      <Button 
                        onClick={() => addToCart(oil)} 
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
                        variant="default"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

