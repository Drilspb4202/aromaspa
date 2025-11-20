# Исправление превью ссылок в Telegram

## Проблема
При отправке ссылки на radmilaessentialoil.ru в Telegram не отображалось описание и превью.

## Решение

### 1. Обновлены мета-теги Open Graph
- Заменены несуществующие изображения на реальное изображение с сайта
- Добавлены явные meta теги в `<head>` для лучшей совместимости с Telegram
- Используется изображение: `https://i.ibb.co/8NDztqx/radmila-jpg.jpg`

### 2. Добавлены явные Open Graph теги
В файле `app/layout.tsx` добавлены следующие теги:
```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="ru_RU" />
<meta property="og:url" content="https://www.radmilaessentialoil.ru" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://i.ibb.co/8NDztqx/radmila-jpg.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="800" />
<meta property="og:image:alt" content="..." />
<meta property="og:site_name" content="Арома Спа Студия" />
```

### 3. Очистка кэша Telegram

После внесения изменений нужно очистить кэш Telegram:

**Способ 1: Использовать бота @WebpageBot**
1. Откройте Telegram
2. Найдите бота [@WebpageBot](https://t.me/WebpageBot)
3. Отправьте ему ссылку на ваш сайт: `radmilaessentialoil.ru`
4. Бот обновит информацию о странице в кэше Telegram

**Способ 2: Добавить параметр к URL**
При отправке ссылки добавьте параметр `?v=2` или текущую дату:
- `radmilaessentialoil.ru?v=2`
- `radmilaessentialoil.ru?t=20241206`

**Способ 3: Подождать**
Telegram автоматически обновит кэш через некоторое время (обычно 24-48 часов).

### 4. Проверка мета-тегов

Проверить, что мета-теги работают правильно, можно с помощью:

1. **Facebook Sharing Debugger** (работает и для Telegram):
   - https://developers.facebook.com/tools/debug/
   - Вставьте URL и нажмите "Отладка"

2. **Open Graph Checker**:
   - https://www.opengraph.xyz/
   - Вставьте URL для проверки

3. **Прямая проверка в Telegram**:
   - Отправьте ссылку в любой чат
   - Если превью не появилось сразу, используйте @WebpageBot

### 5. Важные моменты

- **Изображение**: Должно быть минимум 200x200 пикселей, рекомендуется 1200x630 для лучшего отображения
- **URL изображения**: Должен быть абсолютным (с https://)
- **Размер файла**: Изображение не должно быть слишком большим (рекомендуется до 5MB)
- **Формат**: JPG или PNG

### 6. Если превью все еще не работает

1. Убедитесь, что сайт доступен без VPN
2. Проверьте, что мета-теги действительно присутствуют в HTML (View Source)
3. Убедитесь, что изображение доступно по указанному URL
4. Попробуйте отправить ссылку с www: `www.radmilaessentialoil.ru`
5. Используйте @WebpageBot для принудительного обновления кэша

## Статус
✅ Мета-теги обновлены
✅ Изображение указано корректно
⏳ Требуется очистка кэша Telegram через @WebpageBot

