#!/bin/bash

# Setup AWS RDS with schema from Supabase
# Usage: ./setup-aws-rds.sh

# Configuration - Update these values
RDS_ENDPOINT="your-rds-endpoint.region.rds.amazonaws.com"
RDS_USER="postgres"
RDS_PASSWORD="your-password"
RDS_DATABASE="tourwow"

# Create database
echo "Creating database: $RDS_DATABASE"
psql "postgresql://$RDS_USER:$RDS_PASSWORD@$RDS_ENDPOINT:5432/postgres" -c "CREATE DATABASE $RDS_DATABASE;"

# Use Prisma to create schema
echo "Setting up schema with Prisma..."
export DATABASE_URL="postgresql://$RDS_USER:$RDS_PASSWORD@$RDS_ENDPOINT:5432/$RDS_DATABASE"

# Push schema to AWS RDS
npx prisma db push

echo "✅ AWS RDS setup completed!"
echo "Connection string: postgresql://$RDS_USER:$RDS_PASSWORD@$RDS_ENDPOINT:5432/$RDS_DATABASE"