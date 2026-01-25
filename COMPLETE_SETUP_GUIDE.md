# CYBERVIBE Global Solutions - Complete Setup & Deployment Guide

**Status**: ✅ Clean Project - Ready for Use  
**Version**: 1.0.0  
**Last Updated**: January 25, 2026

---

## 🚀 Quick Start (5 Minutes)

### For Local Development

```bash
# 1. Navigate to project directory
cd "e:\My Webpage\strata-digital-1"

# 2. Start development server
npm run dev

# 3. Open browser
http://localhost:8080/
```

**✅ That's it! Website is running.**

---

## 🔐 Admin Login Setup (One-Time)

### Option A: Using Supabase Dashboard (Recommended)

#### Step 1: Create Auth User
1. Go to [Supabase Console](https://app.supabase.com)
2. Select your project: `hyackhbgbiunkijipqhk`
3. Navigate to **Authentication** → **Users**
4. Click **+ Create User**
5. Enter:
   - **Email**: `cybervibetech.pvt@gmail.com`
   - **Password**: `Vicky@145`
   - ✅ **Auto confirm user**: Check this box
6. Click **Create User**

#### Step 2: Assign Admin Role
1. In Supabase, go to **SQL Editor**
2. Create a new query
3. Copy and paste this SQL:

```sql
-- Assign admin role to the user
INSERT INTO public.user_roles (user_id, role, assigned_at)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'cybervibetech.pvt@gmail.com' LIMIT 1),
  'admin',
  now()
)
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Verify
SELECT ur.id, ur.user_id, ur.role, u.email
FROM public.user_roles ur
LEFT JOIN auth.users u ON ur.user_id = u.id
WHERE u.email = 'cybervibetech.pvt@gmail.com';
```

4. Click **Run**
5. You should see 1 row returned with the admin role ✅

#### Step 3: Login to Admin Portal
1. Open http://localhost:8080/secure-admin/login
2. Enter credentials:
   - **Email**: `cybervibetech.pvt@gmail.com`
   - **Password**: `Vicky@145`
3. Complete CAPTCHA
4. Click **Sign In** ✅

---

## 📁 Project Structure

```
strata-digital-1/
├── src/
│   ├── pages/                 # Main pages
│   │   ├── Index.tsx          # Homepage
│   │   ├── AdminLogin.tsx     # Admin login page
│   │   ├── AdminDashboard.tsx # Admin dashboard
│   │   ├── CandidateLogin.tsx
│   │   ├── EmployeeLogin.tsx
│   │   └── ...
│   ├── components/
│   │   ├── sections/          # Homepage sections
│   │   ├── layout/            # Header, Footer, Layout
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── integrations/
│   │   └── supabase/          # Supabase client
│   └── App.tsx                # Main app component
├── supabase/
│   ├── migrations/            # Database migrations
│   └── functions/             # Edge functions
├── public/                    # Static assets
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind CSS config
└── package.json               # Dependencies
```

---

## 🌐 Available Routes

### Public Website
- **Home**: `/` 
- **About**: `/about`
- **Services**: `/services`
- **Industries**: `/industries`
- **Technologies**: `/technologies`
- **Why Us**: `/why-us`
- **Careers**: `/careers`
- **Contact**: `/contact`
- **Privacy**: `/privacy`
- **Terms**: `/terms`
- **Cookies**: `/cookies`

### Admin Panel (Separate)
- **Login**: `/secure-admin/login`
- **Dashboard**: `/secure-admin/dashboard`
- **Jobs**: `/secure-admin/jobs`
- **Applications**: `/secure-admin/applications`
- **Interviews**: `/secure-admin/interviews`

### Candidate Portal
- **Login**: `/candidate/login`
- **Dashboard**: `/candidate/dashboard`

### Employee Portal
- **Login**: `/employee/login`
- **Dashboard**: `/employee/dashboard`

---

## 🔧 Development Commands

```bash
# Start development server (port 8080)
npm run dev

# Check code quality (ESLint)
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🗄️ Database Setup

### Supabase Project Details
- **Project ID**: `hyackhbgbiunkijipqhk`
- **URL**: `https://hyackhbgbiunkijipqhk.supabase.co`
- **Region**: Auto-selected

### Database Tables
1. **auth.users** - User authentication (built-in)
2. **profiles** - User profiles
3. **user_roles** - Role assignments (admin, candidate, employee)
4. **job_posts** - Job listings
5. **job_applications** - Job applications
6. **contact_submissions** - Contact form submissions
7. **newsletter_subscribers** - Newsletter emails
8. **announcements** - Internal announcements
9. **leave_requests** - Employee leave requests
10. **admin_2fa_secrets** - 2FA secrets
11. **audit_log** - Admin action logging

### Row Level Security (RLS)
- ✅ Enabled on all tables
- ✅ Policies enforced for each role
- ✅ Admin-only access to sensitive data

---

## 🔐 Authentication

### Authentication Methods
- Email/Password (Supabase Auth)
- Role-Based Access Control (RBAC)
- Optional 2FA for admin accounts
- CAPTCHA protection (Cloudflare Turnstile)

### User Roles
| Role | Access | Purpose |
|------|--------|---------|
| **admin** | Admin Panel | Manage jobs, applications, interviews |
| **candidate** | Candidate Portal | Apply for jobs, track applications |
| **employee** | Employee Portal | View announcements, request leave |
| **none** | Public Website | View company info, apply jobs |

---

## 🎨 Frontend Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.0 | UI library |
| TypeScript | 5.5.3 | Type safety |
| Vite | 5.4.19 | Build tool |
| Tailwind CSS | 3.4.1 | Styling |
| shadcn/ui | Latest | UI components |
| Radix UI | Latest | Accessible components |
| React Router | Latest | Routing |
| Supabase JS | Latest | Backend |

---

## 🎯 Design & Branding

### Color Scheme
- **Navy**: `#0f1929` (Primary dark background)
- **Teal**: `#4facfe` (Primary accent)
- **Lime**: `#c0ff4e` (Secondary accent)
- **White**: `#ffffff` (Text on dark)

### Theme
- ✅ Dark mode by default
- ✅ Professional enterprise look
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions

### Typography
- **Headings**: Bold, sans-serif
- **Body**: Regular, sans-serif
- **Size**: 14px - 72px (responsive)

---

## 📋 Features Implemented

### Homepage
- ✅ Hero section with CTA
- ✅ Services preview
- ✅ Why choose us section
- ✅ Testimonials
- ✅ Client logos
- ✅ Blog preview
- ✅ Newsletter signup
- ✅ CTA section

### Admin Panel
- ✅ Secure login with CAPTCHA
- ✅ Dashboard overview
- ✅ Job management (create/edit/delete)
- ✅ Application tracking
- ✅ Interview scheduling
- ✅ User management
- ✅ Audit logging

### Portals
- ✅ Candidate job applications
- ✅ Application tracking
- ✅ Employee announcements
- ✅ Leave request management

### Security
- ✅ Role-based access control
- ✅ Row-level security (RLS)
- ✅ CAPTCHA verification
- ✅ Optional 2FA
- ✅ Rate limiting
- ✅ Audit logging
- ✅ Secure password hashing

---

## ⚠️ Troubleshooting

### Issue: Website won't load
**Solution**:
1. Start dev server: `npm run dev`
2. Clear browser cache: `Ctrl+Shift+R`
3. Check console: Press `F12`

### Issue: Admin login fails
**Solution**:
1. Verify user exists in Supabase Auth
2. Check admin role is assigned in user_roles table
3. Verify email/password exactly match
4. Try incognito window (clear cookies)

### Issue: Database connection error
**Solution**:
1. Check `.env` file has SUPABASE credentials
2. Verify Supabase project is active
3. Check network connection
4. Restart dev server

### Issue: CAPTCHA not showing
**Solution**:
1. Check VITE_TURNSTILE_SITE_KEY in `.env`
2. Clear browser cache
3. Disable ad blocker
4. Try different browser

---

## 📦 Dependencies

Total: 387 packages installed

**Key packages**:
- @supabase/supabase-js - Backend
- react-router-dom - Routing
- @radix-ui/* - Components
- tailwindcss - Styling
- lucide-react - Icons
- zod - Validation
- react-hook-form - Forms

---

## 🚢 Deployment

### For Production
1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy dist folder to:
   - Vercel (Recommended)
   - Netlify
   - GitHub Pages
   - Your own server

3. Set environment variables:
   ```
   VITE_SUPABASE_URL=https://hyackhbgbiunkijipqhk.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=<your-key>
   VITE_TURNSTILE_SITE_KEY=<your-key>
   ```

---

## 📞 Support

### Getting Help
1. Check **ADMIN_LOGIN_SETUP.md** for admin issues
2. Check **STATUS_REPORT.md** for system status
3. Review browser console for errors (F12)
4. Check Supabase dashboard for database issues

### Contact
- Email: cybervibetech.pvt@gmail.com
- Website: https://cybervibesolutions.com

---

## ✅ Verification Checklist

Before going live, verify:
- [ ] Dev server runs without errors
- [ ] Homepage displays correctly
- [ ] Admin can login (after Supabase setup)
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] Responsive design works on mobile
- [ ] No console errors (F12)
- [ ] Database tables created
- [ ] CAPTCHA displays
- [ ] SSL certificate (for production)

---

## 📝 Git Commands

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# View logs
git log --oneline
```

---

## 🎓 Learning Resources

- **React**: https://react.dev
- **TypeScript**: https://typescriptlang.org
- **Tailwind**: https://tailwindcss.com
- **Supabase**: https://supabase.com/docs
- **Vite**: https://vitejs.dev

---

## 📄 License & Copyright

**CYBERVIBE Global Solutions**  
All rights reserved © 2026  
Professional Digital Transformation Services

---

**✅ PROJECT IS READY FOR USE!**

For questions or issues, refer to the documentation files in the project root.
