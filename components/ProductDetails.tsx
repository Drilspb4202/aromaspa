import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import OptimizedImage from './OptimizedImage';
import { Oil } from '@/data/oils';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductDetailsProps {
  product: Oil;
  onClose: () => void;
  addToCart: (oil: Oil) => void;
}

export default function ProductDetails({ product, onClose, addToCart }: ProductDetailsProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="bg-purple-900/90 backdrop-blur-xl p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{product.name}</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6 text-white" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <OptimizedImage
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <Button
              onClick={toggleWishlist}
              className={`absolute top-2 right-2 rounded-full p-2 ${
                isInWishlist(product.id) ? 'bg-fuchsia-600' : 'bg-gray-600/50'
              } hover:bg-fuchsia-700 transition-colors duration-300`}
            >
              <Heart className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-300">{product.description}</p>
            <p className="text-2xl font-bold text-fuchsia-400">{product.price} ₽</p>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Свойства:</h3>
              <ul className="list-disc list-inside text-gray-300">
                {Object.entries(product.properties).map(([key, value]) => (
                  <li key={key}>{key}: {Math.round(value * 100)}%</li>
                ))}
              </ul>
            </div>
            <Button
              onClick={() => addToCart(product)}
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Добавить в корзину
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

