import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-navy/95 pt-32 pb-16">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-teal/10 text-teal rounded-full text-sm font-medium mb-6">
                Legal
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-lg text-white/70">
                Effective Date: January 16, 2026
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <ScrollReveal>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At CyberVibe Global Solutions Private Limited (hereinafter referred to as "CVGS", "we", "us", or "our"), we are committed to protecting the privacy and security of your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information in compliance with the Digital Personal Data Protection Act (DPDP Act), 2023 and other applicable Indian laws.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Corporate Identity</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Company Name:</strong> CyberVibe Global Solutions Private Limited</li>
                  <li><strong className="text-foreground">Short Name:</strong> CVGS</li>
                  <li><strong className="text-foreground">CIN:</strong> U62020TN2025PTC187504</li>
                  <li><strong className="text-foreground">Registered Office:</strong> 185, MELUR, Natrampalli, Pachur, Vellore, Tirupattur, Tamil Nadu, India, 635854.</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">We may collect personal information such as your name, email address, phone number, and professional details when you:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Fill out forms on our website <a href="https://cybervibeglobal.com/" className="text-teal hover:text-lime transition-colors">https://cybervibeglobal.com/</a>.</li>
                  <li>Inquire about our cybersecurity or IT consulting services.</li>
                  <li>Interact with our digital marketing campaigns.</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Purpose of Data Collection</h2>
                <p className="text-muted-foreground mb-4">Your data is used solely for:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Providing cybersecurity solutions and IT services.</li>
                  <li>Responding to business inquiries and customer support.</li>
                  <li>Sending service updates or promotional content (with your consent).</li>
                  <li>Improving website performance and user experience.</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  As an IT and cybersecurity firm, we prioritize data safety. CVGS implements industry-standard encryption and security protocols to prevent unauthorized access, disclosure, or destruction of your personal data.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Sharing of Information</h2>
                <p className="text-muted-foreground mb-4">We do not sell or trade your personal information. Data may only be shared with:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Legal authorities if required by law.</li>
                  <li>Third-party service providers (e.g., cloud hosting) who are contractually bound to protect your data.</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights (Data Principal Rights)</h2>
                <p className="text-muted-foreground mb-4">Under the DPDP Act 2023, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Request access to the personal data we hold.</li>
                  <li>Request correction of inaccurate or incomplete data.</li>
                  <li>Withdraw your consent for data processing at any time.</li>
                  <li>Request the erasure of your data (Right to be Forgotten).</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Grievance Redressal</h2>
                <p className="text-muted-foreground mb-4">If you have any questions or grievances regarding this policy, please contact our Grievance Officer:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Name:</strong> Vickram Durai</li>
                  <li><strong className="text-foreground">Address:</strong> 185, MELUR, Natrampalli, Pachur, Vellore, Tirupattur, TN - 635854.</li>
                  <li><strong className="text-foreground">Email:</strong> <a href="mailto:info@cybervibeglobal.com" className="text-teal hover:text-lime transition-colors">info@cybervibeglobal.com</a></li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
