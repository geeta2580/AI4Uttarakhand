import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function AiToolsSection() {
  const { data: tools, isLoading } = useQuery({
    queryKey: ["/api/ai-tools"],
  });

  const getIconColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      red: "bg-red-100 text-red-600",
      blue: "bg-blue-100 text-blue-600",
    };
    return colorMap[color] || "bg-gray-100 text-gray-600";
  };

  return (
    <section id="tools" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🧰 AI उपकरण
          </h3>
          <p className="text-xl text-gray-600">
            सबसे लोकप्रिय AI tools को समझें और उपयोग करें
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            tools?.map((tool: any) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow card-hover">
                <CardHeader>
                  <div className={`w-12 h-12 ${getIconColorClass(tool.iconColor)} rounded-lg flex items-center justify-center mb-4`}>
                    <i className={`fas fa-${tool.iconName} text-xl`}></i>
                  </div>
                  <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => window.open(tool.websiteUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      टूल खोलें
                    </Button>
                    <Link href={`/guide/${tool.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}>
                      <Button variant="outline" className="w-full">
                        <BookOpen className="w-4 h-4 mr-1" />
                        गाइड देखें
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
