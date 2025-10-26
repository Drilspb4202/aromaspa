import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import OptimizedImage from './OptimizedImage';
import { Oil, propertyTranslations } from '../data/oils';

interface ProductComparisonProps {
  products: Oil[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export default function ProductComparison({ products, onClose, onRemove }: ProductComparisonProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div className="bg-purple-900/90 backdrop-blur-xl p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Сравнение продуктов</h2>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="text-white/80 hover:text-fuchsia-400 p-2 h-auto w-auto hover:bg-transparent rounded-md transition-colors"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-purple-800/30 rounded-lg p-4">
              <div className="relative">
                <OptimizedImage
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full"
                  onClick={() => onRemove(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-sm text-gray-300 mb-2">{product.description}</p>
              <p className="text-fuchsia-300 font-bold">{product.price} ₽</p>
              {product.properties && (
                <div className="mt-2">
                  <h4 className="text-sm font-semibold text-white mb-1">Свойства:</h4>
                  <ul className="text-sm text-gray-300">
                    {Object.entries(product.properties).map(([key, value]) => (
                      <li key={key}>
                        {propertyTranslations[key] || key}: {typeof value === 'number' ? Math.round(value * 100) : value}%
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
