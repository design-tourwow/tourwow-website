#!/bin/bash

# Supabase Database Backup Script
# Usage: ./backup-supabase.sh

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Configuration
BACKUP_DIR="./backups"
DATE=$(date +"%Y%m%d_%H%M%S")
DB_URL="postgresql://postgres.dwslyqoogqptkfhgfnbs:Q7m2vL9xT4bW8cR1yP6z@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Create backup directory
mkdir -p $BACKUP_DIR

echo "Starting Supabase database backup..."

# 1. Export schema only
echo "Exporting schema..."
pg_dump "$DB_URL" \
    --schema-only \
    --no-owner \
    --no-privileges \
    --file="$BACKUP_DIR/schema_$DATE.sql"

# 2. Export data only (without system tables)
echo "Exporting data..."
pg_dump "$DB_URL" \
    --data-only \
    --no-owner \
    --no-privileges \
    --exclude-table-data='auth.*' \
    --exclude-table-data='storage.*' \
    --exclude-table-data='supabase_functions.*' \
    --exclude-table-data='extensions.*' \
    --exclude-table-data='graphql_public.*' \
    --exclude-table-data='pgbouncer.*' \
    --exclude-table-data='pgsodium.*' \
    --exclude-table-data='realtime.*' \
    --exclude-table-data='vault.*' \
    --file="$BACKUP_DIR/data_$DATE.sql"

# 3. Export complete database (schema + data)
echo "Exporting complete database..."
pg_dump "$DB_URL" \
    --no-owner \
    --no-privileges \
    --exclude-table-data='auth.*' \
    --exclude-table-data='storage.*' \
    --exclude-table-data='supabase_functions.*' \
    --exclude-table-data='extensions.*' \
    --exclude-table-data='graphql_public.*' \
    --exclude-table-data='pgbouncer.*' \
    --exclude-table-data='pgsodium.*' \
    --exclude-table-data='realtime.*' \
    --exclude-table-data='vault.*' \
    --file="$BACKUP_DIR/full_backup_$DATE.sql"

# 4. Export specific tables only (your app tables)
echo "Exporting app tables only..."
pg_dump "$DB_URL" \
    --no-owner \
    --no-privileges \
    --table=product_pools \
    --table=agcy_blogs \
    --table=agcy_seo_articles \
    --table=tw_pages \
    --table=tw_page_types \
    --table=agcy_seo_article_types \
    --table=agcy_blog_descriptions \
    --table=tour_orders \
    --table=order_travelers \
    --table=order_payments \
    --table=order_documents \
    --table=order_notes \
    --table=tw_order \
    --table=users \
    --file="$BACKUP_DIR/app_tables_$DATE.sql"

# 5. Create compressed archive
echo "Creating compressed archive..."
tar -czf "$BACKUP_DIR/supabase_backup_$DATE.tar.gz" -C "$BACKUP_DIR" \
    "schema_$DATE.sql" \
    "data_$DATE.sql" \
    "full_backup_$DATE.sql" \
    "app_tables_$DATE.sql"

# Cleanup individual files (keep only the compressed archive)
rm "$BACKUP_DIR/schema_$DATE.sql"
rm "$BACKUP_DIR/data_$DATE.sql" 
rm "$BACKUP_DIR/full_backup_$DATE.sql"
rm "$BACKUP_DIR/app_tables_$DATE.sql"

echo "Backup completed successfully!"
echo "Backup file: $BACKUP_DIR/supabase_backup_$DATE.tar.gz"

# Optional: Upload to AWS S3 or other cloud storage
# aws s3 cp "$BACKUP_DIR/supabase_backup_$DATE.tar.gz" s3://your-backup-bucket/

# Optional: Keep only last 7 days of backups
find $BACKUP_DIR -name "supabase_backup_*.tar.gz" -mtime +7 -delete