import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import WhyUs from "./pages/WhyUs";
import Technologies from "./pages/Technologies";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CandidateLogin from "./pages/CandidateLogin";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Candidate routes */}
            <Route path="/candidate/login" element={<CandidateLogin />} />
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            {/* Employee routes */}
            <Route path="/employee/login" element={<EmployeeLogin />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
