-- Fix data types for tw_order_edit_history table
ALTER TABLE tw_order_edit_history 
ALTER COLUMN tour_program_id TYPE VARCHAR(255);

-- Also update period_id if it might contain non-integer values
-- ALTER TABLE tw_order_edit_history 
-- ALTER COLUMN period_id TYPE VARCHAR(255);