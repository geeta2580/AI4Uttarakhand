import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Clock, Award, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CourseDetail() {
  const [, params] = useRoute("/course/:id");
  const courseId = params?.id;

  const { data: course, isLoading, error } = useQuery({
    queryKey: ["/api/courses", courseId],
    enabled: !!courseId,
  });

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

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Course नहीं मिला</h1>
                <p className="text-gray-600 mb-6">यह course उपलब्ध नहीं है या हटा दिया गया है।</p>
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
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2">{course.title}</CardTitle>
                    <p className="text-gray-600 text-lg">{course.description}</p>
                  </div>
                  <Badge variant={course.price === "निःशुल्क" ? "secondary" : "default"}>
                    {course.price}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    {course.level}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                {/* Course Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">इस Course में क्या सीखेंगे?</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        AI tools की comprehensive समझ
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Practical hands-on exercises
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Real-world applications
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Certificate of completion
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Course Structure</h3>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">Module 1: Introduction</h4>
                        <p className="text-sm text-gray-600">AI क्या है और कैसे काम करता है</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">Module 2: Practical Tools</h4>
                        <p className="text-sm text-gray-600">Popular AI tools का उपयोग</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium">Module 3: Applications</h4>
                        <p className="text-sm text-gray-600">Real-world use cases</p>
                      </div>
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
                  <div className="text-3xl font-bold text-primary mb-2">{course.price}</div>
                  <p className="text-gray-600">Complete course access</p>
                </div>

                <div className="space-y-4">
                  {course.youtubeUrl && (
                    <Button 
                      className="w-full" 
                      onClick={() => window.open(course.youtubeUrl, '_blank')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Course शुरू करें
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Preview देखें
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Course में शामिल है:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      Video lectures in Hindi
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      Downloadable resources
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      Community support
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      Certificate of completion
                    </li>
                  </ul>
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
