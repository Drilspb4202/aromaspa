import { NextResponse } from 'next/server'
import { LRUCache } from 'lru-cache'
import { z } from 'zod'
import { chatRateLimiter, getClientIdentifier } from '@/lib/rate-limit'

// Создаем LRU кэш с ограничением по размеру и времени жизни
const responseCache = new LRUCache({
  max: 500, // Максимальное количество элементов
  ttl: 1000 * 60 * 60, // 1 час
  updateAgeOnGet: true // Обновляем время жизни при получении
})

// Оптимизированный системный промпт
const systemPrompt = `Ты — эксперт по ароматерапии AROMA SPA СТУДИЯ. Отвечай кратко (макс. 2-3 предложения), информативно, используй эмоджи умеренно.

Услуги:
АромаДиагностика 3000₽/2ч, АромаЙога 3000₽/2.5ч, АромаДегустация 500₽/1ч, АромаНейрографика 1000₽/2ч, АромаТимбилдинг 5000₽/2ч

СПб, Советский пр.12 (Усть-Славянка). Запись обязательна.`;

const conversationHistory = new Map<string, Array<{role: string, text: string, feedback?: 'positive' | 'negative'}>>();

// Схема валидации запроса
const requestSchema = z.object({
  prompt: z.string().min(1, 'Промпт не может быть пустым').max(1000, 'Промпт слишком длинный'),
  sessionId: z.string().min(1, 'Session ID обязателен'),
  feedback: z.enum(['positive', 'negative']).optional(),
});

export async function POST(req: Request) {
  try {
    // Проверяем наличие API ключа
    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'DEEPSEEK_API_KEY is not configured' 
        },
        { status: 500 }
      )
    }

    // Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = chatRateLimiter.check(clientId);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Превышен лимит запросов. Попробуйте позже.',
          resetTime: rateLimitResult.resetTime,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Валидация входных данных
    const body = await req.json();
    const validationResult = requestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Неверные данные запроса',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { prompt, sessionId, feedback } = validationResult.data;
    
    // Проверяем кэш
    const cacheKey = prompt.toLowerCase().trim();
    const cachedResponse = responseCache.get(cacheKey);
    
    if (cachedResponse) {
      return NextResponse.json({ 
        success: true,
        result: cachedResponse,
        cached: true
      });
    }
    
    // Получаем историю и обрабатываем обратную связь параллельно
    const [history, feedbackResult] = await Promise.all([
      Promise.resolve(conversationHistory.get(sessionId) || []),
      feedback ? Promise.resolve().then(() => {
        const hist = conversationHistory.get(sessionId) || [];
        const lastBotMessageIndex = [...hist].reverse().findIndex(msg => msg.role === 'assistant');
        if (lastBotMessageIndex !== -1) {
          hist[hist.length - 1 - lastBotMessageIndex].feedback = feedback;
        }
        return hist;
      }) : Promise.resolve(null)
    ]);

    // Берем только последние 3 сообщения для контекста
    const recentHistory = history.slice(-3);
    
    // Добавляем текущий запрос
    recentHistory.push({ role: 'user', text: prompt });
    
    const conversationContext = recentHistory
      .map(msg => `${msg.role}: ${msg.text}${msg.feedback ? ` [${msg.feedback}]` : ''}`)
      .join('\n');

    const response = await fetch(
      'https://api.deepseek.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: conversationContext ? `${conversationContext}\n\nUser: ${prompt}` : prompt
            }
          ],
          temperature: 0.7,
          max_tokens: prompt.includes('почему это масло') || prompt.includes('объяснение') ? 2000 : 256,
          top_p: 0.8,
          frequency_penalty: 0.3,
          presence_penalty: 0.3
        })
      }
    )

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${await response.text()}`)
    }

    const data = await response.json()
    const assistantResponse = data.choices?.[0]?.message?.content || 'No response generated'
    
    // Кэшируем ответ
    responseCache.set(cacheKey, assistantResponse);
    
    // Обновляем историю
    recentHistory.push({ role: 'assistant', text: assistantResponse });
    conversationHistory.set(sessionId, recentHistory);
    
    return NextResponse.json(
      { 
        success: true,
        result: assistantResponse,
        context: recentHistory
      },
      {
        headers: {
          'X-RateLimit-Limit': '20',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      }
    )

  } catch (error) {
    console.error('Error calling DeepSeek API:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}
