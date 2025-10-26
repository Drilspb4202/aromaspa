'use client'

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from './OptimizedImage';
import { oils, Oil, oilCategories } from '../data/oils';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingCart, Heart, Search, X, BarChart2, Check, Home, Filter, ShoppingBag } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useRouter } from 'next/navigation';

interface ShopPageProps {
  addToCart: (oil: Oil) => void;
  removeFromCart: (oilId: string) => void;
  cart: { id: string; quantity: number }[];
  onClose: () => void;
  onCartClick: () => void;
  favorites: string[];
  toggleFavorite: (oilId: string) => void;
}

export default function ShopPage({ 
  addToCart, 
  removeFromCart, 
  cart, 
  onClose, 
  onCartClick, 
  favorites, 
  toggleFavorite 
}: ShopPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortBy, setSortBy] = useState('name');
  const [selectedOil, setSelectedOil] = useState<Oil | null>(null);
  const [priceRange, setPriceRange] = useState<{ min: number | ''; max: number | '' }>({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const router = useRouter();
  const itemsPerPage = 12;

  const filteredOils = useMemo(() => {
    let filtered = oils.filter(oil => 
      (oil.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oil.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'Все' || oil.category === selectedCategory) &&
      (priceRange.min === '' || oil.price >= priceRange.min) &&
      (priceRange.max === '' || oil.price <= priceRange.max)
    );

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  const paginatedOils = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOils.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOils, currentPage]);

  const totalPages = Math.ceil(filteredOils.length / itemsPerPage);

  const handleAddToCart = useCallback((oil: Oil) => {
    addToCart(oil);
    toast({
      title: "Товар добавлен в корзину",
      description: `${oil.name} успешно добавлен в вашу корзину.`,
    });
  }, [addToCart, toast]);

  const getUsageRecommendations = (oil: Oil) => {
    const recommendations = [];
    
    if (oil.properties.relaxation > 0.7) {
      recommendations.push("Идеально для расслабляющего массажа или вечерней ванны");
    }
    if (oil.properties.energy > 0.7) {
      recommendations.push("Отлично подходит для утренней ароматерапии и повышения энергии");
    }
    if (oil.properties.focus > 0.7) {
      recommendations.push("Рекомендуется для улучшения концентрации во время работы или учебы");
    }
    if (oil.properties.sleep > 0.7) {
      recommendations.push("Помогает создать расслабляющую атмосферу перед сном");
    }
    if (oil.properties.mood > 0.7) {
      recommendations.push("Эффективно для поднятия настроения и эмоционального баланса");
    }
    
    return recommendations;
  };

  const getScentDescription = (scent: string) => {
    const descriptions = {
      floral: "Нежный цветочный аромат, создающий атмосферу гармонии и умиротворения",
      citrus: "Свежий, бодрящий цитрусовый аромат, заряжающий энергией и позитивом",
      woody: "Глубокий древесный аромат с заземляющим эффектом",
      herbal: "Свежий травяной аромат с очищающими свойствами",
      spicy: "Теплый, пряный аромат, создающий уютную атмосферу",
      minty: "Освежающий мятный аромат, способствующий ясности мышления",
      earthy: "Глубокий землистый аромат с успокаивающим эффектом"
    };
    return descriptions[scent] || "Уникальный аромат с особыми свойствами";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/50 to-black/50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <Button
            onClick={() => router.push('/')}
            className="bg-purple-800/50 hover:bg-purple-700/50 text-white border border-fuchsia-500/30 mb-4 sm:mb-0"
          >
            <Home className="w-5 h-5 mr-2" />
            На главную
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white font-playfair mb-4 sm:mb-0">
            МАГАЗИН МАСЕЛ
          </h1>
          <Button
            onClick={onCartClick}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Корзина ({cart.reduce((total, item) => total + item.quantity, 0)})
          </Button>
        </div>

        <div className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-8 border border-fuchsia-500/30">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Поиск масел..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-purple-800/50 border-fuchsia-500/30 text-white w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="bg-purple-800/50 border-fuchsia-500/30 text-white w-full sm:w-[200px]">
                  <SelectValue placeholder="Все категории" />
                </SelectTrigger>
                <SelectContent>
                  {oilCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setSortBy} value={sortBy}>
                <SelectTrigger className="bg-purple-800/50 border-fuchsia-500/30 text-white w-full sm:w-[200px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">По названию</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Input
                type="number"
                placeholder="Мин. цена"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="bg-purple-800/50 border-fuchsia-500/30 text-white w-full sm:w-24"
              />
              <span className="text-white hidden sm:inline">—</span>
              <Input
                type="number"
                placeholder="Макс. цена"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="bg-purple-800/50 border-fuchsia-500/30 text-white w-full sm:w-24"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pb-20 md:pb-4"> {/* Добавлен класс pb-20 для мобильных устройств */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {paginatedOils.map((oil) => {
              const cartItem = cart.find(item => item.id === oil.id);
              const quantity = cartItem ? cartItem.quantity : 0;
              const isFavorite = favorites.includes(oil.id);

              return (
                <Card 
                  key={oil.id}
                  className="bg-purple-900/40 border-fuchsia-500/30 overflow-hidden hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all duration-300"
                >
                  <CardContent className="p-3 sm:p-4">
                    <div 
                      className="relative aspect-square mb-4 overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => setSelectedOil(oil)}
                    >
                      <OptimizedImage
                        src={oil.image}
                        alt={oil.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(oil.id);
                          }}
                          className={`rounded-full p-2 ${
                            isFavorite ? 'bg-fuchsia-600' : 'bg-black/50'
                          } hover:bg-fuchsia-700 transition-colors duration-300`}
                          size="sm"
                        >
                          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">{oil.name}</h3>
                      <p className="text-sm text-gray-300 line-clamp-2">{oil.description}</p>
                      
                      <div className="flex flex-wrap gap-2 my-2">
                        {oil.category && (
                          <Badge variant="secondary" className="bg-fuchsia-500/20 text-fuchsia-300">
                            {oil.category}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                          {oil.scent}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-bold text-white">{oil.price} ₽</span>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleAddToCart(oil)}
                            className={`${
                              quantity > 0
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-fuchsia-600 hover:bg-fuchsia-700'
                            } text-white`}
                            size="sm"
                          >
                            {quantity === 0 ? (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                В корзину
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                В корзине
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center flex-wrap gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${
                  currentPage === page
                    ? 'bg-fuchsia-600'
                    : 'bg-purple-800/50 hover:bg-purple-700/50'
                } text-white w-8 h-8 sm:w-10 sm:h-10`}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>

        <Dialog open={selectedOil !== null} onOpenChange={() => setSelectedOil(null)}>
          {selectedOil && (
            <DialogContent className="bg-purple-900/95 border-fuchsia-500/30 text-white max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white mb-4">{selectedOil.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={selectedOil.image}
                    alt={selectedOil.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">Описание</h3>
                    <p className="text-gray-300">{selectedOil.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">Аромат</h3>
                    <p className="text-gray-300">{getScentDescription(selectedOil.scent)}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">Рекомендации по применению</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      {getUsageRecommendations(selectedOil).map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-fuchsia-400 mb-2">Свойства</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedOil.properties)
                        .sort(([, a], [, b]) => b - a)
                        .map(([key, value]) => (
                          <Badge
                            key={key}
                            variant="secondary"
                            className="bg-purple-800/50 text-white hover:bg-purple-700/50"
                          >
                            {key} ({Math.round(value * 100)}%)
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-fuchsia-500/30">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{selectedOil.price} ₽</span>
                      <Button
                        onClick={() => handleAddToCart(selectedOil)}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
