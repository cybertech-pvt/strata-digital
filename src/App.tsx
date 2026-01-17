import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Guards
import { RoleGuard } from "@/guards/RoleGuard";
import { PublicOnlyGuard } from "@/guards/PublicOnlyGuard";

// Critical: Load homepage immediately for LCP
import Index from "./pages/Index";

// Lazy load all other pages for code splitting
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const WhyUs = lazy(() => import("./pages/WhyUs"));
const Technologies = lazy(() => import("./pages/Technologies"));
const Careers = lazy(() => import("./pages/Careers"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Contact = lazy(() => import("./pages/Contact"));

// Auth Pages - lazy loaded as they're not needed on initial load
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const CandidateLogin = lazy(() => import("./pages/CandidateLogin"));
const EmployeeLogin = lazy(() => import("./pages/EmployeeLogin"));

// Protected Dashboards - lazy loaded
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CandidateDashboard = lazy(() => import("./pages/CandidateDashboard"));
const EmployeeDashboard = lazy(() => import("./pages/EmployeeDashboard"));

// Error Pages - lazy loaded
const NotFound = lazy(() => import("./pages/NotFound"));
const Forbidden = lazy(() => import("./pages/Forbidden"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

/**
 * Application Routing Structure
 * 
 * PUBLIC MODULE (/):
 *   - Home, About, Services, Industries, Technologies, WhyUs, Careers, Contact
 *   - Accessible to everyone, no authentication required
 * 
 * CANDIDATE MODULE (/candidate/*):
 *   - Login, Dashboard, Profile
 *   - Protected by candidate role guard
 * 
 * EMPLOYEE MODULE (/employee/*):
 *   - Login, Dashboard, Profile
 *   - Protected by employee role guard
 * 
 * ADMIN MODULE (/secure-admin/*):
 *   - Login, Dashboard, Management pages
 *   - Protected by admin role guard
 *   - Completely isolated from public navigation
 */

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* ========================= */}
              {/* PUBLIC WEBSITE MODULE */}
              {/* ========================= */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/why-us" element={<WhyUs />} />
              <Route path="/technologies" element={<Technologies />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/cookies" element={<CookiePolicy />} />

              {/* ========================= */}
              {/* CANDIDATE PORTAL MODULE */}
              {/* ========================= */}
              <Route
                path="/candidate/login"
                element={
                  <PublicOnlyGuard>
                    <CandidateLogin />
                  </PublicOnlyGuard>
                }
              />
              <Route
                path="/candidate/dashboard"
                element={
                  <RoleGuard
                    allowedRoles={["candidate"]}
                    redirectTo="/candidate/login"
                  >
                    <CandidateDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/candidate/profile"
                element={
                  <RoleGuard
                    allowedRoles={["candidate"]}
                    redirectTo="/candidate/login"
                  >
                    <CandidateDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/candidate/applications"
                element={
                  <RoleGuard
                    allowedRoles={["candidate"]}
                    redirectTo="/candidate/login"
                  >
                    <CandidateDashboard />
                  </RoleGuard>
                }
              />
              {/* Redirect /candidate to dashboard */}
              <Route path="/candidate" element={<Navigate to="/candidate/login" replace />} />

              {/* ========================= */}
              {/* EMPLOYEE PORTAL MODULE */}
              {/* ========================= */}
              <Route
                path="/employee/login"
                element={
                  <PublicOnlyGuard>
                    <EmployeeLogin />
                  </PublicOnlyGuard>
                }
              />
              <Route
                path="/employee/dashboard"
                element={
                  <RoleGuard
                    allowedRoles={["employee"]}
                    redirectTo="/employee/login"
                  >
                    <EmployeeDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/employee/profile"
                element={
                  <RoleGuard
                    allowedRoles={["employee"]}
                    redirectTo="/employee/login"
                  >
                    <EmployeeDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/employee/announcements"
                element={
                  <RoleGuard
                    allowedRoles={["employee"]}
                    redirectTo="/employee/login"
                  >
                    <EmployeeDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/employee/leave"
                element={
                  <RoleGuard
                    allowedRoles={["employee"]}
                    redirectTo="/employee/login"
                  >
                    <EmployeeDashboard />
                  </RoleGuard>
                }
              />
              {/* Redirect /employee to dashboard */}
              <Route path="/employee" element={<Navigate to="/employee/login" replace />} />

              {/* ========================= */}
              {/* SECURE ADMIN PANEL MODULE */}
              {/* ========================= */}
              {/* Admin login - no public layout, completely isolated */}
              <Route path="/secure-admin/login" element={<AdminLogin />} />
              
              {/* Admin dashboard - protected by admin role */}
              <Route
                path="/secure-admin/dashboard"
                element={
                  <RoleGuard
                    allowedRoles={["admin"]}
                    redirectTo="/secure-admin/login"
                  >
                    <AdminDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/secure-admin/jobs"
                element={
                  <RoleGuard
                    allowedRoles={["admin"]}
                    redirectTo="/secure-admin/login"
                  >
                    <AdminDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/secure-admin/applications"
                element={
                  <RoleGuard
                    allowedRoles={["admin"]}
                    redirectTo="/secure-admin/login"
                  >
                    <AdminDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/secure-admin/interviews"
                element={
                  <RoleGuard
                    allowedRoles={["admin"]}
                    redirectTo="/secure-admin/login"
                  >
                    <AdminDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/secure-admin/contacts"
                element={
                  <RoleGuard
                    allowedRoles={["admin"]}
                    redirectTo="/secure-admin/login"
                  >
                    <AdminDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/secure-admin/announcements"
                element={
                  <RoleGuard
                    allowedRoles={["admin"]}
                    redirectTo="/secure-admin/login"
                  >
                    <AdminDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/secure-admin/users"
                element={
                  <RoleGuard
                    allowedRoles={["admin"]}
                    redirectTo="/secure-admin/login"
                  >
                    <AdminDashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/secure-admin/settings"
                element={
                  <RoleGuard
                    allowedRoles={["admin"]}
                    redirectTo="/secure-admin/login"
                  >
                    <AdminDashboard />
                  </RoleGuard>
                }
              />
              {/* Redirect /secure-admin to login */}
              <Route path="/secure-admin" element={<Navigate to="/secure-admin/login" replace />} />

              {/* ========================= */}
              {/* LEGACY ROUTE REDIRECTS */}
              {/* Redirect old routes to new secure routes */}
              {/* ========================= */}
              <Route path="/admin/login" element={<Navigate to="/secure-admin/login" replace />} />
              <Route path="/admin" element={<Navigate to="/secure-admin/dashboard" replace />} />

              {/* ========================= */}
              {/* ERROR PAGES */}
              {/* ========================= */}
              <Route path="/forbidden" element={<Forbidden />} />
              
              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
