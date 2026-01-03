import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, 
  Eye, 
  Heart, 
  ArrowRight,
  Award,
  Users,
  Globe,
  Lightbulb
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace emerging technologies and creative thinking to deliver breakthrough solutions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in every project, ensuring quality and precision.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We build lasting relationships through transparency, honesty, and ethical practices.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work as partners with our clients, fostering teamwork and shared success.",
  },
];

const milestones = [
  { year: "2025", title: "Company Founded", description: "Cybervibe Global Solutions Pvt Ltd incorporated in Tamil Nadu, India" },
  { year: "2025", title: "Cybersecurity Excellence", description: "Launched end-to-end protection services including network security and vulnerability assessments" },
  { year: "2025", title: "Cloud & IT Infrastructure", description: "Established scalable and secure IT environment solutions for businesses" },
  { year: "2025", title: "Managed IT Services", description: "Introduced proactive monitoring and maintenance for zero downtime" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-navy">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-teal/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-lime font-semibold text-sm uppercase tracking-wider">
              Who We Are
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Securing Tomorrow's Technology, Today
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Cybervibe Global Solutions Pvt Ltd is a premier Information Technology and 
              Cybersecurity firm dedicated to empowering businesses through digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="CYBERVIBE headquarters in Tamil Nadu"
                className="rounded-3xl shadow-2xl w-full object-cover border border-teal/20"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Your Strategic Technology Partner
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Incorporated in 2025 and headquartered in Tamil Nadu, we specialize in 
                providing cutting-edge IT infrastructure, cloud solutions, and robust 
                cybersecurity frameworks tailored for the modern digital era.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In an era where cyber threats are evolving and digital infrastructure 
                is the heart of every enterprise, Cybervibe provides the expertise, tools, 
                and strategic vision needed to stay ahead. We don't just provide tools; 
                we build strategic partnerships with transparency, integrity, and measurable results.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-teal" />
                  <div>
                    <div className="font-bold text-2xl text-foreground">Tamil Nadu</div>
                    <div className="text-sm text-muted-foreground">Headquarters</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-teal" />
                  <div>
                    <div className="font-bold text-2xl text-foreground">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <div className="bg-navy-light p-8 rounded-2xl border border-teal/20">
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">
                To deliver world-class IT solutions and ironclad cybersecurity frameworks 
                that enable our clients to innovate with confidence and operate without boundaries.
              </p>
            </div>

            {/* What We Do */}
            <div className="bg-navy-light p-8 rounded-2xl border border-teal/20">
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">What We Do</h3>
              <p className="text-white/70 leading-relaxed">
                We specialize in Cybersecurity Excellence, IT Infrastructure & Cloud, 
                Managed IT Services, and Software & Automation solutions for businesses of all sizes.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="bg-navy-light p-8 rounded-2xl border border-teal/20 md:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us</h3>
              <p className="text-white/70 leading-relaxed">
                We combine technical precision with deep understanding of business workflows, 
                committed to transparency, integrity, and delivering measurable results.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              The principles that guide our work and define who we are as an organization.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-teal/20 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-teal" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                <p className="text-sm text-white/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones that have shaped our growth and success over the years.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-teal/30 hidden md:block" />
              
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year} 
                  className="relative pl-0 md:pl-20 pb-12 last:pb-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-6 top-0 w-4 h-4 rounded-full gradient-primary" />
                  
                  <div className="bg-card p-6 rounded-2xl shadow-card border border-border hover:border-teal/30 transition-colors">
                    <span className="text-lime font-bold text-lg">{milestone.year}</span>
                    <h4 className="text-xl font-semibold text-foreground mt-2 mb-2">{milestone.title}</h4>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Discover how CYBERVIBE can help transform your business through innovative 
            technology solutions.
          </p>
          <Button asChild size="lg" className="gradient-cta text-white hover:opacity-90 shadow-glow">
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
