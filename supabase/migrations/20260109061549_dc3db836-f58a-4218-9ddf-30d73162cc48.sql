-- ==========================================
-- SECURITY FIX: Add database constraints for defense-in-depth
-- This ensures server-side validation even if client validation is bypassed
-- ==========================================

-- Add constraints to contact_submissions table
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT check_contact_name_length CHECK (length(name) >= 2 AND length(name) <= 100),
  ADD CONSTRAINT check_contact_email_format CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$'),
  ADD CONSTRAINT check_contact_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT check_contact_message_length CHECK (length(message) >= 10 AND length(message) <= 2000);

-- Add constraints to job_applications table  
ALTER TABLE public.job_applications
  ADD CONSTRAINT check_app_name_length CHECK (length(name) >= 2 AND length(name) <= 100),
  ADD CONSTRAINT check_app_email_format CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$'),
  ADD CONSTRAINT check_app_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT check_app_phone_length CHECK (length(phone) >= 10 AND length(phone) <= 20),
  ADD CONSTRAINT check_app_cover_letter_length CHECK (length(cover_letter) >= 10 AND length(cover_letter) <= 5000),
  ADD CONSTRAINT check_app_experience_range CHECK (experience_years >= 0 AND experience_years <= 70);

-- Add constraints to newsletter_subscribers table
ALTER TABLE public.newsletter_subscribers
  ADD CONSTRAINT check_newsletter_email_format CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$'),
  ADD CONSTRAINT check_newsletter_email_length CHECK (length(email) <= 255);

-- ==========================================
-- SECURITY FIX: Update handle_new_user() function with input validation
-- Add explicit null checks and validation to SECURITY DEFINER function
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Validate required inputs before inserting
  IF new.id IS NULL THEN
    RAISE EXCEPTION 'User ID cannot be null';
  END IF;
  
  IF new.email IS NULL THEN
    RAISE EXCEPTION 'User email cannot be null';
  END IF;

  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;