# ================================
# Laravel Production Dockerfile
# ================================

FROM php:8.2-apache

# 1️⃣ Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    zip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libzip-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 2️⃣ Configure & install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    pgsql \
    mbstring \
    zip \
    gd

# 3️⃣ Enable Apache rewrite
RUN a2enmod rewrite

# 4️⃣ Set working directory
WORKDIR /var/www/html

# 5️⃣ Copy Laravel project
COPY . .

# 6️⃣ Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 7️⃣ Install PHP dependencies (production)
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# 8️⃣ Fix permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# 9️⃣ Point Apache to public directory
RUN sed -i 's|/var/www/html|/var/www/html/public|g' \
    /etc/apache2/sites-available/000-default.conf

# 🔟 Expose port
EXPOSE 80

# ▶️ Start Apache
CMD ["apache2-foreground"]
