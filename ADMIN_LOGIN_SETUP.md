# Admin User Setup - CYBERVIBE Global Solutions

## ❌ Current Issue
You're seeing "Access Denied - You do not have admin privileges" because:
- The admin user doesn't exist in Supabase Auth, OR
- The user exists but doesn't have the admin role assigned in the `user_roles` table

## ✅ Solution: Create Admin User in Supabase

### Step 1: Create Auth User in Supabase Dashboard

1. Go to **Supabase Dashboard** → Your Project
2. Navigate to **Authentication** → **Users**
3. Click **"+ Create User"**
4. Enter:
   - **Email**: `cybervibetech.pvt@gmail.com`
   - **Password**: `Vicky@145`
   - **Auto confirm user**: ✅ Check this
5. Click **"Create User"**

### Step 2: Get the User ID

After creating the user, you'll see their UUID in the users table. Note it down (looks like: `123e4567-e89b-12d3-a456-426614174000`)

### Step 3: Assign Admin Role

Option A: Using SQL Editor (Recommended)
1. Go to **Supabase Dashboard** → Your Project
2. Navigate to **SQL Editor**
3. Create a new query
4. Paste the following SQL:

```sql
-- Insert admin role for the user
INSERT INTO public.user_roles (user_id, role, assigned_at)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'cybervibetech.pvt@gmail.com' LIMIT 1),
  'admin',
  now()
)
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Verify it was created
SELECT ur.id, ur.user_id, ur.role, u.email
FROM public.user_roles ur
LEFT JOIN auth.users u ON ur.user_id = u.id
WHERE u.email = 'cybervibetech.pvt@gmail.com';
```

5. Click **"Run"** button

Option B: Using Table Editor
1. Go to **Supabase Dashboard** → **Database** → **user_roles**
2. Click **"Insert Row"**
3. Fill in:
   - **user_id**: (select the UUID of cybervibetech.pvt@gmail.com user)
   - **role**: `admin`
   - **assigned_at**: (auto-filled)
4. Click **"Save"**

### Step 4: Login to Admin Panel

1. Go to: http://localhost:8080/secure-admin/login
2. Enter:
   - **Email**: `cybervibetech.pvt@gmail.com`
   - **Password**: `Vicky@145`
3. Complete CAPTCHA verification
4. Click **"Sign In"**

You should now be logged into the admin dashboard! 🎉

---

## 📋 Troubleshooting

### Still Getting "Access Denied"?

1. **Verify user exists in auth.users**:
   - Supabase Dashboard → Authentication → Users
   - Search for `cybervibetech.pvt@gmail.com`
   - If not found, create it (Step 1 above)

2. **Verify role is assigned**:
   - Supabase Dashboard → Database → user_roles
   - Look for a row with that user's UUID
   - Ensure `role` column says `admin`
   - If not found, run Step 3 SQL

3. **Check email is correct**:
   - Verify no typos in email address
   - Should be exactly: `cybervibetech.pvt@gmail.com`

4. **Verify password is correct**:
   - Should be exactly: `Vicky@145` (case sensitive)

5. **Clear browser cache**:
   - Press `Ctrl+Shift+R` to hard refresh
   - Try again

### What if the password is wrong?

In Supabase:
1. Go to **Authentication** → **Users**
2. Find the user `cybervibetech.pvt@gmail.com`
3. Click on their row
4. Scroll to "Password" section
5. Click "Reset Password"
6. Set new password to: `Vicky@145`

---

## 🔄 Database Tables Involved

### user_roles Table
Stores the mapping between users and their roles.

```
Columns:
- id (UUID) - Primary key
- user_id (UUID) - Reference to auth.users
- role (TEXT) - Values: 'admin', 'candidate', 'employee'
- assigned_at (TIMESTAMP)
- assigned_by (UUID) - Optional, who assigned the role
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### auth.users Table (Built-in)
Stores user authentication data.

```
Columns:
- id (UUID) - Primary key
- email (TEXT) - Email address
- encrypted_password (TEXT) - Hashed password
- email_confirmed_at (TIMESTAMP)
- raw_app_meta_data (JSONB)
- raw_user_meta_data (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🔐 Security Notes

✅ **Good Practices**:
- Admin user email: `cybervibetech.pvt@gmail.com` (verified domain)
- Strong password: `Vicky@145` (contains uppercase, numbers, special chars)
- Role-based access control enforced
- 2FA available for additional security

⚠️ **Future Improvements**:
- Change password after first login
- Enable 2FA for admin account
- Use environment variables for credentials
- Implement audit logging

---

## 📞 Need Help?

If the admin user still won't login:

1. Check Supabase project is running
2. Verify database migrations are applied
3. Check browser console for errors (F12)
4. Verify the email/password exactly
5. Try incognito window (clear cache issues)

For manual verification, run this SQL:
```sql
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  ur.role,
  ur.assigned_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'cybervibetech.pvt@gmail.com';
```

This should return one row showing the user with 'admin' role.

---

**Last Updated**: January 25, 2026  
**Status**: Admin setup documentation  
**Next Step**: Create the admin user in Supabase and assign the role
