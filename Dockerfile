# ==========================================
# Stage 1: Build Frontend Assets (Vite)
# ==========================================
FROM node:22-bookworm-slim AS frontend_builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==========================================
# Stage 2: Install Composer Dependencies
# ==========================================
FROM composer:2 AS vendor_builder
WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --ignore-platform-reqs

COPY . .
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative --ignore-platform-reqs

# ==========================================
# Stage 3: Production Runtime (PHP 8.4 + Nginx)
# ==========================================
FROM php:8.4-fpm-alpine

# Install system dependencies, Nginx, and Supervisor
RUN apk add --no-cache \
    nginx \
    supervisor \
    bash \
    curl \
    postgresql-client

# Install PHP extensions
ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_pgsql pdo_mysql bcmath gd intl zip pcntl opcache

# Copy custom configs
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .
COPY --from=vendor_builder /app/vendor /var/www/html/vendor
COPY --from=frontend_builder /app/public/build /var/www/html/public/build

# Ensure permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
