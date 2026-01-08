-- Create the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create interviews table for scheduling
CREATE TABLE public.interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES public.job_applications(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL,
  scheduled_by UUID,
  interview_date TIMESTAMP WITH TIME ZONE NOT NULL,
  interview_type TEXT NOT NULL DEFAULT 'video',
  location TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on interviews
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- RLS policies for interviews
CREATE POLICY "Admins can manage all interviews"
ON public.interviews FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Employees can view all interviews"
ON public.interviews FOR SELECT
USING (public.has_role(auth.uid(), 'employee'));

CREATE POLICY "Candidates can view their own interviews"
ON public.interviews FOR SELECT
USING (auth.uid() = candidate_id);

-- Trigger for updated_at
CREATE TRIGGER update_interviews_updated_at
BEFORE UPDATE ON public.interviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();