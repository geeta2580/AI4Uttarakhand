import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, BookOpen, Play } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ToolGuide() {
  const [, params] = useRoute("/guide/:tool");
  const toolName = params?.tool;

  const { data: tools, isLoading } = useQuery({
    queryKey: ["/api/ai-tools"],
  });

  const tool = tools?.find((t: any) => t.name.toLowerCase().replace(/[^a-z0-9]/g, '') === toolName);

  const getGuideContent = (toolName: string) => {
    const guides: Record<string, any> = {
      chatgpt: {
        steps: [
          {
            title: "Account बनाएं",
            description: "OpenAI की website पर जाकर free account बनाएं",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
          },
          {
            title: "Login करें",
            description: "अपना email और password डालकर login करें",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
          },
          {
            title: "Chat शुरू करें",
            description: "Text box में अपना सवाल लिखकर Enter दबाएं",
            image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
          }
        ],
        tips: [
          "Clear और specific questions पूछें",
          "Hindi में भी सवाल पूछ सकते हैं",
          "Follow-up questions करके detail में जानकारी लें",
          "Code, emails, articles लिखने के लिए इस्तेमाल करें"
        ]
      },
      canva: {
        steps: [
          {
            title: "Canva पर जाएं",
            description: "Canva.com पर free account बनाएं",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
          },
          {
            title: "Template चुनें",
            description: "अपनी जरूरत के अनुसार template select करें",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
          },
          {
            title: "AI Magic का उपयोग करें",
            description: "Text-to-Image और Magic Resize features का इस्तेमाल करें",
            image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
          }
        ],
        tips: [
          "Professional templates का उपयोग करें",
          "Brand colors maintain करें",
          "High-quality images download करें",
          "Social media के लिए right size choose करें"
        ]
      }
    };

    return guides[toolName] || guides.chatgpt;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Guide नहीं मिला</h1>
                <p className="text-gray-600 mb-6">यह tool guide उपलब्ध नहीं है।</p>
                <Link href="/">
                  <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    होम पर वापस जाएं
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const guideContent = getGuideContent(toolName || '');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              वापस जाएं
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2">{tool.name} Guide</CardTitle>
                    <p className="text-gray-600 text-lg">{tool.description}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${tool.iconColor}-100 rounded-lg flex items-center justify-center`}>
                    <i className={`fas fa-${tool.iconName} text-${tool.iconColor}-600 text-xl`}></i>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Step-by-step Guide */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Step-by-Step Guide</h3>
                    <div className="space-y-6">
                      {guideContent.steps.map((step: any, index: number) => (
                        <div key={index} className="border rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                              <p className="text-gray-600 mb-4">{step.description}</p>
                              <img 
                                src={step.image} 
                                alt={step.title}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips Section */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Pro Tips</h3>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <ul className="space-y-3">
                        {guideContent.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Video Tutorial */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Video Tutorial</h3>
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Hindi video tutorial देखें</p>
                      <Button>
                        <Play className="w-4 h-4 mr-2" />
                        Video देखें
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold mb-2">Quick Actions</h4>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full" 
                    onClick={() => window.open(tool.websiteUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {tool.name} खोलें
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    PDF Guide Download
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Tool की जानकारी:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      Free tier available
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      Hindi support
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      Mobile friendly
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      No coding required
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Category:</h4>
                  <Badge variant="secondary">{tool.category}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
