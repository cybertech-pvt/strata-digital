import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-navy">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Partner with CYBERVIBE GLOBAL SOLUTIONS and unlock the full potential of 
            digital transformation. Let's build the future together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gradient-cta text-white hover:opacity-90 px-8 shadow-glow">
              <Link to="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-teal/50 text-white hover:bg-teal/20 hover:border-teal px-8">
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Call
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
