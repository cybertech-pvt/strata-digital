
-- Drop the restrictive INSERT policy and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Anyone can submit job application" ON public.job_applications;
CREATE POLICY "Anyone can submit job application"
  ON public.job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
