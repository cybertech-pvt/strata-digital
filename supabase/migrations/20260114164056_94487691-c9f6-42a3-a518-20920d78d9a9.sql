-- Create table to store 2FA secrets for admin users
CREATE TABLE public.admin_2fa_secrets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  secret TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  backup_codes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_2fa_secrets ENABLE ROW LEVEL SECURITY;

-- Only admins can view/manage their own 2FA settings
CREATE POLICY "Admins can view their own 2FA settings"
ON public.admin_2fa_secrets
FOR SELECT
TO authenticated
USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert their own 2FA settings"
ON public.admin_2fa_secrets
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update their own 2FA settings"
ON public.admin_2fa_secrets
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete their own 2FA settings"
ON public.admin_2fa_secrets
FOR DELETE
TO authenticated
USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_admin_2fa_secrets_updated_at
BEFORE UPDATE ON public.admin_2fa_secrets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();