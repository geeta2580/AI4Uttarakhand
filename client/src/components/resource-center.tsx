import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Play, FileText, Video, Presentation, ExternalLink } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ResourceCenter() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: resources, isLoading } = useQuery({
    queryKey: ["/api/resources"],
  });

  const downloadMutation = useMutation({
    mutationFn: async (resourceId: number) => {
      return apiRequest("POST", `/api/resources/${resourceId}/download`, {});
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      toast({
        title: "Download Started",
        description: "Resource download has been tracked successfully.",
      });
      // In a real implementation, this would trigger the actual download
      console.log("Download URL:", data.fileUrl);
    },
    onError: () => {
      toast({
        title: "Download Error",
        description: "Failed to download resource. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="text-red-600" size={24} />;
      case 'video':
        return <Video className="text-green-600" size={24} />;
      case 'presentation':
        return <Presentation className="text-blue-600" size={24} />;
      default:
        return <FileText className="text-gray-600" size={24} />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100';
      case 'video':
        return 'bg-green-100';
      case 'presentation':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  const schemes = [
    {
      title: "Skill India Digital",
      description: "Free digital skills training with certification",
      url: "https://www.skillindiadigital.gov.in/",
    },
    {
      title: "Startup India",
      description: "Funding और mentorship support for startups",
      url: "https://www.startupindia.gov.in/",
    },
    {
      title: "PMKVY 3.0",
      description: "Skill development with monetary rewards",
      url: "https://pmkvyofficial.org/",
    },
    {
      title: "Digital India",
      description: "Digital literacy और technology access",
      url: "https://digitalindia.gov.in/",
    },
  ];

  return (
    <section id="resources" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📚 संसाधन केंद्र
          </h3>
          <p className="text-xl text-gray-600">
            PDFs, presentations और workshop materials
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Resources List */}
          <div>
            <h4 className="text-2xl font-bold mb-6">डाउनलोड Resources</h4>
            <div className="space-y-4">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-pulse">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                      <div>
                        <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                      </div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                ))
              ) : (
                resources?.map((resource: any) => (
                  <div key={resource.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${getResourceColor(resource.type)} rounded-lg flex items-center justify-center mr-4`}>
                        {getResourceIcon(resource.type)}
                      </div>
                      <div>
                        <h5 className="font-semibold">{resource.title}</h5>
                        <p className="text-sm text-gray-600">
                          {resource.description}
                          {resource.downloads > 0 && ` • ${resource.downloads} downloads`}
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => downloadMutation.mutate(resource.id)}
                      disabled={downloadMutation.isPending}
                      size="sm"
                    >
                      {resource.type === 'video' ? (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Watch
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Government Schemes */}
          <div>
            <h4 className="text-2xl font-bold mb-6">सरकारी योजनाएं</h4>
            <div className="space-y-4">
              {schemes.map((scheme, index) => (
                <Card key={index} className="border border-gray-200 hover:border-primary transition-colors card-hover">
                  <CardContent className="p-4">
                    <h5 className="font-semibold text-lg mb-2">{scheme.title}</h5>
                    <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
                    <a 
                      href={scheme.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-blue-700 text-sm font-medium inline-flex items-center"
                    >
                      Learn More <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
