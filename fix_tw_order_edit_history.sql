-- Remove is_edited from the expected columns in tw_order_edit_history
-- The table doesn't have is_edited column, only old_* and new_* pairs

-- Alternative: Add is_edited column if needed
-- ALTER TABLE tw_order_edit_history ADD COLUMN is_edited BOOLEAN DEFAULT FALSE;

-- For now, we'll fix the API to not include is_edited
