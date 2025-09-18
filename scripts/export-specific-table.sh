#!/bin/bash

# Export specific table from Supabase
# Usage: ./export-specific-table.sh table_name

if [ -z "$1" ]; then
    echo "Usage: $0 <table_name>"
    echo "Example: $0 tour_orders"
    exit 1
fi

TABLE_NAME=$1
BACKUP_DIR="./backups"
DATE=$(date +"%Y%m%d_%H%M%S")
DB_URL="postgresql://postgres.dwslyqoogqptkfhgfnbs:Q7m2vL9xT4bW8cR1yP6z@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

mkdir -p $BACKUP_DIR

echo "Exporting table: $TABLE_NAME"

# Export table structure and data
pg_dump "$DB_URL" \
    --no-owner \
    --no-privileges \
    --table=$TABLE_NAME \
    --file="$BACKUP_DIR/${TABLE_NAME}_$DATE.sql"

echo "Export completed: $BACKUP_DIR/${TABLE_NAME}_$DATE.sql"