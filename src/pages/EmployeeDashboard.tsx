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
  Megaphone,
  Calendar,
  Briefcase,
  LogOut,
  RefreshCw,
  Plus,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface LeaveRequest {
  id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string | null;
  status: string;
  created_at: string;
}

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience_years: number;
  linkedin_url: string | null;
  status: string;
  created_at: string;
}

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/employee/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "employee")
      .maybeSingle();

    if (!roleData) {
      toast.error("Access denied. You are not an employee.");
      navigate("/");
      return;
    }

    setUserId(session.user.id);
    await fetchData(session.user.id);
    setLoading(false);
  };

  const fetchData = async (uid: string) => {
    const [announcementsRes, leaveRes, appsRes] = await Promise.all([
      supabase
        .from("announcements")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false }),
      supabase
        .from("leave_requests")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false }),
      supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (announcementsRes.data) setAnnouncements(announcementsRes.data);
    if (leaveRes.data) setLeaveRequests(leaveRes.data);
    if (appsRes.data) setApplications(appsRes.data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    const { error } = await supabase.from("leave_requests").insert({
      user_id: userId,
      leave_type: leaveForm.leave_type,
      start_date: leaveForm.start_date,
      end_date: leaveForm.end_date,
      reason: leaveForm.reason || null,
      status: "pending",
    });

    if (error) {
      toast.error("Failed to submit leave request");
    } else {
      toast.success("Leave request submitted successfully");
      setShowLeaveForm(false);
      setLeaveForm({ leave_type: "", start_date: "", end_date: "", reason: "" });
      await fetchData(userId);
    }
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
      case "approved":
        return "bg-lime/20 text-lime";
      case "rejected":
        return "bg-destructive/20 text-destructive";
      case "reviewed":
        return "bg-blue-500/20 text-blue-500";
      case "accepted":
        return "bg-lime/20 text-lime";
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
              <h1 className="text-3xl font-bold text-foreground">Employee Dashboard</h1>
              <p className="text-muted-foreground">Welcome to your employee portal</p>
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

          <Tabs defaultValue="announcements" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="announcements" className="gap-2">
                <Megaphone className="w-4 h-4" />
                Announcements
              </TabsTrigger>
              <TabsTrigger value="leave" className="gap-2">
                <Calendar className="w-4 h-4" />
                Leave Requests
              </TabsTrigger>
              <TabsTrigger value="applications" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Job Applications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="announcements">
              <div className="grid gap-6">
                {announcements.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No announcements at the moment.
                    </CardContent>
                  </Card>
                ) : (
                  announcements.map((announcement) => (
                    <Card key={announcement.id}>
                      <CardHeader>
                        <CardTitle>{announcement.title}</CardTitle>
                        <CardDescription>{formatDate(announcement.created_at)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {announcement.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="leave">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Leave Requests</CardTitle>
                    <CardDescription>Submit and track your leave requests</CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowLeaveForm(!showLeaveForm)}
                    className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {showLeaveForm && (
                    <form onSubmit={handleSubmitLeave} className="space-y-4 p-4 bg-secondary/50 rounded-lg">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="leave_type">Leave Type</Label>
                          <Select
                            value={leaveForm.leave_type}
                            onValueChange={(v) => setLeaveForm({ ...leaveForm, leave_type: v })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="annual">Annual Leave</SelectItem>
                              <SelectItem value="sick">Sick Leave</SelectItem>
                              <SelectItem value="personal">Personal Leave</SelectItem>
                              <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start_date">Start Date</Label>
                          <Input
                            id="start_date"
                            type="date"
                            value={leaveForm.start_date}
                            onChange={(e) => setLeaveForm({ ...leaveForm, start_date: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end_date">End Date</Label>
                          <Input
                            id="end_date"
                            type="date"
                            value={leaveForm.end_date}
                            onChange={(e) => setLeaveForm({ ...leaveForm, end_date: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason (optional)</Label>
                        <Textarea
                          id="reason"
                          value={leaveForm.reason}
                          onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
                          Submit Request
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowLeaveForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No leave requests submitted yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        leaveRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium capitalize">{request.leave_type}</TableCell>
                            <TableCell>
                              {formatDate(request.start_date)} - {formatDate(request.end_date)}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {request.reason || "-"}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {formatDate(request.created_at)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                  <CardDescription>View and review candidate applications</CardDescription>
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
                            <TableCell className="font-medium">{app.name}</TableCell>
                            <TableCell className="text-primary">{app.position}</TableCell>
                            <TableCell>{app.experience_years} years</TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1 text-sm">
                                <a href={`mailto:${app.email}`} className="text-primary hover:underline flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {app.email}
                                </a>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Phone className="w-3 h-3" />
                                  {app.phone}
                                </span>
                                {app.linkedin_url && (
                                  <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                                    <Linkedin className="w-3 h-3" />
                                    LinkedIn
                                  </a>
                                )}
                              </div>
                            </TableCell>
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
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default EmployeeDashboard;
