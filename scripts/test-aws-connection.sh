#!/bin/bash

# Test AWS RDS Connection
# Usage: ./test-aws-connection.sh

# Replace with your RDS endpoint
RDS_ENDPOINT="your-rds-endpoint.region.rds.amazonaws.com"
RDS_USER="postgres"
RDS_PASSWORD="your-password"
RDS_DATABASE="postgres"

echo "Testing connection to AWS RDS..."

# Test connection
psql "postgresql://$RDS_USER:$RDS_PASSWORD@$RDS_ENDPOINT:5432/$RDS_DATABASE" -c "SELECT version();"

if [ $? -eq 0 ]; then
    echo "✅ Connection successful!"
    
    # Test creating a table
    echo "Testing table creation..."
    psql "postgresql://$RDS_USER:$RDS_PASSWORD@$RDS_ENDPOINT:5432/$RDS_DATABASE" -c "
        CREATE TABLE IF NOT EXISTS test_table (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100)
        );
        INSERT INTO test_table (name) VALUES ('Test Connection');
        SELECT * FROM test_table;
        DROP TABLE test_table;
    "
else
    echo "❌ Connection failed!"
    echo "Check:"
    echo "1. RDS endpoint is correct"
    echo "2. Security Group allows port 5432"
    echo "3. Username/password are correct"
fi