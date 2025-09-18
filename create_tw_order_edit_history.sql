CREATE TABLE tw_order_edit_history (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    
    -- Clone all columns from tw_order
    tour_program_id INTEGER,
    tour_name VARCHAR(255),
    departure_date DATE,
    return_date DATE,
    price_per_person DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    deposit_amount DECIMAL(10,2),
    status VARCHAR(50),
    period_id INTEGER,
    base_price DECIMAL(10,2),
    extra_rooms INTEGER,
    selected_package VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    traveler_count INTEGER,
    
    -- OLD values (ค่าเดิมก่อนแก้ไข)
    old_customer_name VARCHAR(255),
    old_customer_phone VARCHAR(20),
    old_customer_email VARCHAR(255),
    old_address TEXT,
    old_sub_district VARCHAR(100),
    old_district VARCHAR(100),
    old_province VARCHAR(100),
    old_postal_code VARCHAR(10),
    old_traveler_count INTEGER,
    
    -- NEW values (ค่าใหม่หลังแก้ไข)
    new_customer_name VARCHAR(255),
    new_customer_phone VARCHAR(20),
    new_customer_email VARCHAR(255),
    new_address TEXT,
    new_sub_district VARCHAR(100),
    new_district VARCHAR(100),
    new_province VARCHAR(100),
    new_postal_code VARCHAR(10),
    new_traveler_count INTEGER,
    
    -- Tracking timestamp
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_tw_order_edit_history_order_id 
        FOREIGN KEY (order_id) REFERENCES tw_order(id) ON DELETE CASCADE
);

-- Create index for better performance
CREATE INDEX idx_tw_order_edit_history_order_id ON tw_order_edit_history(order_id);
CREATE INDEX idx_tw_order_edit_history_edited_at ON tw_order_edit_history(edited_at);