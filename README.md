# Aroma Spa Studio

Веб-сайт для спа-салона с возможностью записи на процедуры и покупки товаров.

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+ 
- Git
- Аккаунт на GitHub
- Аккаунт на Vercel

### 1️⃣ Клонирование и установка

\`\`\`bash
# Клонируем репозиторий
git clone https://github.com/Drilspb4202/aroma-spa-studio--1-.git

# Переходим в директорию проекта
cd aroma-spa-studio--1-

# Устанавливаем зависимости
npm install
\`\`\`

### 2️⃣ Локальная разработка

\`\`\`bash
# Запуск проекта в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск собранного проекта
npm start
\`\`\`

### 3️⃣ Работа с Git

\`\`\`bash
# Проверить статус изменений
git status

# Добавить все изменения
git add .

# Создать коммит
git commit -m "Описание ваших изменений"

# Отправить изменения на GitHub
git push
\`\`\`

### 4️⃣ Деплой на Vercel

1. Перейдите на [Vercel](https://vercel.com)
2. Нажмите "Add New Project"
3. Выберите ваш GitHub репозиторий
4. Нажмите "Import"
5. Настройки проекта:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Node.js Version: 18.x
6. Нажмите "Deploy"

### 🔄 Автоматический деплой

После настройки, каждый push в main ветку будет автоматически деплоиться на Vercel:

1. Внесите изменения в код
2. Выполните:
   \`\`\`bash
   git add .
   git commit -m "Описание изменений"
   git push
   \`\`\`
3. Vercel автоматически начнет новую сборку
4. Через несколько минут изменения появятся на сайте

### 🔑 Настройка Git с токеном

Если требуется настройка с токеном:

1. Создайте токен на GitHub:
   - Перейдите в Settings -> Developer settings -> Personal access tokens
   - Нажмите "Generate new token (classic)"
   - Выберите scope "repo"
   - Скопируйте токен

2. Настройте Git:
   \`\`\`bash
   git remote set-url origin https://YOUR_TOKEN@github.com/Drilspb4202/aroma-spa-studio--1-.git
   \`\`\`

## 📝 Важные команды

\`\`\`bash
# Проверить текущий remote
git remote -v

# Добавить изменения
git add .

# Создать коммит
git commit -m "Описание"

# Отправить изменения
git push

# Получить последние изменения
git pull
\`\`\`

## 🤝 Поддержка

При возникновении вопросов обращайтесь:
- Email: beresakorte@gmail.com
- GitHub: [Drilspb4202](https://github.com/Drilspb4202)
