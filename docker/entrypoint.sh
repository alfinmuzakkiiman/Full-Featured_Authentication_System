#!/bin/bash
set -e

# Port configuration (default 8000 for Koyeb)
PORT="${PORT:-8000}"
sed -i "s/__PORT__/${PORT}/g" /etc/nginx/http.d/default.conf

echo "Starting application on port ${PORT}..."

# Ensure storage directories exist with right permissions
mkdir -p /var/www/html/storage/framework/cache/data
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/logs
mkdir -p /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Run database migrations if DB is configured
if [ -n "$DB_URL" ] || [ -n "$DATABASE_URL" ] || [ -n "$DB_HOST" ]; then
    echo "Running database migrations..."
    php artisan migrate --force --isolated || echo "Database migration skipped or encountered an error"
fi

# Production optimizations if APP_KEY exists
if [ -n "$APP_KEY" ]; then
    echo "Optimizing application configuration, routes, and views..."
    php artisan config:cache || true
    php artisan route:cache || true
    php artisan view:cache || true
fi

exec /usr/bin/supervisord -c /etc/supervisord.conf
