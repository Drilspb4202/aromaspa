// Simple in-memory cache for API responses
class SimpleCache {
  private cache: Map<string, { data: any; expires: number }> = new Map();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes default

  set(key: string, data: any, ttl?: number): void {
    const expires = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { data, expires });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  has(key: string): boolean {
    return this.cache.has(key) && Date.now() <= this.cache.get(key)!.expires;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

// Global cache instance
export const cache = new SimpleCache();

// Cache key generators
export const getOilListCacheKey = (filters: string) => `oils:list:${filters}`;
export const getOilDetailsCacheKey = (oilId: string) => `oils:details:${oilId}`;

