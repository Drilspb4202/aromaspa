import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { oils, symptoms, goals, Oil, propertyTranslations, UserPreference } from '../data/oils'
import OptimizedImage from './OptimizedImage'
import { ShoppingCart, Info, Check, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Droplet, Brain, Heart } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import { recommendationEngine } from '@/utils/recommendationLogic'
import { useToast } from "@/components/ui/use-toast"
import { CustomSlider } from './CustomSlider'

interface OilCategory {
  id: string;
  name: string;
  icon: React.ElementType;
}

const oilCategories: OilCategory[] = [
  { id: "physical", name: "Физическое здоровье", icon: Droplet },
  { id: "mental", name: "Ментальное здоровье", icon: Brain },
  { id: "emotional", name: "Эмоциональное здоровье", icon: Heart },
];

interface OilSelectorProps {
  addToCart: (oil: Oil) => void;
  removeFromCart?: (oilId: string) => void;
}

interface OptionCardProps {
  id: string;
  label: string;
  isSelected: boolean;
  onClick: (id: string) => void;
  disabled: boolean;
}

const OptionCard = ({ id, label, isSelected, onClick, disabled }: OptionCardProps) => (
  <motion.div
    whileHover={{ scale: disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    onClick={() => !disabled && onClick(id)}
    className={`cursor-pointer p-3 rounded-lg text-sm ${
      isSelected ? 'bg-fuchsia-600 text-white' : 'bg-purple-900/50 text-gray-300'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} transition-colors duration-300`}
  >
    {label}
  </motion.div>
)

interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => (
  <div className="text-red-500">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
)

export default function OilSelector({ addToCart }: OilSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("physical")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [recommendedOils, setRecommendedOils] = useState<Oil[]>([])
  const [isRecommending, setIsRecommending] = useState(false)
  const [hasRecommended, setHasRecommended] = useState(false)
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({})
  const [expandedOilId, setExpandedOilId] = useState<string | null>(null)
  const [userPreferences, setUserPreferences] = useState<UserPreference>({
    propertyWeights: {},
    favoriteScents: [],
    allergies: []
  })
  const [userId, setUserId] = useState<string>('');
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<Array<{id: string; quantity: number}>>([]);
  const { toast } = useToast();
  const [explanations, setExplanations] = useState<Record<string, string | null>>({});
  const [summary, setSummary] = useState<string>('');
  const [loadingExplanations, setLoadingExplanations] = useState<Record<string, boolean>>({});
  const [recommendationQuality, setRecommendationQuality] = useState<number>(0);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      setUserId(storedId);
    } else {
      const newId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', newId);
      setUserId(newId);
    }
  }, []);

  const handleSymptomToggle = useCallback((symptomId: string) => {
    if (hasRecommended) return
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }, [hasRecommended])

  const handleGoalToggle = useCallback((goalId: string) => {
    if (hasRecommended) return
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    )
  }, [hasRecommended])

  const findRecommendedOils = useCallback(async () => {
    setIsRecommending(true);
    setLoadingExplanations({});
    
    // Конвертируем в формат для RecommendationEngine
    const symptomObjects = selectedSymptoms.map(id => symptoms.find(s => s.id === id)!).filter(Boolean);
    const goalObjects = selectedGoals.map(id => goals.find(g => g.id === id)!).filter(Boolean);
    
    // Устанавливаем предпочтения пользователя с учетом weights
    recommendationEngine.setUserPreferences({
      ...userPreferences,
      propertyWeights: userPreferences.propertyWeights
    });
    
    // Получаем рекомендации через движок с ML
    const initialRecommendations = recommendationEngine.recommendOils(
      userId,
      symptomObjects,
      goalObjects,
      oils
    );

    // Устанавливаем начальные рекомендации сразу
    setRecommendedOils(initialRecommendations);

    // Предзагружаем объяснения для всех масел сразу
    const explanationsMap: Record<string, string | null> = {};
    const loadingMap: Record<string, boolean> = {};
    
    for (const oil of initialRecommendations) {
      loadingMap[oil.id] = true;
    }
    setLoadingExplanations(loadingMap);

    try {
      // Запрашиваем AI для объяснений для всех масел
      const selectedProperties = [...selectedSymptoms, ...selectedGoals];
      const propertyNames = selectedProperties.map(prop => propertyTranslations[prop as keyof typeof propertyTranslations] || prop).join(', ');
      
      const prompt = `Вы - эксперт по эфирным маслам. Проанализируйте следующие масла и их свойства для симптомов/целей пользователя.

Масла для анализа:
${initialRecommendations.map(oil => {
  const relevantProps = selectedProperties
    .filter(prop => (oil.properties[prop] || 0) > 0)
    .map(prop => `${propertyTranslations[prop as keyof typeof propertyTranslations]}: ${Math.round((oil.properties[prop] || 0) * 100)}%`)
    .join(', ');
  return `${oil.name}: ${relevantProps}`;
}).join('\n')}

Выбранные симптомы и цели: ${propertyNames}

Для КАЖДОГО масла напишите объяснение в формате:

${initialRecommendations[0].name}:
[Объяснение из 2-3 предложений почему именно это масло подходит для выбранных симптомов/целей. Будьте конкретны и научны, используйте эмодзи для визуализации эффекта.]

Пример формата ответа:
Лаванда:
Лаванда успокаивает нервную систему 🧘‍♀️, способствуя крепкому сну и облегчая дыхание при простуде. Её антисептические свойства помогают бороться с инфекциями, а аромат снимает стресс 😌.

Ответьте ТОЛЬКО в этом формате, для каждого масла отдельно.`;

      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, sessionId: userId })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Unknown error occurred');

      const recommendationText = data.result;

      // Обрабатываем объяснения для каждого масла
      for (const oil of initialRecommendations) {
        // Ищем объяснение для конкретного масла
        const regex = new RegExp(`${oil.name}:\\s*([\\s\\S]*?)(?=\\n{2}[А-ЯЁ]|$)`, 'i');
        const match = recommendationText.match(regex);
        explanationsMap[oil.id] = match ? match[1].trim() : `Это масло эффективно для ваших выбранных симптомов и целей.`;
      }

      setExplanations(explanationsMap);
      setLoadingExplanations({});
      
      // Вычисляем качество рекомендации на основе совпадений
      const avgMatch = initialRecommendations.reduce((sum, oil) => {
        const relevantProps = selectedProperties.filter(prop => (oil.properties[prop] || 0) > 0.5);
        return sum + (relevantProps.length / selectedProperties.length);
      }, 0) / initialRecommendations.length;
      setRecommendationQuality(Math.min(100, avgMatch * 100));

    } catch (error) {
      console.error('Error fetching explanations:', error);
      // Устанавливаем базовые объяснения если AI не сработал
      initialRecommendations.forEach(oil => {
        const relevantProps = selectedSymptoms.concat(selectedGoals).filter(prop => (oil.properties[prop] || 0) > 0.5);
        explanationsMap[oil.id] = `Это масло эффективно для: ${relevantProps.map(prop => propertyTranslations[prop as keyof typeof propertyTranslations]).join(', ')}.`;
      });
      setExplanations(explanationsMap);
      
      toast({
        title: "Внимание",
        description: "AI объяснения загружены с базовой информацией.",
      });
    } finally {
      setLoadingExplanations({});
      setIsRecommending(false);
      setHasRecommended(true);
    }
  }, [selectedSymptoms, selectedGoals, userId, userPreferences, toast]);

  const resetSelection = useCallback(() => {
    setSelectedSymptoms([])
    setSelectedGoals([])
    setRecommendedOils([])
    setHasRecommended(false)
    setAddedToCart({})
    setExpandedOilId(null)
    setUserRatings({})
    setCart([]);
    setExplanations({});
    setSummary('');
    setLoadingExplanations({});
    setRecommendationQuality(0);
  }, [])

  const handleAddToCart = useCallback((oil: Oil) => {
    addToCart(oil);
    setAddedToCart(prev => ({ ...prev, [oil.id]: true }));
    toast({
      title: "Товар добавлен в корзину",
      description: `${oil.name} успешно добавлен в вашу корзину.`,
    })
  }, [addToCart, toast]);

  const toggleOilDetails = useCallback((oilId: string) => {
    if (expandedOilId === oilId) {
      setExpandedOilId(null);
      return;
    }
    
    setExpandedOilId(oilId);
    
    // Объяснение уже загружено при нажатии "Подобрать идеальные масла"
    // Просто показываем его
  }, [expandedOilId]);

  const updateUserPreferences = useCallback((property: string, value: number) => {
    setUserPreferences(prev => ({
      ...prev,
      propertyWeights: {
        ...prev.propertyWeights,
        [property]: value
      }
    }));
  }, []);

  const handleFeedback = useCallback((oil: Oil, isPositive: boolean) => {
    const rating = isPositive ? 1 : -1;
    setUserRatings(prev => ({ ...prev, [oil.id]: rating }));
    recommendationEngine.addRating(userId, oil.id, rating);
    
    const updatedRecommendations = recommendationEngine.recommendOils(
      userId,
      selectedSymptoms.map(id => symptoms.find(s => s.id === id)!),
      selectedGoals.map(id => goals.find(g => g.id === id)!),
      oils
    );
    setRecommendedOils(updatedRecommendations);
  }, [userId, selectedSymptoms, selectedGoals]);

  useEffect(() => {
    if (hasRecommended && userPreferences) {
      // Устанавливаем предпочтения
      recommendationEngine.setUserPreferences(userPreferences);
      
      // Получаем обновленные рекомендации
      const symptomObjects = selectedSymptoms.map(id => symptoms.find(s => s.id === id)!).filter(Boolean);
      const goalObjects = selectedGoals.map(id => goals.find(g => g.id === id)!).filter(Boolean);
      
      const updatedRecommendations = recommendationEngine.recommendOils(
        userId,
        symptomObjects,
        goalObjects,
        oils
      );
      setRecommendedOils(updatedRecommendations);
    }
  }, [userRatings, userId, selectedSymptoms, selectedGoals, hasRecommended, userPreferences]);


  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 backdrop-blur-lg rounded-xl p-4 sm:p-8 mb-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center font-playfair"
          >
            ПОДБЕРИТЕ ИДЕАЛЬНОЕ МАСЛО ДЛЯ СЕБЯ
          </motion.h2>

          <Tabs defaultValue="physical" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {oilCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center justify-center gap-2"
                >
                  {React.createElement(category.icon, { className: "w-5 h-5" })}
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {oilCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mb-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-fuchsia-400 mb-3 flex items-center">
                    Симптомы
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 ml-2 text-fuchsia-300" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Выберите симптомы, которые вас беспокоят</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                    {symptoms.filter(symptom => symptom.category === category.id).map(symptom => (
                      <OptionCard
                        key={symptom.id}
                        id={symptom.id}
                        label={symptom.label}
                        isSelected={selectedSymptoms.includes(symptom.id)}
                        onClick={handleSymptomToggle}
                        disabled={hasRecommended}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-fuchsia-400 mb-3 flex items-center">
                    Цели
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 ml-2 text-fuchsia-300" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Выберите желаемый результат</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                    {goals.filter(goal => goal.category === category.id).map(goal => (
                      <OptionCard
                        key={goal.id}
                        id={goal.id}
                        label={goal.label}
                        isSelected={selectedGoals.includes(goal.id)}
                        onClick={handleGoalToggle}
                        disabled={hasRecommended}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-fuchsia-400 mb-3">
                    Важность свойств
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[...selectedSymptoms, ...selectedGoals].map(property => (
                      <div key={property} className="flex flex-col">
                        <label className="text-sm text-white mb-1">
                          {propertyTranslations[property as keyof typeof propertyTranslations] || property}
                        </label>
                        <CustomSlider
                          value={[userPreferences.propertyWeights[property] || 1]}
                          onValueChange={([value]) => updateUserPreferences(property, value)}
                          min={0}
                          max={2}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-400">Меньше</span>
                          <span className="text-xs text-gray-400">Больше</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex flex-col sm:flex-row justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto mb-4 sm:mb-0"
            >
              {!selectedSymptoms.length && !selectedGoals.length && (
                <div className="w-full mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-lg text-center">
                  <p className="text-amber-200 text-sm">Выберите симптомы или цели для подбора идеальных масел</p>
                </div>
              )}
              <Button
                onClick={findRecommendedOils}
                className="w-full sm:w-auto bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white transition-all duration-300 text-lg py-3 px-6 rounded-lg shadow-lg hover:shadow-fuchsia-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedSymptoms.length && !selectedGoals.length || isRecommending || hasRecommended}
              >
                {isRecommending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Анализируем и подбираем...
                  </span>
                ) : (
                  <>
                    Подобрать идеальные масла
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                onClick={resetSelection}
                className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 text-lg py-3 px-6 rounded-lg"
              >
                Сбросить
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {recommendedOils.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Рекомендуемые масла</h3>
                {recommendationQuality > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block"
                  >
                    <Badge className="bg-green-600/80 text-white px-4 py-2 text-base">
                      Точность подбора: {Math.round(recommendationQuality)}%
                    </Badge>
                  </motion.div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedOils.map((oil, index) => (
                  <motion.div
                    key={oil.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-purple-900/70 to-fuchsia-900/70 border-fuchsia-500/30 overflow-hidden hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2">{oil.name}</h4>
                            <p className="text-gray-300 text-sm">{oil.description}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {Object.entries(oil.properties)
                              .sort(([, a], [, b]) => b - a)
                              .slice(0, 5)
                              .map(([key, value]) => (
                                <Badge
                                  key={key}
                                  variant="secondary"
                                  className="bg-purple-800/50 text-white hover:bg-purple-700/50"
                                >
                                  {propertyTranslations[key as keyof typeof propertyTranslations]} ({Math.round(value * 100)}%)
                                </Badge>
                              ))}
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="text-xl font-bold text-white">
                              {oil.price} ₽
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Button
                              onClick={() => toggleOilDetails(oil.id)}
                              className="w-full bg-purple-800/50 hover:bg-purple-700/50 text-white"
                              variant="secondary"
                            >
                              {expandedOilId === oil.id ? (
                                <>
                                  <ChevronUp className="w-4 h-4 mr-2" />
                                  Скрыть детали
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4 mr-2" />
                                  Подробнее
                                </>
                              )}
                            </Button>

                            <AnimatePresence>
                              {expandedOilId === oil.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 border-t border-fuchsia-500/30 space-y-4">
                                    <div className="grid gap-3">
                                      <h5 className="text-lg font-semibold text-white">Почему это масло подходит вам:</h5>
                                      {loadingExplanations[oil.id] ? (
                                        <p className="text-gray-300 text-sm">Загрузка объяснения...</p>
                                      ) : (
                                        <p className="text-gray-300 text-sm whitespace-pre-line">{explanations[oil.id] || 'Не удалось загрузить объяснение.'}</p>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <Button
                              onClick={() => handleAddToCart(oil)}
                              className={`w-full ${
                                addedToCart[oil.id]
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-fuchsia-600 hover:bg-fuchsia-700'
                              } text-white transition-colors`}
                              disabled={addedToCart[oil.id]}
                            >
                              {addedToCart[oil.id] ? (
                                <>
                                  <Check className="w-4 h-4 mr-2" />
                                  Добавлено
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  Добавить в корзину
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-8 p-6 bg-purple-900/50 rounded-lg"
                >
                  <h4 className="text-xl font-bold text-white mb-4">Общая выжимка:</h4>
                  <p className="text-gray-300">{summary}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  )
}
