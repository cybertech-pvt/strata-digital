import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram, Youtube, Twitter, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
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
  { icon: Linkedin, href: "https://www.linkedin.com/company/cybervibe-global-solutions", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/cybervibeglobal", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/cybervibe.global/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@cybervibeglobal", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com/cybervibeglobal", label: "Twitter" },
  { icon: MessageCircle, href: "https://wa.me/918248827991", label: "WhatsApp" },
];

export const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src={logoDark} 
                alt="CYBERVIBE Global Solutions" 
                width={155}
                height={64}
                loading="lazy"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-lime font-medium italic mb-4">
              "Securing Tomorrow's Technology, Today."
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin size={16} className="text-teal mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-lime text-xs font-medium block mb-1">Headquarters</span>
                    <span>185, MELUR, Natrampalli, Pachur, Vellore, Tamil Nadu 635854</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin size={16} className="text-teal mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-lime text-xs font-medium block mb-1">Corporate Office</span>
                    <span>Plot No. 1, JN Salai, SIDCO Industrial Estate, Guindy, Chennai 600032</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail size={16} className="text-teal flex-shrink-0" />
                <a href="mailto:support@cybervibeglobal.com" className="hover:text-lime transition-colors">
                  support@cybervibeglobal.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone size={16} className="text-teal flex-shrink-0" />
                <a href="tel:+918248827991" className="hover:text-lime transition-colors">
                  +91 8248827991
                </a>
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

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
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
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} CYBERVIBE GLOBAL SOLUTIONS PRIVATE LIMITED. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white/70 hover:bg-teal hover:text-white transition-all"
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
