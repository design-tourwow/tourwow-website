-- Fix the UUID order and ensure future orders are sequential integers
-- This will handle the order with UUID and fix the table structure

-- Step 1: Show current problematic state
SELECT 'CURRENT STATE WITH UUID PROBLEM:' as status;
SELECT id, customer_name, created_at FROM tw_order ORDER BY created_at;
SELECT pg_typeof(id) as id_column_type FROM tw_order LIMIT 1;

-- Step 2: Update the UUID order to be the next sequential number
UPDATE tw_order 
SET id = (
  CASE 
    WHEN id = '4dee31f0-db37-437c-93b7-48d89acd1938' THEN 
      (SELECT CAST(MAX(CAST(id AS INTEGER)) + 1 AS TEXT) 
       FROM tw_order 
       WHERE id ~ '^[0-9]+$')  -- Only numeric IDs
    ELSE id 
  END
)
WHERE id = '4dee31f0-db37-437c-93b7-48d89acd1938';

-- Step 3: Show the fix
SELECT 'AFTER FIXING UUID ORDER:' as status;
SELECT id, customer_name, created_at FROM tw_order ORDER BY 
  CASE 
    WHEN id ~ '^[0-9]+$' THEN CAST(id AS INTEGER)
    ELSE 999999 
  END;

-- Step 4: If needed, convert the entire table to proper INTEGER type
-- First backup
CREATE TABLE tw_order_backup_uuid AS SELECT * FROM tw_order;

-- Create new table with proper INTEGER id
CREATE TABLE tw_order_fixed AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY created_at) as id,
    period_id,
    tour_program_id,
    tour_name,
    departure_date,
    return_date,
    price_per_person,
    traveler_count,
    total_amount,
    deposit_amount,
    customer_name,
    customer_phone,
    customer_email,
    address,
    sub_district,
    district,
    province,
    postal_code,
    status,
    created_at,
    updated_at,
    base_price,
    extra_rooms,
    selected_package
FROM tw_order
ORDER BY created_at;

-- Step 5: Replace table and set up proper sequence
DROP TABLE tw_order;
ALTER TABLE tw_order_fixed RENAME TO tw_order;

-- Add proper primary key and sequence
ALTER TABLE tw_order ADD PRIMARY KEY (id);

-- Create sequence properly
DROP SEQUENCE IF EXISTS tw_order_id_seq CASCADE;
CREATE SEQUENCE tw_order_id_seq;
ALTER TABLE tw_order ALTER COLUMN id SET DEFAULT nextval('tw_order_id_seq');
ALTER SEQUENCE tw_order_id_seq OWNED BY tw_order.id;

-- Set sequence to continue from max id
SELECT setval('tw_order_id_seq', (SELECT MAX(id) FROM tw_order));

-- Step 6: Final verification
SELECT 'FINAL RESULT - ALL FIXED:' as status;
SELECT id, customer_name, created_at FROM tw_order ORDER BY id;
SELECT 'Column type:', pg_typeof(id) as id_type FROM tw_order LIMIT 1;
SELECT 'Current sequence:', currval('tw_order_id_seq') as current_seq;
SELECT 'Next ID will be:', nextval('tw_order_id_seq') as next_id;

-- Reset sequence to correct position
SELECT setval('tw_order_id_seq', (SELECT MAX(id) FROM tw_order));

SELECT 'SUCCESS! UUID order fixed and sequence ready for integer IDs.' as result;