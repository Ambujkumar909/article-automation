# ================================
# Laravel Production Dockerfile
# ================================

FROM php:8.2-apache

# 1️⃣ System dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libzip-dev \
    zip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    zip \
    gd \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# 2️⃣ Set working directory
WORKDIR /var/www/html

# 3️⃣ Copy ENTIRE Laravel project FIRST (so artisan exists)
COPY . .

# 4️⃣ Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 5️⃣ Install dependencies (NO DEV)
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# 6️⃣ Fix permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# 7️⃣ Apache → public folder
RUN sed -i 's|/var/www/html|/var/www/html/public|g' \
    /etc/apache2/sites-available/000-default.conf

# 8️⃣ Expose port
EXPOSE 80

# 9️⃣ Start Apache
CMD ["apache2-foreground"]
