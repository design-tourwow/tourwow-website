-- Reset tw_order table IDs to start from 1, 2, 3 sequentially
-- This will affect existing orders as well

-- Step 1: Create temporary sequence column
ALTER TABLE tw_order ADD COLUMN temp_new_id SERIAL;

-- Step 2: Update IDs based on creation order (or any order you prefer)
-- This orders by created_at, but you can change the ORDER BY clause
UPDATE tw_order 
SET id = temp_new_id;

-- Step 3: Drop the temporary column
ALTER TABLE tw_order DROP COLUMN temp_new_id;

-- Step 4: Reset the sequence to continue from the highest ID
SELECT setval('tw_order_id_seq', (SELECT MAX(id) FROM tw_order));

-- Verify the result
SELECT id, customer_name, created_at FROM tw_order ORDER BY id;