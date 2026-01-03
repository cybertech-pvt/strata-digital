import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyChooseUsPreview } from "@/components/sections/WhyChooseUsPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUsPreview />
      <TestimonialsSection />
      <ClientsSection />
      <BlogSection />
      <NewsletterSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
