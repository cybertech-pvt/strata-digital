import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Mail,
  Megaphone,
  Calendar,
  UserCog,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

interface AdminLayoutProps {
  children: ReactNode;
}

const adminNavLinks = [
  { name: "Dashboard", path: "/secure-admin/dashboard", icon: LayoutDashboard },
  { name: "Job Posts", path: "/secure-admin/jobs", icon: Briefcase },
  { name: "Applications", path: "/secure-admin/applications", icon: Users },
  { name: "Interviews", path: "/secure-admin/interviews", icon: Calendar },
  { name: "Contact Inbox", path: "/secure-admin/contacts", icon: Mail },
  { name: "Announcements", path: "/secure-admin/announcements", icon: Megaphone },
  { name: "User Management", path: "/secure-admin/users", icon: UserCog },
  { name: "Settings", path: "/secure-admin/settings", icon: Settings },
];

/**
 * AdminLayout - Secure layout for admin portal
 * 
 * Provides a completely separate navigation and UI from the public website.
 * Includes audit logging indicator and security features.
 */
export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/secure-admin/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-navy border-r border-teal/20">
        {/* Logo */}
        <div className="p-6 border-b border-teal/20">
          <Link to="/secure-admin/dashboard" className="flex items-center gap-3">
            <img src={logoDark} alt="Admin Portal" className="h-10" />
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-teal" />
              <span className="text-white font-semibold text-sm">Admin</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-teal/20 text-lime"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-teal/20">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
              <span className="text-teal font-semibold">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {user?.email}
              </p>
              <p className="text-white/50 text-xs">Administrator</p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-navy border-b border-teal/20 p-4">
          <div className="flex items-center justify-between">
            <Link to="/secure-admin/dashboard" className="flex items-center gap-2">
              <img src={logoDark} alt="Admin Portal" className="h-8" />
              <Shield className="w-4 h-4 text-teal" />
            </Link>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="text-white/70"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};
