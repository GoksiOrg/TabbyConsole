#!/bin/sh

set -e

mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/app/images

composer install

php artisan config:clear
php artisan view:clear


php artisan migrate


php artisan storage:link

exec "$@"
