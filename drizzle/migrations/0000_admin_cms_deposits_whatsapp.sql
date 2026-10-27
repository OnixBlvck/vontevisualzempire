-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- The owner's verified account becomes admin
CREATE OR REPLACE FUNCTION public.assign_owner_admin()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) = 'vontevisualz@gmail.com' AND NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_assign_owner_admin
  AFTER INSERT OR UPDATE OF email, email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_owner_admin();

INSERT INTO public.user_roles (user_id, role)
  SELECT id, 'admin'::public.app_role FROM auth.users
  WHERE lower(email) = 'vontevisualz@gmail.com' AND email_confirmed_at IS NOT NULL
  ON CONFLICT DO NOTHING;

-- Booking requests: allow direct messages, add service/time/deposit fields, lock status fields
ALTER TABLE public.booking_requests DROP CONSTRAINT IF EXISTS booking_requests_business_check;
ALTER TABLE public.booking_requests ADD CONSTRAINT booking_requests_business_check
  CHECK (business IN ('inknior', 'onyxblvck', 'fastcutedits', 'message'));
ALTER TABLE public.booking_requests
  ADD COLUMN service TEXT,
  ADD COLUMN preferred_time TEXT,
  ADD COLUMN deposit_status TEXT NOT NULL DEFAULT 'not_required'
    CHECK (deposit_status IN ('not_required', 'awaiting_payment', 'paid', 'refunded', 'failed')),
  ADD COLUMN deposit_amount_cents INTEGER,
  ADD COLUMN square_order_id TEXT,
  ADD COLUMN square_payment_link_id TEXT,
  ADD COLUMN square_checkout_url TEXT,
  ADD COLUMN deposit_paid_at TIMESTAMPTZ;
CREATE UNIQUE INDEX booking_requests_square_order_id_idx ON public.booking_requests (square_order_id) WHERE square_order_id IS NOT NULL;

DROP POLICY IF EXISTS "Users manage their own booking requests" ON public.booking_requests;
CREATE POLICY "Users read their own booking requests" ON public.booking_requests
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users create their own booking requests" ON public.booking_requests
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid() AND status = 'new'
    AND deposit_status IN ('not_required', 'awaiting_payment')
    AND deposit_paid_at IS NULL AND square_order_id IS NULL
  );
CREATE POLICY "Admins read all booking requests" ON public.booking_requests
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update booking requests" ON public.booking_requests
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Services and prices
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business TEXT NOT NULL CHECK (business IN ('inknior', 'onyxblvck', 'fastcutedits')),
  name TEXT NOT NULL,
  price_label TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (business, name)
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads active services" ON public.services
  FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "Admins manage services" ON public.services
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.services (business, name, price_label, sort_order) VALUES
  ('inknior', 'Names & Lettering', '$40+', 1),
  ('inknior', 'Blackwork', '$60/hr', 2),
  ('inknior', 'Realism', '$60/hr', 3),
  ('onyxblvck', 'Hook Only', '$50', 1),
  ('onyxblvck', 'Verse Only', '$50', 2),
  ('onyxblvck', 'Full Songwriting', '$100', 3),
  ('onyxblvck', 'Recording', '$40/hr', 4),
  ('onyxblvck', 'Features', '$100', 5),
  ('onyxblvck', 'Beats', '$30', 6),
  ('onyxblvck', 'Mixing/Mastering', '$80–$100', 7),
  ('fastcutedits', 'Flyers', '$30+', 1),
  ('fastcutedits', 'Graphic Edits', '$60+', 2),
  ('fastcutedits', 'Cover Art', '$80+', 3),
  ('fastcutedits', 'Branding Package', '$159+', 4),
  ('fastcutedits', 'Web Design', '$299+', 5);

-- Site settings (contact, socials, deposit, announcement, SEO)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads site settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage site settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (key, value) VALUES
  ('contact_phone', '(832) 599-7747'),
  ('contact_email', 'VONTEVISUALZ@GMAIL.COM'),
  ('website_url', 'https://vontevisualz.com'),
  ('instagram_onyxblvck', 'https://www.instagram.com/iamonixblvck/'),
  ('instagram_fastcutedits', 'https://www.instagram.com/fast.cuteditz/'),
  ('instagram_inknior', 'https://www.instagram.com/inknior/'),
  ('inknior_deposit_cents', '3000'),
  ('announcement', ''),
  ('seo_home_title', 'VonteVisualz | Tattoos, Music & Design Creative Empire'),
  ('seo_home_description', 'VonteVisualz is the creative empire behind InkNior tattoo artistry, Onyx Blvck music, and FastCutEdits design. Book your session in Houston, Texas.');

-- Make It Make Sense content
CREATE TABLE public.mims_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind TEXT NOT NULL CHECK (kind IN ('overview', 'episode', 'character', 'story', 'visual', 'trailer', 'milestone', 'update')),
  title TEXT NOT NULL,
  summary TEXT,
  body TEXT,
  status TEXT,
  image_path TEXT,
  video_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.mims_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mims_items TO authenticated;
GRANT ALL ON public.mims_items TO service_role;
ALTER TABLE public.mims_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published series items" ON public.mims_items
  FOR SELECT TO anon, authenticated USING (is_public);
CREATE POLICY "Admins manage series items" ON public.mims_items
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_mims_items_updated_at BEFORE UPDATE ON public.mims_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Asset library
CREATE TABLE public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  bucket TEXT NOT NULL CHECK (bucket IN ('site-assets', 'private-assets')),
  path TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (bucket, path)
);
GRANT SELECT ON public.assets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assets TO authenticated;
GRANT ALL ON public.assets TO service_role;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads public asset records" ON public.assets
  FOR SELECT TO anon, authenticated USING (bucket = 'site-assets');
CREATE POLICY "Admins manage assets" ON public.assets
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage permissions (buckets are created separately)
CREATE POLICY "Admins upload site assets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update site assets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete site assets" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read private assets" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'private-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins upload private assets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'private-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update private assets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'private-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete private assets" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'private-assets' AND public.has_role(auth.uid(), 'admin'));

-- WhatsApp: verified webhook inbox and outbound alert log
CREATE TABLE public.whatsapp_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id TEXT NOT NULL UNIQUE,
  event TEXT NOT NULL,
  payload JSONB NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  processing_error TEXT,
  attempts INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX whatsapp_webhook_events_pending_idx ON public.whatsapp_webhook_events (received_at) WHERE processed_at IS NULL;
GRANT SELECT ON public.whatsapp_webhook_events TO authenticated;
GRANT ALL ON public.whatsapp_webhook_events TO service_role;
ALTER TABLE public.whatsapp_webhook_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read WhatsApp events" ON public.whatsapp_webhook_events
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_request_id UUID REFERENCES public.booking_requests(id) ON DELETE SET NULL,
  to_number TEXT NOT NULL,
  template_name TEXT,
  provider_message_id TEXT UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('accepted', 'sent', 'delivered', 'read', 'failed')),
  error TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.whatsapp_messages TO authenticated;
GRANT ALL ON public.whatsapp_messages TO service_role;
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read WhatsApp messages" ON public.whatsapp_messages
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_whatsapp_messages_updated_at BEFORE UPDATE ON public.whatsapp_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
