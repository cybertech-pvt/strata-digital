-- Migration: Setup test admin user and roles
-- This migration creates a pre-configured admin user for development/testing

-- Note: In production, use Supabase Dashboard or proper admin API to create users

-- Function to create an admin user (if not exists)
-- This requires a valid auth user to exist first

-- Create a trigger function to auto-assign admin role on user creation
CREATE OR REPLACE FUNCTION public.auto_create_admin_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Check if this email should be admin
  IF NEW.email = 'cybervibetech.pvt@gmail.com' THEN
    -- Auto-assign admin role
    INSERT INTO public.user_roles (user_id, role, assigned_at)
    VALUES (NEW.id, 'admin', now())
    ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
  END IF;
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;

-- Create trigger to auto-assign admin role for specific email
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_create_admin_role();

-- Ensure the admin email can always insert/update their role
CREATE POLICY "Admin user can manage their own role"
ON public.user_roles FOR ALL
USING (auth.uid()::text = user_id::text OR auth.jwt() ->> 'email' = 'cybervibetech.pvt@gmail.com');

-- Function to verify admin credentials
CREATE OR REPLACE FUNCTION public.verify_admin_email()
RETURNS TABLE(is_admin BOOLEAN, user_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    EXISTS(
      SELECT 1 FROM public.user_roles
      WHERE user_roles.role = 'admin'
      AND user_roles.user_id = auth.uid()
    ) as is_admin,
    auth.uid() as user_id;
END;
$$;

-- Index for faster admin checks
CREATE INDEX IF NOT EXISTS idx_user_roles_admin 
ON public.user_roles(user_id) 
WHERE role = 'admin';
