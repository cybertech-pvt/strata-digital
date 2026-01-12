import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShieldX, Home, ArrowLeft } from "lucide-react";

/**
 * 403 Forbidden Page
 * 
 * Displayed when a user attempts to access a resource they don't have permission for.
 */
const Forbidden = () => {
  const location = useLocation();
  const attemptedPath = location.state?.attemptedPath || "this page";

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen bg-navy">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-destructive/20 flex items-center justify-center">
              <ShieldX className="w-12 h-12 text-destructive" />
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-4">403</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">Access Forbidden</h2>
            
            <p className="text-white/60 mb-8">
              You don't have permission to access {attemptedPath}. 
              This area is restricted to authorized users only.
            </p>

            <div className="bg-navy-light rounded-lg p-4 border border-teal/20 mb-8">
              <p className="text-white/70 text-sm">
                If you believe this is an error, please contact your administrator 
                or try logging in with the correct account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-teal text-teal hover:bg-teal/10"
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button
                onClick={() => window.history.back()}
                className="gradient-cta text-white hover:opacity-90"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Forbidden;
