FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    curl \
    libzip-dev \
    libpng-dev \
    libicu-dev \
    && docker-php-ext-install pdo_mysql zip gd intl opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/

COPY . .

RUN composer install

COPY entrypoint.sh /var/www/entrypoint.sh
RUN chmod +x /var/www/entrypoint.sh

EXPOSE 8000

CMD ["./entrypoint.sh"]
