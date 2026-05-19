import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import ProblemSection from "@/components/sections/ProblemSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MarketplaceSection from "@/components/sections/MarketplaceSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import DashboardPreviewSection from "@/components/sections/DashboardPreviewSection";
import WhyCreatorOSSection from "@/components/sections/WhyCreatorOSSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <ProblemSection />
      <FeaturesSection />
      <MarketplaceSection />
      <EcosystemSection />
      <DashboardPreviewSection />
      <WhyCreatorOSSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
