# CYBERVIBE Global Solutions - Admin Setup Guide

## 🔐 Admin Authentication Setup

### Default Admin Credentials
- **Email**: `cybervibetech.pvt@gmail.com`
- **Password**: `Vicky@145`

### How to Access the Admin Panel

#### 1. **Admin Login Page**
   - URL: `http://localhost:8080/secure-admin/login`
   - Enter the email and password above
   - Complete CAPTCHA verification
   - If 2FA is enabled, enter the 6-digit code

#### 2. **Admin Dashboard** (After Login)
   - URL: `http://localhost:8080/secure-admin/dashboard`
   - Access job management, applications, interviews, and more

#### 3. **Setup Page** (Optional)
   - URL: `http://localhost:8080/admin-setup.html`
   - Quick reference for admin credentials

### Admin Panel Features

#### Job Management
- **Path**: `/secure-admin/jobs`
- Create, edit, and delete job postings
- Set salary ranges and location
- Mark jobs as active/inactive

#### Application Management
- **Path**: `/secure-admin/applications`
- View all job applications
- Update application status (pending, reviewing, accepted, rejected)
- Download resumes and view cover letters

#### Interview Management
- **Path**: `/secure-admin/interviews`
- Schedule and manage interviews
- Track interview status and notes
- Send notifications to candidates

#### Dashboard Overview
- **Path**: `/secure-admin/dashboard`
- View analytics and metrics
- Quick statistics on jobs, applications, and interviews
- Recent activity feed

### Website Structure

#### Public Website
- Homepage: `http://localhost:8080/`
- About: `http://localhost:8080/about`
- Services: `http://localhost:8080/services`
- Industries: `http://localhost:8080/industries`
- Technologies: `http://localhost:8080/technologies`
- Careers: `http://localhost:8080/careers`
- Contact: `http://localhost:8080/contact`

#### Candidate Portal
- Login: `http://localhost:8080/candidate/login`
- Dashboard: `http://localhost:8080/candidate/dashboard`

#### Employee Portal
- Login: `http://localhost:8080/employee/login`
- Dashboard: `http://localhost:8080/employee/dashboard`

#### Admin Panel (Separate)
- Login: `http://localhost:8080/secure-admin/login`
- Dashboard: `http://localhost:8080/secure-admin/dashboard`

### Security Features

1. **Role-Based Access Control (RBAC)**
   - Admin only access to admin panel
   - Candidate-specific views
   - Employee-specific features

2. **CAPTCHA Protection**
   - All login pages include Cloudflare Turnstile CAPTCHA
   - Prevents brute force attacks

3. **Two-Factor Authentication (2FA)**
   - Optional 2FA setup for admin accounts
   - Available at `/secure-admin/setup-2fa`

4. **Rate Limiting**
   - Form submissions are rate-limited
   - Email subscriptions are throttled
   - Contact submissions are monitored

### Troubleshooting

#### White Page Not Loading?
1. Hard refresh browser: `Ctrl+Shift+R`
2. Check browser console for errors: `F12`
3. Ensure dev server is running: `npm run dev`

#### Login Issues?
1. Verify email and password are correct
2. Check CAPTCHA is completed
3. Ensure user role is set to 'admin' in Supabase

#### Admin Panel Not Accessible?
1. Login with admin account first
2. Verify admin role in Supabase: `user_roles` table
3. Check redirect after login

### Development

#### Starting Dev Server
```bash
cd "e:\My Webpage\strata-digital-1"
npm install
npm run dev
```

#### Linting
```bash
npm run lint
```

#### Building for Production
```bash
npm run build
```

#### Previewing Production Build
```bash
npm run preview
```

### Supabase Functions

The following Supabase Edge Functions handle various operations:

1. **create-admin-user** - Create new admin users
2. **setup-2fa** - Setup two-factor authentication
3. **verify-2fa** - Verify 2FA codes
4. **check-2fa-required** - Check if 2FA is required
5. **audit-log** - Log administrative actions
6. **rate-limit** - Rate limiting for form submissions
7. **send-application-notification** - Send application notifications

### Environment Variables

The project uses these environment variables (configured in Supabase):

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key
- `VITE_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key

### Theme & Design

- **Color Scheme**: Navy (210° 50% 8%), Teal (195° 60% 40%), Lime (75° 70% 50%)
- **Dark Mode**: Enabled by default
- **Responsive**: Mobile, tablet, and desktop optimized

### Support

For issues or questions, contact: cybervibetech.pvt@gmail.com

---

**Last Updated**: January 24, 2026
**Version**: 1.0.0
