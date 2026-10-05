ALTER TABLE orders ADD COLUMN loyalty_awarded INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_loyalty_events_reference
  ON loyalty_events(user_id, reference_id, reason);
