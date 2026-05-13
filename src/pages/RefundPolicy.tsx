import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-navy/95 pt-32 pb-16">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-teal/10 text-teal rounded-full text-sm font-medium mb-6">
                Legal
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Return, Refund & Cancellation Policy
              </h1>
              <p className="text-lg text-white/70">Last updated: May 13, 2026</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Thank you for choosing <strong className="text-foreground">CyberVibe Global Solutions Pvt Ltd (CVGS)</strong>.
                If, for any reason, You are not completely satisfied with a purchase, We invite You to review our policy
                on refunds, returns and cancellations.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Definitions</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Company</strong> ("We", "Us", "Our") refers to CyberVibe Global Solutions Pvt Ltd, 185 Melur, Natrampalli, Pachoor, Tamil Nadu 635854.</li>
                  <li><strong className="text-foreground">Goods / Services</strong> refer to the items or services offered for sale on the Website.</li>
                  <li><strong className="text-foreground">Orders</strong> mean a request by You to purchase Goods or Services from Us.</li>
                  <li><strong className="text-foreground">Website</strong> refers to CVGS, accessible from cybervibeglobal.com.</li>
                  <li><strong className="text-foreground">You</strong> means the individual or entity using the Service.</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Order Cancellation Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You are entitled to cancel Your Order within <strong className="text-foreground">14 days</strong> without giving any reason.
                </p>
                <p className="text-muted-foreground mb-4">
                  The deadline for cancelling an Order is 14 days from the date on which You received the Goods or
                  the date the Service was activated.
                </p>
                <p className="text-muted-foreground mb-2">To exercise Your right of cancellation, contact Us:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>By email: <a href="mailto:support@cybervibeglobal.com" className="text-teal hover:underline">support@cybervibeglobal.com</a></li>
                  <li>Via our <Link to="/contact" className="text-teal hover:underline">Contact page</Link></li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We will reimburse You no later than 14 days from the day on which We receive the returned Goods or
                  approve the cancellation request, using the same payment method used for the Order, with no fees.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Conditions for Returns</h2>
                <p className="text-muted-foreground mb-3">For Goods to be eligible for a return, please ensure:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>The Goods were purchased in the last 14 days</li>
                  <li>The Goods are in their original packaging</li>
                </ul>
                <p className="text-muted-foreground mb-3">The following Goods/Services cannot be returned:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Goods or services made to Your specifications or clearly personalized</li>
                  <li>Goods which by nature are not suitable for return or which deteriorate rapidly</li>
                  <li>Goods unsealed after delivery for health protection or hygiene reasons</li>
                  <li>Custom software development work that has been delivered and accepted</li>
                  <li>Discounted or promotional items (unless required by applicable law)</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Refund Process</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Approved refunds are processed within 7–14 business days.</li>
                  <li>Refunds are issued to the original payment method.</li>
                  <li>Bank or payment gateway processing time may add 3–5 additional business days.</li>
                  <li>For service-based purchases, refunds may be prorated based on work delivered.</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Returning Goods</h2>
                <p className="text-muted-foreground mb-4">
                  You are responsible for the cost and risk of returning the Goods to Us. We recommend an insured
                  and trackable shipping service. We cannot be held responsible for Goods damaged or lost in
                  return shipment, and cannot issue a refund without proof of received delivery.
                </p>
                <p className="text-muted-foreground">
                  Return address and shipping instructions will be provided via email once your return request is approved.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-card rounded-xl p-8 border border-border mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Gifts</h2>
                <p className="text-muted-foreground">
                  If the Goods were marked as a gift when purchased and shipped directly to You, You will receive a
                  gift credit for the value of Your return. If the Goods weren't marked as a gift, the refund will be
                  issued to the original purchaser.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gradient-to-br from-teal/10 to-lime/10 rounded-xl p-8 border border-teal/20">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Mail className="text-teal" size={24} /> Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about our Returns, Refunds and Cancellation Policy, please contact us:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Email: <a href="mailto:support@cybervibeglobal.com" className="text-teal hover:underline">support@cybervibeglobal.com</a></li>
                  <li>Phone: <a href="tel:+918248827991" className="text-teal hover:underline">+91 8248827991</a></li>
                  <li>
                    <Link to="/contact" className="text-teal hover:underline inline-flex items-center gap-1">
                      Visit our Contact page <ExternalLink size={14} />
                    </Link>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefundPolicy;
