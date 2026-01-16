import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const TermsConditions = () => {
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
                Terms & Conditions
              </h1>
              <p className="text-lg text-white/70">
                Last Updated: January 16, 2026
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
                Welcome to CyberVibe Global Solutions Private Limited (CVGS). By accessing our website <a href="https://cybervibeglobal.com/" className="text-teal hover:text-lime transition-colors">https://cybervibeglobal.com/</a> and using our services, you agree to comply with the following terms and conditions.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By using this website, you confirm that you have read, understood, and agreed to be bound by these terms. If you do not agree, please refrain from using our site or services.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Services Provided</h2>
                <p className="text-muted-foreground">
                  CVGS provides IT consulting, cybersecurity solutions, and software development services. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on this website, including logos, text, graphics, and software, is the property of CyberVibe Global Solutions Private Limited (CIN: U62020TN2025PTC187504). You may not reproduce or distribute any content without our written permission.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. User Conduct</h2>
                <p className="text-muted-foreground mb-4">Users agree not to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Use the website for any unlawful purpose.</li>
                  <li>Attempt to bypass any security measures or hack into our systems.</li>
                  <li>Post or transmit any harmful or malicious software.</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  While we strive for excellence in our cybersecurity and IT services, CVGS shall not be held liable for any direct, indirect, or incidental damages resulting from the use of our website or services, including data breaches caused by third-party vulnerabilities.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Payments and Refunds</h2>
                <p className="text-muted-foreground">
                  All payments for services rendered by CVGS must be made as per the agreed-upon contract. Refund policies are subject to the specific service agreement signed between CVGS and the client.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to terminate your access to our services if you violate any of these terms.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
                <p className="text-muted-foreground">
                  These terms are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Vellore/Tamil Nadu.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Information</h2>
                <p className="text-muted-foreground mb-4">For any queries regarding these terms, please contact:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Email:</strong> <a href="mailto:contact@cybervibeglobal.com" className="text-teal hover:text-lime transition-colors">contact@cybervibeglobal.com</a></li>
                  <li><strong className="text-foreground">Registered Office:</strong> 185, MELUR, Natrampalli, Pachur, Vellore, TN 635854.</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsConditions;
