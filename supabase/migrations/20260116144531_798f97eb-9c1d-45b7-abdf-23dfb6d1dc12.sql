-- Add explicit policies to deny unauthenticated access to sensitive tables

-- Policy to explicitly deny unauthenticated access to profiles table
CREATE POLICY "Deny unauthenticated access to profiles"
ON public.profiles
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Policy to explicitly deny unauthenticated access to admin_2fa_secrets table
CREATE POLICY "Deny unauthenticated access to 2FA secrets"
ON public.admin_2fa_secrets
FOR SELECT
USING (auth.uid() IS NOT NULL);