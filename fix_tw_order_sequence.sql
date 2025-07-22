-- Fix tw_order sequence to continue properly from the highest existing ID
-- This will ensure new inserts continue from the correct sequence number

-- First, check current sequence value
SELECT currval('tw_order_id_seq') as current_sequence_value;

-- Check the highest ID in the table
SELECT MAX(id) as highest_id FROM tw_order;

-- Reset sequence to the correct value (highest ID + 1)
-- Using pg_get_serial_sequence to get the correct sequence name
SELECT setval(pg_get_serial_sequence('tw_order', 'id'), COALESCE((SELECT MAX(id) FROM tw_order), 1), true);

-- Verify the fix
SELECT currval('tw_order_id_seq') as new_sequence_value;

-- Test with a dummy insert (optional - remove if you don't want test data)
-- INSERT INTO tw_order (period_id, tour_program_id, tour_name, departure_date, return_date, price_per_person, traveler_count, total_amount, deposit_amount, customer_name, customer_phone, customer_email, address, sub_district, district, province, postal_code, status, base_price, extra_rooms, selected_package, created_at, updated_at) 
-- VALUES (0, 'TEST', 'Test Tour', NOW(), NOW() + INTERVAL '3 days', 1000, 1, 1000, 300, 'Test Customer', '0123456789', 'test@example.com', 'Test Address', 'Test Sub District', 'Test District', 'Test Province', '12345', 'pending', 1000, 0, 'standard', NOW(), NOW())
-- RETURNING id;

-- Show final verification
SELECT id, customer_name, created_at FROM tw_order ORDER BY id;