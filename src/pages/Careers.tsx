import { useState } from "react";
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
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Globe,
  Rocket,
  Users,
  ArrowRight,
  MapPin,
  Clock,
  X,
  Send,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Turnstile, useTurnstile } from "@/components/ui/turnstile";
import { z } from "zod";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

const applicationSchema = z.object({
  position: z.string().min(1, "Please select a position"),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  experience_years: z.number().min(0).max(50),
  current_company: z.string().trim().max(100).optional(),
  linkedin_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  cover_letter: z.string().trim().min(50, "Cover letter must be at least 50 characters").max(2000),
});

const benefits = [
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Access to world-class training programs, certifications, and conferences to accelerate your career growth.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental wellness programs, and gym membership benefits.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    description: "Work with international clients and teams, with opportunities for global assignments.",
  },
  {
    icon: Rocket,
    title: "Innovation Culture",
    description: "Work on cutting-edge technologies and contribute to innovation labs and hackathons.",
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    description: "Join a diverse team of experts who collaborate, mentor, and support each other.",
  },
  {
    icon: Briefcase,
    title: "Work-Life Balance",
    description: "Flexible work arrangements, generous PTO, and family-friendly policies.",
  },
];

const openPositions = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
  },
  {
    title: "Cloud Solutions Architect",
    department: "Cloud Practice",
    location: "Multiple Locations",
    type: "Full-time",
  },
  {
    title: "Cybersecurity Analyst",
    department: "Security",
    location: "Remote / Hybrid",
    type: "Full-time",
  },
  {
    title: "Data Scientist",
    department: "AI & Analytics",
    location: "Multiple Locations",
    type: "Full-time",
  },
  {
    title: "Project Manager",
    department: "Delivery",
    location: "Remote / Hybrid",
    type: "Full-time",
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
  },
];

const Careers = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience_years: "",
    current_company: "",
    linkedin_url: "",
    cover_letter: "",
  });
  const { token: turnstileToken, isVerified, handleVerify, handleExpire, handleError, reset: resetTurnstile } = useTurnstile();

  const handleApply = (positionTitle: string) => {
    setSelectedPosition(positionTitle);
    setShowApplicationForm(true);
    resetTurnstile(); // Reset CAPTCHA when opening form
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify CAPTCHA before submission
    if (!isVerified || !turnstileToken) {
      toast.error("Please complete the CAPTCHA verification.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const validatedData = applicationSchema.parse({
        position: selectedPosition,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experience_years: parseInt(formData.experience_years) || 0,
        current_company: formData.current_company || undefined,
        linkedin_url: formData.linkedin_url || undefined,
        cover_letter: formData.cover_letter,
      });

      // Check rate limit before submission
      let rateLimitPassed = true;
      try {
        const { data: rateLimitData, error: rateLimitError } = await supabase.functions.invoke('rate-limit', {
          body: { formType: 'job_application', email: validatedData.email }
        });

        if (rateLimitError) {
          console.error('Rate limit check failed:', rateLimitError);
          // Continue with submission if rate limit check fails (fail-open for UX)
        } else if (rateLimitData && !rateLimitData.allowed) {
          toast.error(rateLimitData.error || "Too many applications. Please wait before submitting again.");
          setIsSubmitting(false);
          return;
        }
      } catch (rateLimitCatchError) {
        console.error('Rate limit function error:', rateLimitCatchError);
        // Continue with submission if rate limit check fails (fail-open for UX)
      }

      console.log('Submitting application with data:', validatedData);

      const { error } = await supabase.from("job_applications").insert({
        position: validatedData.position,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        experience_years: validatedData.experience_years,
        current_company: validatedData.current_company || null,
        linkedin_url: validatedData.linkedin_url || null,
        cover_letter: validatedData.cover_letter,
      });

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      console.log('Application submitted successfully');

      // Send confirmation email to candidate + notification to employer
      try {
        await supabase.functions.invoke('send-candidate-confirmation', {
          body: {
            candidate_email: validatedData.email,
            candidate_name: validatedData.name,
            position: validatedData.position,
            phone: validatedData.phone,
            experience_years: validatedData.experience_years,
            current_company: validatedData.current_company || '',
            linkedin_url: validatedData.linkedin_url || '',
            cover_letter: validatedData.cover_letter,
          }
        });
      } catch (emailError) {
        console.error('Failed to send emails:', emailError);
        // Don't fail the submission if email fails
      }

      toast.success("Application submitted successfully! We'll be in touch soon.");
      setShowApplicationForm(false);
      resetTurnstile();
      setFormData({
        name: "",
        email: "",
        phone: "",
        experience_years: "",
        current_company: "",
        linkedin_url: "",
        cover_letter: "",
      });
      setSelectedPosition("");
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error && typeof error === 'object' && 'message' in error) {
        toast.error(`Failed to submit: ${(error as { message: string }).message}`);
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-navy">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-br from-lime/5 via-transparent to-teal/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/50 to-navy" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gradient-radial from-teal/15 to-transparent rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-gradient-radial from-lime/10 to-transparent rounded-full" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Careers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Build Your Future With Us
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Join a team of innovators and experts shaping the future of technology. 
              Grow your career while making a meaningful impact.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
              <a href="#positions">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Culture
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-6">
                Where Talent Thrives
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                At CYBERVIBE, we believe that great work comes from empowered people. 
                Our culture fosters innovation, collaboration, and continuous growth.
              </p>
              <p className="text-muted-foreground mb-8">
                We're building a diverse, inclusive workplace where every voice matters 
                and everyone has the opportunity to make an impact. Whether you're just 
                starting your career or are a seasoned professional, you'll find 
                challenging projects and supportive colleagues here.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-lime mb-1">2,000+</div>
                  <div className="text-muted-foreground">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-lime mb-1">40+</div>
                  <div className="text-muted-foreground">Nationalities</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-lime mb-1">95%</div>
                  <div className="text-muted-foreground">Employee Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-lime mb-1">4.5★</div>
                  <div className="text-muted-foreground">Glassdoor Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="CYBERVIBE team members collaborating in a modern office"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Work With Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer competitive compensation and a comprehensive benefits package 
              designed to support your well-being and professional growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-card p-8 rounded-2xl shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal to-lime rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our current openings and find your next opportunity.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <div
                key={position.title}
                className="group bg-card p-6 rounded-2xl shadow-card hover-lift cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{position.department}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleApply(position.title)}
                    variant="outline" 
                    className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don't see a position that fits? We're always looking for talented individuals.
            </p>
            <Button 
              onClick={() => {
                setSelectedPosition("General Application");
                setShowApplicationForm(true);
              }}
              variant="outline" 
              size="lg"
            >
              Submit Your Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">Apply for Position</h3>
                <p className="text-muted-foreground">{selectedPosition}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowApplicationForm(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Select 
                    value={formData.experience_years}
                    onValueChange={(value) => setFormData({ ...formData, experience_years: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Fresher (0 years)</SelectItem>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="2">2 years</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="4">4 years</SelectItem>
                      <SelectItem value="5">5+ years</SelectItem>
                      <SelectItem value="10">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Current Company</Label>
                  <Input
                    id="company"
                    value={formData.current_company}
                    onChange={(e) => setFormData({ ...formData, current_company: e.target.value })}
                    placeholder="Your current employer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover_letter">Cover Letter *</Label>
                <Textarea
                  id="cover_letter"
                  value={formData.cover_letter}
                  onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                  placeholder="Tell us about yourself, your experience, and why you're interested in this position..."
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground">Minimum 50 characters</p>
              </div>

              <div className="mt-4">
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  onVerify={handleVerify}
                  onExpire={handleExpire}
                  onError={handleError}
                  theme="dark"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowApplicationForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90"
                  disabled={isSubmitting || !isVerified}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join our team of innovators and help shape the future of technology. 
            Your next great opportunity starts here.
          </p>
          <p className="text-white/60 text-sm mb-6">
            For career inquiries, contact us at{" "}
            <a href="mailto:careers@cybervibeglobal.com" className="text-lime hover:underline">
              careers@cybervibeglobal.com
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
              <a href="#positions">
                Explore Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" className="bg-navy border-2 border-lime text-lime hover:bg-lime/10">
              <Link to="/candidate/login">
                Candidate Portal
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm mb-3">Already part of our team?</p>
            <Button asChild variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <Link to="/employee/login">
                Employee Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
