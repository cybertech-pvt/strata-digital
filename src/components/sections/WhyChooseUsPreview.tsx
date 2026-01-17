import { CheckCircle, Users, Lock, Globe, Zap, Award } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Enterprise-Grade Solutions",
    description: "Battle-tested technologies and methodologies trusted by Fortune 500 companies.",
  },
  {
    icon: Users,
    title: "Experienced Professionals",
    description: "A team of 2,000+ certified experts with deep domain expertise.",
  },
  {
    icon: Lock,
    title: "Security-First Approach",
    description: "ISO 27001 certified with comprehensive security frameworks.",
  },
  {
    icon: Zap,
    title: "Scalable & Reliable",
    description: "Systems designed for 99.99% uptime and seamless scalability.",
  },
  {
    icon: Globe,
    title: "Global Delivery Model",
    description: "24/7 support across multiple time zones and regions.",
  },
  {
    icon: CheckCircle,
    title: "Proven Track Record",
    description: "500+ successful enterprise implementations worldwide.",
  },
];

export const WhyChooseUsPreview = () => {
  return (
    <section className="py-24 bg-navy">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-lime font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              Your Trusted Technology Partner
            </h2>
            <p className="text-white/70 text-lg mb-8">
              With over 15 years of experience, CYBERVIBE GLOBAL SOLUTIONS has established 
              itself as a premier technology consulting firm, delivering transformative 
              solutions to enterprises across the globe.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="flex gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-white/60">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-teal/20 rounded-3xl blur-3xl opacity-30" />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=604&h=453&fit=crop&fm=webp&q=80"
              alt="Professional team of technology consultants in a modern office"
              width={604}
              height={453}
              loading="lazy"
              className="relative rounded-3xl shadow-2xl w-full object-cover border border-teal/20"
            />
            {/* Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-navy-light p-6 rounded-2xl shadow-card border border-teal/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-lime">98%</div>
                  <div className="text-sm text-white/60">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lime">24/7</div>
                  <div className="text-sm text-white/60">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
