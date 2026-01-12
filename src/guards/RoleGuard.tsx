import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type AllowedRole = "admin" | "employee" | "candidate";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: AllowedRole[];
  redirectTo: string;
  requireAuth?: boolean;
}

/**
 * RoleGuard - Protects routes based on user roles
 * 
 * Server-side role verification to prevent client-side manipulation.
 * Returns 403 Forbidden for unauthorized access attempts.
 */
export const RoleGuard = ({
  children,
  allowedRoles,
  redirectTo,
  requireAuth = true,
}: RoleGuardProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      // If still loading auth state, wait
      if (loading) return;

      // If no user and auth is required, redirect to login
      if (!user && requireAuth) {
        setIsAuthorized(false);
        setIsVerifying(false);
        navigate(redirectTo, { 
          replace: true,
          state: { from: location.pathname, error: "authentication_required" }
        });
        return;
      }

      // If no user and auth not required (shouldn't happen with this guard)
      if (!user) {
        setIsAuthorized(false);
        setIsVerifying(false);
        return;
      }

      // Server-side role verification
      try {
        const { data: roles, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (error) {
          console.error("Role verification error:", error);
          setIsAuthorized(false);
          setIsVerifying(false);
          navigate(redirectTo, { 
            replace: true,
            state: { error: "verification_failed" }
          });
          return;
        }

        // Check if user has any of the allowed roles
        const userRoles = roles?.map((r) => r.role) || [];
        const hasAllowedRole = allowedRoles.some((role) => userRoles.includes(role));

        if (!hasAllowedRole) {
          console.warn(`Access denied: User lacks required role. Required: ${allowedRoles.join(", ")}, Has: ${userRoles.join(", ")}`);
          setIsAuthorized(false);
          setIsVerifying(false);
          navigate("/forbidden", { 
            replace: true,
            state: { attemptedPath: location.pathname }
          });
          return;
        }

        setIsAuthorized(true);
        setIsVerifying(false);
      } catch (err) {
        console.error("Unexpected error during role verification:", err);
        setIsAuthorized(false);
        setIsVerifying(false);
        navigate(redirectTo, { replace: true });
      }
    };

    verifyAccess();
  }, [user, loading, allowedRoles, navigate, redirectTo, location.pathname, requireAuth]);

  // Show loading state while verifying
  if (loading || isVerifying) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-teal border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authorized
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};
