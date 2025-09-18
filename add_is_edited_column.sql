-- Add is_edited column to tw_order table
ALTER TABLE tw_order 
ADD COLUMN is_edited BOOLEAN DEFAULT FALSE;

-- Update existing orders to set is_edited = false
UPDATE tw_order SET is_edited = FALSE WHERE is_edited IS NULL;