#!/bin/sh

# พยายาม migrate จนกว่าจะสำเร็จ
until php artisan migrate --force; do
  echo "⏳ Waiting for MySQL to be ready..."
  sleep 5
done

echo "✅ Migrations done."

# รัน db:seed เมื่อ migrate สำเร็จ
php artisan db:seed --force
echo "✅ Seeding done."

# เริ่ม Laravel server
php artisan serve --host=0.0.0.0 --port=8000
