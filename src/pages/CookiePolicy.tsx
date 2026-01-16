import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CookiePolicy = () => {
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
                Cookie Policy
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
                This Cookie Policy explains how CyberVibe Global Solutions Private Limited ("CVGS", "we", "us", or "our") uses cookies and similar technologies when you visit our website <a href="https://cybervibeglobal.com/" className="text-teal hover:text-lime transition-colors">https://cybervibeglobal.com/</a>. This policy should be read alongside our Privacy Policy.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. What Are Cookies?</h2>
                <p className="text-muted-foreground">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember your preferences and actions over time, so you don't have to re-enter them whenever you come back to the site or browse from one page to another.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Types of Cookies We Use</h2>
                <p className="text-muted-foreground mb-4">We use the following categories of cookies on our website:</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as the website would not function correctly without them.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Functional Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences (language, region, etc.) and providing features like live chat support.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Marketing Cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant advertisements on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-muted-foreground">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Cookie Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Purpose</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">sb-*-auth-token</td>
                        <td className="py-3 px-4">Essential</td>
                        <td className="py-3 px-4">User authentication and session management</td>
                        <td className="py-3 px-4">Session</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">cf_clearance</td>
                        <td className="py-3 px-4">Essential</td>
                        <td className="py-3 px-4">Cloudflare security verification</td>
                        <td className="py-3 px-4">30 minutes</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">_ga</td>
                        <td className="py-3 px-4">Analytics</td>
                        <td className="py-3 px-4">Google Analytics - distinguishes unique users</td>
                        <td className="py-3 px-4">2 years</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">_gid</td>
                        <td className="py-3 px-4">Analytics</td>
                        <td className="py-3 px-4">Google Analytics - distinguishes unique users</td>
                        <td className="py-3 px-4">24 hours</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">theme</td>
                        <td className="py-3 px-4">Functional</td>
                        <td className="py-3 px-4">Stores user's theme preference (light/dark)</td>
                        <td className="py-3 px-4">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Some cookies are placed by third-party services that appear on our pages. We do not control the use of these cookies. Third parties that may place cookies through our website include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Google Analytics:</strong> For website traffic analysis and reporting</li>
                  <li><strong className="text-foreground">Cloudflare:</strong> For security and performance optimization</li>
                  <li><strong className="text-foreground">LinkedIn:</strong> For social media integration and tracking</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Managing Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  You can control and manage cookies in several ways. Please note that removing or blocking cookies may impact your user experience and some website functionality may no longer be available.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Browser Settings</h3>
                    <p className="text-muted-foreground">
                      Most browsers allow you to refuse cookies or delete cookies that have already been set. The methods for doing so vary from browser to browser. You can obtain instructions for popular browsers at:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                      <li>Chrome: chrome://settings/cookies</li>
                      <li>Firefox: about:preferences#privacy</li>
                      <li>Safari: Preferences → Privacy</li>
                      <li>Edge: edge://settings/privacy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Updates to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our cookie practices.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground mb-4">If you have any questions about our use of cookies, please contact us:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Email:</strong> <a href="mailto:info@cybervibeglobal.com" className="text-teal hover:text-lime transition-colors">info@cybervibeglobal.com</a></li>
                  <li><strong className="text-foreground">Address:</strong> 185, MELUR, Natrampalli, Pachur, Vellore, Tirupattur, TN - 635854, India</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CookiePolicy;
