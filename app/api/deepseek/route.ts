import { NextResponse } from 'next/server'
import { LRUCache } from 'lru-cache'

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error('Missing DEEPSEEK_API_KEY environment variable')
}

// Создаем LRU кэш с ограничением по размеру и времени жизни
const responseCache = new LRUCache({
  max: 500, // Максимальное количество элементов
  ttl: 1000 * 60 * 60, // 1 час
  updateAgeOnGet: true // Обновляем время жизни при получении
})

// Оптимизированный системный промпт
const systemPrompt = `Ты — эксперт по ароматерапии Aroma Spa Studio. Отвечай кратко (макс. 2-3 предложения), информативно, используй эмоджи умеренно.

Услуги:
АромаДиагностика 2000₽/2ч, АромаЙога 2000₽/2.5ч, АромаДегустация 500₽/1ч, АромаНейрографика 1000₽/2ч, АромаТимбилдинг 5000₽/2ч

СПб, Советский пр.12 (Усть-Славянка). Запись обязательна.`;

const conversationHistory = new Map<string, Array<{role: string, text: string, feedback?: 'positive' | 'negative'}>>();

export async function POST(req: Request) {
  try {
    const { prompt, sessionId, feedback } = await req.json()
    
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
              content: `${conversationContext}\n\nUser: ${prompt}`
            }
          ],
          temperature: 0.5,
          max_tokens: 256,
          top_p: 0.7,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
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
    
    return NextResponse.json({ 
      success: true,
      result: assistantResponse,
      context: recentHistory
    })

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

