'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from './OptimizedImage';
import { Oil } from '../data/oils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface OilCardProps {
  oil: Oil;
  cartQuantity: number;
  isFavorite: boolean;
  onAddToCart: (oil: Oil) => void;
  onToggleFavorite: (oilId: string) => void;
  onCardClick: (oil: Oil) => void;
}

function OilCard({
  oil,
  cartQuantity,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
  onCardClick
}: OilCardProps) {
  return (
    <Card 
      className="group bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-fuchsia-500/20 transition-all duration-500 hover:-translate-y-1"
    >
      <CardContent className="p-4 sm:p-6">
        <div 
          className="relative aspect-square mb-4 overflow-hidden rounded-xl cursor-pointer bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10"
          onClick={() => onCardClick(oil)}
        >
          <OptimizedImage
            src={oil.image}
            alt={oil.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(oil.id);
              }}
              className={`rounded-full p-2 backdrop-blur-md transition-all duration-300 ${
                isFavorite 
                  ? 'bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-lg shadow-fuchsia-500/50 scale-110' 
                  : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
              size="sm"
            >
              <Heart className={`h-4 w-4 text-white transition-all ${isFavorite ? 'fill-current animate-pulse' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-purple-400 transition-all duration-300">
            {oil.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {oil.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {oil.category && (
              <Badge variant="secondary" className="bg-gradient-to-r from-fuchsia-500/20 to-fuchsia-600/20 text-fuchsia-200 border-0 backdrop-blur-sm">
                {oil.category}
              </Badge>
            )}
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-200 border-0 backdrop-blur-sm">
              {oil.scent}
            </Badge>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {oil.price} ₽
                </span>
                {cartQuantity > 0 && (
                  <span className="text-xs text-emerald-400">В корзине: {cartQuantity}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {cartQuantity > 0 && (
                  <span className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-200 text-sm font-semibold">
                    {cartQuantity}
                  </span>
                )}
                <Button
                  onClick={() => onAddToCart(oil)}
                  className={`backdrop-blur-sm transition-all duration-300 ${
                    cartQuantity > 0
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 shadow-lg shadow-fuchsia-500/30'
                  } text-white border-0 hover:scale-105`}
                  size="sm"
                >
                  {cartQuantity === 0 ? (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      В корзину
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Добавить еще
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(OilCard);

