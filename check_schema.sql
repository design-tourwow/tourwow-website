-- Check actual schema of tw_order_edit_history
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tw_order_edit_history' 
ORDER BY ordinal_position;
