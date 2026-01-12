import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Guards
import { RoleGuard } from "@/guards/RoleGuard";
import { PublicOnlyGuard } from "@/guards/PublicOnlyGuard";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import WhyUs from "./pages/WhyUs";
import Technologies from "./pages/Technologies";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

// Auth Pages
import AdminLogin from "./pages/AdminLogin";
import CandidateLogin from "./pages/CandidateLogin";
import EmployeeLogin from "./pages/EmployeeLogin";

// Protected Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Error Pages
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";

const queryClient = new QueryClient();

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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
