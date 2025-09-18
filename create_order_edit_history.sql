-- Create order edit history table to track what was changed
CREATE TABLE IF NOT EXISTS tw_order_edit_history (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES tw_order(id) ON DELETE CASCADE,
  field_name VARCHAR(100) NOT NULL,
  old_value TEXT,
  new_value TEXT,
  edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  edited_by VARCHAR(50) DEFAULT 'system',
  
  INDEX idx_order_id (order_id),
  INDEX idx_edited_at (edited_at)
);

-- Add comment for documentation
COMMENT ON TABLE tw_order_edit_history IS 'Track all changes made to booking orders';
COMMENT ON COLUMN tw_order_edit_history.field_name IS 'Name of the field that was changed (e.g., customer_name, customer_phone)';
COMMENT ON COLUMN tw_order_edit_history.old_value IS 'Previous value before edit';
COMMENT ON COLUMN tw_order_edit_history.new_value IS 'New value after edit';