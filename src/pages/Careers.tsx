import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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
  Clock
} from "lucide-react";

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
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Careers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
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
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
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
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Submit Your Resume
              </Link>
            </Button>
          </div>
        </div>
      </section>

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
          <Button asChild size="lg" className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
            <a href="#positions">
              Explore Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
