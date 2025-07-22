-- Complete reset of tw_order table to have sequential IDs 1,2,3...
-- This is the simplest and most reliable approach

-- Step 1: Show current state
SELECT 'CURRENT STATE:' as status;
SELECT COUNT(*) as total_orders FROM tw_order;
SELECT id, customer_name, created_at FROM tw_order ORDER BY created_at;

-- Step 2: Create a completely new table with proper sequential IDs
CREATE TABLE tw_order_new AS
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

-- Step 3: Show the new table
SELECT 'NEW TABLE WITH SEQUENTIAL IDs:' as status;
SELECT id, customer_name, created_at FROM tw_order_new ORDER BY id;

-- Step 4: Replace the old table
DROP TABLE tw_order;
ALTER TABLE tw_order_new RENAME TO tw_order;

-- Step 5: Add primary key and recreate sequence
ALTER TABLE tw_order ADD PRIMARY KEY (id);

-- Step 6: Create new sequence starting from next available number
DROP SEQUENCE IF EXISTS tw_order_id_seq CASCADE;
CREATE SEQUENCE tw_order_id_seq START WITH 1 OWNED BY tw_order.id;
ALTER TABLE tw_order ALTER COLUMN id SET DEFAULT nextval('tw_order_id_seq');

-- Set sequence to continue from highest ID
SELECT setval('tw_order_id_seq', (SELECT MAX(id) FROM tw_order));

-- Step 7: Verify everything is correct
SELECT 'FINAL VERIFICATION:' as status;
SELECT id, customer_name, created_at FROM tw_order ORDER BY id;
SELECT 'Sequence current value:', currval('tw_order_id_seq') as current_value;
SELECT 'Next sequence value will be:', nextval('tw_order_id_seq') as next_value;

-- Reset sequence back to correct position
SELECT setval('tw_order_id_seq', (SELECT MAX(id) FROM tw_order));

SELECT 'SUCCESS! All IDs are now sequential 1,2,3... and new orders will continue properly.' as result;