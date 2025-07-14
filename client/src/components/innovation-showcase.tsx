import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStorySchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Upload, Send } from "lucide-react";
import { z } from "zod";

const storyFormSchema = insertStorySchema.extend({
  name: z.string().min(1, "Name is required"),
  city: z.string().min(1, "City is required"),
  story: z.string().min(100, "Story must be at least 100 characters").max(500, "Story must not exceed 500 characters"),
  profession: z.string().min(1, "Profession is required"),
});

export default function InnovationShowcase() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stories, isLoading } = useQuery({
    queryKey: ["/api/stories"],
  });

  const form = useForm({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      name: "",
      city: "",
      story: "",
      profession: "",
    },
  });

  const createStoryMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/stories", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to submit story");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stories"] });
      form.reset();
      setSelectedFile(null);
      toast({
        title: "Story Submitted!",
        description: "आपकी story review के लिए भेज दी गई है। Approval के बाद यह showcase में दिखेगी।",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Story submit करने में problem हुई। कृपया फिर से try करें।",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof storyFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("story", data.story);
    formData.append("profession", data.profession);
    
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    createStoryMutation.mutate(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image or video file",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  return (
    <section id="showcase" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🌱 स्थानीय AI नवाचार
          </h3>
          <p className="text-xl text-gray-600">
            हमारे समुदाय की AI success stories
          </p>
        </div>

        {/* Story Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader>
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </CardHeader>
              </Card>
            ))
          ) : (
            stories?.map((story: any) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow card-hover">
                <CardHeader>
                  <img 
                    src={story.imageUrl} 
                    alt={story.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-xl font-semibold">{story.name} - {story.profession}</CardTitle>
                  <p className="text-gray-600 mb-4">{story.story}</p>
                  <div className="flex items-center text-secondary">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{story.city}</span>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>

        {/* User Submission Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h4 className="text-2xl font-bold text-center mb-6">अपनी Success Story साझा करें</h4>
          <div className="max-w-2xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>आपका नाम</FormLabel>
                        <FormControl>
                          <Input placeholder="जैसे: राम सिंह" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>आपका शहर</FormLabel>
                        <FormControl>
                          <Input placeholder="जैसे: नैनीताल, उत्तराखंड" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>आपका व्यवसाय</FormLabel>
                      <FormControl>
                        <Input placeholder="जैसे: किसान, छात्र, कारीगर" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="story"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>आपकी AI Success Story (100-500 words)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="AI tools का उपयोग करके आपने कैसे success हासिल की? विस्तार से बताएं..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="text-sm text-gray-500">
                        {field.value.length}/500 characters
                      </div>
                    </FormItem>
                  )}
                />
                
                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Photo या Video Upload करें</p>
                  <p className="text-sm text-gray-500 mb-4">Max 10MB • JPG, PNG, MP4</p>
                  <input 
                    type="file" 
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button type="button" variant="outline" asChild>
                      <span>File Choose करें</span>
                    </Button>
                  </label>
                  {selectedFile && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={createStoryMutation.isPending}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {createStoryMutation.isPending ? "Submitting..." : "Story Submit करें"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
