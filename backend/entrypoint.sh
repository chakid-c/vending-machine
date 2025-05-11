

#!/bin/bash

until php artisan migrate --force; do
    echo "Waiting for database..."
    sleep 3
done

php artisan serve --host=0.0.0.0 --port=8000
