/**
 * Простой in-memory rate limiter
 * Для production рекомендуется использовать Redis-based решение (например, @upstash/ratelimit)
 */

interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

class SimpleRateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(options: RateLimitOptions) {
    this.maxRequests = options.maxRequests;
    this.windowMs = options.windowMs;
  }

  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const record = this.requests.get(identifier);

    // Если записи нет или окно истекло, создаем новую
    if (!record || now > record.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return {
        success: true,
        remaining: this.maxRequests - 1,
        resetTime: now + this.windowMs,
      };
    }

    // Если лимит превышен
    if (record.count >= this.maxRequests) {
      return {
        success: false,
        remaining: 0,
        resetTime: record.resetTime,
      };
    }

    // Увеличиваем счетчик
    record.count++;
    return {
      success: true,
      remaining: this.maxRequests - record.count,
      resetTime: record.resetTime,
    };
  }

  // Очистка старых записей (можно вызывать периодически)
  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.requests.entries()) {
      if (now > value.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

// Создаем экземпляры для разных эндпоинтов
export const apiRateLimiter = new SimpleRateLimiter({
  maxRequests: 10, // 10 запросов
  windowMs: 60 * 1000, // в минуту
});

export const chatRateLimiter = new SimpleRateLimiter({
  maxRequests: 20, // 20 запросов
  windowMs: 60 * 1000, // в минуту
});

/**
 * Получить идентификатор клиента из запроса
 */
export function getClientIdentifier(req: Request): string {
  // Используем IP адрес или заголовок X-Forwarded-For
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

