import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Award, Play, Bot, Palette, Image, Scissors } from "lucide-react";
import { Link } from "wouter";

export default function LearnAiSection() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  const guideItems = [
    {
      icon: Bot,
      title: "ChatGPT Guide",
      description: "Writing में कैसे उपयोग करें",
      color: "bg-primary",
    },
    {
      icon: Palette,
      title: "Canva AI",
      description: "Poster design करना",
      color: "bg-cultural",
    },
    {
      icon: Image,
      title: "DALL-E",
      description: "AI से image बनाना",
      color: "bg-secondary",
    },
    {
      icon: Scissors,
      title: "Remove.bg",
      description: "Background remove करना",
      color: "bg-accent",
    },
  ];

  return (
    <section id="learn" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📘 बिना कोडिंग AI सीखें
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            YouTube, NPTEL, और Skill India के बेहतरीन कोर्स। हिंदी सबटाइटल के साथ।
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader>
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            courses?.map((course: any) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow card-hover">
                <CardHeader>
                  <img 
                    src={course.imageUrl} 
                    alt={course.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
                  <p className="text-gray-600">{course.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <Badge variant={course.price === "निःशुल्क" ? "secondary" : "default"}>
                        {course.price}
                      </Badge>
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                    <Link href={`/course/${course.id}`}>
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        शुरू करें
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* How-to Guides */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 pattern-bg">
          <h4 className="text-2xl font-bold mb-6 text-center">व्यावहारिक गाइड</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guideItems.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="text-white" size={24} />
                </div>
                <h5 className="font-semibold mb-2">{item.title}</h5>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
