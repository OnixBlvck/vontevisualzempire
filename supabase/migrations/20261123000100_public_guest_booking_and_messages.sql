-- Allow public website intake without requiring a customer account.
-- Guest submissions are created only by the server-side service-role handler;
-- the service-role key is never sent to the browser.
ALTER TABLE public.booking_requests
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.booking_requests
  DROP CONSTRAINT IF EXISTS booking_requests_business_check;

ALTER TABLE public.booking_requests
  ADD CONSTRAINT booking_requests_business_check
  CHECK (business IN ('inknior', 'onyxblvck', 'fastcutedits', 'message'));

COMMENT ON COLUMN public.booking_requests.user_id IS
  'Null for guest website submissions; populated for legacy signed-in requests.';
