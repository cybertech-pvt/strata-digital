import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import bannerImage from "@/assets/banner.png";
export const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-navy">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-teal/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/20 text-teal-light text-sm font-medium animate-fade-in border border-teal/30">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              Leading Digital Transformation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight animate-fade-in-up">
              Securing{" "}
              <span className="text-gradient-lime">Tomorrow's</span>
              <br />
              <span className="text-gradient-lime">Technology</span>
              , Today.
            </h1>

            <p className="text-lg text-white/70 max-w-xl animate-fade-in-up stagger-2">
              We partner with global enterprises to deliver cutting-edge technology solutions, 
              enabling digital transformation and sustainable business growth through innovation, 
              expertise, and unwavering commitment to excellence.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-3">
              <Button asChild size="lg" className="gradient-cta text-white hover:opacity-90 px-8 shadow-glow">
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-white/5">
                <Link to="/services">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Services
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 animate-fade-in-up stagger-4">
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-lime">15+</div>
                <div className="text-sm text-white/60">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-lime">500+</div>
                <div className="text-sm text-white/60">Global Clients</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-lime">50+</div>
                <div className="text-sm text-white/60">Countries Served</div>
              </div>
            </div>
          </div>

          {/* Visual - Banner Image */}
          <div className="relative hidden lg:block animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-teal/20 rounded-3xl blur-3xl opacity-50 animate-pulse-glow" />
              <img src={bannerImage} alt="CYBERVIBE Global Solutions - Securing Tomorrow's Technology, Today" className="relative rounded-3xl shadow-2xl w-full object-cover border border-teal/20" />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-navy-light p-6 rounded-2xl shadow-card border border-teal/20 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 gradient-cta rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Enterprise Ready</div>
                    <div className="text-sm text-white/60">ISO 27001 Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};