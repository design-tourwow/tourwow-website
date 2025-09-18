-- Drop existing table and recreate with proper schema
DROP TABLE IF EXISTS tw_order_edit_history CASCADE;

-- Create order edit history table - Copy tw_order structure + old/new pairs
CREATE TABLE tw_order_edit_history (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES tw_order(id) ON DELETE CASCADE,
  
  -- Copy all fields from tw_order structure
  period_id INTEGER,
  tour_program_id VARCHAR(255),
  tour_name TEXT,
  departure_date DATE,
  return_date DATE,
  price_per_person DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  deposit_amount DECIMAL(10,2),
  status VARCHAR(50),
  base_price DECIMAL(10,2),
  extra_rooms INTEGER,
  selected_package VARCHAR(100),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  
  -- Add old/new pairs for editable fields
  old_customer_name VARCHAR(255),
  new_customer_name VARCHAR(255),
  
  old_customer_phone VARCHAR(20),
  new_customer_phone VARCHAR(20),
  
  old_customer_email VARCHAR(255),
  new_customer_email VARCHAR(255),
  
  old_traveler_count INTEGER,
  new_traveler_count INTEGER,
  
  old_address TEXT,
  new_address TEXT,
  
  old_sub_district VARCHAR(100),
  new_sub_district VARCHAR(100),
  
  old_district VARCHAR(100),
  new_district VARCHAR(100),
  
  old_province VARCHAR(100),
  new_province VARCHAR(100),
  
  old_postal_code VARCHAR(10),
  new_postal_code VARCHAR(10),
  
  edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_order_edit_history_order_id ON tw_order_edit_history(order_id);
CREATE INDEX idx_order_edit_history_edited_at ON tw_order_edit_history(edited_at);

-- Add table comment
COMMENT ON TABLE tw_order_edit_history IS 'Track order changes with old/new value pairs. NULL in new_* columns means no change for that field.';

-- Verify table was created
SELECT 'Table tw_order_edit_history created successfully' AS status;