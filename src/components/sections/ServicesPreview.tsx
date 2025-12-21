import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Smartphone, 
  Cloud, 
  Shield, 
  Brain, 
  Lightbulb,
  ArrowRight 
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom enterprise software solutions built with cutting-edge technologies for scalability and performance.",
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Apps",
    description: "Responsive web applications and native mobile solutions that deliver exceptional user experiences.",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description: "Cloud migration, architecture design, and managed services across AWS, Azure, and Google Cloud.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security assessments, threat detection, and enterprise-grade protection solutions.",
  },
  {
    icon: Brain,
    title: "AI & Data Analytics",
    description: "Machine learning solutions and advanced analytics to unlock actionable business insights.",
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description: "Strategic technology consulting to accelerate digital transformation initiatives.",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            We deliver end-to-end technology services that drive innovation and enable enterprises 
            to achieve their strategic objectives in an increasingly digital world.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card p-8 rounded-2xl shadow-card hover-lift cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
