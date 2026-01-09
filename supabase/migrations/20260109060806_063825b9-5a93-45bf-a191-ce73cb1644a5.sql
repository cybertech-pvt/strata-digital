-- Remove the overly permissive policy that allows ALL employees to view ALL resumes
-- This is a privacy violation - resumes should only be accessible by:
-- 1. The user who uploaded their own resume
-- 2. Admin users who need to review applications

DROP POLICY IF EXISTS "Employees can view all resumes" ON storage.objects;