# ================================
# Laravel Production Dockerfile
# ================================

# 1️⃣ Base image
FROM php:8.2-apache

# 2️⃣ Install system dependencies
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

# 3️⃣ Set working directory
WORKDIR /var/www/html

# 4️⃣ Copy composer files first (better caching)
COPY composer.json composer.lock ./

# 5️⃣ Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 6️⃣ Install PHP dependencies (NO DEV)
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# 7️⃣ Copy rest of Laravel app
COPY . .

# 8️⃣ Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# 9️⃣ Apache config → point to /public
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# 🔟 Expose Render port
EXPOSE 80

# 1️⃣1️⃣ Start Apache
CMD ["apache2-foreground"]
