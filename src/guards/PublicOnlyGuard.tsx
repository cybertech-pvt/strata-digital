import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface PublicOnlyGuardProps {
  children: React.ReactNode;
}

/**
 * PublicOnlyGuard - Redirects authenticated users to their appropriate dashboard
 * 
 * Used for login pages to redirect already-authenticated users.
 */
export const PublicOnlyGuard = ({ children }: PublicOnlyGuardProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectAuthenticatedUser = async () => {
      if (loading) return;
      if (!user) return;

      // Check user's role and redirect to appropriate dashboard
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      const userRoles = roles?.map((r) => r.role) || [];

      if (userRoles.includes("admin")) {
        navigate("/secure-admin/dashboard", { replace: true });
      } else if (userRoles.includes("employee")) {
        navigate("/employee/dashboard", { replace: true });
      } else if (userRoles.includes("candidate")) {
        navigate("/candidate/dashboard", { replace: true });
      }
    };

    redirectAuthenticatedUser();
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};
