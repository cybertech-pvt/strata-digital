import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Mail,
  Users,
  Briefcase,
  LogOut,
  RefreshCw,
  Calendar,
  Phone,
  Linkedin,
  Trash2,
  Plus,
  Edit,
  Megaphone,
  UserCog,
  CalendarPlus,
  Video,
  Building,
} from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience_years: number;
  current_company: string | null;
  linkedin_url: string | null;
  cover_letter: string;
  status: string;
  created_at: string;
  user_id: string | null;
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
  is_active: boolean;
  created_at: string;
}

interface LeaveRequest {
  id: string;
  user_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string | null;
  status: string;
  created_at: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  created_at: string;
}

interface Interview {
  id: string;
  application_id: string | null;
  candidate_id: string;
  scheduled_by: string | null;
  interview_date: string;
  interview_type: string;
  location: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

interface Profile {
  user_id: string;
  email: string;
  full_name: string | null;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Form states
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    salary_range: "",
    is_active: true,
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    is_published: false,
  });

  const [roleForm, setRoleForm] = useState({
    user_id: "",
    role: "",
  });

  const [interviewForm, setInterviewForm] = useState({
    interview_date: "",
    interview_type: "video",
    location: "",
    notes: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchAllData();
    }
  }, [user, isAdmin]);

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [
        contactsRes,
        subscribersRes,
        applicationsRes,
        jobPostsRes,
        leaveRes,
        announcementsRes,
        rolesRes,
        profilesRes,
        interviewsRes,
      ] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false }),
        supabase.from("job_applications").select("*").order("created_at", { ascending: false }),
        supabase.from("job_posts").select("*").order("created_at", { ascending: false }),
        supabase.from("leave_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("announcements").select("*").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("user_id, email, full_name"),
        supabase.from("interviews").select("*").order("interview_date", { ascending: false }),
      ]);

      if (contactsRes.data) setContacts(contactsRes.data);
      if (subscribersRes.data) setSubscribers(subscribersRes.data);
      if (applicationsRes.data) setApplications(applicationsRes.data);
      if (jobPostsRes.data) setJobPosts(jobPostsRes.data);
      if (leaveRes.data) setLeaveRequests(leaveRes.data);
      if (announcementsRes.data) setAnnouncements(announcementsRes.data);
      if (rolesRes.data) setUserRoles(rolesRes.data);
      if (profilesRes.data) setProfiles(profilesRes.data);
      if (interviewsRes.data) setInterviews(interviewsRes.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Delete handlers
  const handleDeleteContact = async (id: string) => {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete contact", variant: "destructive" });
    } else {
      setContacts(contacts.filter((c) => c.id !== id));
      toast({ title: "Deleted", description: "Contact submission deleted" });
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete subscriber", variant: "destructive" });
    } else {
      setSubscribers(subscribers.filter((s) => s.id !== id));
      toast({ title: "Deleted", description: "Subscriber removed" });
    }
  };

  const handleDeleteApplication = async (id: string) => {
    const { error } = await supabase.from("job_applications").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete application", variant: "destructive" });
    } else {
      setApplications(applications.filter((a) => a.id !== id));
      toast({ title: "Deleted", description: "Application deleted" });
    }
  };

  const handleUpdateApplicationStatus = async (id: string, status: string) => {
    const application = applications.find((a) => a.id === id);
    
    const { error } = await supabase.from("job_applications").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      setApplications(applications.map((a) => (a.id === id ? { ...a, status } : a)));
      toast({ title: "Updated", description: `Application marked as ${status}` });

      // Send email notification
      if (application) {
        try {
          const response = await supabase.functions.invoke("send-application-notification", {
            body: {
              application_id: id,
              new_status: status,
              candidate_email: application.email,
              candidate_name: application.name,
              position: application.position,
            },
          });
          
          if (response.error) {
            console.error("Failed to send notification email:", response.error);
          } else {
            toast({ title: "Email Sent", description: "Candidate has been notified" });
          }
        } catch (err) {
          console.error("Email notification error:", err);
        }
      }
    }
  };

  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  // Interview scheduling
  const handleScheduleInterview = async () => {
    if (!selectedApplication || !interviewForm.interview_date) {
      toast({ title: "Error", description: "Please select a date and time", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("interviews").insert({
      application_id: selectedApplication.id,
      candidate_id: selectedApplication.user_id,
      scheduled_by: user?.id,
      interview_date: interviewForm.interview_date,
      interview_type: interviewForm.interview_type,
      location: interviewForm.location || null,
      notes: interviewForm.notes || null,
      status: "scheduled",
    });

    if (error) {
      toast({ title: "Error", description: "Failed to schedule interview", variant: "destructive" });
    } else {
      toast({ title: "Scheduled", description: "Interview has been scheduled" });
      setShowInterviewForm(false);
      setSelectedApplication(null);
      setInterviewForm({ interview_date: "", interview_type: "video", location: "", notes: "" });
      fetchAllData();

      // Send email notification for interview
      try {
        await supabase.functions.invoke("send-application-notification", {
          body: {
            application_id: selectedApplication.id,
            new_status: "interview_scheduled",
            candidate_email: selectedApplication.email,
            candidate_name: selectedApplication.name,
            position: selectedApplication.position,
          },
        });
      } catch (err) {
        console.error("Interview notification error:", err);
      }
    }
  };

  const handleUpdateInterviewStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("interviews")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update interview status", variant: "destructive" });
    } else {
      setInterviews(interviews.map((i) => (i.id === id ? { ...i, status } : i)));
      toast({ title: "Updated", description: `Interview marked as ${status}` });
    }
  };

  const handleRescheduleInterview = (interview: Interview) => {
    setEditingInterview(interview);
    setInterviewForm({
      interview_date: interview.interview_date.slice(0, 16),
      interview_type: interview.interview_type,
      location: interview.location || "",
      notes: interview.notes || "",
    });
  };

  const handleSaveReschedule = async () => {
    if (!editingInterview || !interviewForm.interview_date) {
      toast({ title: "Error", description: "Please select a date and time", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from("interviews")
      .update({
        interview_date: interviewForm.interview_date,
        interview_type: interviewForm.interview_type,
        location: interviewForm.location || null,
        notes: interviewForm.notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingInterview.id);

    if (error) {
      toast({ title: "Error", description: "Failed to reschedule interview", variant: "destructive" });
    } else {
      toast({ title: "Rescheduled", description: "Interview has been rescheduled" });
      setEditingInterview(null);
      setInterviewForm({ interview_date: "", interview_type: "video", location: "", notes: "" });
      fetchAllData();
    }
  };

  // Job post handlers
  const handleSaveJobPost = async () => {
    if (editingJob) {
      const { error } = await supabase
        .from("job_posts")
        .update({
          ...jobForm,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingJob.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update job post", variant: "destructive" });
      } else {
        toast({ title: "Updated", description: "Job post updated" });
        fetchAllData();
      }
    } else {
      const { error } = await supabase.from("job_posts").insert({
        ...jobForm,
        created_by: user?.id,
      });

      if (error) {
        toast({ title: "Error", description: "Failed to create job post", variant: "destructive" });
      } else {
        toast({ title: "Created", description: "Job post created" });
        fetchAllData();
      }
    }

    setShowJobForm(false);
    setEditingJob(null);
    setJobForm({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      description: "",
      requirements: "",
      salary_range: "",
      is_active: true,
    });
  };

  const handleEditJob = (job: JobPost) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements || "",
      salary_range: job.salary_range || "",
      is_active: job.is_active,
    });
    setShowJobForm(true);
  };

  const handleDeleteJobPost = async (id: string) => {
    const { error } = await supabase.from("job_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete job post", variant: "destructive" });
    } else {
      setJobPosts(jobPosts.filter((j) => j.id !== id));
      toast({ title: "Deleted", description: "Job post deleted" });
    }
  };

  // Announcement handlers
  const handleSaveAnnouncement = async () => {
    if (editingAnnouncement) {
      const { error } = await supabase
        .from("announcements")
        .update({
          ...announcementForm,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingAnnouncement.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update announcement", variant: "destructive" });
      } else {
        toast({ title: "Updated", description: "Announcement updated" });
        fetchAllData();
      }
    } else {
      const { error } = await supabase.from("announcements").insert({
        ...announcementForm,
        created_by: user?.id,
      });

      if (error) {
        toast({ title: "Error", description: "Failed to create announcement", variant: "destructive" });
      } else {
        toast({ title: "Created", description: "Announcement created" });
        fetchAllData();
      }
    }

    setShowAnnouncementForm(false);
    setEditingAnnouncement(null);
    setAnnouncementForm({ title: "", content: "", is_published: false });
  };

  const handleDeleteAnnouncement = async (id: string) => {
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete announcement", variant: "destructive" });
    } else {
      setAnnouncements(announcements.filter((a) => a.id !== id));
      toast({ title: "Deleted", description: "Announcement deleted" });
    }
  };

  // Leave request handler
  const handleUpdateLeaveStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("leave_requests")
      .update({ status, reviewed_by: user?.id, reviewed_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update leave request", variant: "destructive" });
    } else {
      setLeaveRequests(leaveRequests.map((l) => (l.id === id ? { ...l, status } : l)));
      toast({ title: "Updated", description: `Leave request ${status}` });
    }
  };

  // User role handlers
  const handleAssignRole = async () => {
    if (!roleForm.user_id || !roleForm.role) {
      toast({ title: "Error", description: "Please select a user and role", variant: "destructive" });
      return;
    }

    // Check if user already has this role
    const existingRole = userRoles.find(
      (r) => r.user_id === roleForm.user_id && r.role === roleForm.role
    );

    if (existingRole) {
      toast({ title: "Error", description: "User already has this role", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("user_roles").insert({
      user_id: roleForm.user_id,
      role: roleForm.role as "admin" | "employee" | "candidate",
    });

    if (error) {
      toast({ title: "Error", description: "Failed to assign role", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Role assigned successfully" });
      setShowRoleForm(false);
      setRoleForm({ user_id: "", role: "" });
      fetchAllData();
    }
  };

  const handleUpdateUserRole = async (roleId: string, newRole: string) => {
    const { error } = await supabase
      .from("user_roles")
      .update({ role: newRole as "admin" | "employee" | "candidate" })
      .eq("id", roleId);

    if (error) {
      toast({ title: "Error", description: "Failed to update role", variant: "destructive" });
    } else {
      setUserRoles(userRoles.map((r) => (r.id === roleId ? { ...r, role: newRole } : r)));
      toast({ title: "Updated", description: "Role updated successfully" });
    }
  };

  const handleDeleteUserRole = async (roleId: string) => {
    const { error } = await supabase.from("user_roles").delete().eq("id", roleId);

    if (error) {
      toast({ title: "Error", description: "Failed to remove role", variant: "destructive" });
    } else {
      setUserRoles(userRoles.filter((r) => r.id !== roleId));
      toast({ title: "Removed", description: "Role removed from user" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-500";
      case "reviewed":
        return "bg-blue-500/20 text-blue-500";
      case "accepted":
      case "approved":
        return "bg-lime/20 text-lime";
      case "rejected":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getProfileName = (userId: string) => {
    const profile = profiles.find((p) => p.user_id === userId);
    return profile?.full_name || profile?.email || userId.slice(0, 8);
  };

  if (loading) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen bg-navy">
          <div className="container mx-auto px-4 text-center">
            <div className="text-white text-xl">Loading...</div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen bg-navy">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-white/70 mb-8">
              You do not have permission to access the admin dashboard.
            </p>
            <Button onClick={handleSignOut} variant="outline" className="border-teal text-teal hover:bg-teal/10">
              Sign Out
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Complete control over your platform
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={fetchAllData}
                variant="outline"
                disabled={loadingData}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="gap-2 text-destructive hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal to-lime rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{contacts.length}</div>
                  <div className="text-xs text-muted-foreground">Contacts</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal to-lime rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{subscribers.length}</div>
                  <div className="text-xs text-muted-foreground">Subscribers</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal to-lime rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{applications.length}</div>
                  <div className="text-xs text-muted-foreground">Applications</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal to-lime rounded-lg flex items-center justify-center">
                  <UserCog className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{userRoles.length}</div>
                  <div className="text-xs text-muted-foreground">Users</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="bg-card border border-border flex-wrap h-auto">
              <TabsTrigger value="contacts" className="gap-2">
                <Mail className="w-4 h-4" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="subscribers" className="gap-2">
                <Users className="w-4 h-4" />
                Subscribers
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="jobs" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Job Posts
              </TabsTrigger>
              <TabsTrigger value="announcements" className="gap-2">
                <Megaphone className="w-4 h-4" />
                Announcements
              </TabsTrigger>
              <TabsTrigger value="leave" className="gap-2">
                <Calendar className="w-4 h-4" />
                Leave Requests
              </TabsTrigger>
              <TabsTrigger value="interviews" className="gap-2">
                <CalendarPlus className="w-4 h-4" />
                Interviews
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <UserCog className="w-4 h-4" />
                Users
              </TabsTrigger>
            </TabsList>

            {/* Contact Submissions */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            No contact submissions yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        contacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell className="font-medium">{contact.name}</TableCell>
                            <TableCell>
                              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                                {contact.email}
                              </a>
                            </TableCell>
                            <TableCell>{contact.company || "-"}</TableCell>
                            <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {formatDate(contact.created_at)}
                            </TableCell>
                            <TableCell>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this contact submission? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteContact(contact.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Newsletter Subscribers */}
            <TabsContent value="subscribers">
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Subscribed On</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            No newsletter subscribers yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        subscribers.map((subscriber) => (
                          <TableRow key={subscriber.id}>
                            <TableCell>
                              <a href={`mailto:${subscriber.email}`} className="text-primary hover:underline">
                                {subscriber.email}
                              </a>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  subscriber.is_active
                                    ? "bg-lime/20 text-lime"
                                    : "bg-destructive/20 text-destructive"
                                }`}
                              >
                                {subscriber.is_active ? "Active" : "Inactive"}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {formatDate(subscriber.subscribed_at)}
                            </TableCell>
                            <TableCell>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Subscriber</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove this subscriber? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteSubscriber(subscriber.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Job Applications */}
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                            No job applications yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{app.name}</div>
                                <div className="text-sm text-muted-foreground">{app.current_company}</div>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-primary">{app.position}</TableCell>
                            <TableCell>{app.experience_years} years</TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <a href={`mailto:${app.email}`} className="text-primary hover:underline text-sm flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {app.email}
                                </a>
                                <span className="text-sm flex items-center gap-1 text-muted-foreground">
                                  <Phone className="w-3 h-3" />
                                  {app.phone}
                                </span>
                                {app.linkedin_url && (
                                  <a
                                    href={app.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline text-sm flex items-center gap-1"
                                  >
                                    <Linkedin className="w-3 h-3" />
                                    LinkedIn
                                  </a>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={app.status}
                                onValueChange={(v) => handleUpdateApplicationStatus(app.id, v)}
                              >
                                <SelectTrigger className="w-28">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="reviewed">Reviewed</SelectItem>
                                  <SelectItem value="accepted">Accepted</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {formatDate(app.created_at)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedApplication(app);
                                    setShowInterviewForm(true);
                                  }}
                                  title="Schedule Interview"
                                >
                                  <CalendarPlus className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Application</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this application? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteApplication(app.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Job Posts */}
            <TabsContent value="jobs">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Job Posts</CardTitle>
                    <CardDescription>Manage job postings</CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      setEditingJob(null);
                      setJobForm({
                        title: "",
                        department: "",
                        location: "",
                        type: "Full-time",
                        description: "",
                        requirements: "",
                        salary_range: "",
                        is_active: true,
                      });
                      setShowJobForm(true);
                    }}
                    className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Job Post
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {showJobForm && (
                    <div className="p-4 bg-secondary/50 rounded-lg space-y-4">
                      <h3 className="font-semibold">{editingJob ? "Edit Job Post" : "Create Job Post"}</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={jobForm.title}
                            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                            placeholder="Senior Software Engineer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Department</Label>
                          <Input
                            value={jobForm.department}
                            onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                            placeholder="Engineering"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            value={jobForm.location}
                            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                            placeholder="Remote / Hybrid"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select
                            value={jobForm.type}
                            onValueChange={(v) => setJobForm({ ...jobForm, type: v })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">Full-time</SelectItem>
                              <SelectItem value="Part-time">Part-time</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Internship">Internship</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Salary Range</Label>
                          <Input
                            value={jobForm.salary_range}
                            onChange={(e) => setJobForm({ ...jobForm, salary_range: e.target.value })}
                            placeholder="$80k - $120k"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={jobForm.description}
                          onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Requirements</Label>
                        <Textarea
                          value={jobForm.requirements}
                          onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveJobPost} className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
                          {editingJob ? "Update" : "Create"}
                        </Button>
                        <Button variant="outline" onClick={() => setShowJobForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobPosts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            No job posts yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        jobPosts.map((job) => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>{job.department}</TableCell>
                            <TableCell>{job.location}</TableCell>
                            <TableCell>{job.type}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  job.is_active
                                    ? "bg-lime/20 text-lime"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {job.is_active ? "Active" : "Inactive"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditJob(job)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Job Post</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this job post? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteJobPost(job.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Announcements */}
            <TabsContent value="announcements">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription>Manage company announcements for employees</CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      setEditingAnnouncement(null);
                      setAnnouncementForm({ title: "", content: "", is_published: false });
                      setShowAnnouncementForm(true);
                    }}
                    className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Announcement
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {showAnnouncementForm && (
                    <div className="p-4 bg-secondary/50 rounded-lg space-y-4">
                      <h3 className="font-semibold">{editingAnnouncement ? "Edit Announcement" : "Create Announcement"}</h3>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={announcementForm.title}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                          placeholder="Announcement title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Content</Label>
                        <Textarea
                          value={announcementForm.content}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                          rows={5}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="is_published"
                          checked={announcementForm.is_published}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, is_published: e.target.checked })}
                          className="rounded border-border"
                        />
                        <Label htmlFor="is_published">Publish immediately</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveAnnouncement} className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
                          {editingAnnouncement ? "Update" : "Create"}
                        </Button>
                        <Button variant="outline" onClick={() => setShowAnnouncementForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {announcements.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No announcements yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        announcements.map((announcement) => (
                          <TableRow key={announcement.id}>
                            <TableCell className="font-medium">{announcement.title}</TableCell>
                            <TableCell className="max-w-xs truncate">{announcement.content}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  announcement.is_published
                                    ? "bg-lime/20 text-lime"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {announcement.is_published ? "Published" : "Draft"}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {formatDate(announcement.created_at)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setEditingAnnouncement(announcement);
                                    setAnnouncementForm({
                                      title: announcement.title,
                                      content: announcement.content,
                                      is_published: announcement.is_published,
                                    });
                                    setShowAnnouncementForm(true);
                                  }}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this announcement? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteAnnouncement(announcement.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leave Requests */}
            <TabsContent value="leave">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>Review and manage employee leave requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                            No leave requests yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        leaveRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{getProfileName(request.user_id)}</TableCell>
                            <TableCell className="capitalize">{request.leave_type}</TableCell>
                            <TableCell>
                              {formatDate(request.start_date).split(",")[0]} - {formatDate(request.end_date).split(",")[0]}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{request.reason || "-"}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              {request.status === "pending" && (
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-lime border-lime hover:bg-lime/10"
                                    onClick={() => handleUpdateLeaveStatus(request.id, "approved")}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive border-destructive hover:bg-destructive/10"
                                    onClick={() => handleUpdateLeaveStatus(request.id, "rejected")}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Interviews */}
            <TabsContent value="interviews">
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Interviews</CardTitle>
                  <CardDescription>Manage interview schedules with candidates</CardDescription>
                </CardHeader>
                <CardContent>
                  {editingInterview && (
                    <div className="p-4 bg-secondary/50 rounded-lg space-y-4 mb-6">
                      <h3 className="font-semibold">
                        Reschedule Interview - {getProfileName(editingInterview.candidate_id)}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date & Time</Label>
                          <Input
                            type="datetime-local"
                            value={interviewForm.interview_date}
                            onChange={(e) => setInterviewForm({ ...interviewForm, interview_date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Interview Type</Label>
                          <Select
                            value={interviewForm.interview_type}
                            onValueChange={(v) => setInterviewForm({ ...interviewForm, interview_type: v })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">Video Call</SelectItem>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="in-person">In-Person</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Location / Meeting Link</Label>
                        <Input
                          value={interviewForm.location}
                          onChange={(e) => setInterviewForm({ ...interviewForm, location: e.target.value })}
                          placeholder="e.g., Zoom link or office address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea
                          value={interviewForm.notes}
                          onChange={(e) => setInterviewForm({ ...interviewForm, notes: e.target.value })}
                          placeholder="Additional notes..."
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveReschedule} className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => { setEditingInterview(null); setInterviewForm({ interview_date: "", interview_type: "video", location: "", notes: "" }); }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {showInterviewForm && selectedApplication && (
                    <div className="p-4 bg-secondary/50 rounded-lg space-y-4 mb-6">
                      <h3 className="font-semibold">
                        Schedule Interview for {selectedApplication.name} - {selectedApplication.position}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date & Time</Label>
                          <Input
                            type="datetime-local"
                            value={interviewForm.interview_date}
                            onChange={(e) => setInterviewForm({ ...interviewForm, interview_date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Interview Type</Label>
                          <Select
                            value={interviewForm.interview_type}
                            onValueChange={(v) => setInterviewForm({ ...interviewForm, interview_type: v })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">Video Call</SelectItem>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="in-person">In-Person</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Location / Meeting Link</Label>
                        <Input
                          value={interviewForm.location}
                          onChange={(e) => setInterviewForm({ ...interviewForm, location: e.target.value })}
                          placeholder="e.g., Zoom link or office address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea
                          value={interviewForm.notes}
                          onChange={(e) => setInterviewForm({ ...interviewForm, notes: e.target.value })}
                          placeholder="Additional notes for the candidate..."
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleScheduleInterview} className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
                          Schedule Interview
                        </Button>
                        <Button variant="outline" onClick={() => { setShowInterviewForm(false); setSelectedApplication(null); }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {interviews.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                            No interviews scheduled yet. Click the calendar icon on an application to schedule one.
                          </TableCell>
                        </TableRow>
                      ) : (
                        interviews.map((interview) => (
                          <TableRow key={interview.id}>
                            <TableCell className="font-medium">
                              {getProfileName(interview.candidate_id)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {interview.interview_type === "video" ? (
                                  <Video className="w-4 h-4 text-primary" />
                                ) : (
                                  <Building className="w-4 h-4 text-primary" />
                                )}
                                <span className="capitalize">{interview.interview_type}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(interview.interview_date).toLocaleString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {interview.location || "-"}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                interview.status === "scheduled"
                                  ? "bg-blue-500/20 text-blue-500"
                                  : interview.status === "completed"
                                  ? "bg-lime/20 text-lime"
                                  : interview.status === "cancelled"
                                  ? "bg-destructive/20 text-destructive"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                {interview.status}
                              </span>
                            </TableCell>
                            <TableCell className="max-w-xs truncate text-muted-foreground">
                              {interview.notes || "-"}
                            </TableCell>
                            <TableCell>
                              {interview.status === "scheduled" && (
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-lime border-lime hover:bg-lime/10"
                                    onClick={() => handleUpdateInterviewStatus(interview.id, "completed")}
                                  >
                                    Complete
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive border-destructive hover:bg-destructive/10"
                                    onClick={() => handleUpdateInterviewStatus(interview.id, "cancelled")}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRescheduleInterview(interview)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users */}
            <TabsContent value="users">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>User Roles</CardTitle>
                    <CardDescription>Manage user roles and permissions</CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowRoleForm(!showRoleForm)}
                    className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Assign Role
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {showRoleForm && (
                    <div className="p-4 bg-secondary/50 rounded-lg space-y-4">
                      <h3 className="font-semibold">Assign Role to User</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Select User (by Email)</Label>
                          <Select
                            value={roleForm.user_id}
                            onValueChange={(v) => setRoleForm({ ...roleForm, user_id: v })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a user" />
                            </SelectTrigger>
                            <SelectContent>
                              {profiles.map((p) => (
                                <SelectItem key={p.user_id} value={p.user_id}>
                                  {p.email} {p.full_name ? `(${p.full_name})` : ""}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Select
                            value={roleForm.role}
                            onValueChange={(v) => setRoleForm({ ...roleForm, role: v })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="employee">Employee</SelectItem>
                              <SelectItem value="candidate">Candidate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAssignRole} className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
                          Assign Role
                        </Button>
                        <Button variant="outline" onClick={() => setShowRoleForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Assigned On</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRoles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No users yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        userRoles.map((role) => {
                          const userProfile = profiles.find((p) => p.user_id === role.user_id);
                          return (
                            <TableRow key={role.id}>
                              <TableCell className="font-medium">
                                {userProfile?.full_name || "—"}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {userProfile?.email || role.user_id.slice(0, 8)}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={role.role}
                                  onValueChange={(v) => handleUpdateUserRole(role.id, v)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="employee">Employee</SelectItem>
                                    <SelectItem value="candidate">Candidate</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {formatDate(role.created_at)}
                              </TableCell>
                              <TableCell>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Remove Role</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to remove this user's role? They will lose access to their portal.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteUserRole(role.id)}>
                                        Remove
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
