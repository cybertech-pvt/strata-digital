import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Clock,
  LogOut,
  FileText,
  Building,
} from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

interface CandidateLayoutProps {
  children: ReactNode;
}

const candidateNavLinks = [
  { name: "Dashboard", path: "/candidate/dashboard", icon: LayoutDashboard },
  { name: "My Profile", path: "/candidate/profile", icon: User },
  { name: "My Applications", path: "/candidate/applications", icon: FileText },
  { name: "Browse Jobs", path: "/careers", icon: Briefcase },
];

/**
 * CandidateLayout - Layout for candidate portal
 * 
 * Provides navigation specific to job candidates.
 */
export const CandidateLayout = ({ children }: CandidateLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/candidate/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-navy border-r border-teal/20">
        {/* Logo */}
        <div className="p-6 border-b border-teal/20">
          <Link to="/candidate/dashboard" className="flex items-center gap-3">
            <img src={logoDark} alt="Candidate Portal" className="h-10" />
            <span className="text-white/60 text-sm">Candidate Portal</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {candidateNavLinks.map((link) => {
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
              <p className="text-white/50 text-xs">Candidate</p>
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
            <Link to="/candidate/dashboard" className="flex items-center gap-2">
              <img src={logoDark} alt="Candidate Portal" className="h-8" />
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

        <div className="p-6 lg:p-8 bg-background min-h-screen">{children}</div>
      </main>
    </div>
  );
};
