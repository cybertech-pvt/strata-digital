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
  { year: "2009", title: "Company Founded", description: "Started with a vision to transform enterprises through technology" },
  { year: "2012", title: "Global Expansion", description: "Opened offices in North America and Europe" },
  { year: "2015", title: "500 Clients", description: "Reached milestone of serving 500+ enterprise clients" },
  { year: "2018", title: "AI Division Launch", description: "Established dedicated AI & Machine Learning practice" },
  { year: "2021", title: "Cloud Excellence", description: "Achieved premier partner status with major cloud providers" },
  { year: "2024", title: "Industry Leader", description: "Recognized as a top technology consulting firm globally" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Driving Digital Excellence Since 2009
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              CYBERVIBE GLOBAL SOLUTIONS PRIVATE LIMITED is a premier technology consulting 
              and services company, empowering enterprises to thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="CYBERVIBE corporate headquarters building"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Your Strategic Technology Partner
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                For over 15 years, CYBERVIBE has been at the forefront of technological 
                innovation, helping enterprises navigate complex digital transformations 
                and achieve sustainable competitive advantages.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of 2,000+ certified professionals brings deep expertise across 
                industries and technologies, delivering solutions that drive real business 
                outcomes. From Fortune 500 corporations to innovative startups, we partner 
                with organizations worldwide to unlock the full potential of technology.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-bold text-2xl text-foreground">50+</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-bold text-2xl text-foreground">2,000+</div>
                    <div className="text-sm text-muted-foreground">Experts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <div className="bg-card p-8 rounded-2xl shadow-card">
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower enterprises with innovative technology solutions that drive 
                digital transformation, enhance operational efficiency, and create 
                lasting competitive advantages in an ever-evolving digital landscape.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card p-8 rounded-2xl shadow-card">
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the world's most trusted technology partner, recognized for our 
                unwavering commitment to innovation, excellence, and client success, 
                shaping the future of enterprise technology.
              </p>
            </div>

            {/* Core Focus */}
            <div className="bg-card p-8 rounded-2xl shadow-card md:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Core Focus</h3>
              <p className="text-muted-foreground leading-relaxed">
                Client-centricity guides everything we do. We measure our success by 
                the transformative impact we create for our clients, their customers, 
                and the communities they serve.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define who we are as an organization.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
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
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
              
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year} 
                  className="relative pl-0 md:pl-20 pb-12 last:pb-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-6 top-0 w-4 h-4 rounded-full gradient-primary" />
                  
                  <div className="bg-card p-6 rounded-2xl shadow-card">
                    <span className="text-primary font-bold text-lg">{milestone.year}</span>
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
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Discover how CYBERVIBE can help transform your business through innovative 
            technology solutions.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
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
