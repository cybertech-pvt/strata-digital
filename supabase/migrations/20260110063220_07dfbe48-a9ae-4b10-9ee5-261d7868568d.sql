-- ==========================================
-- SECURITY FIX: Remove overly permissive employee access to job applications
-- Regular employees should NOT have access to candidate PII
-- Only admins and candidates (their own applications) should have access
-- ==========================================

-- Drop the overly permissive policy that grants all employees access to job applications
DROP POLICY IF EXISTS "Employees can view job applications" ON public.job_applications;