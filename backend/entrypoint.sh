#!/bin/sh

until php artisan migrate --force; do
  echo "⏳ Waiting for MySQL to be ready..."
  sleep 10
done

php artisan serve --host=0.0.0.0 --port=8000
