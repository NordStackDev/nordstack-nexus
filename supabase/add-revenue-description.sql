-- Add description column to revenues table
ALTER TABLE revenues ADD COLUMN IF NOT EXISTS description TEXT;
