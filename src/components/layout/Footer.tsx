import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ],
  services: [
    { name: "Software Development", path: "/services" },
    { name: "Cloud Computing", path: "/services" },
    { name: "Cybersecurity", path: "/services" },
    { name: "AI & Analytics", path: "/services" },
  ],
  industries: [
    { name: "Banking & Finance", path: "/industries" },
    { name: "Healthcare", path: "/industries" },
    { name: "E-commerce", path: "/industries" },
    { name: "Manufacturing", path: "/industries" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src={logoDark} 
                alt="CYBERVIBE Global Solutions" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-lime font-medium italic mb-4">
              "Securing Tomorrow's Technology, Today."
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              CYBERVIBE GLOBAL SOLUTIONS PRIVATE LIMITED is a leading technology consulting and services company, 
              delivering innovative solutions to enterprises worldwide.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin size={16} className="text-teal" />
                <span>Corporate Headquarters, Technology Park</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail size={16} className="text-teal" />
                <span>contact@cybervibe.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone size={16} className="text-teal" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-lime transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-lime transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-lime transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-white/60">
                © {new Date().getFullYear()} CYBERVIBE GLOBAL SOLUTIONS PRIVATE LIMITED. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-teal hover:text-white transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
