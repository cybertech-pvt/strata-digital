import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const techCategories = [
  {
    title: "Cloud Platforms",
    description: "Enterprise-grade cloud infrastructure and services",
    technologies: [
      { name: "AWS", description: "Amazon Web Services" },
      { name: "Azure", description: "Microsoft Azure" },
      { name: "GCP", description: "Google Cloud Platform" },
      { name: "IBM Cloud", description: "IBM Cloud Services" },
    ],
  },
  {
    title: "Programming Languages",
    description: "Modern languages for scalable applications",
    technologies: [
      { name: "TypeScript", description: "Type-safe JavaScript" },
      { name: "Python", description: "AI & Data Science" },
      { name: "Java", description: "Enterprise Applications" },
      { name: "Go", description: "Cloud-Native Services" },
      { name: "C#", description: ".NET Development" },
      { name: "Rust", description: "Systems Programming" },
    ],
  },
  {
    title: "Frontend Technologies",
    description: "Modern frameworks for exceptional user experiences",
    technologies: [
      { name: "React", description: "Component-Based UI" },
      { name: "Angular", description: "Enterprise Framework" },
      { name: "Vue.js", description: "Progressive Framework" },
      { name: "Next.js", description: "Full-Stack React" },
    ],
  },
  {
    title: "Backend & APIs",
    description: "Robust server-side technologies and microservices",
    technologies: [
      { name: "Node.js", description: "JavaScript Runtime" },
      { name: "Spring Boot", description: "Java Framework" },
      { name: "Django", description: "Python Framework" },
      { name: "GraphQL", description: "API Query Language" },
      { name: "gRPC", description: "High-Performance RPC" },
    ],
  },
  {
    title: "Data & AI",
    description: "Advanced analytics and machine learning platforms",
    technologies: [
      { name: "TensorFlow", description: "ML Framework" },
      { name: "PyTorch", description: "Deep Learning" },
      { name: "Spark", description: "Big Data Processing" },
      { name: "Snowflake", description: "Data Warehouse" },
      { name: "Databricks", description: "Unified Analytics" },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    description: "Automation and infrastructure management tools",
    technologies: [
      { name: "Kubernetes", description: "Container Orchestration" },
      { name: "Docker", description: "Containerization" },
      { name: "Terraform", description: "Infrastructure as Code" },
      { name: "Jenkins", description: "CI/CD Automation" },
      { name: "GitLab", description: "DevOps Platform" },
    ],
  },
  {
    title: "Databases",
    description: "Scalable data storage solutions",
    technologies: [
      { name: "PostgreSQL", description: "Relational Database" },
      { name: "MongoDB", description: "Document Database" },
      { name: "Redis", description: "In-Memory Cache" },
      { name: "Elasticsearch", description: "Search Engine" },
    ],
  },
  {
    title: "Security",
    description: "Enterprise security and compliance tools",
    technologies: [
      { name: "Auth0", description: "Identity Management" },
      { name: "Vault", description: "Secrets Management" },
      { name: "SonarQube", description: "Code Security" },
      { name: "Snyk", description: "Vulnerability Scanning" },
    ],
  },
];

const Technologies = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Technologies
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Cutting-Edge Technology Stack
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We leverage the latest technologies and frameworks to build scalable, 
              secure, and high-performance solutions for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {techCategories.map((category, index) => (
              <div
                key={category.title}
                className="bg-card p-8 rounded-2xl shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <div className="flex flex-wrap gap-3">
                  {category.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="group relative px-4 py-2 bg-secondary rounded-lg hover:bg-gradient-to-r hover:from-teal hover:to-lime hover:text-navy transition-colors cursor-default"
                    >
                      <span className="font-medium">{tech.name}</span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-navy text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {tech.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Banner */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-card">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Technology-Agnostic Approach
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  While we have deep expertise across these technologies, we're not 
                  limited to them. Our technology-agnostic approach means we select 
                  the best tools for your specific needs, not the other way around.
                </p>
                <ul className="space-y-3 text-foreground">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Continuous learning and adoption of emerging technologies
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Regular technology assessments and recommendations
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Multi-platform expertise for hybrid environments
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {["Cloud", "AI/ML", "Security", "Mobile", "IoT", "Blockchain"].map((tech) => (
                  <div
                    key={tech}
                    className="aspect-square bg-gradient-to-br from-teal/20 to-lime/20 border border-teal/30 rounded-2xl flex items-center justify-center p-4"
                  >
                    <span className="text-foreground font-semibold text-center">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Have a Technology Challenge?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Our experts can help you evaluate and implement the right technology 
            solutions for your business needs.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
            <Link to="/contact">
              Consult Our Experts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Technologies;
