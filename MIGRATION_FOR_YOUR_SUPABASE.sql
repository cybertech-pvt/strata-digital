-- ============================================================
-- CYBERVIBE GLOBAL - COMPLETE DATABASE SCHEMA + DATA
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- =====================
-- 1. ENUM TYPES
-- =====================
CREATE TYPE public.app_role AS ENUM ('admin', 'user', 'candidate', 'employee');

-- =====================
-- 2. TABLES
-- =====================

-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  email text NOT NULL,
  full_name text,
  phone text,
  avatar_url text,
  resume_url text,
  linkedin_url text,
  current_company text,
  bio text,
  department text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- User roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Job posts table
CREATE TABLE public.job_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  type text NOT NULL DEFAULT 'Full-time',
  description text NOT NULL,
  requirements text,
  salary_range text,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Job applications table
CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  experience_years integer NOT NULL,
  cover_letter text NOT NULL,
  resume_url text,
  status text NOT NULL DEFAULT 'pending',
  user_id uuid,
  job_post_id uuid REFERENCES public.job_posts(id),
  current_company text,
  linkedin_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Interviews table
CREATE TABLE public.interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.job_applications(id),
  candidate_id uuid NOT NULL,
  interview_date timestamptz NOT NULL,
  interview_type text NOT NULL DEFAULT 'video',
  location text,
  notes text,
  status text NOT NULL DEFAULT 'scheduled',
  scheduled_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Contact submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  subscribed_at timestamptz NOT NULL DEFAULT now()
);

-- Leave requests table
CREATE TABLE public.leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  leave_type text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text,
  status text NOT NULL DEFAULT 'pending',
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Announcements table
CREATE TABLE public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  is_published boolean NOT NULL DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Admin 2FA secrets table
CREATE TABLE public.admin_2fa_secrets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  secret text NOT NULL,
  is_enabled boolean DEFAULT false,
  backup_codes text[] DEFAULT '{}'::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================
-- 3. FUNCTIONS
-- =====================

-- has_role function (SECURITY DEFINER to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Auto-update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
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

-- =====================
-- 4. TRIGGERS
-- =====================

-- Auto-create profile when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-update updated_at on job_posts
CREATE TRIGGER update_job_posts_updated_at
  BEFORE UPDATE ON public.job_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-update updated_at on interviews
CREATE TRIGGER update_interviews_updated_at
  BEFORE UPDATE ON public.interviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-update updated_at on announcements
CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =====================
-- 5. ENABLE RLS ON ALL TABLES
-- =====================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_2fa_secrets ENABLE ROW LEVEL SECURITY;

-- =====================
-- 6. RLS POLICIES
-- =====================

-- === PROFILES ===
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));

-- === USER ROLES ===
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert user roles" ON public.user_roles FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update user roles" ON public.user_roles FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete user roles" ON public.user_roles FOR DELETE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can assign themselves candidate role" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id AND role = 'candidate');

-- === JOB POSTS ===
CREATE POLICY "Anyone can view active job posts" ON public.job_posts FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage job posts" ON public.job_posts FOR ALL USING (has_role(auth.uid(), 'admin'));

-- === JOB APPLICATIONS ===
CREATE POLICY "Anyone can submit job application" ON public.job_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Candidates can view their own applications" ON public.job_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can read job applications" ON public.job_applications FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update job applications" ON public.job_applications FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete job applications" ON public.job_applications FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- === INTERVIEWS ===
CREATE POLICY "Admins can manage all interviews" ON public.interviews FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Employees can view all interviews" ON public.interviews FOR SELECT USING (has_role(auth.uid(), 'employee'));
CREATE POLICY "Candidates can view their own interviews" ON public.interviews FOR SELECT USING (auth.uid() = candidate_id);

-- === CONTACT SUBMISSIONS ===
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read contact submissions" ON public.contact_submissions FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete contact submissions" ON public.contact_submissions FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- === NEWSLETTER SUBSCRIBERS ===
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read newsletter subscribers" ON public.newsletter_subscribers FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete newsletter subscribers" ON public.newsletter_subscribers FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- === LEAVE REQUESTS ===
CREATE POLICY "Employees can view their own leave requests" ON public.leave_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Employees can create leave requests" ON public.leave_requests FOR INSERT WITH CHECK (auth.uid() = user_id AND has_role(auth.uid(), 'employee'));
CREATE POLICY "Admins can view all leave requests" ON public.leave_requests FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update leave requests" ON public.leave_requests FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- === ANNOUNCEMENTS ===
CREATE POLICY "Employees can view published announcements" ON public.announcements FOR SELECT USING (is_published = true AND (has_role(auth.uid(), 'employee') OR has_role(auth.uid(), 'admin')));
CREATE POLICY "Admins can manage announcements" ON public.announcements FOR ALL USING (has_role(auth.uid(), 'admin'));

-- === ADMIN 2FA SECRETS ===
CREATE POLICY "Admins can view their own 2FA settings" ON public.admin_2fa_secrets FOR SELECT TO authenticated USING (auth.uid() = user_id AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert their own 2FA settings" ON public.admin_2fa_secrets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update their own 2FA settings" ON public.admin_2fa_secrets FOR UPDATE TO authenticated USING (auth.uid() = user_id AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete their own 2FA settings" ON public.admin_2fa_secrets FOR DELETE TO authenticated USING (auth.uid() = user_id AND has_role(auth.uid(), 'admin'));

-- =====================
-- 7. STORAGE BUCKETS
-- =====================
-- Run these SEPARATELY in SQL Editor or create via Supabase Dashboard > Storage:
-- 
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
--
-- Storage policies for resumes bucket:
-- CREATE POLICY "Authenticated users can upload resumes"
--   ON storage.objects FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'resumes' AND (storage.foldername(name))[1] = auth.uid()::text);
--
-- CREATE POLICY "Users can view their own resumes"
--   ON storage.objects FOR SELECT TO authenticated
--   USING (bucket_id = 'resumes' AND (storage.foldername(name))[1] = auth.uid()::text);
--
-- Storage policies for avatars bucket:
-- CREATE POLICY "Authenticated users can upload avatars"
--   ON storage.objects FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'avatars');
--
-- CREATE POLICY "Anyone can view avatars"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'avatars');

-- =====================
-- 8. DATA INSERTS
-- =====================

-- NOTE: user_id references below point to auth.users IDs from the original project.
-- You'll need to recreate the auth users first (via signup or Supabase dashboard),
-- then update these user_id values to match the new UUIDs.

-- Job Posts
INSERT INTO public.job_posts (id, title, department, location, type, description, requirements, salary_range, is_active, created_by, created_at) VALUES
('ef79e9bd-19f9-4c52-b874-1be6ce702b86', 'SOC Analysis L1', '', 'Remort', 'Full-time', '', '', '', true, '7d907113-120b-4e71-b62d-f3c5a83949c4', '2026-02-09 10:06:16.786244+00'),

('2d3b1f10-b79a-47cd-b8ab-13b9db3e4e83', 'Senior Security Engineer', 'System Administration', 'Remote', 'Full-time', 
'Roles & Responsibilities

Guide the team in Installing, setting, configuring, and maintaining security appliances according to the overall objectives and policies of the Bank.

Develop plans to safeguard the Bank''s security appliances and components against accidental and/or unauthorized modification to data, disclosure of confidential information, and/or data corruption/loss.

Develop security standards, baselines and procedures for security appliances, security devices and ensure that these standards and baselines are installed on the appliances

Ensure that security violations are monitored and reviewed by the team which includes SOC alerts, logs and reports on a regular basis. Ensure that these are investigated, escalated to appropriate levels of management as necessary, and correctives actions are taken in a timely manner.

Continuously assess security threats and vulnerabilities and provide recommendations to mitigate the same by ensuring security policies and procedures and control measures are implemented.

Execute and implement the Bank''s Information Technology policies and procedures, standards, and guidelines related to security of the network and communication software, hardware, and components, as well as monitor adherence to such policies and procedures, standards, and guidelines.

Ensure that critical data transmissions are encrypted and protected from unauthorized access and/or disruptions.

Ensure the enforcement of security controls.

Lead the team during DR exercise and would be responsible for security appliances availability in DR site

Ensure endpoint protection systems are Implemented, updated, maintained.

Develop, implement, monitor and maintain network security monitoring tools to help detect security threats and vulnerabilities in a timely manner.

Ensure high standards of confidentiality to safeguard commercially sensitive information.

Provide timely and accurate information to the external and internal auditors and the Compliance function as and when required.',
'Bachelor Degree.

Degree/Diploma in Information Technology/Security.

At least one Professional Certification such as CISSP, CCNP etc.

Security product specialization would be preferable

More than 10 years experience in IT Security/Information Security

Working experience with Financial sector would be an advantage',
'40K - 45K', true, '7d907113-120b-4e71-b62d-f3c5a83949c4', '2026-03-05 03:19:02.933008+00'),

('1cd447ea-1387-48d4-a942-bffd40aad157', 'Business Development Associate', '', 'Remote', 'Full-time',
'Company Description

Cybervibe Global Solutions Pvt Ltd is a leading IT services and cybersecurity provider committed to empowering businesses worldwide with secure and innovative technology solutions. Headquartered in India, Cybervibe specializes in cybersecurity, managed IT infrastructure, custom software development, cloud services, and smart automation.

Job Description: Business Development Assistant Role Overview
The Business Development Assistant is an entry-level professional responsible for supporting the growth and expansion efforts of the organization.',
'Key Responsibilities
Lead Generation & Prospecting: Identify potential clients and business opportunities through thorough market research, industry directories, and professional networking platforms like LinkedIn.
Outreach & Qualification: Conduct initial outreach via cold calling, tailored email campaigns, and social media to introduce company offerings and qualify leads based on budget and needs.
CRM & Data Management: Maintain and regularly update the Customer Relationship Management (CRM) system with accurate lead status, contact logs, and interaction history.
Sales Support: Assist in the preparation of high-quality proposals, pitch presentations, and marketing collateral.
Educational Background: Bachelor''s degree in Business Administration, Marketing, Economics, or a related field.
Experience: Business development: 1 year (Preferred)',
'12K TO 45K', true, '7d907113-120b-4e71-b62d-f3c5a83949c4', '2026-03-09 09:58:51.83457+00');

-- Job Applications
INSERT INTO public.job_applications (id, position, name, email, phone, experience_years, cover_letter, status, created_at, current_company, linkedin_url) VALUES
('dad44fe6-108c-44a7-9e00-0b4a32ae95a2', 'Cybersecurity Analyst', 'Vickram', 'vickramdurai111@gmail.com', '6380215490', 4, 'Dear Hiring Manager, I am writing to express my interest in the Tata Global Internship Program in Cybersecurity...', 'accepted', '2026-02-06 03:12:57.664088+00', 'Vindhya', 'https://www.linkedin.com/in/vickram-d05/'),
('3f968a1a-b0c7-44d9-874a-a6f4e6b9a886', 'Cloud Solutions Architect', 'Vickram', 'vickramdurai111@gmail.com', '6380215490', 5, 'Website update suggestions...', 'accepted', '2026-02-07 03:39:31.490445+00', 'Vindhya', 'https://www.linkedin.com/in/vickram-d05/'),
('5563ea71-6d9e-46ee-a1d5-29e029ea456b', 'Data Scientist', 'SANDHYA S', 'sandhyasand120505@gmail.com', '7010645747', 1, 'Hi sir I''m applying Deta science. I have one year experience in bajaj finance private limited', 'accepted', '2026-02-08 17:10:35.794717+00', 'Bajaj private limited', NULL),
('fff83796-57c4-41cb-bbe7-e548b78b6fcd', 'Cybersecurity Analyst', 'Nithish kumar', 'nithishkumarp24@gmail.com', '8220851803', 2, 'I am writing to apply for the Cyber Security Analyst position...', 'reviewed', '2026-02-09 12:07:11.125918+00', 'INFO HUB CONSULTANCY SERVICES PVT LTD', NULL),
('abf6b7dc-bb02-474f-baa6-b62506a2abac', 'Senior Software Engineer', 'Rritvik Kakkar', 'rritvik98kakkar@gmail.com', '7710514205', 5, 'I have over 5 years of experience as a backend developer...', 'reviewed', '2026-02-10 11:31:15.070105+00', 'Kairos Coders LLP', NULL),
('594b4caa-5885-4d83-a516-12d1a9b608fa', 'Cybersecurity Analyst', 'Ranjitha KR', 'resmiranju91@gmail.com', '9846714618', 1, 'I am writing to express my interest in the Security Analyst position at CyberVibeGlobal...', 'reviewed', '2026-02-10 15:20:23.305419+00', 'Keltron', 'https://linkedin.com/in/ranjitha-kr-40bb1a267'),
('61bdc765-c448-4c85-a7d4-89d45bb0dad2', 'General Application', 'Ranjitha KR', 'resmiranju91@gmail.com', '9846714618', 1, 'Cybersecurity Apprentice with one year of experience at KELTRON...', 'reviewed', '2026-02-10 15:27:57.669246+00', 'Keltron', 'https://linkedin.com/in/ranjitha-kr-40bb1a267'),
('655de6ff-67ef-4555-a85b-733033fb912d', 'Senior Software Engineer', 'CHETAN K R', 'krchetan118899@gmail.com', '7993028071', 3, 'My role involved supporting the seamless onboarding...', 'reviewed', '2026-02-10 16:24:40.679086+00', 'Tata Consultancy Services(TCS)', NULL),
('eefacf70-deb8-4033-a80b-ca24fe49db33', 'General Application', 'CHETAN K R', 'krchetan118899@gmail.com', '7993028071', 0, 'My role involved supporting the seamless onboarding...', 'reviewed', '2026-02-10 16:27:12.132029+00', 'Tata Consultancy Services(TCS)', NULL),
('b5737cd2-7434-4516-a83a-2c3a39f5f350', 'Senior Software Engineer', 'Bercilin Jose', 'bercilinjose07@gmail.com', '+917708715856', 3, 'Hi Hiring Manager, I came across the opportunity at Cyber one...', 'reviewed', '2026-02-11 02:10:39.004132+00', 'Eoxys Systems India Pvt Ltd', 'https://www.linkedin.com/in/bercilin-jose'),
('f6c3af09-a4d4-4cc8-8ddf-c6c41ffc2625', 'Senior Software Engineer', 'Singareddy Maneesh', 'singareddymaneesh11@gmail.com', '+91 6304617305', 3, 'I am writing to apply for the Python Developer position...', 'reviewed', '2026-02-11 17:18:46.144117+00', 'IDP EDUCATION INDIA SERVICES', 'https://linkedin.com/in/maneesh-singareddy-6544901bb'),
('38acc1b2-b575-4367-8104-f7538d575f23', 'Cybersecurity Analyst', 'SANJAY KUDALE', 'sanjaykudale31@gmail.com', '+918788996994', 2, 'My name is Sanjay Kudale, and I have over 13 years of experience in IT...', 'reviewed', '2026-02-18 07:31:34.254022+00', 'HIPT', 'https://www.linkedin.com/in/sanjay-kudale-72459b21'),
('b81841fd-2870-46b9-bc66-c7987d7ee52d', 'General Application', 'Sekar P', 'sekar.rakesh1992@gmail.com', '8973117364', 10, 'I am applying for the IT Infrastructure / System Administrator role...', 'reviewed', '2026-02-21 14:08:55.043503+00', 'Vee Technologies Pvt Ltf', 'https://www.linkedin.com/in/sekar-login/'),
('353b3f96-cda3-4a04-ac50-d54f19c91390', 'General Application', 'Nageswararao Nellore', 'nag4cloud@gmail.com', '9000012367', 4, 'I am applying for the Network Engineer position...', 'reviewed', '2026-02-26 11:32:21.185442+00', 'Datasoft Comnet', 'https://linkedin.com/in/nagchowdary'),
('a0a744d1-21a7-45ad-a2cd-9a87aa03f9cb', 'General Application', 'Laxman Veta', 'vlaxman035@gmail.com', '8897879425', 5, 'I am writing to express my interest...', 'reviewed', '2026-02-28 07:54:28.845513+00', 'CBS HUB PVT LTD', NULL),
('6d1a1bd3-2214-4e3a-8d0a-0968110aac48', 'Cybersecurity Analyst', 'Siddharth Singh Thakur', 'ssiddharthsingh18@gmail.com', '+919340311821', 3, 'I am writing to apply for the cyber security engineer...', 'reviewed', '2026-03-03 10:09:29.149803+00', 'Transrail Lighting Limited', 'https://www.linkedin.com/in/siddharth-singh-193631240');

-- Contact Submissions
INSERT INTO public.contact_submissions (id, name, email, company, message, created_at) VALUES
('a13ab437-797c-4bde-9d8a-992aeacb0258', 'CyberVibe Technologies', 'cybervibetech.pvt@gmail.com', 'CyberVibe Technologies', 'CyberVibe Technologies', '2026-01-08 05:58:56.121743+00');

-- =====================
-- IMPORTANT NOTES:
-- =====================
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Create storage buckets manually in Dashboard > Storage:
--    - "resumes" (private) 
--    - "avatars" (public)
-- 3. Create your admin user via Auth > Users, then manually insert into user_roles:
--    INSERT INTO public.user_roles (user_id, role) VALUES ('<your-new-user-id>', 'admin');
-- 4. Profiles will auto-create via the trigger when users sign up
-- 5. Update the created_by fields in job_posts with your new admin user_id
