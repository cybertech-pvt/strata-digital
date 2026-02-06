-- Drop and recreate the INSERT policy with correct role
DROP POLICY IF EXISTS "Anyone can submit job application" ON public.job_applications;

-- Create a PERMISSIVE policy for anon and authenticated users
CREATE POLICY "Anyone can submit job application"
ON public.job_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);