import { Oil } from '@/data/oils';

interface UserRating {
  userId: string;
  oilId: string;
  rating: number;
}

class RecommendationML {
  private userRatings: UserRating[] = [];
  private userSimilarities: { [key: string]: { [key: string]: number } } = {};

  addRating(userId: string, oilId: string, rating: number) {
    this.userRatings.push({ userId, oilId, rating });
    this.updateSimilarities(userId);
  }

  private updateSimilarities(userId: string) {
    const userRatings = this.getUserRatings(userId);
    
    for (const otherUserId in this.getUserRatings()) {
      if (otherUserId !== userId) {
        const otherUserRatings = this.getUserRatings(otherUserId);
        const similarity = this.calculateSimilarity(userRatings, otherUserRatings);
        
        if (!this.userSimilarities[userId]) {
          this.userSimilarities[userId] = {};
        }
        this.userSimilarities[userId][otherUserId] = similarity;
      }
    }
  }

  private calculateSimilarity(ratings1: { [key: string]: number }, ratings2: { [key: string]: number }): number {
    const commonOils = Object.keys(ratings1).filter(oilId => oilId in ratings2);
    
    if (commonOils.length === 0) return 0;

    const sum1 = commonOils.reduce((sum, oilId) => sum + ratings1[oilId], 0);
    const sum2 = commonOils.reduce((sum, oilId) => sum + ratings2[oilId], 0);
    const sumSq1 = commonOils.reduce((sum, oilId) => sum + Math.pow(ratings1[oilId], 2), 0);
    const sumSq2 = commonOils.reduce((sum, oilId) => sum + Math.pow(ratings2[oilId], 2), 0);
    const sumProduct = commonOils.reduce((sum, oilId) => sum + ratings1[oilId] * ratings2[oilId], 0);

    const n = commonOils.length;
    const numerator = sumProduct - (sum1 * sum2 / n);
    const denominator = Math.sqrt((sumSq1 - Math.pow(sum1, 2) / n) * (sumSq2 - Math.pow(sum2, 2) / n));

    return denominator === 0 ? 0 : numerator / denominator;
  }

  private getUserRatings(userId?: string): { [key: string]: number } {
    const ratings: { [key: string]: number } = {};
    this.userRatings
      .filter(rating => !userId || rating.userId === userId)
      .forEach(rating => {
        ratings[rating.oilId] = rating.rating;
      });
    return ratings;
  }

  predictRating(userId: string, oilId: string): number {
    const userRatings = this.getUserRatings(userId);
    if (oilId in userRatings) return userRatings[oilId];

    let weightedSum = 0;
    let similaritySum = 0;

    for (const otherUserId in this.userSimilarities[userId]) {
      const similarity = this.userSimilarities[userId][otherUserId];
      const otherUserRatings = this.getUserRatings(otherUserId);

      if (oilId in otherUserRatings) {
        weightedSum += similarity * otherUserRatings[oilId];
        similaritySum += Math.abs(similarity);
      }
    }

    return similaritySum === 0 ? 0 : weightedSum / similaritySum;
  }

  getRecommendations(userId: string, oils: Oil[], topN: number = 5): Oil[] {
    const predictions = oils.map(oil => ({
      oil,
      predictedRating: this.predictRating(userId, oil.id)
    }));

    return predictions
      .sort((a, b) => b.predictedRating - a.predictedRating)
      .slice(0, topN)
      .map(prediction => prediction.oil);
  }
}

export const recommendationML = new RecommendationML();
