# 🚀 Деплой проекта на Timeweb

## 📋 Вариант 1: Деплой с Docker (Рекомендуется)

### Преимущества Docker:
- ✅ Полная изоляция окружения
- ✅ Легкое масштабирование
- ✅ Стабильная работа
- ✅ Простое управление версиями

### Шаги деплоя:

#### 1. Подготовка переменных окружения

Создайте файл `.env` в корне проекта со следующими переменными:

```env
BOT_TOKEN=your_telegram_bot_token_here
CHAT_ID=your_telegram_chat_id_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here
NODE_ENV=production
```

#### 2. Подключение к серверу Timeweb

```bash
ssh root@your-server-ip
```

#### 3. Установка Docker на сервере

```bash
# Обновляем систему
apt update && apt upgrade -y

# Устанавливаем Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Устанавливаем Docker Compose
apt install docker-compose -y

# Запускаем Docker
systemctl start docker
systemctl enable docker
```

#### 4. Клонирование проекта на сервер

```bash
# Создаем директорию для проекта
mkdir -p /var/www/aromaspa
cd /var/www/aromaspa

# Клонируем репозиторий
git clone https://github.com/Drilspb4202/aromaspa.git .

# Создаем файл .env с переменными окружения
nano .env
# Вставьте ваши переменные окружения

# Собираем Docker образ
docker-compose build

# Запускаем контейнер
docker-compose up -d

# Проверяем статус
docker-compose ps
docker-compose logs
```

#### 5. Настройка Nginx (опционально)

Если хотите использовать домен:

```bash
# Устанавливаем Nginx
apt install nginx -y

# Создаем конфигурацию
nano /etc/nginx/sites-available/aromaspa
```

Содержимое конфигурации:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Активируем конфигурацию:

```bash
ln -s /etc/nginx/sites-available/aromaspa /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

#### 6. Управление контейнером

```bash
# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Обновление проекта
git pull
docker-compose build --no-cache
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Вход в контейнер
docker-compose exec aromaspa sh
```

---

## 📋 Вариант 2: Деплой без Docker

### Если ваш тариф Timeweb не поддерживает Docker:

#### 1. Установка Node.js

```bash
# Подключаемся к серверу
ssh root@your-server-ip

# Устанавливаем Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Проверяем версию
node -v
npm -v
```

#### 2. Установка PM2 для управления процессом

```bash
npm install -g pm2
```

#### 3. Клонирование проекта

```bash
mkdir -p /var/www/aromaspa
cd /var/www/aromaspa
git clone https://github.com/Drilspb4202/aromaspa.git .

# Создаем .env файл
nano .env
# Вставьте переменные окружения

# Устанавливаем зависимости
npm install
```

#### 4. Сборка и запуск

```bash
# Собираем проект
npm run build

# Запускаем с PM2
pm2 start npm --name "aromaspa" -- start

# Сохраняем конфигурацию PM2
pm2 save
pm2 startup

# Проверяем статус
pm2 status
pm2 logs aromaspa
```

#### 5. Настройка Nginx для Timeweb

В панели управления Timeweb создайте домен и укажите:

```
Порт проксирования: 3000
Префикс пути: /
```

---

## 🔧 Переменные окружения

Не забудьте настроить следующие переменные в файле `.env`:

- `BOT_TOKEN` - токен Telegram бота
- `CHAT_ID` - ID чата для отправки сообщений
- `DEEPSEEK_API_KEY` - API ключ DeepSeek для чат-бота
- `NODE_ENV=production` - режим production

---

## 🔄 Обновление проекта

### Для Docker:
```bash
cd /var/www/aromaspa
git pull
docker-compose build
docker-compose up -d
```

### Для обычного деплоя:
```bash
cd /var/www/aromaspa
git pull
npm install
npm run build
pm2 restart aromaspa
```

---

## 🐛 Отладка

### Проверка логов Docker:
```bash
docker-compose logs -f
```

### Проверка логов PM2:
```bash
pm2 logs aromaspa
```

### Проверка портов:
```bash
netstat -tlnp | grep 3000
```

### Проверка переменных окружения:
```bash
docker-compose exec aromaspa printenv
```

---

## 📞 Поддержка

При возникновении проблем обращайтесь:
- Email: beresakorte@gmail.com
- GitHub: [Drilspb4202](https://github.com/Drilspb4202)
