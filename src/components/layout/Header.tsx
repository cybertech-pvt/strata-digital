import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoLight from "@/assets/logo-light.png";
const navLinks = [{
  name: "Home",
  path: "/"
}, {
  name: "About",
  path: "/about"
}, {
  name: "Services",
  path: "/services"
}, {
  name: "Industries",
  path: "/industries"
}, {
  name: "Why Us",
  path: "/why-us"
}, {
  name: "Technologies",
  path: "/technologies"
}, {
  name: "Careers",
  path: "/careers"
}, {
  name: "Contact",
  path: "/contact"
}];
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-navy/95 backdrop-blur-md shadow-lg border-b border-teal/20" : "bg-transparent")}>
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img alt="CYBERVIBE Global Solutions" className="h-12 w-auto" src="/lovable-uploads/125230dd-1f9f-4b07-b7c7-58d6d54d2334.png" width={48} height={48} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-colors", location.pathname === link.path ? "text-lime bg-teal/20" : "text-white/80 hover:text-white hover:bg-white/10")}>
                {link.name}
              </Link>)}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block text-secondary-foreground">
            <Button asChild className="gradient-cta text-white font-semibold hover:opacity-90 shadow-glow">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="lg:hidden absolute top-20 left-0 right-0 bg-navy border-b border-teal/20 shadow-lg animate-fade-in">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {navLinks.map(link => <Link key={link.path} to={link.path} className={cn("px-4 py-3 text-sm font-medium rounded-lg transition-colors", location.pathname === link.path ? "text-lime bg-teal/20" : "text-white/80 hover:text-white hover:bg-white/10")}>
                    {link.name}
                  </Link>)}
                <Button asChild className="gradient-cta text-white mt-4">
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </header>;
};