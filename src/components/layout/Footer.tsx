import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram, Youtube, Twitter, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import logoCircle from "@/assets/logo-cybervibe-circle.png";
import logoWordmark from "@/assets/logo-cybervibe-wordmark.png";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Checkout", path: "/checkout" },
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
    { name: "Refund Policy", path: "/refund" },
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
    <footer className="bg-navy text-white text-sm">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img
                src={logoCircle}
                alt="CYBERVIBE Global Solutions emblem"
                width={48}
                height={48}
                loading="lazy"
                className="h-12 w-12 rounded-full"
              />
              <img
                src={logoWordmark}
                alt="CYBERVIBE Global Solutions"
                width={180}
                height={48}
                loading="lazy"
                className="h-10 w-auto bg-white/95 rounded px-2 py-1"
              />
            </div>
            <p className="text-lime font-medium italic text-sm mb-3">
              "Securing Tomorrow's Technology, Today."
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-xs text-white/70">
                <MapPin size={14} className="text-teal mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-lime text-[10px] font-medium block mb-0.5">Headquarters</span>
                  <span>185, MELUR, Natrampalli, Pachur, Vellore, Tamil Nadu 635854</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/70">
                <MapPin size={14} className="text-teal mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-lime text-[10px] font-medium block mb-0.5">Corporate Office</span>
                  <span>Plot No. 1, JN Salai, SIDCO Industrial Estate, Guindy, Chennai 600032</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Mail size={14} className="text-teal flex-shrink-0" />
                <a href="mailto:support@cybervibeglobal.com" className="hover:text-lime transition-colors">
                  support@cybervibeglobal.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Phone size={14} className="text-teal flex-shrink-0" />
                <a href="tel:+918248827991" className="hover:text-lime transition-colors">
                  +91 8248827991
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xs text-white/70 hover:text-lime transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-xs text-white/70 hover:text-lime transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Industries</h4>
            <ul className="space-y-2">
              {footerLinks.industries.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-xs text-white/70 hover:text-lime transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-xs text-white/70 hover:text-lime transition-colors">
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
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} CYBERVIBE GLOBAL SOLUTIONS PRIVATE LIMITED. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white/70 hover:bg-teal hover:text-white transition-all"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
