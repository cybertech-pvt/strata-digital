import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link, useSearchParams } from "react-router-dom";
import { CreditCard, Lock, ShieldCheck, Mail, Phone, Building2, Smartphone, Wallet, Banknote, CheckCircle2 } from "lucide-react";

const services = [
  { id: "consult", name: "IT Consulting (1 hr)", price: 2999 },
  { id: "web", name: "Web & Mobile App Development", price: 24999 },
  { id: "software", name: "Software Development", price: 49999 },
  { id: "ai", name: "AI & Data Analytics", price: 34999 },
  { id: "cloud", name: "Cloud Migration Audit", price: 14999 },
  { id: "security", name: "Cybersecurity Assessment", price: 19999 },
];

const Checkout = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("service");
  const initial = services.find((s) => s.id === preselected)?.id ?? "web";
  const [selected, setSelected] = useState<string>(initial);
  const [qty, setQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [success, setSuccess] = useState(false);

  const item = services.find((s) => s.id === selected)!;
  const subtotal = item.price * qty;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({
        title: "Please agree to the policies",
        description: "You must accept our Terms and Refund Policy to continue.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast({
        title: "Order placed successfully",
        description: `Your order of ${formatINR(total)} has been received.`,
      });
    }, 1200);
  };

  const steps = [
    { n: 1, label: "Details" },
    { n: 2, label: "Payment" },
    { n: 3, label: "Confirm" },
  ];

  if (success) {
    return (
      <Layout>
        <section className="pt-32 pb-20 bg-background min-h-[70vh]">
          <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
            <div className="w-20 h-20 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-lime" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Thank you for your order!</h1>
            <p className="text-muted-foreground mb-2">
              Your order of <span className="font-semibold text-teal">{formatINR(total)}</span> has been received.
            </p>
            <p className="text-muted-foreground mb-8">
              Our team will contact you within 24 hours to kick off your project.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="gradient-cta text-white"><Link to="/services">Browse More Services</Link></Button>
              <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-navy/95 pt-32 pb-12">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-teal/10 text-teal rounded-full text-sm font-medium mb-4">
                Secure Checkout
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Complete Your Order</h1>
              <p className="text-white/70 flex items-center gap-2">
                <Lock size={16} className="text-lime" /> 256-bit SSL encrypted checkout
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stepper */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                  s.n <= 2 ? "bg-teal text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {s.n}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${s.n <= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <div className="w-8 md:w-16 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            {/* Left: forms */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Mail size={18} className="text-teal" /> Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required placeholder="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" type="tel" required placeholder="+91 9876543210" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="company">Company (optional)</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Building2 size={18} className="text-teal" /> Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input id="address" required placeholder="123 Main Street" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" required placeholder="Chennai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" required placeholder="Tamil Nadu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">PIN Code *</Label>
                    <Input id="zip" required placeholder="600032" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" required defaultValue="India" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="gst">GSTIN (optional)</Label>
                    <Input id="gst" placeholder="22AAAAA0000A1Z5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard size={18} className="text-teal" /> Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid sm:grid-cols-2 gap-3">
                    {[
                      { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                      { id: "upi", label: "UPI", icon: Smartphone },
                      { id: "netbanking", label: "Net Banking", icon: Banknote },
                      { id: "wallet", label: "Wallet", icon: Wallet },
                    ].map(({ id, label, icon: Icon }) => (
                      <Label
                        key={id}
                        htmlFor={`pm-${id}`}
                        className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === id ? "border-teal bg-teal/5" : "border-border hover:bg-accent"
                        }`}
                      >
                        <RadioGroupItem id={`pm-${id}`} value={id} />
                        <Icon size={18} className="text-teal" />
                        <span className="text-sm font-medium">{label}</span>
                      </Label>
                    ))}
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input id="cardName" required placeholder="As on card" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input id="cardNumber" required inputMode="numeric" placeholder="1234 5678 9012 3456" maxLength={19} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry *</Label>
                        <Input id="expiry" required placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input id="cvv" required type="password" placeholder="123" maxLength={4} />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="space-y-2 mt-6">
                      <Label htmlFor="upi">UPI ID *</Label>
                      <Input id="upi" required placeholder="yourname@upi" />
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div className="space-y-2 mt-6">
                      <Label htmlFor="bank">Select Bank *</Label>
                      <Input id="bank" required placeholder="Bank name" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Any specific requirements for your order..." rows={3} />
                </CardContent>
              </Card>
            </div>

            {/* Right: summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="service">Select Service</Label>
                      <select
                        id="service"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} — {formatINR(s.price)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qty">Quantity</Label>
                      <Input
                        id="qty"
                        type="number"
                        min={1}
                        max={20}
                        value={qty}
                        onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span className="text-foreground font-medium">{formatINR(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>GST (18%)</span>
                        <span className="text-foreground font-medium">{formatINR(tax)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold pt-1">
                        <span>Total</span>
                        <span className="text-teal">{formatINR(total)}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                      <Checkbox
                        id="agree"
                        checked={agreed}
                        onCheckedChange={(c) => setAgreed(c === true)}
                      />
                      <Label htmlFor="agree" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                        I agree to the{" "}
                        <Link to="/terms" className="text-teal hover:underline">Terms & Conditions</Link>,{" "}
                        <Link to="/privacy" className="text-teal hover:underline">Privacy Policy</Link>, and{" "}
                        <Link to="/refund" className="text-teal hover:underline">Refund Policy</Link>.
                      </Label>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-teal hover:bg-teal/90" disabled={submitting}>
                      {submitting ? "Processing..." : `Pay ${formatINR(total)}`}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                      <ShieldCheck size={14} className="text-lime" />
                      Secure payment · 100% protected
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-teal/5 to-lime/5 border-teal/20">
                  <CardContent className="pt-6 text-sm space-y-2">
                    <p className="font-semibold text-foreground">Need help?</p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Mail size={14} className="text-teal" />
                      <a href="mailto:support@cybervibeglobal.com" className="hover:text-teal">support@cybervibeglobal.com</a>
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone size={14} className="text-teal" />
                      <a href="tel:+918248827991" className="hover:text-teal">+91 8248827991</a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
