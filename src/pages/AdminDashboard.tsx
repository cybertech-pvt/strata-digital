import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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
  Mail,
  Users,
  Briefcase,
  LogOut,
  RefreshCw,
  Calendar,
  Building2,
  Phone,
  Linkedin,
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
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingData, setLoadingData] = useState(true);

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
      const [contactsRes, subscribersRes, applicationsRes] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false }),
        supabase.from("job_applications").select("*").order("created_at", { ascending: false }),
      ]);

      if (contactsRes.data) setContacts(contactsRes.data);
      if (subscribersRes.data) setSubscribers(subscribersRes.data);
      if (applicationsRes.data) setApplications(applicationsRes.data);
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
                Manage contact submissions, newsletter subscribers, and job applications
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card p-6 rounded-xl border border-border shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal to-lime rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{contacts.length}</div>
                  <div className="text-muted-foreground text-sm">Contact Submissions</div>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal to-lime rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{subscribers.length}</div>
                  <div className="text-muted-foreground text-sm">Newsletter Subscribers</div>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal to-lime rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{applications.length}</div>
                  <div className="text-muted-foreground text-sm">Job Applications</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="bg-card border border-border">
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
            </TabsList>

            {/* Contact Submissions */}
            <TabsContent value="contacts">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
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
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Newsletter Subscribers */}
            <TabsContent value="subscribers">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Subscribed On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
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
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Job Applications */}
            <TabsContent value="applications">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Cover Letter</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
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
                            <TableCell className="max-w-xs">
                              <p className="text-sm text-muted-foreground line-clamp-3">
                                {app.cover_letter}
                              </p>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {formatDate(app.created_at)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
