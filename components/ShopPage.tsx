'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { oils, Oil, oilCategories } from '../data/oils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Search, Check, Home, ShoppingBag, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useRouter } from 'next/navigation';
import OilCard from './OilCard';
import { cache, getOilListCacheKey } from '@/lib/cache';
import { getProxiedImageUrl } from '@/utils/imageProxy';

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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  const filteredOils = useMemo(() => {
    // Generate cache key
    const cacheKey = getOilListCacheKey(
      `${searchTerm}-${selectedCategory}-${sortBy}-${priceRange.min}-${priceRange.max}`
    );
    
    // Check cache
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }
    
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

    // Cache the result
    cache.set(cacheKey, filtered, 3 * 60 * 1000); // Cache for 3 minutes
    
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
    
    // Универсальные способы применения
    recommendations.push("💧 Добавьте 3-5 капель в аромалампу или диффузор");
    recommendations.push("🧴 Добавьте 5-10 капель в 10 мл базового масла для массажа");
    recommendations.push("🛁 Добавьте 8-10 капель в ванну");
    
    // Специфические рекомендации
    if (oil.properties.relaxation > 0.7) {
      recommendations.push("🌙 Используйте вечером для создания успокаивающей атмосферы");
    }
    if (oil.properties.energy > 0.7) {
      recommendations.push("☀️ Идеально для утреннего использования для заряда бодрости");
    }
    if (oil.properties.focus > 0.7) {
      recommendations.push("📚 Применяйте во время работы или учебы для улучшения концентрации");
    }
    if (oil.properties.sleep > 0.7) {
      recommendations.push("🌛 Нанесите на подушку или запястья перед сном для лучшего отдыха");
    }
    if (oil.properties.mood > 0.7) {
      recommendations.push("💗 Отлично поднимает настроение и восстанавливает эмоциональный баланс");
    }
    if (oil.properties.breathing > 0.7) {
      recommendations.push("🫁 Используйте для ингаляций (1-2 капли в миске с горячей водой)");
    }
    if (oil.properties.headache > 0.6) {
      recommendations.push("💆 Применяйте компресс на виски или лоб при головной боли");
    }
    
    // Предупреждение
    recommendations.push("⚠️ Важно: разбавляйте масло перед нанесением на кожу");
    
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
    return descriptions[scent as keyof typeof descriptions] || "Уникальный аромат с особыми свойствами";
  };

  return (
    <div className="min-h-screen relative">
      {/* Background with same image as homepage */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url("${getProxiedImageUrl('https://i.ibb.co/5LmmGTK/DALL-E-2024-12-06-03-15-04-A-luxurious-image-featuring-a-purple-theme-redesigned-to-showcase-drops-o.webp')}")`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8 py-8">
        {/* Header with modern navigation */}
        <div className="mb-8">
          {/* Main Header with smooth layout */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Button
              onClick={() => router.push('/')}
              className="group relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 rounded-xl border-0 backdrop-blur-sm"
            >
              <Home className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">На главную</span>
            </Button>

            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 tracking-tight hover:from-purple-300 hover:via-fuchsia-300 hover:to-purple-300 transition-all duration-500">
              МАГАЗИН МАСЕЛ
            </h1>
            
            <Button
              onClick={onCartClick}
              className="group relative bg-gradient-to-r from-fuchsia-600 via-purple-600 to-fuchsia-600 hover:from-fuchsia-700 hover:via-purple-700 hover:to-fuchsia-700 text-white shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50 transition-all duration-300 hover:scale-105 rounded-xl border-0 backdrop-blur-sm overflow-hidden"
            >
              <ShoppingBag className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">Корзина</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </Button>
          </div>
        </div>

        {/* Filters Section - Compact Modern Design */}
        <div className="mb-8">
          {/* Main filter bar */}
          <div className="flex flex-col lg:flex-row gap-3 mb-4">
            {/* Search - Full width on mobile, flex on desktop */}
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Поиск масел..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 transition-all rounded-xl"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Filter controls - Compact layout */}
            <div className="flex gap-2">
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10 focus:border-fuchsia-500/50 h-10 w-[140px] rounded-xl">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {oilCategories.map(category => (
                    <SelectItem key={category} value={category} className="text-white">{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select onValueChange={setSortBy} value={sortBy}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10 focus:border-fuchsia-500/50 h-10 w-[140px] rounded-xl">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  <SelectItem value="name" className="text-white">По названию</SelectItem>
                  <SelectItem value="price-asc" className="text-white">Цена ↑</SelectItem>
                  <SelectItem value="price-desc" className="text-white">Цена ↓</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price range - Compact inline */}
          <div className="flex items-center gap-2 mb-3">
            <Input
              type="number"
              placeholder="Мин"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-fuchsia-500/50 h-10 w-24 rounded-xl text-sm"
            />
            <span className="text-gray-400 text-xs">—</span>
            <Input
              type="number"
              placeholder="Макс"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-fuchsia-500/50 h-10 w-24 rounded-xl text-sm"
            />
            
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Все');
                setPriceRange({ min: '', max: '' });
                setCurrentPage(1);
                cache.clear();
              }}
              variant="ghost"
              className="h-10 px-3 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-4 h-4 mr-1" />
              Сброс
            </Button>
          </div>

          {/* Active filters display */}
          {(searchTerm || selectedCategory !== 'Все' || priceRange.min || priceRange.max) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400">Активные фильтры:</span>
              {searchTerm && (
                <Badge 
                  variant="secondary"
                  className="bg-fuchsia-500/20 text-fuchsia-200 border-0 backdrop-blur-sm"
                >
                  Поиск: {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory !== 'Все' && (
                <Badge 
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-200 border-0 backdrop-blur-sm"
                >
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('Все')}
                    className="ml-2 hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {(priceRange.min || priceRange.max) && (
                <Badge 
                  variant="secondary"
                  className="bg-emerald-500/20 text-emerald-200 border-0 backdrop-blur-sm"
                >
                  {priceRange.min && priceRange.max ? `${priceRange.min}₽ — ${priceRange.max}₽` 
                   : priceRange.min ? `от ${priceRange.min}₽`
                   : `до ${priceRange.max}₽`}
                  <button
                    onClick={() => setPriceRange({ min: '', max: '' })}
                    className="ml-2 hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <span className="text-sm text-gray-400">Найдено:</span>
            <span className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              {filteredOils.length}
            </span>
            <span className="text-sm text-gray-400">
              {filteredOils.length === 1 ? 'товар' : filteredOils.length < 5 ? 'товара' : 'товаров'}
            </span>
          </div>
        </div>

        <div className="pb-20 md:pb-4"> {/* Добавлен класс pb-20 для мобильных устройств */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${currentPage}-${selectedCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {paginatedOils.map((oil: Oil, index: number) => {
              const cartItem = cart.find(item => item.id === oil.id);
              const quantity = cartItem ? cartItem.quantity : 0;
              const isFavorite = favorites.includes(oil.id);

                return (
                  <motion.div
                    key={oil.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                  >
                    <OilCard
                      oil={oil}
                      cartQuantity={quantity}
                      isFavorite={isFavorite}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={toggleFavorite}
                      onCardClick={setSelectedOil}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white w-11 h-11 rounded-lg transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Показываем только близкие к текущей странице кнопки
                const isNearby = Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages;
                const showEllipsis = page === currentPage + 3 || page === currentPage - 3;
                
                if (showEllipsis) {
                  return <span key={page} className="text-gray-400 px-2">...</span>;
                }
                
                if (!isNearby && page !== 1 && page !== totalPages) {
                  return null;
                }
                
                return (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${
                      currentPage === page
                        ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 shadow-lg shadow-fuchsia-500/30 scale-110'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    } text-white w-11 h-11 rounded-lg transition-all hover:scale-105`}
                  >
                    {page}
                  </Button>
                );
              })}
              
              <Button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white w-11 h-11 rounded-lg transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </Button>
            </div>
          )}
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
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-300 mb-2">
                      Описание
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{selectedOil.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-300 mb-2">
                      Аромат
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{getScentDescription(selectedOil.scent)}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-300 mb-2">
                      Рекомендации по применению
                    </h3>
                    <div className="bg-white/5 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                      {getUsageRecommendations(selectedOil).map((rec, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded hover:bg-white/5"
                        >
                          <span className="flex-shrink-0 mt-0.5">{rec.split(' ')[0]}</span>
                          <span>{rec.substring(rec.indexOf(' ') + 1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-300 mb-2">
                      Свойства
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedOil.properties)
                        .sort(([, a], [, b]) => b - a)
                        .map(([key, value]) => (
                          <Badge
                            key={key}
                            variant="secondary"
                            className="bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 text-white backdrop-blur-sm border-0 hover:scale-105 transition-transform duration-300"
                          >
                            {key} ({Math.round(value * 100)}%)
                          </Badge>
                        ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                          {selectedOil.price} ₽
                        </span>
                        {(() => {
                          const cartItem = cart.find(item => item.id === selectedOil.id);
                          const quantity = cartItem ? cartItem.quantity : 0;
                          return quantity > 0 && (
                            <div className="text-sm text-emerald-400 mt-1">
                              В корзине: {quantity}
                            </div>
                          );
                        })()}
                      </div>
                      <div className="flex gap-2">
                        {(() => {
                          const cartItem = cart.find(item => item.id === selectedOil.id);
                          const quantity = cartItem ? cartItem.quantity : 0;
                          return quantity > 0 ? (
                            <>
                              <Button
                                onClick={() => removeFromCart(selectedOil.id)}
                                variant="outline"
                                className="bg-white/5 border-white/20 hover:bg-white/10 text-white hover:border-fuchsia-500/50 transition-all duration-300"
                              >
                                —
                              </Button>
                              <span className="flex items-center px-4 bg-white/5 border border-white/20 rounded-lg text-white font-semibold">
                                {quantity}
                              </span>
                              <Button
                                onClick={() => handleAddToCart(selectedOil)}
                                variant="outline"
                                className="bg-white/5 border-white/20 hover:bg-white/10 text-white hover:border-fuchsia-500/50 transition-all duration-300"
                              >
                                +
                              </Button>
                            </>
                          ) : (
                            <Button
                              onClick={() => handleAddToCart(selectedOil)}
                              className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-fuchsia-500/50 transition-all duration-300 hover:scale-105"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              В корзину
                            </Button>
                          );
                        })()}
                      </div>
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
