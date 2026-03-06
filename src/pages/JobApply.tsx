import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowLeft, Loader2, CheckCircle, Upload } from "lucide-react";

const applySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Phone must be at least 10 characters").max(20),
  experience_years: z.number().min(0).max(50),
  cover_letter: z.string().trim().min(50, "Must be at least 50 characters").max(2000),
});

const JobApply = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience_years: "",
    cover_letter: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate(`/candidate/login?redirect=/careers/${id}/apply`);
    }
  }, [user, authLoading, id, navigate]);

  // Fetch job and pre-fill user info
  useEffect(() => {
    const init = async () => {
      if (!id) return;
      const { data } = await supabase
        .from("job_posts")
        .select("title")
        .eq("id", id)
        .eq("is_active", true)
        .maybeSingle();

      if (data) setJobTitle(data.title);
      else {
        toast.error("Job not found");
        navigate("/careers");
        return;
      }

      // Pre-fill from profile
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, email, phone")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profile) {
          setFormData((prev) => ({
            ...prev,
            name: profile.full_name || "",
            email: profile.email || user.email || "",
            phone: profile.phone || "",
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            email: user.email || "",
          }));
        }
      }
      setLoading(false);
    };
    if (!authLoading) init();
  }, [id, user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = applySchema.parse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experience_years: parseInt(formData.experience_years) || 0,
        cover_letter: formData.cover_letter,
      });

      let resumeUrl: string | null = null;

      // Upload resume if provided
      if (resumeFile && user) {
        const ext = resumeFile.name.split(".").pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(path, resumeFile);

        if (uploadError) {
          toast.error("Resume upload failed. Please try again.");
          setIsSubmitting(false);
          return;
        }
        const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(path);
        resumeUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from("job_applications").insert({
        position: jobTitle,
        job_post_id: id,
        user_id: user?.id || null,
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        experience_years: validated.experience_years,
        cover_letter: validated.cover_letter,
        resume_url: resumeUrl,
      });

      if (error) throw error;

      // Send confirmation email
      try {
        await supabase.functions.invoke("send-candidate-confirmation", {
          body: {
            candidate_email: validated.email,
            candidate_name: validated.name,
            position: jobTitle,
            phone: validated.phone,
            experience_years: validated.experience_years,
            cover_letter: validated.cover_letter,
          },
        });
      } catch {
        // Don't fail submission if email fails
      }

      setSubmitted(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal to-lime rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-navy" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Application Sent Successfully!
              </h1>
              <p className="text-muted-foreground mb-8">
                Thank you for applying for <strong>{jobTitle}</strong>. We'll review your application and get back to you soon.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/careers">Browse More Jobs</Link>
                </Button>
                <Button asChild>
                  <Link to="/candidate/dashboard">My Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => navigate(`/careers/${id}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Details
            </Button>

            <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Apply for {jobTitle}
              </h1>
              <p className="text-muted-foreground mb-8">
                Fill out the form below to submit your application.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      max="50"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume Upload</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="resume" className="cursor-pointer">
                      <span className="text-primary font-medium">Click to upload</span>
                      <span className="text-muted-foreground"> or drag and drop</span>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (max 5MB)</p>
                    </label>
                    {resumeFile && (
                      <p className="text-sm text-foreground mt-2 font-medium">{resumeFile.name}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover">Why should we hire you? *</Label>
                  <Textarea
                    id="cover"
                    rows={5}
                    value={formData.cover_letter}
                    onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                    placeholder="Tell us about your relevant experience and why you're excited about this role..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-teal to-lime text-navy font-semibold hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JobApply;
