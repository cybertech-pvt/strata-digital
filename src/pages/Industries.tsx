import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Heart, 
  ShoppingCart, 
  GraduationCap, 
  Factory, 
  Rocket,
  ArrowRight
} from "lucide-react";

const industries = [
  {
    icon: Building2,
    title: "Banking & Finance",
    description: "Transforming financial services with secure, compliant, and innovative technology solutions.",
    solutions: [
      "Core Banking Modernization",
      "Digital Payment Solutions",
      "Regulatory Compliance Systems",
      "Fraud Detection & Prevention",
      "Wealth Management Platforms",
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Enabling better patient outcomes through digital health solutions and healthcare innovation.",
    solutions: [
      "Electronic Health Records",
      "Telemedicine Platforms",
      "Healthcare Analytics",
      "Medical Device Integration",
      "Patient Engagement Apps",
    ],
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce & Retail",
    description: "Powering retail transformation with omnichannel solutions and customer experience platforms.",
    solutions: [
      "E-commerce Platforms",
      "Inventory Management",
      "Customer Analytics",
      "Personalization Engines",
      "Supply Chain Optimization",
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Revolutionizing learning experiences with EdTech solutions and digital campus infrastructure.",
    solutions: [
      "Learning Management Systems",
      "Virtual Classroom Platforms",
      "Student Information Systems",
      "Assessment & Analytics",
      "Campus Management",
    ],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Driving Industry 4.0 transformation with smart factory solutions and operational technology.",
    solutions: [
      "IoT & Smart Manufacturing",
      "Predictive Maintenance",
      "Supply Chain Digitization",
      "Quality Management",
      "Production Optimization",
    ],
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop",
  },
  {
    icon: Rocket,
    title: "Startups & Enterprises",
    description: "Partnering with innovators to build scalable products and accelerate growth trajectories.",
    solutions: [
      "MVP Development",
      "Product Engineering",
      "Technology Due Diligence",
      "Scale-up Support",
      "Innovation Labs",
    ],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
  },
];

const Industries = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-navy">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-teal/10 rounded-full opacity-50" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-lime font-semibold text-sm uppercase tracking-wider">
              Industries We Serve
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Industry-Specific Expertise
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Deep domain knowledge across diverse industries enables us to deliver 
              solutions that address unique sector challenges and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={industry.title}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={`${industry.title} industry solutions`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal to-lime rounded-xl flex items-center justify-center">
                      <industry.icon className="w-6 h-6 text-navy" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{industry.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{industry.description}</p>
                  <ul className="space-y-2">
                    {industry.solutions.slice(0, 4).map((solution) => (
                      <li key={solution} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-foreground">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Don't See Your Industry?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Our expertise extends beyond these industries. Contact us to discuss 
            how we can help transform your business.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-teal to-lime text-navy hover:opacity-90">
            <Link to="/contact">
              Let's Talk
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Industries;
