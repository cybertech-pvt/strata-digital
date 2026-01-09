import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Linkedin,
  Twitter,
  Facebook
} from "lucide-react";
import googleQr from "@/assets/google-qr.png";
import followQr from "@/assets/follow-qr.png";

const contactInfo = [
  {
    icon: Mail,
    title: "General Enquiries",
    details: "info@cybervibeglobal.com",
    subtext: "For business & general inquiries",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 8248827991",
    subtext: "Mon-Fri, 9am-6pm IST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Tamil Nadu, India",
    subtext: "Corporate Headquarters",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Monday - Friday",
    subtext: "9:00 AM - 6:00 PM IST",
  },
];

const offices = [
  { city: "Tamil Nadu", country: "India", type: "Headquarters" },
];

const websiteUrl = "www.cybervibeglobal.com";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-navy">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-teal/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-lime font-semibold text-sm uppercase tracking-wider">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Ready to transform your business? Get in touch with our team to discuss 
              how we can help you achieve your technology goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className="border-border focus:border-teal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      className="border-border focus:border-teal"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="border-border focus:border-teal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    rows={6}
                    required
                    className="border-border focus:border-teal"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gradient-cta text-white hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-foreground">{item.details}</p>
                      <p className="text-sm text-muted-foreground">{item.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Global Offices */}
              <h3 className="text-xl font-bold text-foreground mb-4">Global Offices</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {offices.map((office) => (
                  <div key={office.city} className="bg-card p-4 rounded-xl border border-border hover:border-teal/30 transition-colors">
                    <h4 className="font-semibold text-foreground">{office.city}</h4>
                    <p className="text-sm text-muted-foreground">{office.country}</p>
                    <span className="text-xs text-lime">{office.type}</span>
                  </div>
                ))}
              </div>

              {/* QR Codes */}
              <h3 className="text-xl font-bold text-foreground mb-4">Scan to Connect</h3>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-card p-3 rounded-xl border border-border hover:border-teal/30 transition-colors">
                  <img 
                    src={googleQr} 
                    alt="Google Business QR Code" 
                    className="w-28 h-28 object-contain"
                  />
                  <p className="text-xs text-center text-muted-foreground mt-2">Google Business</p>
                </div>
                <div className="bg-card p-3 rounded-xl border border-border hover:border-teal/30 transition-colors">
                  <img 
                    src={followQr} 
                    alt="Follow Us QR Code" 
                    className="w-28 h-28 object-contain"
                  />
                  <p className="text-xs text-center text-muted-foreground mt-2">Follow Us</p>
                </div>
              </div>

              {/* Social Links */}
              <h3 className="text-xl font-bold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-navy-light rounded-3xl h-[400px] flex items-center justify-center border border-teal/20">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-teal/50 mx-auto mb-4" />
              <p className="text-white/60">Interactive Map Coming Soon</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
