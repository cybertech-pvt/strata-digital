-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  position TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  current_company TEXT,
  linkedin_url TEXT,
  cover_letter TEXT NOT NULL,
  resume_url TEXT
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can apply)
CREATE POLICY "Anyone can submit job application"
ON public.job_applications
FOR INSERT
WITH CHECK (true);

-- No public reads
CREATE POLICY "No public reads of applications"
ON public.job_applications
FOR SELECT
USING (false);

-- Create index on position for filtering
CREATE INDEX idx_job_applications_position ON public.job_applications(position);
CREATE INDEX idx_job_applications_created_at ON public.job_applications(created_at DESC);