import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import LearnAiSection from "@/components/learn-ai-section";
import AiToolsSection from "@/components/ai-tools-section";
import EarnSection from "@/components/earn-section";
import InnovationShowcase from "@/components/innovation-showcase";
import ResourceCenter from "@/components/resource-center";
import PartnersSection from "@/components/partners-section";
import SupportSection from "@/components/support-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <LearnAiSection />
      <AiToolsSection />
      <EarnSection />
      <InnovationShowcase />
      <ResourceCenter />
      <PartnersSection />
      <SupportSection />
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 whatsapp-float"
          onClick={() => window.open('https://wa.me/919876543210', '_blank')}
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </button>
      </div>
    </div>
  );
}
