-- SQL Script to Create Admin User in Supabase
-- Run this in the Supabase SQL Editor to create the admin user

-- IMPORTANT: First create the auth user through Supabase Dashboard, then run this query

-- Step 1: Get the user ID (replace with actual UUID from Supabase Auth users table)
-- You need to first create the user in Auth, then copy their ID here

-- Step 2: Insert the admin role for the user
-- Replace 'YOUR_USER_ID_HERE' with the actual user ID from auth.users table

INSERT INTO public.user_roles (user_id, role, assigned_at, assigned_by)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'cybervibetech.pvt@gmail.com' LIMIT 1),
  'admin',
  now(),
  NULL
);

-- Step 3: Verify the role was assigned
SELECT ur.id, ur.user_id, ur.role, ur.assigned_at, u.email
FROM public.user_roles ur
LEFT JOIN auth.users u ON ur.user_id = u.id
WHERE u.email = 'cybervibetech.pvt@gmail.com';
