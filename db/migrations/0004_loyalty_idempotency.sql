CREATE UNIQUE INDEX IF NOT EXISTS uq_loyalty_events_reference_reason
  ON loyalty_events(user_id, reference_id, reason)
  WHERE reference_id IS NOT NULL;
