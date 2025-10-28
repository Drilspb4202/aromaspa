# Деплой проекта на TimeWeb

## Вариант 1: Развертывание с Docker (Рекомендуется)

### Шаг 1: Подготовка

1. Убедитесь, что у вас установлен Docker:
```bash
docker --version
docker-compose --version
```

### Шаг 2: Сборка образа

```bash
# Соберите Docker образ
docker build -t aromaspa .

# Или используйте docker-compose
docker-compose build
```

### Шаг 3: Запуск контейнера

```bash
# Запустите контейнер
docker-compose up -d

# Или используйте Docker напрямую
docker run -d -p 3000:3000 --name aromaspa aromaspa
```

### Шаг 4: Проверка

Откройте браузер и перейдите по адресу: `http://localhost:3000`

## Вариант 2: Развертывание на TimeWeb

### Способ 1: Через Docker на TimeWeb

1. Загрузите проект на TimeWeb (через Git или FTP)
2. Подключитесь к серверу через SSH
3. Выполните команды:

```bash
# Перейдите в директорию проекта
cd /path/to/your/project

# Соберите образ
docker build -t aromaspa .

# Запустите контейнер
docker run -d -p 3000:3000 --name aromaspa --restart unless-stopped aromaspa
```

### Способ 2: Без Docker (если TimeWeb поддерживает Node.js напрямую)

1. **Загрузите проект на сервер TimeWeb**

2. **Подключитесь через SSH**

3. **Установите зависимости:**
```bash
cd /path/to/your/project
npm install --production
# или если используете pnpm
corepack enable
pnpm install --production
```

4. **Соберите проект:**
```bash
npm run build
```

5. **Запустите приложение:**
```bash
npm start
```

6. **Используйте PM2 для управления процессом:**
```bash
# Установите PM2 глобально
npm install -g pm2

# Запустите приложение с PM2
pm2 start npm --name "aromaspa" -- start

# Сохраните конфигурацию PM2
pm2 save

# Настройте автозапуск
pm2 startup
```

## Настройка домена на TimeWeb

1. Войдите в панель управления TimeWeb
2. Перейдите в раздел "Домены"
3. Добавьте ваш домен или поддомен
4. Настройте DNS записи:
   - A запись: `@` → IP вашего сервера
   - A запись: `www` → IP вашего сервера

## Настройка Nginx (опционально)

Создайте файл конфигурации Nginx `/etc/nginx/sites-available/aromaspa`:

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
    }
}
```

Создайте символическую ссылку:
```bash
sudo ln -s /etc/nginx/sites-available/aromaspa /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Переменные окружения

Если вам нужно использовать переменные окружения:

1. Создайте файл `.env.production` в корне проекта:
```env
NODE_ENV=production
# Добавьте свои переменные здесь
```

2. При использовании Docker, передайте переменные:
```bash
docker run -d -p 3000:3000 --env-file .env.production --name aromaspa aromaspa
```

## Мониторинг и логи

```bash
# Просмотр логов Docker
docker logs aromaspa

# Просмотр логов в реальном времени
docker logs -f aromaspa

# Просмотр логов PM2
pm2 logs aromaspa

# Просмотр статуса
pm2 status
```

## Обновление приложения

```bash
# Остановите старый контейнер
docker stop aromaspa
docker rm aromaspa

# Или если используете PM2
pm2 stop aromaspa

# Получите последние изменения
git pull

# Соберите новый образ
docker build -t aromaspa .

# Запустите новый контейнер
docker run -d -p 3000:3000 --name aromaspa --restart unless-stopped aromaspa

# Или если используете PM2
pm2 restart aromaspa
```

## Полезные команды

```bash
# Остановить контейнер
docker stop aromaspa

# Запустить контейнер
docker start aromaspa

# Перезапустить контейнер
docker restart aromaspa

# Удалить контейнер
docker rm aromaspa

# Просмотр запущенных контейнеров
docker ps

# Просмотр всех контейнеров
docker ps -a

# Войти в контейнер
docker exec -it aromaspa sh
```

## Поддержка

Если возникли проблемы:
- Email: beresakorte@gmail.com
- GitHub: https://github.com/Drilspb4202

