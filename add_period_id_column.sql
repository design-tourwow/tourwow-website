-- Move period_id column to second position (after id) in tw_order table
-- PostgreSQL doesn't support moving columns, so we need to recreate the table

-- Step 1: Create backup table
CREATE TABLE tw_order_backup AS SELECT * FROM tw_order;

-- Step 2: Drop original table
DROP TABLE tw_order;

-- Step 3: Create new table with period_id and address columns
CREATE TABLE tw_order (
    id SERIAL PRIMARY KEY,
    period_id INTEGER NOT NULL DEFAULT 0,
    tour_program_id VARCHAR(255),
    tour_name VARCHAR(255),
    departure_date TIMESTAMP,
    return_date TIMESTAMP,
    price_per_person DECIMAL,
    traveler_count INTEGER,
    total_amount DECIMAL,
    deposit_amount DECIMAL,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(255),
    customer_email VARCHAR(255),
    address TEXT,
    sub_district VARCHAR(255),
    district VARCHAR(255),
    province VARCHAR(255),
    postal_code VARCHAR(10),
    status VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    base_price DECIMAL,
    extra_rooms INTEGER,
    selected_package VARCHAR(255)
);

-- Step 4: Migrate data back with period_id = 0 and empty address fields for existing records
INSERT INTO tw_order (
    id, period_id, tour_program_id, tour_name, departure_date, return_date,
    price_per_person, traveler_count, total_amount, deposit_amount,
    customer_name, customer_phone, customer_email, address, sub_district,
    district, province, postal_code, status, created_at, updated_at, 
    base_price, extra_rooms, selected_package
)
SELECT 
    id, 0, tour_program_id, tour_name, departure_date, return_date,
    price_per_person, traveler_count, total_amount, deposit_amount,
    customer_name, customer_phone, customer_email, '', '',
    '', '', '', status, created_at, updated_at,
    base_price, extra_rooms, selected_package
FROM tw_order_backup;

-- Step 5: Reset sequence to continue from last id
SELECT setval('tw_order_id_seq', (SELECT MAX(id) FROM tw_order));

-- Step 6: Drop backup table (optional - keep if you want backup)
-- DROP TABLE tw_order_backup;

-- Add comments
COMMENT ON COLUMN tw_order.period_id IS 'Reference to period_id from ProductPool table';
COMMENT ON COLUMN tw_order.address IS 'Full address of the customer';
COMMENT ON COLUMN tw_order.sub_district IS 'Sub-district (tambon/khwaeng) name';
COMMENT ON COLUMN tw_order.district IS 'District (amphoe/khet) name';
COMMENT ON COLUMN tw_order.province IS 'Province name';
COMMENT ON COLUMN tw_order.postal_code IS 'Postal/ZIP code';