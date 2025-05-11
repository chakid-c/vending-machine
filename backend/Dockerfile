FROM php:8.2-fpm

# ติดตั้ง dependencies ที่จำเป็น
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    curl \
    libzip-dev \
    libpng-dev \
    libicu-dev \
    && docker-php-ext-install pdo_mysql zip gd intl opcache

# คัดลอก composer จาก composer image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/

COPY . .

RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# คัดลอก entrypoint.sh และตั้งสิทธิ์ให้สามารถรันได้
COPY entrypoint.sh /var/www/entrypoint.sh
RUN chmod +x /var/www/entrypoint.sh

# เปิด port 8000
EXPOSE 8000

# ใช้ entrypoint.sh เป็น entrypoint
CMD ["./entrypoint.sh"]
