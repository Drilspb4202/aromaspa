import { Oil, Symptom, Goal, UserPreference } from '../data/oils';
import { recommendationML } from './recommendationML';

interface RecommendationScore {
  oil: Oil;
  score: number;
  synergy: number;
}

class RecommendationEngine {
  private userPreferences: UserPreference = {
    propertyWeights: {},
    favoriteScents: [],
    allergies: [],
  };

  private timeOfDay: 'morning' | 'afternoon' | 'evening' = 'morning';
  private season: 'spring' | 'summer' | 'autumn' | 'winter' = 'spring';

  constructor() {
    this.updateTimeAndSeason();
  }

  private updateTimeAndSeason() {
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth();

    if (hour >= 5 && hour < 12) {
      this.timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 18) {
      this.timeOfDay = 'afternoon';
    } else {
      this.timeOfDay = 'evening';
    }

    if (month >= 2 && month < 5) {
      this.season = 'spring';
    } else if (month >= 5 && month < 8) {
      this.season = 'summer';
    } else if (month >= 8 && month < 11) {
      this.season = 'autumn';
    } else {
      this.season = 'winter';
    }
  }

  public setUserPreferences(preferences: UserPreference) {
    this.userPreferences = preferences;
  }

  public recommendOils(userId: string, symptoms: Symptom[], goals: Goal[], oils: Oil[]): Oil[] {
    this.updateTimeAndSeason();
    
    // Фильтруем масла только с положительными совпадениями
    const scores: RecommendationScore[] = oils
      .map(oil => {
        const baseScore = this.calculateScore(userId, oil, symptoms, goals);
        const synergy = this.calculateSynergy(oil, symptoms, goals);
        const combinedScore = (baseScore * 0.7) + (synergy * 0.3);
        
        return {
          oil,
          score: baseScore,
          synergy: combinedScore
        };
      })
      .filter(item => item.score > 0.1); // Исключаем масла с нулевым совпадением

    // Сортируем по комбинированному score
    scores.sort((a, b) => b.synergy - a.synergy);

    // Возвращаем топ-3 самых релевантных масла
    return scores.slice(0, 3).map(score => score.oil);
  }

  private calculateScore(userId: string, oil: Oil, symptoms: Symptom[], goals: Goal[]): number {
    // Если ничего не выбрано, возвращаем 0
    if (symptoms.length === 0 && goals.length === 0) {
      return 0;
    }

    let score = 0;
    let totalWeight = 0;

    // Вычисляем score для симптомов
    symptoms.forEach(symptom => {
      const relevance = oil.properties[symptom.id] || 0;
      const weight = this.userPreferences.propertyWeights[symptom.id] || 1;
      if (relevance > 0) { // Учитываем только релевантные свойства
        score += relevance * weight;
        totalWeight += weight;
      }
    });

    // Вычисляем score для целей
    goals.forEach(goal => {
      const relevance = oil.properties[goal.id] || 0;
      const weight = this.userPreferences.propertyWeights[goal.id] || 1;
      if (relevance > 0) { // Учитываем только релевантные свойства
        score += relevance * weight;
        totalWeight += weight;
      }
    });

    // Нормализуем score
    score = totalWeight > 0 ? score / totalWeight : 0;

    // Бонус за предпочтения
    if (this.userPreferences.favoriteScents.includes(oil.scent)) {
      score *= 1.15;
    }
    
    // Исключаем аллергены
    if (this.userPreferences.allergies.includes(oil.scent)) {
      return 0;
    }

    // Учитываем время и сезон
    score *= this.getTimeAndSeasonMultiplier(oil);

    // Добавляем ML предсказание для персонализации
    const mlPrediction = recommendationML.predictRating(userId, oil.id);
    if (mlPrediction > 0) {
      score = score * 0.75 + mlPrediction * 0.25;
    }

    return score;
  }

  private calculateSynergy(oil: Oil, symptoms: Symptom[], goals: Goal[]): number {
    if (symptoms.length === 0 && goals.length === 0) {
      return 0;
    }

    const relevantProperties = [...symptoms, ...goals].map(item => item.id);
    
    // Вычисляем среднюю релевантность
    const synergyScore = relevantProperties.reduce((sum, prop) => {
      return sum + (oil.properties[prop] || 0);
    }, 0);

    const avgScore = synergyScore / relevantProperties.length;
    
    // Бонус за высокую релевантность по всем свойствам
    const highRelevanceCount = relevantProperties.filter(prop => (oil.properties[prop] || 0) > 0.7).length;
    const diversityBonus = highRelevanceCount / relevantProperties.length;
    
    return avgScore * (1 + diversityBonus * 0.3);
  }

  private getTimeAndSeasonMultiplier(oil: Oil): number {
    let multiplier = 1;

    switch (this.timeOfDay) {
      case 'morning':
        if (oil.properties.energy > 0.7) multiplier *= 1.2;
        break;
      case 'evening':
        if (oil.properties.relaxation > 0.7 || oil.properties.sleep > 0.7) multiplier *= 1.2;
        break;
    }

    switch (this.season) {
      case 'winter':
        if (oil.properties.immunity > 0.7) multiplier *= 1.2;
        break;
      case 'spring':
        if (oil.properties.detox > 0.7) multiplier *= 1.2;
        break;
      case 'summer':
        if (oil.properties.cooling > 0.7) multiplier *= 1.2;
        break;
      case 'autumn':
        if (oil.properties.mood > 0.7) multiplier *= 1.2;
        break;
    }

    return multiplier;
  }

  public createOilCombination(oils: Oil[]): Oil {
    const combinedProperties: { [key: string]: number } = {};
    const combinedScents: Set<string> = new Set();

    oils.forEach(oil => {
      Object.entries(oil.properties).forEach(([key, value]) => {
        combinedProperties[key] = (combinedProperties[key] || 0) + value;
      });
      combinedScents.add(oil.scent);
    });

    Object.keys(combinedProperties).forEach(key => {
      combinedProperties[key] /= oils.length;
    });

    return {
      id: `combination-${Date.now()}`,
      name: `Персонализированная смесь (${oils.map(o => o.name).join(', ')})`,
      description: `Уникальная комбинация масел: ${oils.map(o => o.name).join(', ')}`,
      image: "/placeholder.svg?height=300&width=300",
      price: oils.reduce((sum, oil) => sum + oil.price, 0),
      properties: combinedProperties,
      scent: Array.from(combinedScents).join(', ')
    };
  }

  public addRating(userId: string, oilId: string, rating: number) {
    recommendationML.addRating(userId, oilId, rating);
  }
}

export const recommendationEngine = new RecommendationEngine();
