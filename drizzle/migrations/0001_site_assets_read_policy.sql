-- site-assets holds approved public artwork; the workspace blocks public buckets,
-- so visitors read it through short-lived signed links created from this policy.
CREATE POLICY "Anyone reads approved site assets" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'site-assets');
