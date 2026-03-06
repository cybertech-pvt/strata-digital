import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Building2,
  Loader2,
  Briefcase,
} from "lucide-react";

interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string | null;
  salary_range: string | null;
  created_at: string;
}

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("job_posts")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .maybeSingle();

      if (!error && data) {
        setJob(data);
      }
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  const handleApplyNow = () => {
    if (!user) {
      // Redirect to candidate login, storing the return URL
      navigate(`/candidate/login?redirect=/careers/${id}/apply`);
    } else {
      navigate(`/careers/${id}/apply`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 pb-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-8">This position may no longer be available.</p>
            <Button asChild>
              <Link to="/careers">Back to Careers</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden bg-navy">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/50 to-navy" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white mb-6"
            onClick={() => navigate("/careers")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Button>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-teal/20 text-teal px-3 py-1 rounded-full text-sm font-medium">
                {job.department}
              </span>
              <span className="bg-lime/20 text-lime px-3 py-1 rounded-full text-sm font-medium">
                {job.type}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {job.type}
              </span>
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {job.department}
              </span>
              {job.salary_range && (
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {job.salary_range}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">Job Description</h2>
              <div className="text-muted-foreground whitespace-pre-line mb-10">
                {job.description}
              </div>

              {job.requirements && (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                  <div className="text-muted-foreground whitespace-pre-line mb-10">
                    {job.requirements}
                  </div>
                </>
              )}
            </div>

            {/* Apply CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-teal/10 to-lime/10 rounded-2xl border border-teal/20 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Interested in this role?
              </h3>
              <p className="text-muted-foreground mb-6">
                Submit your application and take the next step in your career.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal to-lime text-navy font-semibold hover:opacity-90"
                onClick={handleApplyNow}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JobDetail;
