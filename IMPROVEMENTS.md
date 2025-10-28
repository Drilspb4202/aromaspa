# Рекомендации по улучшению проекта

## ✅ Уже выполнено

### 1. Оптимизация изображений
- ✅ Включена оптимизация изображений Next.js
- ✅ Добавлены паттерны для внешних доменов
- Улучшит производительность и уменьшит размер изображений

### 2. Проверки TypeScript и ESLint
- ✅ Включены строгие проверки TypeScript
- ✅ Включен ESLint для сборки
- Поможет выявить ошибки на раннем этапе

### 3. Файл конфигурации окружения
- ✅ Создан `ENV.example` с примерами переменных
- Облегчит настройку проекта для новых разработчиков

---

## 🔄 Требует внимания

### 1. Рефакторинг главной страницы (Критично)

**Проблема:** `app/page.tsx` содержит 690+ строк кода, смешивает логику и представление

**Рекомендации:**
- Разбить на компоненты: `Header`, `Navigation`, `HeroSection`, `AboutSection`
- Вынести логику навигации в отдельный хук `useNavigation`
- Вынести логику корзины в отдельный хук `useCart`

**Преимущества:**
- Код станет читаемее и поддерживаемее
- Улучшится производительность
- Проще тестировать

**Пример структуры:**
```
components/
  layout/
    Header.tsx
    Navigation.tsx
  sections/
    HeroSection.tsx
    AboutSection.tsx
    ServicesPreview.tsx
hooks/
  useNavigation.ts
  useScrollSpy.ts
```

---

### 2. Исправление версий зависимостей (Важно)

**Проблема:** Многие зависимости используют `"latest"` в `package.json`

**Рекомендуемые действия:**
```bash
# Обновить package.json, заменив "latest" на конкретные версии
npm update
```

**Критичные зависимости для проверки:**
- `next: "14.2.16"` ✅ (хорошо)
- `react: "^18"` ✅ (хорошо)
- `framer-motion` → использовать конкретную версию
- `lucide-react: "^0.454.0"` ✅ (хорошо)

---

### 3. Оптимизация использования корзины

**Проблема:** Дублирование логики - есть `CartContext`, но в `page.tsx` используется `useLocalStorage`

**Рекомендация:** Использовать только `CartContext` через хук `useCart()`

**Изменения в `app/page.tsx`:**
```typescript
// Вместо:
const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

// Использовать:
const { cart, addToCart, removeFromCart } = useCart();
```

---

### 4. Улучшение производительности

**Проблемы:**
- Большой компонент `AromaSpaStudio` монтируется сразу
- Много ререндеров при скролле

**Рекомендации:**

#### a) Мемоизация компонентов
```typescript
const AnimatedCounter = React.memo(({ number, text }) => {
  // ...
}, (prevProps, nextProps) => {
  return prevProps.number === nextProps.number && 
         prevProps.text === nextProps.text;
});
```

#### b) Ленивая загрузка секций
```typescript
const DynamicGallery = dynamic(() => import('@/components/GallerySection'), {
  loading: () => <SkeletonLoader />,
  ssr: false
});
```

#### c) Оптимизация обработчика скролла
```typescript
const handleScroll = useCallback(
  throttle(() => {
    // логика
  }, 100),
  []
);
```

---

### 5. Улучшение SEO

**Уже есть хорошие метаданные в `app/layout.tsx`**, но можно улучшить:

**Рекомендации:**

#### a) Добавить микроразметку для отзывов
```typescript
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Арома Спа Студия"
  },
  // ...
};
```

#### b) Добавить JSON-LD для услуг
```typescript
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  // ...
};
```

---

### 6. Оптимизация API

**Файл:** `app/api/deepseek/route.ts`

**Проблемы:**
- `conversationHistory` хранится в памяти Map - потеряется при перезапуске
- Нет ограничения на размер истории

**Рекомендации:**

#### a) Использовать базу данных для хранения истории
```typescript
// Использовать Redis или Vercel KV
import { kv } from '@vercel/kv';

const history = await kv.get(`conversation:${sessionId}`);
```

#### b) Добавить очистку старых сессий
```typescript
// Очищать сессии старше 24 часов
const cleanupOldSessions = async () => {
  // ...
};
```

---

### 7. Безопасность

**Рекомендации:**

#### a) Добавить rate limiting для API
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
});
```

#### b) Валидировать входные данные
```typescript
import { z } from 'zod';

const requestSchema = z.object({
  prompt: z.string().min(1).max(500),
  sessionId: z.string(),
});
```

---

### 8. Мониторинг и аналитика

**Рекомендации:**

#### a) Добавить Sentry для отслеживания ошибок
```bash
npm install @sentry/nextjs
```

#### b) Использовать Web Vitals для метрик производительности
```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function reportWebVitals(metric) {
  // Отправка на аналитику
}
```

---

## 📊 Приоритеты

### Высокий приоритет (делать сейчас):
1. ✅ Включить оптимизацию изображений - **Выполнено**
2. ✅ Включить проверки TypeScript/ESLint - **Выполнено**
3. ⏳ Рефакторинг `app/page.tsx` - **Требуется работа**
4. ⏳ Исправить версии зависимостей - **Требуется работа**
5. ⏳ Использовать `CartContext` вместо `useLocalStorage` - **Требуется работа**

### Средний приоритет:
6. Оптимизация производительности (мемоизация, lazy loading)
7. Улучшение SEO (добавить микроразметку)
8. Добавить rate limiting для API

### Низкий приоритет:
9. Миграция на Redis для хранения истории разговоров
10. Добавить Sentry
11. Добавить Web Vitals мониторинг

---

## 🛠️ Как применить улучшения

### Шаг 1: Проверить TypeScript ошибки
```bash
npx tsc --noEmit
```

### Шаг 2: Проверить ESLint ошибки
```bash
npm run lint
```

### Шаг 3: Исправить критические ошибки
Сфокусируйтесь на:
- Использовании `useCart()` вместо `useLocalStorage` в `page.tsx`
- Разбиении `page.tsx` на компоненты

### Шаг 4: Обновить зависимости
```bash
npm audit
npm audit fix
```

---

## 📝 Заметки

- Проект уже имеет хорошую структуру SEO
- Использование `CartContext` уже реализовано
- API для DeepSeek оптимизирован с кешированием
- Есть система производительности в `utils/performance.ts`

---

## 💡 Дополнительные рекомендации

### Структура компонентов
```
components/
  sections/       # Секции страницы
  layout/         # Компоненты лейаута
  common/         # Общие компоненты
  ui/            # UI компоненты (уже есть)
```

### Конвенции кода
- Использовать TypeScript строго
- Всегда проверять типы
- Комментарии на русском языке
- Использовать async/await вместо промисов

### Git workflow
- Использовать semantic commits
- Создавать feature branches
- Писать понятные commit messages на русском

---

**Дата создания:** 2024
**Версия:** 1.0
