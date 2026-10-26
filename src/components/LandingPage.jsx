import SiteHeader from "./SiteHeader";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import CaseStudiesSection from "./CaseStudiesSection";
import FrictionSection from "./FrictionSection";
import ProcessSection from "./ProcessSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";
import FaqSection from "./FaqSection";
import ContactSection from "./ContactSection";
import SiteFooter from "./SiteFooter";
import ReadingProgress from "./ReadingProgress";

export default function LandingPage() {
  return (
    <main>
      <ReadingProgress />
      <SiteHeader />
      <Hero /> 
      <ServicesSection />
      <CaseStudiesSection />
      <FrictionSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
       <AboutSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
