-- Allow users to assign themselves the candidate role during signup
CREATE POLICY "Users can assign themselves candidate role"
ON public.user_roles FOR INSERT
WITH CHECK (auth.uid() = user_id AND role = 'candidate');