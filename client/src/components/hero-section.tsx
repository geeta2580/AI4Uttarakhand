import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Wrench, Coins } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="gradient-primary text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              AI की शक्ति से <br />
              <span className="text-cultural">पहाड़ों</span> को आगे बढ़ाएं
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              बिना कोडिंग सीखे AI का उपयोग करें। उत्तराखंड के लिए विशेष रूप से डिज़ाइन किया गया।
            </p>
            
            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('#learn')}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                size="lg"
              >
                <Play className="mr-2 h-5 w-5" />
                सीखना शुरू करें
              </Button>
              <Button 
                onClick={() => scrollToSection('#tools')}
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                size="lg"
              >
                <Wrench className="mr-2 h-5 w-5" />
                उपकरण देखें
              </Button>
              <Button 
                onClick={() => scrollToSection('#earn')}
                className="bg-cultural text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                size="lg"
              >
                <Coins className="mr-2 h-5 w-5" />
                AI से कमाई
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Hero Image */}
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Students learning AI technology" 
              className="rounded-xl shadow-2xl w-full"
            />
            
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-gray-600">छात्र सीख रहे हैं</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-cultural text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">₹10L+</div>
              <div className="text-sm">कुल कमाई</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
