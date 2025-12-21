import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, 
  Users, 
  Lock, 
  Globe, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Clock,
  HeadphonesIcon,
  TrendingUp
} from "lucide-react";

const differentiators = [
  {
    icon: Award,
    title: "Enterprise-Grade Solutions",
    description: "Battle-tested technologies and methodologies trusted by Fortune 500 companies. We deliver solutions that meet the most demanding enterprise requirements.",
    stats: "500+ Enterprise Clients",
  },
  {
    icon: Users,
    title: "Experienced Professionals",
    description: "A team of 2,000+ certified experts with deep domain expertise across technologies and industries. Average experience of 10+ years in the field.",
    stats: "2,000+ Certified Experts",
  },
  {
    icon: Lock,
    title: "Security-First Approach",
    description: "ISO 27001 certified with comprehensive security frameworks. We embed security into every layer of our solutions from design to deployment.",
    stats: "ISO 27001 Certified",
  },
  {
    icon: Zap,
    title: "Scalable & Reliable",
    description: "Systems designed for 99.99% uptime and seamless scalability. Our architecture supports growth from startup to enterprise scale.",
    stats: "99.99% Uptime SLA",
  },
  {
    icon: Globe,
    title: "Global Delivery Model",
    description: "24/7 support across multiple time zones and regions. Delivery centers strategically located to serve clients worldwide.",
    stats: "50+ Countries Served",
  },
  {
    icon: CheckCircle,
    title: "Proven Track Record",
    description: "Consistent delivery of successful enterprise implementations. 98% client satisfaction rate and long-term partnerships.",
    stats: "98% Client Satisfaction",
  },
];

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "500+", label: "Global Clients" },
  { value: "2,000+", label: "Technology Experts" },
  { value: "50+", label: "Countries Served" },
];

const certifications = [
  "ISO 27001:2013",
  "ISO 9001:2015",
  "SOC 2 Type II",
  "CMMI Level 5",
  "AWS Partner",
  "Microsoft Gold Partner",
  "Google Cloud Partner",
];

const WhyUs = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Your Trusted Technology Partner
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover what sets CYBERVIBE GLOBAL SOLUTIONS apart as a premier 
              technology consulting firm trusted by enterprises worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence and client success drives everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div
                key={item.title}
                className="bg-card p-8 rounded-2xl shadow-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                  {item.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Approach
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-6">
                Partnership-Driven Delivery
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We don't just deliver solutions—we become an extension of your team. 
                Our collaborative approach ensures alignment with your business goals 
                and seamless knowledge transfer.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Agile Delivery</h4>
                    <p className="text-muted-foreground">
                      Iterative development with continuous feedback and rapid adaptation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <HeadphonesIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">24/7 Support</h4>
                    <p className="text-muted-foreground">
                      Round-the-clock assistance across all time zones for critical operations.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Continuous Improvement</h4>
                    <p className="text-muted-foreground">
                      Ongoing optimization and enhancement of delivered solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                alt="Team collaboration and partnership approach"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Certifications & Partnerships
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-recognized certifications that validate our commitment to quality and security.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="px-6 py-3 bg-card rounded-full shadow-card text-foreground font-medium"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us show you why leading enterprises trust CYBERVIBE for their 
            most critical technology initiatives.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <Link to="/contact">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default WhyUs;
