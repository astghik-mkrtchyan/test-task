FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    unzip \
    sqlite-dev \
    acl

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_sqlite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/symfony

# Copy composer files
COPY composer.json ./

# Install dependencies
RUN composer install --prefer-dist --no-scripts --no-progress --no-interaction || echo "Composer install failed but continuing"

# Copy application files
COPY . .

# Dump autoload
RUN composer dump-autoload --optimize

# Copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

# Expose port (built-in server for simplicity in this task)
EXPOSE 8000

# Start command
ENTRYPOINT ["docker-entrypoint"]
