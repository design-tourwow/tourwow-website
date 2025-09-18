-- Reorder tw_order_edit_history table IDs based on edited_at date (A-Z) - PostgreSQL Version
-- This script will update only the ID column to be sequential based on edited_at timestamp

-- Step 1: Add a temporary column to store new IDs
ALTER TABLE tw_order_edit_history ADD COLUMN temp_new_id INTEGER;

-- Step 2: Update the temporary column with new sequential IDs based on edited_at
WITH ranked_rows AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY edited_at ASC) as new_id
    FROM tw_order_edit_history
)
UPDATE tw_order_edit_history 
SET temp_new_id = ranked_rows.new_id
FROM ranked_rows 
WHERE tw_order_edit_history.id = ranked_rows.id;

-- Step 3: Update the actual ID column
UPDATE tw_order_edit_history SET id = temp_new_id;

-- Step 4: Drop the temporary column
ALTER TABLE tw_order_edit_history DROP COLUMN temp_new_id;

-- Step 5: Reset sequence to the highest ID + 1
SELECT setval('tw_order_edit_history_id_seq', (SELECT MAX(id) FROM tw_order_edit_history));

-- Verify the result
SELECT id, order_id, edited_at, edited_by 
FROM tw_order_edit_history 
ORDER BY id;