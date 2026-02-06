-- Drop the restrictive INSERT policy and create a permissive one
DROP POLICY IF EXISTS "Anyone can submit job application" ON public.job_applications;

-- Create a PERMISSIVE policy that allows anyone to insert
CREATE POLICY "Anyone can submit job application"
ON public.job_applications
FOR INSERT
TO public
WITH CHECK (true);