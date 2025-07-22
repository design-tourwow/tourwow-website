-- Simple script to renumber existing tw_order IDs to be 1,2,3...
-- This will fix the messy IDs that are currently in the database

-- Show current messy IDs
SELECT 'Current IDs in database:' as info;
SELECT id, customer_name, created_at FROM tw_order ORDER BY id;

-- Create a backup just in case
CREATE TABLE tw_order_backup_$(date +%Y%m%d) AS SELECT * FROM tw_order;

-- Method 1: Simple renumbering using a temporary column
ALTER TABLE tw_order ADD COLUMN new_id INTEGER;

-- Assign new sequential IDs based on creation order
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as new_sequential_id
  FROM tw_order
)
UPDATE tw_order 
SET new_id = numbered.new_sequential_id
FROM numbered 
WHERE tw_order.id = numbered.id;

-- Show the mapping
SELECT 'ID Mapping (old -> new):' as info;
SELECT id as old_id, new_id, customer_name FROM tw_order ORDER BY new_id;

-- Drop the id column and rename new_id to id
ALTER TABLE tw_order DROP CONSTRAINT tw_order_pkey;
ALTER TABLE tw_order DROP COLUMN id;
ALTER TABLE tw_order RENAME COLUMN new_id TO id;
ALTER TABLE tw_order ADD PRIMARY KEY (id);

-- Reset the sequence
SELECT setval('tw_order_id_seq', (SELECT MAX(id) FROM tw_order));

-- Show final result
SELECT 'Final result - properly numbered IDs:' as info;
SELECT id, customer_name, created_at FROM tw_order ORDER BY id;

-- Show next sequence value
SELECT 'Next ID will be:', nextval('tw_order_id_seq') as next_id;
SELECT setval('tw_order_id_seq', (SELECT MAX(id) FROM tw_order)); -- Reset it back