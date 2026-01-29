#!/bin/sh
set -e

echo "Starting backend setup..."

# Install dependencies if vendor is missing or empty
echo "Installing Composer dependencies..."
composer install --prefer-dist --no-progress --no-interaction --no-scripts


# Ensure var directory exists and is writable
mkdir -p var
chmod -R 777 var

# Update database schema
echo "Updating database schema..."
php bin/console doctrine:schema:update --force --complete

echo "Starting PHP built-in server..."
exec php -S 0.0.0.0:8000 -t public
