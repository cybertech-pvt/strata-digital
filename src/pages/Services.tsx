import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Code2, 
  Smartphone, 
  Cloud, 
  Shield, 
  Brain, 
  Lightbulb,
  ArrowRight,
  Check
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom enterprise software solutions tailored to your unique business requirements, built with cutting-edge technologies for maximum scalability, performance, and maintainability.",
    features: [
      "Custom Enterprise Applications",
      "Legacy System Modernization",
      "API Development & Integration",
      "Microservices Architecture",
      "Quality Assurance & Testing",
      "DevOps & CI/CD Pipelines",
    ],
  },
  {
    icon: Smartphone,
    title: "Web & Mobile App Development",
    description: "Responsive web applications and native mobile solutions that deliver exceptional user experiences across all devices and platforms.",
    features: [
      "Progressive Web Applications",
      "Native iOS & Android Apps",
      "Cross-Platform Development",
      "UI/UX Design Services",
      "E-commerce Solutions",
      "Enterprise Mobility",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description: "Comprehensive cloud services including migration, architecture design, and managed services across AWS, Azure, and Google Cloud Platform.",
    features: [
      "Cloud Migration Strategy",
      "Multi-Cloud Architecture",
      "Cloud-Native Development",
      "Infrastructure as Code",
      "Cost Optimization",
      "24/7 Managed Services",
    ],
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description: "Enterprise-grade security services to protect your digital assets, ensure compliance, and build resilient defense systems against evolving threats.",
    features: [
      "Security Assessments & Audits",
      "Threat Detection & Response",
      "Identity & Access Management",
      "Compliance & Governance",
      "Security Operations Center",
      "Penetration Testing",
    ],
  },
  {
    icon: Brain,
    title: "AI & Data Analytics",
    description: "Harness the power of artificial intelligence and advanced analytics to unlock actionable insights and drive data-driven decision making.",
    features: [
      "Machine Learning Solutions",
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision",
      "Business Intelligence",
      "Big Data Engineering",
    ],
  },
  {
    icon: Lightbulb,
    title: "IT Consulting & Digital Transformation",
    description: "Strategic technology consulting to guide your digital transformation journey and align technology investments with business objectives.",
    features: [
      "Digital Strategy Development",
      "Technology Roadmapping",
      "Process Automation",
      "Change Management",
      "Enterprise Architecture",
      "Innovation Workshops",
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Comprehensive Technology Solutions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We deliver end-to-end technology services that drive innovation and enable 
              enterprises to achieve their strategic objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild>
                    <Link to="/contact">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="relative">
                    <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-10" />
                    <div className="relative bg-gradient-to-br from-muted to-accent rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
                      <service.icon className="w-32 h-32 text-primary/30" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Our experts are ready to discuss your unique requirements and design 
            a tailored solution for your business.
          </p>
          <Button asChild size="lg" className="gradient-primary text-primary-foreground">
            <Link to="/contact">
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
