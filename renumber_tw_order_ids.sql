-- Renumber all existing tw_order IDs to be sequential 1,2,3... and fix sequence
-- This will change existing IDs to be properly ordered

-- Step 1: Show current state
SELECT 'BEFORE RENUMBERING:' as status;
SELECT id, customer_name, created_at FROM tw_order ORDER BY created_at;
SELECT 'Current sequence value:', currval('tw_order_id_seq') as current_seq;

-- Step 2: Create temporary table with new sequential IDs based on created_at order
CREATE TEMP TABLE tw_order_renumbered AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY created_at) as new_id,
    *
FROM tw_order
ORDER BY created_at;

-- Step 3: Show the mapping (old ID -> new ID)
SELECT 'ID MAPPING (old_id -> new_id):' as status;
SELECT id as old_id, new_id, customer_name, created_at 
FROM tw_order_renumbered 
ORDER BY created_at;

-- Step 4: Update the original table with new IDs
-- First, set all IDs to negative values to avoid constraint conflicts
UPDATE tw_order SET id = -id;

-- Then update with new sequential IDs
UPDATE tw_order 
SET id = tr.new_id 
FROM tw_order_renumbered tr 
WHERE tw_order.id = -tr.id;

-- Step 5: Reset the sequence to continue from the highest new ID
SELECT setval(pg_get_serial_sequence('tw_order', 'id'), (SELECT MAX(id) FROM tw_order), true);

-- Step 6: Show final result
SELECT 'AFTER RENUMBERING:' as status;
SELECT id, customer_name, created_at FROM tw_order ORDER BY id;
SELECT 'New sequence value:', currval('tw_order_id_seq') as new_seq;

-- Step 7: Clean up temporary table
DROP TABLE tw_order_renumbered;