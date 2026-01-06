import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  User,
  FileText,
  LogOut,
  RefreshCw,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  linkedin_url: string | null;
  current_company: string | null;
  bio: string | null;
}

interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string | null;
  salary_range: string | null;
}

interface Application {
  id: string;
  position: string;
  status: string;
  created_at: string;
}

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [applying, setApplying] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/candidate/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "candidate")
      .maybeSingle();

    if (!roleData) {
      toast.error("Access denied. You are not a candidate.");
      navigate("/");
      return;
    }

    setUserId(session.user.id);
    await fetchData(session.user.id);
    setLoading(false);
  };

  const fetchData = async (uid: string) => {
    const [profileRes, jobsRes, appsRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle(),
      supabase.from("job_posts").select("*").eq("is_active", true).order("created_at", { ascending: false }),
      supabase.from("job_applications").select("id, position, status, created_at").eq("user_id", uid).order("created_at", { ascending: false }),
    ]);

    if (profileRes.data) setProfile(profileRes.data);
    if (jobsRes.data) setJobPosts(jobsRes.data);
    if (appsRes.data) setApplications(appsRes.data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;

    const formData = new FormData(e.currentTarget);
    const updates = {
      full_name: formData.get("full_name") as string,
      phone: formData.get("phone") as string,
      linkedin_url: formData.get("linkedin_url") as string,
      current_company: formData.get("current_company") as string,
      bio: formData.get("bio") as string,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", profile.user_id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
      setProfile({ ...profile, ...updates });
    }
  };

  const handleApply = async (job: JobPost) => {
    if (!userId || !profile) return;

    if (coverLetter.length < 50) {
      toast.error("Cover letter must be at least 50 characters");
      return;
    }

    setApplying(job.id);

    const { error } = await supabase.from("job_applications").insert({
      user_id: userId,
      job_post_id: job.id,
      position: job.title,
      name: profile.full_name || profile.email,
      email: profile.email,
      phone: profile.phone || "",
      experience_years: 0,
      cover_letter: coverLetter,
      status: "pending",
    });

    if (error) {
      if (error.message.includes("duplicate")) {
        toast.error("You have already applied for this position");
      } else {
        toast.error("Failed to submit application");
      }
    } else {
      toast.success("Application submitted successfully!");
      setCoverLetter("");
      if (userId) await fetchData(userId);
    }

    setApplying(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "reviewed":
        return "bg-blue-500/20 text-blue-500";
      case "accepted":
        return "bg-lime/20 text-lime";
      case "rejected":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen bg-background">
          <div className="container mx-auto px-4 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary" />
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Candidate Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {profile?.full_name || profile?.email}
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="gap-2 text-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="jobs" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Open Positions
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <FileText className="w-4 h-4" />
                My Applications
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs">
              <div className="grid gap-6">
                {jobPosts.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No open positions at the moment. Check back later!
                    </CardContent>
                  </Card>
                ) : (
                  jobPosts.map((job) => (
                    <Card key={job.id}>
                      <CardHeader>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex flex-wrap gap-4">
                          <span>{job.department}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                          {job.salary_range && <span>{job.salary_range}</span>}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{job.description}</p>
                        {job.requirements && (
                          <div>
                            <h4 className="font-semibold mb-2">Requirements</h4>
                            <p className="text-sm text-muted-foreground">{job.requirements}</p>
                          </div>
                        )}
                        <div className="space-y-2 pt-4 border-t">
                          <Label htmlFor={`cover-${job.id}`}>Cover Letter</Label>
                          <Textarea
                            id={`cover-${job.id}`}
                            placeholder="Tell us why you're a great fit for this role..."
                            value={applying === job.id ? coverLetter : ""}
                            onChange={(e) => {
                              setApplying(job.id);
                              setCoverLetter(e.target.value);
                            }}
                            rows={4}
                          />
                          <Button
                            onClick={() => handleApply(job)}
                            disabled={applying === job.id && coverLetter.length < 50}
                            className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>My Applications</CardTitle>
                  <CardDescription>Track the status of your job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                            You haven't applied to any positions yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.position}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(app.status)}`}>
                                {app.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(app.created_at)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          defaultValue={profile?.full_name || ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          defaultValue={profile?.phone || ""}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current_company">Current Company</Label>
                        <Input
                          id="current_company"
                          name="current_company"
                          defaultValue={profile?.current_company || ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                        <Input
                          id="linkedin_url"
                          name="linkedin_url"
                          defaultValue={profile?.linkedin_url || ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        defaultValue={profile?.bio || ""}
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
                      Update Profile
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default CandidateDashboard;
